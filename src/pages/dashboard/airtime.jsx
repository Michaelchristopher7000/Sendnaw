import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Bootstrap Icons link – ensure it's added once (already in index.html, safe to keep)
if (
  !document.querySelector(
    `link[href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"]`,
  )
) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
  document.head.appendChild(link);
}

const API = "https://sendnawbackend.onrender.com/api/bills";
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Theme definitions (light / dark) ────────────────────────────────────────
const lightTheme = {
  bg: "#F3F0FF",
  cardBg: "#FFFFFF",
  text: "#1A0060",
  textSub: "#7B6FAE",
  border: "#F0EBFF",
  borderDark: "#E0D8FF",
  inputBg: "#FAFAFF",
  accent: "#5B2EDB",
  accentLight: "#F0EBFF",
  accentGradient: "linear-gradient(135deg,#5B2EDB 0%,#7B4FEE 100%)",
  success: "#2DBE8C",
  error: "#D93025",
  errorLight: "#FFF1F1",
  errorBorder: "#FFB4B4",
  shimmer: { start: "#F0EBFF", mid: "#E8E0FF", end: "#F0EBFF" },
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSub: "#A8A4C0",
  border: "#2A2440",
  borderDark: "#3D2E5A",
  inputBg: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  accentGradient: "linear-gradient(135deg,#8A5CF7 0%,#A78BFA 100%)",
  success: "#34D399",
  error: "#F87171",
  errorLight: "#3B1E1E",
  errorBorder: "#7F1D1D",
  shimmer: { start: "#2A2440", mid: "#3D2E5A", end: "#2A2440" },
};

// ── Network metadata (unchanged) ────────────────────────────────────────────
const NETWORK_META = {
  mtn: {
    label: "MTN",
    color: "#FFC107",
    light: "#FFF8E1",
    text: "#7A5800",
    logo: "https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg",
  },
  airtel: {
    label: "Airtel",
    color: "#E53935",
    light: "#FFEBEE",
    text: "#B71C1C",
    logo: "https://img.utdstc.com/icon/cf2/f6f/cf2f6f629a750b9fab7ee689ea55c4466f743e48a449ae1c4a63cb6fdc9f41b8:600",
  },
  glo: {
    label: "Glo",
    color: "#2E7D32",
    light: "#E8F5E9",
    text: "#1B5E20",
    logo: "https://static.wikia.nocookie.net/logopedia/images/9/97/Globacom_Limited_Logo.svg/revision/latest/scale-to-width-down/280?cb=20211101154505",
  },
  "9mobile": {
    label: "9mobile",
    color: "#00897B",
    light: "#E0F2F1",
    text: "#004D40",
    logo: "https://yt3.googleusercontent.com/icAbOVtXyDtwOwtDjXJG_rJt4EMX-1T4164ZU-DLkYyQFi9bFArzMki5txJz3SKL4qH6rvbK-YY=s900-c-k-c0x00ffffff-no-rj",
  },
};

const getMeta = (name = "") => {
  const key = Object.keys(NETWORK_META).find((k) =>
    name.toLowerCase().includes(k.toLowerCase()),
  );
  return key
    ? { ...NETWORK_META[key], key }
    : {
        label: name,
        color: "#5B2EDB",
        light: "#F0EBFF",
        text: "#3D1F9E",
        logo: null,
        key: null,
      };
};

const detectNetwork = (phone) => {
  const d = phone.replace(/\D/g, "");
  const local = d.startsWith("234") && d.length === 13 ? "0" + d.slice(3) : d;
  const pfx = local.slice(0, 4);
  if (
    [
      "0803",
      "0806",
      "0703",
      "0706",
      "0810",
      "0813",
      "0814",
      "0816",
      "0903",
      "0906",
      "0913",
      "0916",
    ].includes(pfx)
  )
    return "mtn";
  if (
    [
      "0802",
      "0808",
      "0701",
      "0708",
      "0812",
      "0901",
      "0902",
      "0904",
      "0907",
      "0912",
    ].includes(pfx)
  )
    return "airtel";
  if (["0805", "0807", "0705", "0811", "0815", "0905", "0915"].includes(pfx))
    return "glo";
  if (["0809", "0709", "0817", "0818", "0909", "0910"].includes(pfx))
    return "9mobile";
  return null;
};

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

function NetworkLogo({ meta, size = 40 }) {
  const [imgErr, setImgErr] = useState(false);
  if (meta?.logo && !imgErr) {
    return (
      <img
        src={meta.logo}
        alt={meta.label}
        onError={() => setImgErr(true)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          borderRadius: 8,
          flexShrink: 0,
          background: "#fff",
          padding: size > 30 ? 4 : 2,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: meta?.color || "#5B2EDB",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: `0 3px 10px ${meta?.color || "#5B2EDB"}55`,
      }}
    >
      {(meta?.label || "?")[0].toUpperCase()}
    </div>
  );
}

export default function Airtime() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ hook inside component
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelected] = useState(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [done, setDone] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    fetch(`${API}/providers.php?type=airtime`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProviders(d.providers || []);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  useEffect(() => {
    fetch(
      "https://sendnawbackend.onrender.com/api/transfers/beneficiaries.php",
      { headers: auth() },
    )
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setBeneficiaries(
            (d.beneficiaries || []).filter((b) => b.send_type === "phone"),
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 7 && providers.length) {
      const detected = detectNetwork(phone);
      if (detected) {
        const match = providers.find((p) =>
          p.name.toLowerCase().includes(detected),
        );
        if (match) {
          setSelected(match);
          setAutoDetected(true);
          return;
        }
      }
    }
    setAutoDetected(false);
  }, [phone, providers]);

  const meta = selectedProvider ? getMeta(selectedProvider.name) : null;
  const amtN = parseFloat(amount) || 0;
  const canContinue = selectedProvider && phone.trim().length >= 10 && amtN > 0;

  const saveBeneficiary = async () => {
    if (!selectedProvider || !meta) return;
    try {
      await fetch(
        "https://sendnawbackend.onrender.com/api/transfers/beneficiaries.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth() },
          body: JSON.stringify({
            full_name: `${selectedProvider.name} – ${phone.trim()}`,
            identifier: phone.trim(),
            send_type: "phone",
          }),
        },
      );
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/transfers/beneficiaries.php",
        { headers: auth() },
      );
      const data = await res.json();
      if (data.success) {
        setBeneficiaries(
          (data.beneficiaries || []).filter((b) => b.send_type === "phone"),
        );
      }
    } catch {}
  };

  const pickBeneficiary = (b) => {
    setPhone(b.identifier);
    const detected = detectNetwork(b.identifier);
    if (detected) {
      const match = providers.find((p) =>
        p.name.toLowerCase().includes(detected),
      );
      if (match) setSelected(match);
    }
  };

  const handleSend = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch(`${API}/purchase.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify({
          type: "airtime",
          provider_id: parseInt(selectedProvider.id),
          phone_number: phone.trim(),
          amount: amtN,
        }),
      });
      const d = await res.json();
      if (d.success) {
        await saveBeneficiary();
        showNotification(
          "SendNaw",
          `₦${amtN.toLocaleString()} airtime sent to ${phone}`,
        );
        setDone(true);
      } else {
        setErrMsg(d.message || "Purchase failed");
        setStep(1);
      }
    } catch {
      setErrMsg("Network error. Try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setStep(1);
    setPhone("");
    setAmount("");
    setSelected(null);
    setErrMsg("");
    setAutoDetected(false);
  };

  // Dynamic styles (S is now a function that receives colors)
  const styles = (colors) => ({
    page: {
      minHeight: "100vh",
      background: colors.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px 12px 48px",
      fontFamily: "'DM Sans','Nunito','Segoe UI',sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: 420,
      background: colors.cardBg,
      borderRadius: 20,
      boxShadow: "0 6px 32px rgba(91,46,219,.13)",
      overflow: "hidden",
    },
    freeBanner: {
      background: colors.accentGradient,
      color: "#fff",
      padding: "9px 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      fontWeight: 500,
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "16px 16px 14px",
      borderBottom: `1px solid ${colors.border}`,
    },
    backBtn: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: colors.accentLight,
      border: "none",
      color: colors.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    },
    title: {
      margin: 0,
      fontSize: 17,
      fontWeight: 800,
      color: colors.text,
      lineHeight: 1.2,
    },
    subtitle: {
      margin: 0,
      fontSize: 11,
      color: colors.textSub,
      marginTop: 1,
    },
    body: {
      padding: "16px 16px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    field: { display: "flex", flexDirection: "column", gap: 6 },
    fieldLabel: {
      margin: 0,
      fontSize: 11,
      fontWeight: 700,
      color: colors.textSub,
      textTransform: "uppercase",
      letterSpacing: ".06em",
    },
    sectionLabel: {
      margin: "0 0 8px",
      fontSize: 11,
      fontWeight: 700,
      color: colors.textSub,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      display: "flex",
      alignItems: "center",
      gap: 5,
    },
    beneChip: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      background: colors.accentLight,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 12,
      padding: "8px 12px",
      cursor: "pointer",
      flexShrink: 0,
    },
    beneChipTxt: {
      fontSize: 10,
      fontWeight: 700,
      color: colors.text,
      whiteSpace: "nowrap",
      maxWidth: 60,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    inIcon: {
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.textSub,
      fontSize: 14,
      zIndex: 1,
    },
    input: {
      width: "100%",
      padding: "11px 130px 11px 34px",
      background: colors.inputBg,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 11,
      fontSize: 14,
      color: colors.text,
      fontFamily: "inherit",
      transition: "border-color .2s",
    },
    autoTag: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 9px",
      borderRadius: 99,
      border: "1.5px solid",
    },
    hint: {
      margin: 0,
      fontSize: 11,
      color: colors.textSub,
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    errTxt: {
      margin: 0,
      fontSize: 12,
      color: colors.error,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 5,
    },
    shimmerChip: {
      width: 76,
      height: 82,
      borderRadius: 12,
      flexShrink: 0,
      background: `linear-gradient(90deg, ${colors.shimmer.start} 25%, ${colors.shimmer.mid} 50%, ${colors.shimmer.end} 75%)`,
      backgroundSize: "400px 100%",
      animation: "shimmer 1.2s infinite",
    },
    networkRow: { display: "flex", gap: 8, flexWrap: "wrap" },
    networkChip: (active, m) => ({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 12px",
      borderRadius: 12,
      cursor: "pointer",
      flexShrink: 0,
      minWidth: 76,
      transition: "all .2s",
      background: active ? m.light : colors.inputBg,
      border: active
        ? `2px solid ${m.color}`
        : `1.5px solid ${colors.borderDark}`,
      boxShadow: active ? `0 0 0 3px ${m.color}22` : "none",
    }),
    amtSym: {
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      fontWeight: 700,
      color: colors.textSub,
      fontSize: 14,
      pointerEvents: "none",
    },
    amtInput: {
      width: "100%",
      padding: "11px 10px 11px 26px",
      background: colors.inputBg,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 11,
      fontSize: 22,
      fontWeight: 900,
      color: colors.text,
      fontFamily: "inherit",
    },
    quickRow: { display: "flex", gap: 6, flexWrap: "wrap" },
    quickBtn: (active) => ({
      padding: "5px 11px",
      background: active ? colors.accent : colors.accentLight,
      border: `1.5px solid ${active ? colors.accent : colors.borderDark}`,
      borderRadius: 99,
      fontSize: 12,
      fontWeight: 700,
      color: active ? "#fff" : colors.accent,
      cursor: "pointer",
    }),
    contextRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: colors.accentLight,
      borderRadius: 10,
      padding: "10px 12px",
    },
    amtHero: {
      borderRadius: 16,
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `linear-gradient(135deg,${meta?.color}F0,${meta?.color}99)`,
    },
    heroAmt: {
      fontSize: 36,
      fontWeight: 900,
      color: "#fff",
      letterSpacing: "-.03em",
      marginTop: 4,
    },
    summaryCard: {
      background: colors.inputBg,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 14,
      padding: "2px 14px",
    },
    sumRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "11px 0",
    },
    sumKey: {
      fontSize: 12,
      color: colors.textSub,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    sumVal: {
      fontSize: 13,
      fontWeight: 700,
      color: colors.text,
    },
    div: { height: 1, background: colors.border },
    errBanner: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: colors.errorLight,
      border: `1.5px solid ${colors.errorBorder}`,
      color: colors.error,
      padding: "11px 14px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 600,
    },
    primaryBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      width: "100%",
      padding: "13px",
      background: colors.accentGradient,
      color: "#fff",
      border: "none",
      borderRadius: 13,
      fontSize: 14,
      fontWeight: 800,
      cursor: "pointer",
      fontFamily: "inherit",
      boxShadow: `0 4px 16px ${colors.accent}55`,
      letterSpacing: ".01em",
    },
    ghostBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      width: "100%",
      padding: "11px",
      background: "transparent",
      color: colors.textSub,
      border: "none",
      borderRadius: 13,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
    },
    successWrap: {
      padding: "36px 20px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    successRing: {
      width: 84,
      height: 84,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `${meta?.color}22`,
    },
    successCircle: {
      width: 62,
      height: 62,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg,${meta?.color},${meta?.color}BB)`,
    },
    successTitle: {
      margin: "16px 0 4px",
      fontSize: 22,
      fontWeight: 900,
      color: colors.text,
    },
    successSub: {
      margin: "0 0 18px",
      fontSize: 13,
      color: colors.textSub,
      textAlign: "center",
    },
    networkBadge: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 18px",
      borderRadius: 14,
      background: meta?.light,
      border: `1.5px solid ${meta?.color}44`,
      marginBottom: 20,
    },
    receipt: {
      width: "100%",
      background: colors.inputBg,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 14,
      padding: "2px 14px",
      marginBottom: 18,
    },
    receiptRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
    },
    rKey: { fontSize: 12, color: colors.textSub },
    rVal: { fontSize: 13, fontWeight: 700, color: colors.text },
    e2eFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      padding: "11px 16px",
      borderTop: `1px solid ${colors.border}`,
      fontSize: 11,
      color: colors.textSub,
      fontWeight: 600,
      background: colors.inputBg,
    },
    themeToggle: {
      position: "absolute",
      top: 16,
      right: 16,
      background: colors.accentLight,
      border: `1px solid ${colors.borderDark}`,
      borderRadius: 30,
      padding: "6px 12px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      color: colors.text,
      zIndex: 10,
    },
  });

  const S = styles(colors);

  // Success view
  if (done) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <div style={S.successWrap}>
            <div style={S.successRing}>
              <div style={S.successCircle}>
                <i
                  className="bi bi-check-lg"
                  style={{ color: "#fff", fontSize: 26 }}
                />
              </div>
            </div>
            <h2 style={S.successTitle}>Airtime Sent!</h2>
            <p style={S.successSub}>
              ₦{amtN.toLocaleString()} delivered to {phone}
            </p>

            <div style={S.networkBadge}>
              <NetworkLogo meta={meta} size={32} />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 800,
                    color: meta.text,
                  }}
                >
                  {selectedProvider.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: meta.text,
                    opacity: 0.65,
                  }}
                >
                  Network
                </p>
              </div>
            </div>

            <div style={S.receipt}>
              {[
                ["Phone", phone],
                ["Network", selectedProvider.name],
                ["Amount", `₦${amtN.toLocaleString()}`],
                ["Fee", "₦0.00 (Free ✓)"],
                [
                  "Status",
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ color: colors.success }}
                  />,
                  " Delivered",
                ],
              ].map(([k, v], i, a) => (
                <div key={k}>
                  <div style={S.receiptRow}>
                    <span style={S.rKey}>{k}</span>
                    <span
                      style={{
                        ...S.rVal,
                        color:
                          k === "Fee" || k === "Status"
                            ? colors.success
                            : undefined,
                      }}
                    >
                      {typeof v === "string" ? v : v}
                      {v === " Delivered" ? v : ""}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={S.div} />}
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/dashboard")} style={S.primaryBtn}>
              <i className="bi bi-house-fill" /> Back to Dashboard
            </button>
            <button onClick={reset} style={S.ghostBtn}>
              Buy Again
            </button>
          </div>
          <div style={S.e2eFooter}>
            <i
              className="bi bi-shield-lock-fill"
              style={{ color: colors.accent }}
            />
            Your transaction is end-to-end encrypted & secured
          </div>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div style={S.page}>
      {/* Theme toggle button (floating) */}
      <button onClick={toggleTheme} style={S.themeToggle}>
        <i
          className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
        />
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <div style={S.card}>
        <div style={S.freeBanner}>
          <i className="bi bi-stars" style={{ color: "#FFD700" }} />
          <span>
            Airtime top-ups are <strong>always free</strong> — zero charges,
            ever.
          </span>
        </div>

        <div style={S.header}>
          <button
            onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
            style={S.backBtn}
          >
            <i className="bi bi-chevron-left" style={{ fontSize: 15 }} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={S.title}>Buy Airtime</h1>
            <p style={S.subtitle}>
              {step === 1 ? "Enter phone & amount" : "Review your top-up"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: step === 1 ? 20 : 8,
                height: 8,
                borderRadius: 99,
                background: colors.accent,
                transition: "all .3s",
              }}
            />
            <div
              style={{
                width: step === 2 ? 20 : 8,
                height: 8,
                borderRadius: 99,
                background: step === 2 ? colors.accent : colors.borderDark,
                transition: "all .3s",
              }}
            />
          </div>
        </div>

        {step === 1 && (
          <div style={S.body}>
            {/* Beneficiaries */}
            {beneficiaries.length > 0 && (
              <div>
                <p style={S.sectionLabel}>
                  <i className="bi bi-clock-history" /> Recent
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    paddingBottom: 2,
                  }}
                >
                  {beneficiaries.slice(0, 6).map((b) => {
                    const bMeta = getMeta(b.full_name);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => pickBeneficiary(b)}
                        style={S.beneChip}
                      >
                        <NetworkLogo meta={bMeta} size={34} />
                        <span style={S.beneChipTxt}>{b.identifier}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Phone */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Phone Number</p>
              <div style={{ position: "relative" }}>
                <i className="bi bi-telephone-fill" style={S.inIcon} />
                <input
                  type="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrMsg("");
                  }}
                  style={S.input}
                  inputMode="numeric"
                />
                {autoDetected && meta && (
                  <div
                    style={{
                      ...S.autoTag,
                      background: meta.light,
                      color: meta.text,
                      borderColor: meta.color,
                    }}
                  >
                    <NetworkLogo meta={meta} size={14} />
                    <span style={{ fontWeight: 800, fontSize: 10 }}>
                      {meta.label} detected
                    </span>
                  </div>
                )}
              </div>
              <p style={S.hint}>
                <i className="bi bi-magic" /> Network auto-detected as you type
              </p>
            </div>

            {/* Network chips */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Network</p>
              {fetching ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={S.shimmerChip} />
                  ))}
                </div>
              ) : (
                <div style={S.networkRow}>
                  {providers.map((p) => {
                    const m = getMeta(p.name);
                    const active = selectedProvider?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelected(p);
                          setAutoDetected(false);
                        }}
                        style={S.networkChip(active, m)}
                      >
                        <NetworkLogo meta={m} size={38} />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: active ? m.text : colors.textSub,
                            marginTop: 5,
                          }}
                        >
                          {m.label}
                        </span>
                        {active && (
                          <i
                            className="bi bi-check-circle-fill"
                            style={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              color: m.color,
                              fontSize: 13,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Amount */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Amount (₦)</p>
              <div style={{ position: "relative" }}>
                <span style={S.amtSym}>₦</span>
                <input
                  type="number"
                  step="1"
                  min="50"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={S.amtInput}
                  inputMode="numeric"
                />
              </div>
              <div style={S.quickRow}>
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q.toString())}
                    style={S.quickBtn(amtN === q)}
                  >
                    ₦{q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div style={S.contextRow}>
              {selectedProvider && meta ? (
                <NetworkLogo meta={meta} size={20} />
              ) : (
                <i
                  className="bi bi-person-fill"
                  style={{ color: colors.textSub, fontSize: 16 }}
                />
              )}
              <span style={{ fontSize: 12, color: colors.textSub, flex: 1 }}>
                Topping up{" "}
                <strong style={{ color: colors.text }}>
                  {phone || "your number"}
                </strong>
                {selectedProvider && (
                  <>
                    {" "}
                    via{" "}
                    <strong style={{ color: meta.text }}>
                      {selectedProvider.name}
                    </strong>
                  </>
                )}
              </span>
            </div>

            {errMsg && (
              <p style={S.errTxt}>
                <i className="bi bi-exclamation-circle-fill" /> {errMsg}
              </p>
            )}

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canContinue}
              style={{
                ...S.primaryBtn,
                opacity: canContinue ? 1 : 0.45,
                cursor: canContinue ? "pointer" : "not-allowed",
              }}
            >
              Continue{" "}
              <i className="bi bi-arrow-right-short" style={{ fontSize: 18 }} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={S.body}>
            <div style={S.amtHero}>
              <NetworkLogo meta={meta} size={54} />
              <p
                style={{
                  margin: "12px 0 2px",
                  fontSize: 11,
                  color: "rgba(255,255,255,.85)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                }}
              >
                {selectedProvider.name} Airtime
              </p>
              <span style={S.heroAmt}>
                ₦{amtN.toLocaleString("en", { minimumFractionDigits: 2 })}
              </span>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                to {phone}
              </p>
            </div>

            <div style={S.summaryCard}>
              {[
                {
                  icon: "bi-telephone-fill",
                  label: "Phone number",
                  val: phone,
                },
                {
                  icon: "bi-reception-4",
                  label: "Network",
                  val: selectedProvider.name,
                },
                {
                  icon: "bi-cash-coin",
                  label: "Amount",
                  val: `₦${amtN.toLocaleString()}`,
                },
                {
                  icon: "bi-gift",
                  label: "Service fee",
                  val: "₦0.00 (Free)",
                  color: colors.success,
                },
              ].map((row, i, a) => (
                <div key={i}>
                  <div style={S.sumRow}>
                    <span style={S.sumKey}>
                      <i className={`bi ${row.icon}`} /> {row.label}
                    </span>
                    <span
                      style={{ ...S.sumVal, color: row.color || colors.text }}
                    >
                      {row.val}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={S.div} />}
                </div>
              ))}
            </div>

            {errMsg && (
              <div style={S.errBanner}>
                <i className="bi bi-exclamation-triangle-fill" /> {errMsg}
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                ...S.primaryBtn,
                background: `linear-gradient(135deg,${meta.color},${meta.color}BB)`,
                boxShadow: `0 4px 16px ${meta.color}55`,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <i
                    className="bi bi-arrow-repeat"
                    style={{ animation: "spin .8s linear infinite" }}
                  />{" "}
                  Processing…
                </>
              ) : (
                <>
                  <i className="bi bi-phone-fill" /> Send ₦
                  {amtN.toLocaleString()} Airtime
                </>
              )}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setErrMsg("");
              }}
              style={S.ghostBtn}
              disabled={loading}
            >
              <i className="bi bi-pencil" /> Edit details
            </button>
          </div>
        )}

        <div style={S.e2eFooter}>
          <i
            className="bi bi-shield-lock-fill"
            style={{ color: colors.accent }}
          />
          Your transaction is end-to-end encrypted & secured
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        input:focus { outline:none; border-color:${colors.accent} !important; box-shadow:0 0 0 3px ${colors.accent}20; }
      `}</style>
    </div>
  );
}
