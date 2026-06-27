import { useState, useEffect } from "react";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";
// ─── Import currency metadata from your wallet theme ───
import { CURRENCY_META } from "../../constants/wallettheme";

// ─── Convert CURRENCY_META (object) to an array ──────────────────────────
const CURRENCIES = Object.entries(CURRENCY_META).map(([code, meta]) => ({
  code,
  symbol: meta.symbol,
  name: meta.label,
  flag: meta.flagImg,
}));

const SENDNAW_LOGO = "http://localhost:3000/images/SendNaw_logo_main-removebg-preview.png";

const lightTheme = {
  indigo: "#4F46E5",
  purple: "#9333EA",
  green: "#10B981",
  darkBg: "#F9FAFB",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  lightGray: "#F3F4F6",
};

const darkTheme = {
  indigo: "#8A5CF7",
  purple: "#A78BFA",
  green: "#34D399",
  darkBg: "#0F172A",
  danger: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
  cardBg: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  border: "#334155",
  lightGray: "#334155",
};

const font = `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

const CARD_DESIGNS = [
  {
    id: "primary",
    name: "SendNaw Purple",
    gradient: "linear-gradient(145deg, #7B2FBE, #9B3FD4, #C060E8)",
    circles: ["rgba(176,96,240,0.5)", "rgba(208,128,255,0.4)"],
    textColor: "#fff",
    network: "VISA",
  },
  {
    id: "gold",
    name: "Gold VIP",
    gradient: "linear-gradient(145deg, #92660A, #C9920A, #E8B830)",
    circles: ["rgba(232,184,48,0.4)", "rgba(201,146,10,0.3)"],
    textColor: "#fff",
    network: "VISA",
  },
  {
    id: "black",
    name: "Obsidian Black",
    gradient: "linear-gradient(145deg, #0a0a0a, #1a1a1a, #2a2a2a)",
    circles: ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.04)"],
    textColor: "#e0e0e0",
    network: "Mastercard",
  },
];

function maskCardNumber(number) {
  if (!number) return "**** **** **** ****";
  const clean = number.replace(/\s/g, "");
  return `**** **** **** ${clean.slice(-4)}`;
}

function formatCardDisplay(number) {
  if (!number) return "**** **** **** ****";
  const clean = number.replace(/\s/g, "");
  return clean.match(/.{1,4}/g)?.join(" ") || number;
}

function formatExpiry(month, year) {
  if (!month || !year) return "MM/YY";
  return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
}

function CardSVG({ design, holderName, cardNumber, expiry, masked = true, flipped = false, small = false }) {
  const d = CARD_DESIGNS.find((c) => c.id === design) || CARD_DESIGNS[0];
  const W = small ? 320 : 420;
  const H = small ? 200 : 265;
  const displayNumber = masked ? maskCardNumber(cardNumber) : formatCardDisplay(cardNumber);

  return (
    <div style={{
      width: W, height: H,
      perspective: 1000,
      cursor: "pointer",
      flexShrink: 0,
    }}>
      <div style={{
        width: "100%", height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          borderRadius: 20,
          background: d.gradient,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: small ? 140 : 200, height: small ? 140 : 200,
            borderRadius: "50%",
            background: d.circles[0],
          }} />
          <div style={{
            position: "absolute", bottom: -50, left: -50,
            width: small ? 160 : 220, height: small ? 160 : 220,
            borderRadius: "50%",
            background: d.circles[1],
          }} />
          <div style={{
            position: "absolute", top: "40%", left: "30%",
            width: small ? 100 : 150, height: small ? 100 : 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }} />

          <div style={{ position: "relative", zIndex: 1, padding: small ? "18px 20px" : "24px 28px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: small ? 9 : 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px", marginBottom: 2 }}>DEBIT</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <img src={SENDNAW_LOGO} alt="SendNaw" style={{ width: small ? 20 : 28, height: small ? 20 : 28, borderRadius: "50%", background: "rgba(255,255,255,0.2)", objectFit: "contain" }} />
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: small ? 13 : 17, letterSpacing: "-0.5px" }}>SendNaw</span>
                </div>
              </div>
              <div style={{
                width: small ? 36 : 48, height: small ? 28 : 36,
                borderRadius: 5,
                background: "linear-gradient(145deg, #E8C84A, #F5D96B, #C8A030)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: "0.5px", background: "#B8900A" }} />
                <div style={{ position: "absolute", top: "66%", left: 0, right: 0, height: "0.5px", background: "#B8900A" }} />
                <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: "0.5px", background: "#B8900A" }} />
                <div style={{ position: "absolute", left: "66%", top: 0, bottom: 0, width: "0.5px", background: "#B8900A" }} />
              </div>
            </div>

            <div>
              <div style={{
                fontSize: small ? 14 : 19,
                fontWeight: 600,
                letterSpacing: small ? "0.15rem" : "0.2rem",
                fontFamily: "monospace",
                color: d.textColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}>
                {displayNumber}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: small ? 16 : 24 }}>
                <div>
                  <div style={{ fontSize: small ? 7 : 9, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>Card Holder Name</div>
                  <div style={{ fontSize: small ? 10 : 13, fontWeight: 700, color: d.textColor, letterSpacing: "0.5px" }}>
                    {holderName?.toUpperCase() || "YOUR NAME"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: small ? 7 : 9, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>Valid Thru</div>
                  <div style={{ fontSize: small ? 10 : 13, fontWeight: 700, color: d.textColor }}>{expiry}</div>
                </div>
              </div>
              {d.network === "VISA" ? (
                <div style={{ fontSize: small ? 16 : 22, fontWeight: 900, color: "#fff", letterSpacing: "-1px", fontStyle: "italic", opacity: 0.95 }}>VISA</div>
              ) : (
                <div style={{ display: "flex" }}>
                  <div style={{ width: small ? 20 : 26, height: small ? 20 : 26, borderRadius: "50%", background: "#EB001B", opacity: 0.9 }} />
                  <div style={{ width: small ? 20 : 26, height: small ? 20 : 26, borderRadius: "50%", background: "#F79E1B", opacity: 0.9, marginLeft: small ? -8 : -10 }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          borderRadius: 20,
          background: d.gradient,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
        }}>
          <div style={{ position: "absolute", top: small ? 28 : 40, left: 0, right: 0, height: small ? 36 : 48, background: "#111" }} />
          <div style={{ position: "absolute", top: small ? 80 : 108, left: small ? 20 : 28, right: small ? 20 : 28 }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 6, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: small ? 9 : 11, color: "rgba(255,255,255,0.7)" }}>CVV</div>
              <div style={{ fontFamily: "monospace", fontSize: small ? 14 : 18, fontWeight: 700, color: "#fff", letterSpacing: "0.3rem" }}>•••</div>
            </div>
            <div style={{ fontSize: small ? 8 : 10, color: "rgba(255,255,255,0.5)", marginTop: 8, textAlign: "center" }}>
              This card is property of SendNaw Technologies
            </div>
          </div>
          <div style={{ position: "absolute", bottom: small ? 16 : 22, right: small ? 20 : 28, display: "flex", alignItems: "center", gap: 6 }}>
            <img src={SENDNAW_LOGO} alt="SendNaw" style={{ width: small ? 16 : 22, height: small ? 16 : 22, borderRadius: "50%", objectFit: "contain" }} />
            <span style={{ color: "#fff", fontWeight: 800, fontSize: small ? 11 : 14 }}>SendNaw</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCardState({ onCreateVirtual, onRequestPhysical, colors }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <div style={{ position: "relative", width: 280, margin: "0 auto 2rem", height: 180 }}>
        <div style={{ position: "absolute", top: 24, left: 24, width: 240, height: 150, borderRadius: 18, background: "linear-gradient(145deg, #7B2FBE22, #C060E822)", border: `1.5px dashed ${colors.border}`, transform: "rotate(-6deg)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, width: 240, height: 150, borderRadius: 18, background: "linear-gradient(145deg, #7B2FBE33, #C060E833)", border: `1.5px dashed ${colors.border}`, transform: "rotate(-3deg)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 240, height: 150, borderRadius: 18, background: colors.cardBg, border: `1.5px dashed ${colors.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <i className="bi bi-credit-card-2-front" style={{ fontSize: 36, color: colors.textSecondary, opacity: 0.4 }} />
          <div style={{ fontSize: 12, color: colors.textSecondary, opacity: 0.6 }}>No card yet</div>
        </div>
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.text, margin: "0 0 8px" }}>Get your SendNaw card</h3>
      <p style={{ fontSize: 14, color: colors.textSecondary, margin: "0 0 2rem", lineHeight: 1.6 }}>
        Shop online securely worldwide or order a physical card delivered to your door.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
        <button onClick={onCreateVirtual} style={{
          background: `linear-gradient(135deg, #7B2FBE, #C060E8)`,
          border: "none", borderRadius: 40, padding: "14px 24px",
          color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: "0 8px 20px rgba(123,47,190,0.35)",
          fontFamily: font,
        }}>
          <i className="bi bi-phone" /> Create virtual card — instant
        </button>
        <button onClick={onRequestPhysical} style={{
          background: colors.cardBg, border: `1.5px solid ${colors.border}`,
          borderRadius: 40, padding: "14px 24px",
          color: colors.text, fontWeight: 600, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontFamily: font,
        }}>
          <i className="bi bi-credit-card" /> Request physical card
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
        {[["bi-shield-check", "Secure & encrypted"], ["bi-globe", "Works worldwide"], ["bi-lightning", "Instant issuance"]].map(([icon, label]) => (
          <div key={icon} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: colors.textSecondary }}>
            <i className={`bi ${icon}`} style={{ color: "#7B2FBE" }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignPicker({ selected, onChange, holderName, colors }) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Choose your design</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {CARD_DESIGNS.map((d) => (
          <div key={d.id} onClick={() => onChange(d.id)} style={{
            cursor: "pointer",
            border: selected === d.id ? "2.5px solid #7B2FBE" : `1.5px solid transparent`,
            borderRadius: 14,
            padding: 3,
            transition: "all 0.2s",
            transform: selected === d.id ? "scale(1.04)" : "scale(1)",
          }}>
            <CardSVG design={d.id} holderName={holderName} cardNumber="" expiry="MM/YY" masked small />
            <p style={{ fontSize: 11, textAlign: "center", color: selected === d.id ? "#7B2FBE" : colors.textSecondary, fontWeight: selected === d.id ? 700 : 400, marginTop: 6, marginBottom: 0 }}>{d.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CreateVirtualModal – now uses a dropdown for currencies ────────────
function CreateVirtualModal({ onClose, onCreated, userFullName, colors }) {
  const [step, setStep] = useState(1);
  const [design, setDesign] = useState("primary");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://sendnawbackend.onrender.com/api/cards/create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ design, currency }),
      });
      const data = await res.json();
      if (data.success) {
        onCreated({ card_number: data.card_number, expiry: data.expiry, cvv: data.cvv, design, currency });
      } else {
        showNotification("SendNaw", data.message, "error");
      }
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setLoading(false);
  };

  const selectedCurrency = CURRENCIES.find(c => c.code === currency);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      overflowY: "auto",
    }}>
      <div style={{
        background: colors.cardBg,
        borderRadius: 28,
        padding: "1.8rem",
        width: "100%",
        maxWidth: 520,
        maxHeight: "90vh",
        overflowY: "auto",
        fontFamily: font,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.text }}>Create virtual card</h3>
            <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>Step {step} of 2</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: colors.textSecondary }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {step === 1 && (
          <div>
            <DesignPicker selected={design} onChange={setDesign} holderName={userFullName} colors={colors} />
            {/* Currency dropdown */}
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Card currency
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {selectedCurrency && (
                  <img
                    src={selectedCurrency.flag}
                    alt={selectedCurrency.code}
                    style={{ width: 32, height: 24, objectFit: "cover", borderRadius: 4 }}
                  />
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: `1px solid ${colors.border}`,
                    fontSize: 15,
                    background: colors.cardBg,
                    color: colors.text,
                    outline: "none",
                    fontFamily: font,
                    cursor: "pointer",
                    appearance: "auto",
                  }}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} – {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              style={{
                width: "100%",
                marginTop: 20,
                padding: "14px",
                borderRadius: 40,
                background: "linear-gradient(135deg, #7B2FBE, #C060E8)",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: font,
              }}
            >
              Continue <i className="bi bi-arrow-right" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ background: colors.lightGray, borderRadius: 16, padding: "16px", marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: "0 0 8px", fontWeight: 600 }}>Card preview</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CardSVG design={design} holderName={userFullName} cardNumber="" expiry="MM/YY" masked small />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>
                  <strong style={{ color: colors.text }}>{CARD_DESIGNS.find(d => d.id === design)?.name}</strong>
                </span>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>·</span>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>
                  <strong style={{ color: colors.text }}>
                    <img
                      src={selectedCurrency?.flag}
                      alt={selectedCurrency?.code}
                      style={{ width: 20, height: 14, objectFit: "cover", borderRadius: 2, marginRight: 4 }}
                    />
                    {selectedCurrency?.code}
                  </strong>
                </span>
              </div>
            </div>
            <div style={{ background: `${colors.warning}18`, borderRadius: 12, padding: "12px 14px", marginBottom: 20, display: "flex", gap: 10 }}>
              <i className="bi bi-exclamation-triangle" style={{ color: colors.warning, flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: colors.warning, lineHeight: 1.5 }}>
                Save your card details once issued — the full number and CVV won't be shown again.
              </span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", borderRadius: 40, background: colors.cardBg, border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: "pointer", fontFamily: font }}>
                <i className="bi bi-arrow-left" /> Back
              </button>
              <button onClick={handleCreate} disabled={loading} style={{ flex: 2, padding: "12px", borderRadius: 40, background: "linear-gradient(135deg, #7B2FBE, #C060E8)", border: "none", color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: font }}>
                {loading ? <i className="bi bi-hourglass-split" /> : <><i className="bi bi-credit-card" /> Issue card instantly</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhysicalCardModal({ onClose, onSubmit, userFullName, colors }) {
  const [step, setStep] = useState(1);
  const [design, setDesign] = useState("primary");
  const [form, setForm] = useState({ fullName: userFullName || "", phone: "", address: "", city: "", state: "", country: "Nigeria", idType: "NIN", idNumber: "", dob: "" });
  const [loading, setLoading] = useState(false);
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 12, border: `1px solid ${colors.border}`, fontSize: 14, background: colors.cardBg, color: colors.text, outline: "none", boxSizing: "border-box", fontFamily: font };

  const handleSubmit = async () => {
    const required = ["fullName", "phone", "address", "city", "state", "idNumber", "dob"];
    for (const k of required) {
      if (!form[k].trim()) { showNotification("SendNaw", `Please fill in ${k.replace(/([A-Z])/g, ' $1').toLowerCase()}`, "error"); return; }
    }
    setLoading(true);
    try {
      const res = await fetch("https://sendnawbackend.onrender.com/api/cards/physical_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ ...form, design }),
      });
      const data = await res.json();
      if (data.success) { onSubmit(); }
      else showNotification("SendNaw", data.message || "Request failed", "error");
    } catch { showNotification("SendNaw", "Network error", "error"); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "1rem", overflowY: "auto" }}>
      <div style={{ background: colors.cardBg, borderRadius: 28, padding: "1.8rem", width: "100%", maxWidth: 520, fontFamily: font, margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.text }}>Request physical card</h3>
            <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>Step {step} of 3 — {["Choose design", "Personal details", "Delivery address"][step - 1]}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: colors.textSecondary }}><i className="bi bi-x-lg" /></button>
        </div>

        <div style={{ height: 3, background: colors.border, borderRadius: 99, marginBottom: 24 }}>
          <div style={{ height: "100%", width: `${(step / 3) * 100}%`, background: "linear-gradient(90deg, #7B2FBE, #C060E8)", borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>

        {step === 1 && (
          <div>
            <DesignPicker selected={design} onChange={setDesign} holderName={userFullName} colors={colors} />
            <div style={{ marginTop: 16, background: `${colors.info}15`, borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
              <i className="bi bi-info-circle" style={{ color: colors.info, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: colors.info, lineHeight: 1.5 }}>Physical cards are delivered within 7–14 business days. A delivery fee applies.</span>
            </div>
            <button onClick={() => setStep(2)} style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: 40, background: "linear-gradient(135deg, #7B2FBE, #C060E8)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: font }}>
              Continue <i className="bi bi-arrow-right" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Full legal name</label>
              <input style={inputStyle} value={form.fullName} onChange={e => up("fullName", e.target.value)} placeholder="As on your ID" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Phone number</label>
              <input style={inputStyle} value={form.phone} onChange={e => up("phone", e.target.value)} placeholder="+234 000 000 0000" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Date of birth</label>
              <input style={inputStyle} type="date" value={form.dob} onChange={e => up("dob", e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Government ID type</label>
              <select style={inputStyle} value={form.idType} onChange={e => up("idType", e.target.value)}>
                <option value="NIN">National Identification Number (NIN)</option>
                <option value="BVN">Bank Verification Number (BVN)</option>
                <option value="Passport">International Passport</option>
                <option value="DriversLicense">Driver's License</option>
                <option value="VotersCard">Voter's Card</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>{form.idType} number</label>
              <input style={inputStyle} value={form.idNumber} onChange={e => up("idNumber", e.target.value)} placeholder="Enter your ID number" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", borderRadius: 40, background: colors.cardBg, border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: "pointer", fontFamily: font }}>
                <i className="bi bi-arrow-left" /> Back
              </button>
              <button onClick={() => { if (!form.fullName || !form.phone || !form.idNumber || !form.dob) { showNotification("SendNaw", "Fill all fields", "error"); return; } setStep(3); }} style={{ flex: 2, padding: "12px", borderRadius: 40, background: "linear-gradient(135deg, #7B2FBE, #C060E8)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: font }}>
                Continue <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Delivery address</label>
              <input style={inputStyle} value={form.address} onChange={e => up("address", e.target.value)} placeholder="Street address, house number" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>City</label>
                <input style={inputStyle} value={form.city} onChange={e => up("city", e.target.value)} placeholder="Lagos" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>State</label>
                <input style={inputStyle} value={form.state} onChange={e => up("state", e.target.value)} placeholder="Lagos State" />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 4 }}>Country</label>
              <select style={inputStyle} value={form.country} onChange={e => up("country", e.target.value)}>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Germany</option>
                <option>France</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ background: colors.lightGray, borderRadius: 14, padding: "14px" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: colors.text, margin: "0 0 8px" }}>Delivery summary</p>
              <div style={{ fontSize: 12, color: colors.textSecondary, lineHeight: 1.7 }}>
                <div>📦 7–14 business days</div>
                <div>💳 {CARD_DESIGNS.find(d => d.id === design)?.name}</div>
                <div>📍 {form.city || "—"}, {form.state || "—"}, {form.country}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: "12px", borderRadius: 40, background: colors.cardBg, border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: "pointer", fontFamily: font }}>
                <i className="bi bi-arrow-left" /> Back
              </button>
              <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "12px", borderRadius: 40, background: "linear-gradient(135deg, #7B2FBE, #C060E8)", border: "none", color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: font }}>
                {loading ? <i className="bi bi-hourglass-split" /> : <><i className="bi bi-send" /> Submit request</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NewCardModal({ cardData, onClose, colors }) {
  const [copied, setCopied] = useState({});
  const copy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(p => ({ ...p, [field]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [field]: false })), 2000);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: colors.cardBg, borderRadius: 28, padding: "1.8rem", width: "100%", maxWidth: 420, fontFamily: font, textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#10B98120", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <i className="bi bi-check-circle-fill" style={{ fontSize: 28, color: "#10B981" }} />
        </div>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: colors.text }}>Card issued!</h3>
        <p style={{ fontSize: 13, color: colors.textSecondary, margin: "0 0 20px" }}>Save these details — they won't be shown again.</p>

        {[{ label: "Card number", value: cardData.card_number, field: "number" }, { label: "CVV", value: cardData.cvv, field: "cvv" }, { label: "Expiry", value: cardData.expiry, field: "expiry" }].map(({ label, value, field }) => (
          <div key={field} style={{ background: colors.lightGray, borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
            <div>
              <div style={{ fontSize: 10, color: colors.textSecondary, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: colors.text, letterSpacing: "0.05rem" }}>{value}</div>
            </div>
            <button onClick={() => copy(value, field)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7B2FBE", fontSize: 16 }}>
              <i className={`bi ${copied[field] ? "bi-check-lg" : "bi-copy"}`} />
            </button>
          </div>
        ))}

        <div style={{ background: `${colors.warning}18`, borderRadius: 12, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 8, textAlign: "left" }}>
          <i className="bi bi-exclamation-triangle" style={{ color: colors.warning, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: colors.warning }}>Screenshot or note these details. We cannot retrieve your CVV later.</span>
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "13px", borderRadius: 40, background: "linear-gradient(135deg, #7B2FBE, #C060E8)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: font }}>
          I've saved my details
        </button>
      </div>
    </div>
  );
}

function FundModal({ onClose, onFund, loading, currency, colors }) {
  const [amount, setAmount] = useState("");
  const curr = CURRENCIES.find(c => c.code === currency) || CURRENCIES[1];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: colors.cardBg, borderRadius: 24, padding: "1.5rem", width: "100%", maxWidth: 380, fontFamily: font }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: colors.text }}>Add funds</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: colors.textSecondary }}><i className="bi bi-x-lg" /></button>
        </div>
        <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 6 }}>Amount ({curr.code})</label>
        <div style={{ position: "relative", marginBottom: 6 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: colors.textSecondary }}>{curr.symbol}</span>
          <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} autoFocus style={{ width: "100%", padding: "12px 12px 12px 36px", borderRadius: 12, border: `1px solid ${colors.border}`, fontSize: 16, outline: "none", background: colors.cardBg, color: colors.text, boxSizing: "border-box", fontFamily: font }} />
        </div>
        <p style={{ fontSize: 11, color: colors.textSecondary, margin: "0 0 20px", display: "flex", gap: 6 }}>
          <i className="bi bi-info-circle" /> Funds deducted from your {curr.code} wallet.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 40, background: colors.cardBg, border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: "pointer", fontFamily: font }}>Cancel</button>
          <button onClick={() => { const n = parseFloat(amount); if (!n || n <= 0) { showNotification("SendNaw", "Enter a valid amount", "error"); return; } onFund(n); }} disabled={loading} style={{ flex: 2, padding: "11px", borderRadius: 40, background: "#10B981", border: "none", color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: font }}>
            {loading ? <i className="bi bi-hourglass-split" /> : "Fund card"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CvvModal({ cvv, onClose, colors }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: colors.cardBg, borderRadius: 24, padding: "1.5rem", width: "100%", maxWidth: 300, textAlign: "center", fontFamily: font }}>
        <i className="bi bi-shield-lock" style={{ fontSize: 32, color: "#7B2FBE" }} />
        <h3 style={{ margin: "8px 0 4px", fontSize: 16, fontWeight: 700, color: colors.text }}>Card CVV</h3>
        <p style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 12 }}>Never share this with anyone</p>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "0.4rem", color: colors.text, margin: "12px 0" }}>{cvv}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={() => { navigator.clipboard.writeText(cvv); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ flex: 1, padding: "9px", borderRadius: 40, background: "#7B2FBE", border: "none", color: "#fff", cursor: "pointer", fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <i className={`bi ${copied ? "bi-check-lg" : "bi-copy"}`} /> {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: "9px", borderRadius: 40, background: colors.cardBg, border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: "pointer", fontFamily: font }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function VirtualCard() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [showCreateVirtual, setShowCreateVirtual] = useState(false);
  const [showPhysical, setShowPhysical] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [newCardData, setNewCardData] = useState(null);
  const [funding, setFunding] = useState(false);
  const [physicalSuccess, setPhysicalSuccess] = useState(false);

  const userFullName = localStorage.getItem("full_name") || localStorage.getItem("name") || "Card Holder";

  useEffect(() => { fetchCard(); }, []);

  const fetchCard = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://sendnawbackend.onrender.com/api/cards/details.php", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) setCard(data.card);
      else setCard(null);
    } catch { showNotification("SendNaw", "Network error", "error"); }
    setLoading(false);
  };

  const fundCard = async (amount) => {
    setFunding(true);
    try {
      const curr = card?.currency || "USD";
      const res = await fetch("https://sendnawbackend.onrender.com/api/cards/fund.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ amount, currency: curr }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", `${amount} added to your card`, "success");
        fetchCard();
        setShowFund(false);
      } else showNotification("SendNaw", data.message, "error");
    } catch { showNotification("SendNaw", "Network error", "error"); }
    setFunding(false);
  };

  const design = card?.design || "primary";
  const curr = CURRENCIES.find(c => c.code === (card?.currency || "USD")) || CURRENCIES[1];

  return (
    <div style={{ minHeight: "100vh", background: colors.darkBg, fontFamily: font, padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.4rem,5vw,1.8rem)", fontWeight: 700, color: colors.text, margin: 0 }}>My Cards</h2>
          <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>Virtual and physical cards for every currency</p>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ width: 32, height: 32, border: `3px solid ${colors.border}`, borderTop: `3px solid #7B2FBE`, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
            <p style={{ marginTop: "1rem", color: colors.textSecondary }}>Loading your card...</p>
          </div>
        )}

        {!loading && !card && (
          <EmptyCardState
            onCreateVirtual={() => setShowCreateVirtual(true)}
            onRequestPhysical={() => setShowPhysical(true)}
            colors={colors}
          />
        )}

        {!loading && card && (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div onClick={() => setFlipped(f => !f)} title="Tap to flip">
                <CardSVG
                  design={design}
                  holderName={card.holder_name || userFullName}
                  cardNumber={card.card_number}
                  expiry={formatExpiry(card.expiry_month, card.expiry_year)}
                  masked
                  flipped={flipped}
                />
              </div>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
                <i className="bi bi-hand-index" /> Tap card to flip
              </p>
            </div>

            <div style={{ background: colors.cardBg, borderRadius: 20, padding: "1.25rem", border: `1px solid ${colors.border}`, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>Available balance</p>
                  <p style={{ fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 800, color: "#10B981", margin: 0 }}>
                    {curr.symbol}{parseFloat(card.balance || 0).toFixed(2)}
                  </p>
                  <p style={{ fontSize: 11, color: colors.textSecondary, margin: 0 }}>
                    <img src={curr.flag} alt={curr.code} style={{ width: 20, height: 14, objectFit: "cover", borderRadius: 2, marginRight: 4 }} /> {curr.code} · Virtual
                  </p>
                </div>
                <div style={{ background: card.status === "active" ? "#10B98120" : "#F8717120", borderRadius: 40, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: card.status === "active" ? "#10B981" : "#F87171" }}>
                  {card.status === "active" ? "● Active" : "● Inactive"}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[
                  { icon: "bi-plus-circle", label: "Add funds", action: () => setShowFund(true), bg: "#10B981" },
                  { icon: "bi-eye", label: "Show CVV", action: () => setShowCvv(true), bg: "#7B2FBE" },
                  { icon: "bi-clipboard", label: "Copy number", action: () => { navigator.clipboard.writeText(card.card_number || ""); showNotification("SendNaw", "Card number copied", "success"); }, bg: "#3B82F6" },
                ].map(({ icon, label, action, bg }) => (
                  <button key={label} onClick={action} style={{
                    padding: "10px 4px", borderRadius: 14, border: "none",
                    background: `${bg}18`, color: bg, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontFamily: font,
                    transition: "background 0.15s",
                  }}>
                    <i className={`bi ${icon}`} style={{ fontSize: 20 }} />
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: colors.cardBg, borderRadius: 16, padding: "1rem 1.25rem", border: `1px solid ${colors.border}`, marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Card details</p>
              {[
                { label: "Card number", value: maskCardNumber(card.card_number) },
                { label: "Expiry", value: formatExpiry(card.expiry_month, card.expiry_year) },
                { label: "Card type", value: "Virtual Debit" },
                { label: "Network", value: CARD_DESIGNS.find(d => d.id === design)?.network || "VISA" },
                { label: "Currency", value: <><img src={curr.flag} alt={curr.code} style={{ width: 20, height: 14, objectFit: "cover", borderRadius: 2, marginRight: 4 }} /> {curr.code} ({curr.name})</> },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text, display: "flex", alignItems: "center", gap: 4 }}>{value}</span>
                </div>
              ))}
            </div>

            <div onClick={() => setShowPhysical(true)} style={{
              background: `linear-gradient(135deg, #7B2FBE18, #C060E818)`,
              borderRadius: 16, padding: "1rem 1.25rem", border: `1px solid #7B2FBE33`,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 12,
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#7B2FBE20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="bi bi-credit-card" style={{ fontSize: 20, color: "#7B2FBE" }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>Want a physical card?</p>
                  <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>Order a real card delivered to you</p>
                </div>
              </div>
              <i className="bi bi-arrow-right" style={{ color: "#7B2FBE" }} />
            </div>

            <div style={{ background: colors.cardBg, borderRadius: 14, padding: "12px 14px", border: `1px solid ${colors.border}`, fontSize: 12, color: colors.textSecondary, display: "flex", gap: 8 }}>
              <i className="bi bi-shield-check" style={{ color: "#10B981", flexShrink: 0 }} />
              Use your virtual card for secure online payments worldwide. Never share your CVV with anyone.
            </div>
          </>
        )}

        {physicalSuccess && (
          <div style={{ background: "#10B98115", border: "1px solid #10B98140", borderRadius: 16, padding: "1rem 1.25rem", marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <i className="bi bi-check-circle-fill" style={{ color: "#10B981", fontSize: 20, flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.text }}>Physical card requested!</p>
              <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>We'll process your request and deliver within 7–14 business days.</p>
            </div>
          </div>
        )}

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @media (max-width: 480px) {
            .action-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>

      {showCreateVirtual && (
        <CreateVirtualModal
          onClose={() => setShowCreateVirtual(false)}
          onCreated={(data) => { setNewCardData(data); setShowCreateVirtual(false); fetchCard(); }}
          userFullName={userFullName}
          colors={colors}
        />
      )}
      {showPhysical && (
        <PhysicalCardModal
          onClose={() => setShowPhysical(false)}
          onSubmit={() => { setShowPhysical(false); setPhysicalSuccess(true); }}
          userFullName={userFullName}
          colors={colors}
        />
      )}
      {showFund && card && (
        <FundModal
          onClose={() => setShowFund(false)}
          onFund={fundCard}
          loading={funding}
          currency={card.currency || "USD"}
          colors={colors}
        />
      )}
      {showCvv && card && (
        <CvvModal cvv={card.cvv} onClose={() => setShowCvv(false)} colors={colors} />
      )}
      {newCardData && (
        <NewCardModal cardData={newCardData} onClose={() => setNewCardData(null)} colors={colors} />
      )}
    </div>
  );
}