// src/components/ChatModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
//  SendNaw  ·  Customer Support Chat Modal
//  Real-time via WebSocket → falls back to HTTP polling every 3 s
//
//  C# Backend contract (SignalR or raw WS + REST):
//
//  POST  /api/support/chat/start
//        body:  { name, email, initialMessage }
//        resp:  { sessionId, agentName, agentAvatar? }
//
//  POST  /api/support/chat/message
//        body:  { sessionId, message }
//        resp:  { id, timestamp }
//
//  GET   /api/support/chat/messages?sessionId=X&after=ISO_TIMESTAMP
//        resp:  [ { id, sender:"agent"|"user", text, timestamp } ]
//
//  WS    ws(s)://YOUR_API/ws/support/{sessionId}
//        server pushes: { sender:"agent", text, timestamp }
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "https://api.sendnaw.com";
const WS_BASE  = import.meta.env.VITE_WS_URL  || "wss://api.sendnaw.com";
const POLL_MS  = 3000; // fallback polling interval

// ── Design tokens (matches brand) ────────────────────────────────────────────
const T = {
  primary:  "#6f42c1",
  pLight:   "#8b6dff",
  violet:   "#a78bfa",
  bg:       "#080c18",
  surface:  "#0d1223",
  card:     "#111827",
  border:   "rgba(111,66,193,0.18)",
  green:    "#10d9a0",
  red:      "#ff5c7a",
  text:     "#e8edf8",
  muted:    "#7986a8",
  dim:      "#1a2540",
};
const px = (hex, a) => {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtTime = (ts) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const STAGES = { CLOSED: 0, INTRO: 1, FORM: 2, CHAT: 3 };

// ── Main component ────────────────────────────────────────────────────────────
export default function ChatModal() {
  const [stage,    setStage]    = useState(STAGES.CLOSED);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [initMsg,  setInitMsg]  = useState("");
  const [msgs,     setMsgs]     = useState([]);
  const [input,    setInput]    = useState("");
  const [sessionId,setSid]      = useState(null);
  const [sending,  setSending]  = useState(false);
  const [agentName,setAgent]    = useState("Support Team");
  const [agentOnline,setOnline] = useState(false);
  const [unread,   setUnread]   = useState(0);
  const [formErr,  setFormErr]  = useState("");
  const [starting, setStarting] = useState(false);
  const [typing,   setTyping]   = useState(false);

  const wsRef      = useRef(null);
  const pollRef    = useRef(null);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const lastTsRef  = useRef(new Date().toISOString());

  // ── Scroll to bottom on new message ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (stage === STAGES.CHAT) setUnread(0);
  }, [msgs, stage]);

  // ── Focus input when chat opens ──
  useEffect(() => {
    if (stage === STAGES.CHAT) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [stage]);

  // ── Cleanup on unmount ──
  useEffect(() => () => { teardown(); }, []);

  const teardown = () => {
    wsRef.current?.close();
    wsRef.current = null;
    clearInterval(pollRef.current);
  };

  // ── Push a message into state ──
  const pushMsg = useCallback((sender, text, ts = new Date().toISOString(), id = Math.random().toString(36)) => {
    setMsgs(prev => {
      if (prev.some(m => m.id === id)) return prev; // dedup
      return [...prev, { id, sender, text, ts }];
    });
    lastTsRef.current = ts;
    if (sender === "agent" && stage !== STAGES.CHAT) setUnread(u => u + 1);
  }, [stage]);

  // ── WebSocket connect ──
  const connectWS = useCallback((sid) => {
    try {
      const ws = new WebSocket(`${WS_BASE}/ws/support/${sid}`);
      ws.onopen  = () => { setOnline(true); };
      ws.onclose = () => { setOnline(false); startPolling(sid); };
      ws.onerror = () => { ws.close(); };
      ws.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.typing !== undefined) { setTyping(!!data.typing); return; }
          setTyping(false);
          pushMsg("agent", data.text, data.timestamp, data.id);
        } catch {}
      };
      wsRef.current = ws;
    } catch {
      startPolling(sid);
    }
  }, [pushMsg]);

  // ── HTTP polling fallback ──
  const startPolling = useCallback((sid) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/support/chat/messages?sessionId=${sid}&after=${encodeURIComponent(lastTsRef.current)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        data.forEach(m => pushMsg("agent", m.text, m.timestamp, m.id));
      } catch {}
    }, POLL_MS);
  }, [pushMsg]);

  // ── Start chat session ──
  const startChat = async () => {
    setFormErr("");
    if (!name.trim())   return setFormErr("Please enter your name.");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setFormErr("Please enter a valid email.");
    if (!initMsg.trim()) return setFormErr("Please type your first message.");

    setStarting(true);
    try {
      const res = await fetch(`${API_BASE}/api/support/chat/start`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: name.trim(), email: email.trim(), initialMessage: initMsg.trim() }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      setSid(data.sessionId);
      if (data.agentName) setAgent(data.agentName);

      // Seed UI with the first message and an agent ack
      pushMsg("user",  initMsg.trim());
      pushMsg("agent",
        `Hi ${name.split(" ")[0]}! 👋 Thanks for reaching out. A member of our support team will respond shortly. Your session ID is #${data.sessionId.slice(-6).toUpperCase()}.`,
        new Date(Date.now() + 500).toISOString()
      );

      connectWS(data.sessionId);
      setStage(STAGES.CHAT);
    } catch (err) {
      setFormErr("Could not connect to support right now. Please try again.");
    } finally {
      setStarting(false);
    }
  };

  // ── Send a message ──
  const sendMsg = async () => {
    if (!input.trim() || sending || !sessionId) return;
    const text = input.trim();
    setInput("");
    pushMsg("user", text);

    // Send via WS if open, else REST
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text }));
    } else {
      setSending(true);
      try {
        await fetch(`${API_BASE}/api/support/chat/message`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ sessionId, message: text }),
        });
      } catch {}
      setSending(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } };

  const openModal  = () => { setStage(STAGES.INTRO); setUnread(0); };
  const closeModal = () => { setStage(STAGES.CLOSED); };

  // ─────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        .sn-chat-fade { animation: snFadeUp 0.22s ease both; }
        @keyframes snFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .sn-chat-msg  { animation: snFadeUp 0.18s ease both; }
        .sn-chat-scroll::-webkit-scrollbar { width:4px; }
        .sn-chat-scroll::-webkit-scrollbar-thumb { background:${T.dim}; border-radius:99px; }
        .sn-chat-scroll::-webkit-scrollbar-track { background:transparent; }
        .sn-typing-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:${T.muted}; animation:snBounce 1.2s ease infinite; }
        .sn-typing-dot:nth-child(2){animation-delay:.2s}
        .sn-typing-dot:nth-child(3){animation-delay:.4s}
        @keyframes snBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        .sn-fab-pulse::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:2px solid ${T.primary}; animation:snPulse 2s ease infinite; }
        @keyframes snPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:0;transform:scale(1.4)} }
        .sn-input-chat:focus { outline:none; border-color:${px(T.primary,0.7)} !important; }
        .sn-input-chat { resize:none; }
      `}</style>

      {/* ── FAB (floating action button) ── */}
      {stage === STAGES.CLOSED && (
        <button
          onClick={openModal}
          className="sn-fab-pulse"
          style={{
            position:      "fixed",
            bottom:        28,
            right:         28,
            width:         58,
            height:        58,
            borderRadius:  "50%",
            background:    `linear-gradient(135deg, ${T.primary}, #4f46e5)`,
            border:        "none",
            cursor:        "pointer",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            boxShadow:     `0 8px 32px ${px(T.primary, 0.55)}`,
            zIndex:        9998,
            transition:    "transform 0.18s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          title="Chat with support"
        >
          <i className="bi bi-chat-dots-fill" style={{ fontSize: 24, color: "#fff" }} />
          {unread > 0 && (
            <span style={{
              position: "absolute", top: 4, right: 4,
              width: 18, height: 18, borderRadius: "50%",
              background: T.red, color: "#fff",
              fontSize: 10, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid #fff",
            }}>{unread}</span>
          )}
        </button>
      )}

      {/* ── Modal shell ── */}
      {stage !== STAGES.CLOSED && (
        <div
          className="sn-chat-fade"
          style={{
            position:     "fixed",
            bottom:       28,
            right:        28,
            width:        "min(96vw, 380px)",
            maxHeight:    "min(92vh, 620px)",
            borderRadius: 22,
            background:   T.bg,
            border:       `1px solid ${px(T.primary, 0.35)}`,
            boxShadow:    `0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px ${px(T.primary,0.1)}`,
            display:      "flex",
            flexDirection:"column",
            overflow:     "hidden",
            zIndex:       9999,
            fontFamily:   "'Plus Jakarta Sans', 'Inter', sans-serif",
          }}
        >

          {/* ── Header ── */}
          <div style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, #4f46e5 100%)`,
            padding:    "16px 18px",
            display:    "flex",
            alignItems: "center",
            gap:        12,
            flexShrink: 0,
          }}>
            {/* Agent avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 13,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: "#fff", fontWeight: 800,
              }}>
                <i className="bi bi-headset" />
              </div>
              {/* Online indicator */}
              <span style={{
                position: "absolute", bottom: 2, right: 2,
                width: 10, height: 10, borderRadius: "50%",
                background: agentOnline ? T.green : "#fbbf24",
                border: "2px solid #fff",
              }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 800, marginBottom: 1 }}>
                SendNaw Support
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>
                {agentOnline ? (
                  <><span style={{ color: T.green, marginRight: 4 }}>●</span>Connected live</>
                ) : (
                  <><span style={{ color: "#fbbf24", marginRight: 4 }}>●</span>We reply within minutes</>
                )}
              </div>
            </div>

            <button onClick={closeModal} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 9, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, flexShrink: 0 }}>
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* ════════════════════════════════════
              STAGE: INTRO
          ════════════════════════════════════ */}
          {stage === STAGES.INTRO && (
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Welcome illustration area */}
              <div style={{ textAlign: "center", marginBottom: 4 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 22,
                  background: `linear-gradient(135deg, ${px(T.primary, 0.2)}, ${px("#4f46e5", 0.2)})`,
                  border: `1px solid ${px(T.primary, 0.3)}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 34, margin: "0 auto 14px",
                }}>
                  <i className="bi bi-chat-heart-fill" style={{ color: T.violet }} />
                </div>
                <div style={{ color: T.text, fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
                  Hi there! 👋
                </div>
                <div style={{ color: T.muted, fontSize: 13, lineHeight: 1.6 }}>
                  Need help? Our support team is here for you. We typically reply within <strong style={{ color: T.violet }}>a few minutes</strong>.
                </div>
              </div>

              {/* Info cards */}
              {[
                { icon: "bi-lightning-charge-fill", color: "#fbbf24", title: "Fast response", sub: "Average reply time under 5 mins" },
                { icon: "bi-shield-check-fill",     color: T.green,   title: "Secure & private", sub: "Your data is encrypted end-to-end" },
                { icon: "bi-people-fill",           color: T.violet,  title: "Real agents",   sub: "You'll talk to a real human, not a bot" },
              ].map(c => (
                <div key={c.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}` }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: px(c.color, 0.14), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: c.color, flexShrink: 0 }}>
                    <i className={`bi ${c.icon}`} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{c.sub}</div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStage(STAGES.FORM)}
                style={{
                  width: "100%", padding: "13px", borderRadius: 14, cursor: "pointer",
                  background: `linear-gradient(135deg, ${T.primary}, #4f46e5)`,
                  border: "none", color: "#fff", fontSize: 14, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: `0 8px 24px ${px(T.primary, 0.4)}`,
                  transition: "all 0.18s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                <i className="bi bi-chat-dots-fill" /> Start a Conversation
              </button>
            </div>
          )}

          {/* ════════════════════════════════════
              STAGE: FORM
          ════════════════════════════════════ */}
          {stage === STAGES.FORM && (
            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ color: T.text, fontSize: 15, fontWeight: 800, marginBottom: 4 }}>
                  Before we connect you…
                </div>
                <div style={{ color: T.muted, fontSize: 12 }}>
                  Share a few details so our team can help you better.
                </div>
              </div>

              {/* Name */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 6 }}>
                  Your Name
                </label>
                <input
                  type="text" value={name} placeholder="e.g. Chidi Okafor"
                  onChange={e => setName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: T.surface, border: `1px solid ${T.dim}`, color: T.text, fontSize: 13, fontWeight: 600, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                  onFocus={e => e.target.style.borderColor = px(T.primary, 0.7)}
                  onBlur={e => e.target.style.borderColor = T.dim}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email" value={email} placeholder="you@example.com"
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: T.surface, border: `1px solid ${T.dim}`, color: T.text, fontSize: 13, fontWeight: 600, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                  onFocus={e => e.target.style.borderColor = px(T.primary, 0.7)}
                  onBlur={e => e.target.style.borderColor = T.dim}
                />
              </div>

              {/* First message */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 6 }}>
                  How can we help?
                </label>
                <textarea
                  value={initMsg} placeholder="Describe your issue or question…"
                  onChange={e => setInitMsg(e.target.value)}
                  rows={3}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: T.surface, border: `1px solid ${T.dim}`, color: T.text, fontSize: 13, fontWeight: 600, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s", resize: "none", lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = px(T.primary, 0.7)}
                  onBlur={e => e.target.style.borderColor = T.dim}
                />
              </div>

              {formErr && (
                <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", borderRadius: 11, background: px(T.red, 0.1), border: `1px solid ${px(T.red, 0.28)}`, color: T.red, fontSize: 12, fontWeight: 600 }}>
                  <i className="bi bi-exclamation-circle-fill" /> {formErr}
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setStage(STAGES.INTRO); setFormErr(""); }} style={{ flex: 1, padding: "11px", borderRadius: 12, cursor: "pointer", background: T.surface, border: `1px solid ${T.border}`, color: T.muted, fontSize: 13, fontWeight: 700 }}>
                  Back
                </button>
                <button
                  onClick={startChat}
                  disabled={starting}
                  style={{
                    flex: 2, padding: "11px", borderRadius: 12, cursor: starting ? "not-allowed" : "pointer",
                    background: starting ? px(T.primary, 0.4) : `linear-gradient(135deg, ${T.primary}, #4f46e5)`,
                    border: "none", color: "#fff", fontSize: 13, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    transition: "all 0.15s",
                  }}
                >
                  {starting
                    ? <><i className="bi bi-hourglass-split" /> Connecting…</>
                    : <><i className="bi bi-send-fill" /> Send Message</>}
                </button>
              </div>

              <div style={{ textAlign: "center", fontSize: 10, color: T.dim }}>
                <i className="bi bi-lock-fill" style={{ marginRight: 3 }} />
                Your information is encrypted and never shared.
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              STAGE: CHAT
          ════════════════════════════════════ */}
          {stage === STAGES.CHAT && (
            <>
              {/* Messages area */}
              <div
                className="sn-chat-scroll"
                style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}
              >
                {msgs.map((m, i) => {
                  const isUser  = m.sender === "user";
                  const isAgent = m.sender === "agent";
                  const prevSender = i > 0 ? msgs[i-1].sender : null;
                  const showAv = isAgent && prevSender !== "agent";

                  return (
                    <div key={m.id} className="sn-chat-msg" style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end", gap: 8 }}>

                      {/* Agent avatar */}
                      {isAgent && (
                        <div style={{ width: 28, height: 28, borderRadius: 9, background: showAv ? `linear-gradient(135deg,${T.primary},#4f46e5)` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", flexShrink: 0 }}>
                          {showAv && <i className="bi bi-headset" />}
                        </div>
                      )}

                      <div style={{ maxWidth: "72%" }}>
                        {showAv && (
                          <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, marginBottom: 3, paddingLeft: 2 }}>{agentName}</div>
                        )}
                        <div style={{
                          padding: "10px 13px", borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          background: isUser
                            ? `linear-gradient(135deg, ${T.primary}, #4f46e5)`
                            : T.surface,
                          border: isUser ? "none" : `1px solid ${T.border}`,
                          color: isUser ? "#fff" : T.text,
                          fontSize: 13, lineHeight: 1.55, fontWeight: 500,
                          wordBreak: "break-word",
                        }}>
                          {m.text}
                        </div>
                        <div style={{ fontSize: 10, color: T.dim, marginTop: 4, textAlign: isUser ? "right" : "left", paddingLeft: isAgent ? 2 : 0 }}>
                          {fmtTime(m.ts)}
                          {isUser && <i className="bi bi-check2-all" style={{ marginLeft: 4, color: T.violet }} />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {typing && (
                  <div className="sn-chat-msg" style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg,${T.primary},#4f46e5)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", flexShrink: 0 }}>
                      <i className="bi bi-headset" />
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 4, alignItems: "center" }}>
                      <span className="sn-typing-dot" /><span className="sn-typing-dot" /><span className="sn-typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Connection status strip */}
              {!agentOnline && (
                <div style={{ padding: "6px 14px", background: px("#fbbf24", 0.1), borderTop: `1px solid ${px("#fbbf24", 0.2)}`, display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#fbbf24", flexShrink: 0 }}>
                  <i className="bi bi-wifi-off" /> Offline mode — messages will be delivered when we reconnect
                </div>
              )}

              {/* Input bar */}
              <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "flex-end", gap: 10, background: T.surface, flexShrink: 0 }}>
                <textarea
                  ref={inputRef}
                  className="sn-input-chat"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a message…"
                  rows={1}
                  style={{
                    flex: 1, padding: "9px 13px", borderRadius: 12,
                    background: T.card, border: `1px solid ${T.dim}`,
                    color: T.text, fontSize: 13, fontWeight: 500,
                    outline: "none", transition: "border-color 0.15s",
                    maxHeight: 100, overflowY: "auto",
                  }}
                />
                <button
                  onClick={sendMsg}
                  disabled={!input.trim() || sending}
                  style={{
                    width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                    background: input.trim() ? `linear-gradient(135deg,${T.primary},#4f46e5)` : T.dim,
                    border: "none", color: "#fff", fontSize: 17,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    transition: "all 0.15s",
                    boxShadow: input.trim() ? `0 4px 14px ${px(T.primary, 0.4)}` : "none",
                  }}
                >
                  <i className="bi bi-send-fill" style={{ marginLeft: 2 }} />
                </button>
              </div>

              {/* Footer */}
              <div style={{ padding: "6px 14px 10px", textAlign: "center", background: T.surface }}>
                <div style={{ fontSize: 10, color: T.dim }}>
                  <i className="bi bi-lock-fill" style={{ marginRight: 3 }} />
                  Secured by SendNaw · Session #{sessionId?.slice(-6).toUpperCase()}
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </>
  );
}