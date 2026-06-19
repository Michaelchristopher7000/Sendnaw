import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Bootstrap Icons – ensure it's loaded once (safe to keep)
if (
  !document.querySelector(
    `link[href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"]`,
  )
) {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
  document.head.appendChild(l);
}

const API = "https://sendnawtechnologies.infinityfree.io/api/bills";
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ── Light & Dark Theme Definitions ─────────────────────────────────────────
const lightTheme = {
  bg: "#F3F0FF",
  cardBg: "#FFFFFF",
  text: "#1A0060",
  textSub: "#7B6FAE",
  textMuted: "#9B8FCC",
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
  greenLight: "#F0FDF8",
  greenBorder: "#A7F3D0",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSub: "#A8A4C0",
  textMuted: "#6B6B8F",
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
  greenLight: "#064E3B",
  greenBorder: "#065F46",
};

// ── Biller metadata (unchanged) ───────────────────────────────────────────
const BILLER_META = {
  "ikeja-electric": {
    label: "Ikeja Electric",
    color: "#F97316",
    light: "#FFF7ED",
    text: "#9A3412",
    logo: "/Backend/assets/logos/ikeja.png",
  },
  "eko-electric": {
    label: "Eko Electric",
    color: "#DC2626",
    light: "#FEF2F2",
    text: "#991B1B",
    logo: "/Backend/assets/logos/eko.png",
  },
  "abuja-electric": {
    label: "Abuja Electric",
    color: "#0891B2",
    light: "#ECFEFF",
    text: "#155E75",
    logo: "/Backend/assets/logos/abuja.png",
  },
  dstv: {
    label: "DSTV",
    color: "#7C3AED",
    light: "#F5F3FF",
    text: "#4C1D95",
    logo: "/Backend/assets/logos/dstv.png",
  },
  gotv: {
    label: "GOTV",
    color: "#EAB308",
    light: "#FEFCE8",
    text: "#854D0E",
    logo: "/Backend/assets/logos/gotv.png",
  },
  startimes: {
    label: "StarTimes",
    color: "#14B8A6",
    light: "#F0FDFA",
    text: "#134E4A",
    logo: "/Backend/assets/logos/startimes.png",
  },
};

const getMeta = (name = "") => {
  const key = Object.keys(BILLER_META).find((k) =>
    name.toLowerCase().includes(k.toLowerCase()),
  );
  return key
    ? { ...BILLER_META[key], key }
    : {
        label: name,
        color: "#5B2EDB",
        light: "#F0EBFF",
        text: "#3D1F9E",
        logo: null,
        key: null,
      };
};

// ── Logo component (receives colors via props, but uses meta colors for logo) ──
function BillerLogo({ meta, size = 40 }) {
  const [err, setErr] = useState(false);
  if (meta.logo && !err) {
    const imgUrl = `http://localhost:3000${meta.logo}`;
    return (
      <img
        src={imgUrl}
        alt={meta.label}
        onError={() => setErr(true)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          borderRadius: 8,
          flexShrink: 0,
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
        background: meta.color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: `0 3px 10px ${meta.color}55`,
      }}
    >
      {meta.label[0]}
    </div>
  );
}

const BILL_TYPES = [
  {
    value: "electricity",
    label: "Electricity",
    icon: "bi-lightning-charge-fill",
    placeholder: "Meter Number",
    field: "meter_number",
  },
  {
    value: "tv",
    label: "TV Subscription",
    icon: "bi-tv-fill",
    placeholder: "Smartcard Number",
    field: "smartcard_number",
  },
];

export default function Bills() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ hook inside component
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [billType, setBillType] = useState("electricity");
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelected] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingProviders, setFetchingProviders] = useState(true);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    setFetchingProviders(true);
    fetch(`${API}/providers.php?type=${billType}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProviders(d.providers || []);
      })
      .catch(() => {})
      .finally(() => setFetchingProviders(false));
  }, [billType]);

  const validateAccount = async () => {
    if (!selectedProvider || !accountNumber) return;
    setValidating(true);
    setTimeout(() => {
      setCustomerName(`Customer ${accountNumber.slice(-4)}`);
      setValidating(false);
    }, 500);
  };

  useEffect(() => {
    if (selectedProvider && accountNumber.length >= 6) {
      validateAccount();
    } else {
      setCustomerName("");
    }
  }, [selectedProvider, accountNumber]);

  const currentType = BILL_TYPES.find((t) => t.value === billType);
  const meta = selectedProvider ? getMeta(selectedProvider.name) : null;
  const amtN = parseFloat(amount) || 0;
  const canContinue =
    selectedProvider && accountNumber.trim().length >= 6 && amtN > 0;

  const saveBeneficiary = async () => {
    if (!selectedProvider) return;
    try {
      await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/transfers/beneficiaries.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...auth() },
          body: JSON.stringify({
            full_name: `${selectedProvider.name} – ${accountNumber}`,
            identifier: accountNumber.trim(),
            send_type: "account",
            avatar_url: meta?.logo ? `http://localhost:3000${meta.logo}` : null,
          }),
        },
      );
    } catch (err) {
      console.error("Failed to save beneficiary", err);
    }
  };

  const handleSend = async () => {
    setLoading(true);
    setErrMsg("");
    const body = {
      type: billType,
      provider_id: parseInt(selectedProvider.id),
      amount: amtN,
    };
    if (billType === "electricity") body.meter_number = accountNumber;
    else body.smartcard_number = accountNumber;

    try {
      const res = await fetch(`${API}/purchase.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (d.success) {
        await saveBeneficiary();
        showNotification(
          "SendNaw",
          `${billType.toUpperCase()} payment of ₦${amtN} successful!`,
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
    setSelected(null);
    setAccountNumber("");
    setAmount("");
    setErrMsg("");
    setCustomerName("");
  };

  // Helper to get dynamic styles
  const getStyles = (colors) => ({
    page: {
      minHeight: "100vh",
      background: colors.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "12px 12px 48px",
      fontFamily: "'DM Sans','Nunito','Segoe UI',sans-serif",
      position: "relative",
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
    subtitle: { margin: 0, fontSize: 11, color: colors.textSub, marginTop: 1 },
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
      padding: "11px 10px 11px 34px",
      background: colors.inputBg,
      border: `1.5px solid ${colors.borderDark}`,
      borderRadius: 11,
      fontSize: 14,
      color: colors.text,
      fontFamily: "inherit",
      transition: "border-color .2s",
    },
    customerCard: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: colors.greenLight,
      border: `1.5px solid ${colors.greenBorder}`,
      borderRadius: 10,
      padding: "9px 12px",
      marginTop: 4,
      color: colors.text,
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

    amtHero: {
      borderRadius: 16,
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    sumVal: { fontSize: 13, fontWeight: 700, color: colors.text },
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
      background: `linear-gradient(135deg, ${meta?.color}, ${meta?.color}BB)`,
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
      position: "fixed",
      top: "1rem",
      right: "1rem",
      zIndex: 100,
      background: colors.cardBg,
      border: `1px solid ${colors.borderDark}`,
      borderRadius: "40px",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      color: colors.text,
      fontWeight: 600,
      fontSize: 13,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  });

  const styles = getStyles(colors);

  if (done) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successWrap}>
            <div style={styles.successRing}>
              <div style={styles.successCircle}>
                <i
                  className="bi bi-check-lg"
                  style={{ color: "#fff", fontSize: 26 }}
                />
              </div>
            </div>
            <h2 style={styles.successTitle}>Bill Paid!</h2>
            <p style={styles.successSub}>
              ₦{amtN.toLocaleString()} paid successfully
            </p>
            <div style={styles.networkBadge}>
              <BillerLogo meta={meta} size={30} />
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
                  {billType === "electricity" ? "Electricity" : "TV"}
                </p>
              </div>
            </div>
            <div style={styles.receipt}>
              {[
                ["Account", accountNumber],
                ["Provider", selectedProvider.name],
                ["Amount", `₦${amtN.toLocaleString()}`],
                ["Fee", "₦0.00 (Free ✓)"],
                ["Status", "✅ Successful"],
              ].map(([k, v], i, a) => (
                <div key={k}>
                  <div style={styles.receiptRow}>
                    <span style={styles.rKey}>{k}</span>
                    <span
                      style={{
                        ...styles.rVal,
                        color:
                          k === "Fee" || k === "Status"
                            ? colors.success
                            : undefined,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={styles.div} />}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              style={styles.primaryBtn}
            >
              <i className="bi bi-house-fill" /> Back to Dashboard
            </button>
            <button onClick={reset} style={styles.ghostBtn}>
              Pay Another Bill
            </button>
          </div>
          <div style={styles.e2eFooter}>
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

  return (
    <div style={styles.page}>
      {/* Theme toggle button (floating) */}
      <button onClick={toggleTheme} style={styles.themeToggle}>
        <i
          className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
        />
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <div style={styles.card}>
        <div style={styles.freeBanner}>
          <i className="bi bi-stars" style={{ color: "#FFD700" }} />
          <span>
            Bill payments are <strong>completely free</strong> — no service
            charges, ever.
          </span>
        </div>

        <div style={styles.header}>
          <button
            onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
            style={styles.backBtn}
          >
            <i className="bi bi-chevron-left" style={{ fontSize: 15 }} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={styles.title}>Pay Bills</h1>
            <p style={styles.subtitle}>
              {step === 1 ? "Enter bill details" : "Review & confirm"}
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
          <div style={styles.body}>
            {/* Bill type tabs */}
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Bill Type</p>
              <div style={{ display: "flex", gap: 8 }}>
                {BILL_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      setBillType(t.value);
                      setSelected(null);
                      setAccountNumber("");
                      setCustomerName("");
                    }}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 12,
                      border: `1.5px solid ${billType === t.value ? colors.accent : colors.borderDark}`,
                      background:
                        billType === t.value
                          ? colors.accentLight
                          : colors.inputBg,
                      color:
                        billType === t.value ? colors.accent : colors.textSub,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <i className={`bi ${t.icon}`} style={{ fontSize: 16 }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Providers */}
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Provider</p>
              {fetchingProviders ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={styles.shimmerChip} />
                  ))}
                </div>
              ) : (
                <div style={styles.networkRow}>
                  {providers.map((p) => {
                    const m = getMeta(p.name);
                    const active = selectedProvider?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelected(p);
                          setCustomerName("");
                        }}
                        style={styles.networkChip(active, m)}
                      >
                        <BillerLogo meta={m} size={38} />
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

            {/* Account number */}
            <div style={styles.field}>
              <p style={styles.fieldLabel}>{currentType?.placeholder}</p>
              <div style={{ position: "relative" }}>
                <i
                  className={`bi ${billType === "electricity" ? "bi-lightning-charge" : "bi-tv"}`}
                  style={styles.inIcon}
                />
                <input
                  type="text"
                  placeholder={`Enter ${currentType?.placeholder}`}
                  value={accountNumber}
                  onChange={(e) =>
                    setAccountNumber(e.target.value.replace(/\D/g, ""))
                  }
                  style={styles.input}
                />
              </div>
              {validating && (
                <p style={styles.hint}>
                  <i className="bi bi-arrow-repeat spin" /> Validating
                  account...
                </p>
              )}
              {customerName && !validating && (
                <div style={styles.customerCard}>
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: 20, color: colors.success }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: colors.text,
                    }}
                  >
                    {customerName}
                  </span>
                </div>
              )}
            </div>

            {/* Amount */}
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Amount (₦)</p>
              <div style={{ position: "relative" }}>
                <span style={styles.amtSym}>₦</span>
                <input
                  type="number"
                  step="0.01"
                  min="50"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={styles.amtInput}
                />
              </div>
            </div>

            {errMsg && (
              <p style={styles.errTxt}>
                <i className="bi bi-exclamation-circle-fill" /> {errMsg}
              </p>
            )}

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canContinue}
              style={{
                ...styles.primaryBtn,
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
          <div style={styles.body}>
            <div
              style={{
                ...styles.amtHero,
                background: `linear-gradient(135deg, ${meta.color}F0, ${meta.color}99)`,
              }}
            >
              <BillerLogo meta={meta} size={54} />
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
                {selectedProvider.name}
              </p>
              <span style={styles.heroAmt}>
                ₦{amtN.toLocaleString("en", { minimumFractionDigits: 2 })}
              </span>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                {billType === "electricity" ? "Meter" : "Smartcard"}:{" "}
                {accountNumber}
              </p>
            </div>

            <div style={styles.summaryCard}>
              {[
                {
                  icon:
                    billType === "electricity"
                      ? "bi-lightning-charge"
                      : "bi-tv",
                  label: "Account",
                  val: accountNumber,
                },
                {
                  icon: "bi-building",
                  label: "Provider",
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
                  <div style={styles.sumRow}>
                    <span style={styles.sumKey}>
                      <i className={`bi ${row.icon}`} /> {row.label}
                    </span>
                    <span
                      style={{
                        ...styles.sumVal,
                        color: row.color || colors.text,
                      }}
                    >
                      {row.val}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={styles.div} />}
                </div>
              ))}
            </div>

            {errMsg && (
              <div style={styles.errBanner}>
                <i className="bi bi-exclamation-triangle-fill" /> {errMsg}
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                ...styles.primaryBtn,
                background: `linear-gradient(135deg, ${meta.color}, ${meta.color}BB)`,
                boxShadow: `0 4px 16px ${meta.color}55`,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-repeat spin" /> Processing…
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle" /> Pay ₦
                  {amtN.toLocaleString()}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setErrMsg("");
              }}
              style={styles.ghostBtn}
              disabled={loading}
            >
              <i className="bi bi-pencil" /> Edit details
            </button>
          </div>
        )}

        <div style={styles.e2eFooter}>
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
        input:focus { outline: none; border-color: ${colors.accent} !important; box-shadow: 0 0 0 3px ${colors.accent}20; }
      `}</style>
    </div>
  );
}
