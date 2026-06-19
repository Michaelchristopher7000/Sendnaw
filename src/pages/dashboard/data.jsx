import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Bootstrap Icons – ensure it's loaded (safe to keep)
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
  planActiveBg: "linear-gradient(135deg,#5B2EDB,#7B4FEE)",
  planInactiveBg: "#FAFAFF",
  planActiveText: "#fff",
  planInactiveText: "#1A0060",
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
  planActiveBg: "linear-gradient(135deg,#8A5CF7,#A78BFA)",
  planInactiveBg: "#2A2440",
  planActiveText: "#fff",
  planInactiveText: "#F1F5F9",
};

// ── Network logos (unchanged) ─────────────────────────────────────────────
const NETWORK_LOGOS = {
  MTN: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwjat3xtaDo4U_TvA6mlCZy4bsf0xzzjBMZg&s",
  Airtel:
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo-01.png",
  Glo: "https://static.wikia.nocookie.net/logopedia/images/9/97/Globacom_Limited_Logo.svg/revision/latest/scale-to-width-down/280?cb=20211101154505",
  "9mobile":
    "https://yt3.googleusercontent.com/icAbOVtXyDtwOwtDjXJG_rJt4EMX-1T4164ZU-DLkYyQFi9bFArzMki5txJz3SKL4qH6rvbK-YY=s900-c-k-c0x00ffffff-no-rj",
};
const getLogo = (name) => {
  const key = Object.keys(NETWORK_LOGOS).find((k) =>
    name.toLowerCase().includes(k.toLowerCase()),
  );
  return key ? NETWORK_LOGOS[key] : null;
};

// Phone number to network detection (unchanged)
const detectNetwork = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (
    /^(0803|0806|0703|0706|0810|0813|0814|0816|0903|0906|0913|0916)/.test(
      digits,
    )
  )
    return "MTN";
  if (/^(0805|0807|0705|0811|0815|0905|0915)/.test(digits)) return "Glo";
  if (/^(0802|0808|0701|0708|0812|0901|0902|0904|0907|0912)/.test(digits))
    return "Airtel";
  if (/^(0809|0709|0817|0818|0909|0910)/.test(digits)) return "9mobile";
  return null;
};

export default function Data() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ hook inside component
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProviders, setFetchingProviders] = useState(true);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [detectedNetwork, setDetectedNetwork] = useState(null);

  // Fetch providers and beneficiaries
  useEffect(() => {
    const load = async () => {
      try {
        const [provRes, beneRes] = await Promise.all([
          fetch(`${API}/providers.php?type=data`),
          fetch(
            "https://sendnawtechnologies.infinityfree.io/api/transfers/beneficiaries.php",
            { headers: auth() },
          ),
        ]);
        const provData = await provRes.json();
        if (provData.success) setProviders(provData.providers || []);
        const beneData = await beneRes.json();
        if (beneData.success) {
          const phoneBenes = (beneData.beneficiaries || []).filter(
            (b) => b.send_type === "phone",
          );
          setBeneficiaries(phoneBenes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingProviders(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (phone) {
      const network = detectNetwork(phone);
      setDetectedNetwork(network);
      if (network && providers.length > 0) {
        const matched = providers.find(
          (p) => p.name.toLowerCase() === network.toLowerCase(),
        );
        if (
          matched &&
          (!selectedProvider || selectedProvider.id !== matched.id)
        ) {
          setSelectedProvider(matched);
          setSelectedPlan(null);
          setAmount("");
        }
      }
    } else {
      setDetectedNetwork(null);
    }
  }, [phone, providers]);

  useEffect(() => {
    if (selectedProvider) {
      fetch(`${API}/variations.php?provider_id=${selectedProvider.id}`, {
        headers: auth(),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setAvailablePlans(data.variations);
          else setAvailablePlans([]);
        })
        .catch((err) => console.error(err));
    } else {
      setAvailablePlans([]);
    }
  }, [selectedProvider]);

  const pickPlan = (plan) => {
    setSelectedPlan(plan);
    setAmount(plan.amount.toString());
  };

  const canContinue =
    selectedProvider &&
    phone.trim().length >= 10 &&
    selectedPlan &&
    parseFloat(amount) > 0 &&
    parseFloat(amount) === selectedPlan.amount;

  const handleSubmit = async () => {
    setLoading(true);
    setErrMsg("");
    if (!selectedPlan) {
      setErrMsg("Please select a data plan.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API}/purchase.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify({
          type: "data",
          provider_id: parseInt(selectedProvider.id),
          phone_number: phone.trim(),
          amount: parseFloat(amount),
          variation_code: selectedPlan.variation_code,
        }),
      });
      const d = await res.json();
      if (d.success) {
        const fullName = `${selectedProvider.name} Data`;
        const avatarUrl = getLogo(selectedProvider.name) || "";
        await fetch(
          "https://sendnawtechnologies.infinityfree.io/api/transfers/beneficiaries.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json", ...auth() },
            body: JSON.stringify({
              full_name: fullName,
              identifier: phone.trim(),
              send_type: "phone",
              avatar_url: avatarUrl,
            }),
          },
        ).catch(() => {});
        showNotification("SendNaw", `Data purchase of ₦${amount} successful!`);
        setDone(true);
      } else {
        setErrMsg(d.message || "Purchase failed");
        setStep(1);
      }
    } catch (err) {
      console.error(err);
      setErrMsg("Network error. Try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const pickBeneficiary = (b) => {
    setPhone(b.identifier);
    const providerName = b.full_name.replace(" Data", "");
    const match = providers.find(
      (p) => p.name.toLowerCase() === providerName.toLowerCase(),
    );
    if (match) setSelectedProvider(match);
    setSelectedPlan(null);
    setAmount("");
    setStep(1);
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
    sectionLabel: {
      margin: "0 0 8px",
      fontSize: 11,
      fontWeight: 700,
      color: colors.textMuted,
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
      fontSize: 11,
      fontWeight: 700,
      color: colors.text,
      whiteSpace: "nowrap",
    },
    networkBadge: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderRadius: 99,
      padding: "8px 14px",
      width: "fit-content",
      margin: "0 auto",
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
      background: `${colors.accent}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    successCircle: {
      width: 62,
      height: 62,
      borderRadius: "50%",
      background: colors.accentGradient,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
    div: { height: 1, background: colors.border },
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

  const S = getStyles(colors);

  // Success screen (uses dynamic styles)
  if (done) {
    const logo = selectedProvider ? getLogo(selectedProvider.name) : null;
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
            <h2 style={S.successTitle}>Data Purchased!</h2>
            <p style={S.successSub}>
              {selectedPlan ? selectedPlan.label : `₦${amount}`} sent to {phone}
            </p>
            <div
              style={{
                ...S.networkBadge,
                background: colors.accentLight,
                marginBottom: 18,
              }}
            >
              {logo && (
                <img
                  src={logo}
                  alt={selectedProvider?.name}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
              )}
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  marginLeft: 8,
                  color: colors.text,
                }}
              >
                {selectedProvider?.name}
              </span>
            </div>
            <div style={S.receipt}>
              {[
                ["Phone", phone],
                ["Bundle", selectedPlan ? selectedPlan.label : "Custom"],
                ["Amount", `₦${parseFloat(amount).toLocaleString()}`],
                ["Fee", "₦0.00 (Free ✓)"],
                [
                  "Status",
                  <i className="bi bi-check-circle-fill" />,
                  " Successful",
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
                      {v}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={S.div} />}
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/dashboard")} style={S.primaryBtn}>
              <i className="bi bi-house-fill" /> Back to Dashboard
            </button>
            <button
              onClick={() => {
                setDone(false);
                setStep(1);
                setPhone("");
                setAmount("");
                setSelectedPlan(null);
              }}
              style={S.ghostBtn}
            >
              Buy Again
            </button>
          </div>
          <div style={S.e2eFooter}>
            <i
              className="bi bi-shield-lock-fill"
              style={{ color: colors.accent }}
            />{" "}
            Your transaction is end-to-end encrypted & secured
          </div>
        </div>
      </div>
    );
  }

  // Main component
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
            All data purchases are <strong>completely free</strong> — no service
            charges, ever.
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
            <h1 style={S.title}>Buy Data</h1>
            <p style={S.subtitle}>
              {step === 1
                ? "Choose a plan & enter details"
                : "Review your purchase"}
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
                    const logo = b.avatar_url;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => pickBeneficiary(b)}
                        style={S.beneChip}
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt={b.full_name}
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              objectFit: "contain",
                              background: colors.accentLight,
                              padding: 5,
                            }}
                          />
                        ) : (
                          <i
                            className="bi bi-person-circle"
                            style={{ fontSize: 30, color: colors.accent }}
                          />
                        )}
                        <span style={S.beneChipTxt}>
                          {b.full_name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Network selector */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Select Network</p>
              {fetchingProviders ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 72,
                        height: 76,
                        borderRadius: 12,
                        background: `linear-gradient(90deg, ${colors.shimmer.start} 25%, ${colors.shimmer.mid} 50%, ${colors.shimmer.end} 75%)`,
                        backgroundSize: "400px 100%",
                        animation: "shimmer 1.2s infinite",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {providers.map((p) => {
                    const logo = getLogo(p.name);
                    const active = selectedProvider?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedProvider(p);
                          setSelectedPlan(null);
                          setAmount("");
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "10px 12px",
                          borderRadius: 12,
                          cursor: "pointer",
                          minWidth: 72,
                          background: active
                            ? colors.accentLight
                            : colors.inputBg,
                          border: active
                            ? `2px solid ${colors.accent}`
                            : `1.5px solid ${colors.borderDark}`,
                        }}
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt={p.name}
                            style={{
                              width: 36,
                              height: 36,
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 36,
                              background: colors.borderDark,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 16,
                              fontWeight: 700,
                              color: colors.accent,
                            }}
                          >
                            {p.name[0]}
                          </div>
                        )}
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: active ? colors.accent : colors.textSub,
                            marginTop: 4,
                          }}
                        >
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              {detectedNetwork &&
                selectedProvider &&
                selectedProvider.name !== detectedNetwork && (
                  <p
                    style={{
                      fontSize: 11,
                      color: colors.warning,
                      marginTop: 4,
                    }}
                  >
                    <i className="bi bi-info-circle" /> Detected network:{" "}
                    {detectedNetwork}. You can change it above.
                  </p>
                )}
              {detectedNetwork && !selectedProvider && (
                <p
                  style={{ fontSize: 11, color: colors.success, marginTop: 4 }}
                >
                  <i className="bi bi-check-circle" /> Network detected:{" "}
                  {detectedNetwork}. Waiting for you to select a plan.
                </p>
              )}
            </div>

            {/* Quick plans */}
            {selectedProvider && availablePlans.length > 0 && (
              <div style={S.field}>
                <p style={S.fieldLabel}>Quick Plans</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 8,
                  }}
                >
                  {availablePlans.map((plan, idx) => {
                    const active =
                      selectedPlan?.variation_code === plan.variation_code;
                    return (
                      <button
                        key={`${plan.variation_code}_${idx}`}
                        type="button"
                        onClick={() => pickPlan(plan)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "12px 8px",
                          borderRadius: 12,
                          cursor: "pointer",
                          background: active
                            ? colors.planActiveBg
                            : colors.planInactiveBg,
                          border: active
                            ? `2px solid ${colors.accent}`
                            : `1.5px solid ${colors.borderDark}`,
                          color: active
                            ? colors.planActiveText
                            : colors.planInactiveText,
                        }}
                      >
                        <span style={{ fontSize: 16, fontWeight: 900 }}>
                          {plan.label}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            marginTop: 6,
                            color: active ? "#FFD700" : colors.accent,
                          }}
                        >
                          ₦{plan.amount.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Amount (disabled when plan selected) */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Amount (NGN)</p>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontWeight: 700,
                    color: colors.textSub,
                  }}
                >
                  ₦
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedPlan(null);
                  }}
                  disabled={!!selectedPlan}
                  style={{
                    width: "100%",
                    padding: "10px 10px 10px 26px",
                    background: selectedPlan
                      ? colors.shimmer.mid
                      : colors.inputBg,
                    border: `1.5px solid ${colors.borderDark}`,
                    borderRadius: 11,
                    fontSize: 16,
                    fontWeight: 800,
                    color: selectedPlan ? colors.textSub : colors.text,
                  }}
                />
              </div>
            </div>

            {/* Phone number */}
            <div style={S.field}>
              <p style={S.fieldLabel}>Phone Number</p>
              <div style={{ position: "relative" }}>
                <i
                  className="bi bi-telephone-fill"
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: colors.textSub,
                    fontSize: 14,
                  }}
                />
                <input
                  type="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 10px 10px 36px",
                    background: colors.inputBg,
                    border: `1.5px solid ${colors.borderDark}`,
                    borderRadius: 11,
                    fontSize: 13,
                    color: colors.text,
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: colors.textSub,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <i className="bi bi-info-circle" /> Enter the number you want to
                recharge
              </p>
            </div>

            {errMsg && (
              <p
                style={{
                  fontSize: 12,
                  color: colors.error,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
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
            <div
              style={{
                borderRadius: 16,
                padding: "22px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: colors.accentGradient,
              }}
            >
              {getLogo(selectedProvider?.name) && (
                <img
                  src={getLogo(selectedProvider?.name)}
                  alt={selectedProvider?.name}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "contain",
                    marginBottom: 8,
                    background: "rgba(255,255,255,.15)",
                    borderRadius: 48,
                    padding: 6,
                  }}
                />
              )}
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 12,
                  color: "rgba(255,255,255,.8)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {selectedProvider?.name} · {selectedPlan?.label}
              </p>
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-.03em",
                }}
              >
                ₦
                {parseFloat(amount).toLocaleString("en", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                One‑time purchase
              </p>
            </div>

            <div
              style={{
                background: colors.inputBg,
                border: `1.5px solid ${colors.borderDark}`,
                borderRadius: 14,
                padding: "2px 14px",
              }}
            >
              {[
                {
                  icon: "bi-telephone-fill",
                  label: "Phone number",
                  val: phone,
                },
                {
                  icon: "bi-wifi",
                  label: "Network",
                  val: selectedProvider?.name,
                },
                {
                  icon: "bi-archive",
                  label: "Bundle",
                  val: selectedPlan ? selectedPlan.label : "Custom amount",
                },
                {
                  icon: "bi-gift",
                  label: "Service fee",
                  val: "₦0.00 (Free)",
                  color: colors.success,
                },
              ].map((row, i, a) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: colors.textSub,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <i className={`bi ${row.icon}`} /> {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: row.color || colors.text,
                      }}
                    >
                      {row.val}
                    </span>
                  </div>
                  {i < a.length - 1 && <div style={S.div} />}
                </div>
              ))}
            </div>

            {errMsg && (
              <div
                style={{
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
                }}
              >
                <i className="bi bi-exclamation-triangle-fill" /> {errMsg}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ ...S.primaryBtn, opacity: loading ? 0.7 : 1 }}
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
                  <i className="bi bi-wifi" /> Buy Data
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
          />{" "}
          Your transaction is end-to-end encrypted & secured
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        input[type=number]::-webkit-inner-spin-button{display:none}
        input:focus{outline:none;border-color:${colors.accent}!important;box-shadow:0 0 0 3px ${colors.accent}20}
      `}</style>
    </div>
  );
}
