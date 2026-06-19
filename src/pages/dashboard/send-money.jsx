import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#F3F0FF",
  cardBg: "#FFFFFF",
  text: "#1A0060",
  textSecondary: "#7B6FAE",
  textMuted: "#9B8FCC",
  border: "#E0D8FF",
  borderLight: "#F0EBFF",
  inputBg: "#FAFAFF",
  accent: "#5B2EDB",
  accentLight: "#F0EBFF",
  accentGrad: "linear-gradient(135deg, #5B2EDB 0%, #7B4FEE 100%)",
  success: "#2DBE8C",
  error: "#D93025",
  errorLight: "#FFF1F1",
  errorBorder: "#FFB4B4",
  green: "#2DBE8C",
  greenLight: "#F0FDF8",
  gray: "#9B8FCC",
  purple: "#5B2EDB",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  textMuted: "#6B6B8F",
  border: "#3D2E5A",
  borderLight: "#2A2440",
  inputBg: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  accentGrad: "linear-gradient(135deg, #8A5CF7 0%, #A78BFA 100%)",
  success: "#34D399",
  error: "#F87171",
  errorLight: "#3B1E1E",
  errorBorder: "#7F1D1D",
  green: "#34D399",
  greenLight: "#064E3B",
  gray: "#6B7280",
  purple: "#A78BFA",
};

const FLAG = (cc) => `https://flagcdn.com/w40/${cc}.png`;
const CURRENCIES = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", cc: "ng" },
  { code: "USD", name: "US Dollar", symbol: "$", cc: "us" },
  { code: "GBP", name: "British Pound", symbol: "£", cc: "gb" },
  { code: "EUR", name: "Euro", symbol: "€", cc: "eu" },
];
const SEND_TYPES = [
  { value: "tag", label: "Tag", icon: "bi-at", placeholder: "e.g. john_doe" },
  {
    value: "account",
    label: "Account",
    icon: "bi-bank2",
    placeholder: "10-digit account number",
  },
  {
    value: "phone",
    label: "Phone",
    icon: "bi-telephone-fill",
    placeholder: "2348012345678",
    hint: "Include country code (e.g. 234…)",
  },
];
const QUICK = [500, 1000, 5000, 10000];
const API = "https://sendnawtechnologies.infinityfree.io/api/transfers";
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const AV_COLORS = [
  "#7B5EA7",
  "#3D9BE9",
  "#E67E4D",
  "#2DBE8C",
  "#E84393",
  "#F5A623",
];
const avColor = (n) => AV_COLORS[(n?.charCodeAt(0) || 0) % AV_COLORS.length];
const initials = (n) =>
  n
    ? n
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

function Avatar({ name, image, size = 38 }) {
  const [imgError, setImgError] = useState(false);
  if (image && !imgError)
    return (
      <img
        src={image}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
        onError={() => setImgError(true)}
      />
    );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: avColor(name),
        color: "#fff",
        fontSize: size * 0.35,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function FlagImg({ cc, size = 22 }) {
  return (
    <img
      src={FLAG(cc)}
      alt={cc}
      style={{
        width: size,
        height: size * 0.67,
        objectFit: "cover",
        borderRadius: 3,
        flexShrink: 0,
      }}
      onError={(e) => (e.target.style.display = "none")}
    />
  );
}

function CurrencySelect({ value, onChange, disabled, colors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const cur = CURRENCIES.find((c) => c.code === value);
  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 10px",
          background: colors.inputBg,
          border: `1.5px solid ${colors.border}`,
          borderRadius: 11,
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
        disabled={disabled}
      >
        <FlagImg cc={cur.cc} size={20} />
        <span style={{ fontWeight: 700, fontSize: 13, color: colors.text }}>
          {cur.code}
        </span>
        <i
          className="bi bi-chevron-down"
          style={{ fontSize: 10, color: colors.textSecondary }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            background: colors.cardBg,
            border: `1.5px solid ${colors.border}`,
            borderRadius: 12,
            boxShadow: `0 8px 24px rgba(91,46,219,.12)`,
            zIndex: 100,
            minWidth: 220,
            overflow: "hidden",
          }}
        >
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                width: "100%",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                color: colors.text,
                background:
                  c.code === value ? colors.accentLight : "transparent",
              }}
            >
              <FlagImg cc={c.cc} size={20} />
              <span style={{ fontWeight: 600, fontSize: 13 }}>{c.code}</span>
              <span
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginLeft: "auto",
                }}
              >
                {c.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SendMoney() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [sendType, setSendType] = useState("tag");
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txError, setTxError] = useState("");
  const [done, setDone] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientAvatar, setRecipientAvatar] = useState("");
  const [lookupErr, setLookupErr] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [saveBene, setSaveBene] = useState(false);
  const debounce = useRef(null);

  const cur = CURRENCIES.find((c) => c.code === currency);
  const amtN = parseFloat(amount) || 0;
  const canGo =
    identifier.trim() && !lookupErr && amtN > 0 && recipientName && !lookingUp;
  const st = SEND_TYPES.find((t) => t.value === sendType);

  useEffect(() => {
    fetch(`${API}/beneficiaries.php`, { headers: auth() })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBeneficiaries(d.beneficiaries || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    clearTimeout(debounce.current);
    setRecipientName("");
    setRecipientAvatar("");
    setLookupErr("");
    if (!identifier.trim()) return;
    debounce.current = setTimeout(() => {
      identifier.trim().length >= 3
        ? doLookup()
        : setLookupErr("Enter at least 3 characters");
    }, 600);
    return () => clearTimeout(debounce.current);
  }, [identifier, sendType]);

  const doLookup = async () => {
    setLookingUp(true);
    try {
      const r = await fetch(
        `${API}/lookup.php?type=${sendType}&identifier=${encodeURIComponent(identifier.trim())}`,
        { headers: auth() },
      );
      const d = await r.json();
      if (d.success) {
        setRecipientName(d.full_name);
        setRecipientAvatar(d.avatar_url || "");
        setLookupErr("");
      } else {
        setLookupErr(d.message || "Not found");
        setRecipientName("");
        setRecipientAvatar("");
      }
    } catch {
      setLookupErr("Network error");
    } finally {
      setLookingUp(false);
    }
  };

  const pickBene = (b) => {
    setSendType(b.send_type || "tag");
    setIdentifier(b.identifier);
    setRecipientName(b.full_name);
    setRecipientAvatar(b.avatar_url || "");
    setLookupErr("");
  };

  const handleSend = async () => {
    setLoading(true);
    setTxError("");
    const epMap = {
      tag: "send_by_tag.php",
      account: "send_by_account.php",
      phone: "send_by_phone.php",
    };
    const bodyMap = {
      tag: { tag: identifier.trim(), amount: amtN, currency },
      account: { account_number: identifier.trim(), amount: amtN, currency },
      phone: { phone_number: identifier.trim(), amount: amtN, currency },
    };
    try {
      const r = await fetch(`${API}/${epMap[sendType]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify(bodyMap[sendType]),
      });
      const d = await r.json();
      if (d.success) {
        if (saveBene && recipientName) {
          fetch(`${API}/beneficiaries.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...auth() },
            body: JSON.stringify({
              full_name: recipientName,
              identifier: identifier.trim(),
              send_type: sendType,
              avatar_url: recipientAvatar,
            }),
          }).catch(() => {});
        }
        showNotification(
          "SendNaw",
          `Sent ${currency} ${amtN} to ${recipientName || identifier}`,
        );
        setDone(true);
      } else {
        setTxError(d.message || "Transfer failed");
        setStep(1);
      }
    } catch {
      setTxError("Something went wrong. Please try again.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: colors.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12px 12px 48px",
          fontFamily: "'DM Sans','Nunito','Segoe UI',sans-serif",
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 100,
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: "40px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            color: colors.text,
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <i
            className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
          />{" "}
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: colors.cardBg,
            borderRadius: 20,
            boxShadow: "0 6px 32px rgba(91,46,219,.13)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "36px 20px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: `${colors.accent}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: "50%",
                  background: colors.accentGrad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-check-lg"
                  style={{ color: "#fff", fontSize: 26 }}
                />
              </div>
            </div>
            <h2
              style={{
                margin: "16px 0 4px",
                fontSize: 22,
                fontWeight: 900,
                color: colors.text,
              }}
            >
              Transfer Successful!
            </h2>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: 13,
                color: colors.textSecondary,
                textAlign: "center",
              }}
            >
              Your money is on its way to {recipientName || identifier}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: colors.accentGrad,
                borderRadius: 14,
                padding: "16px 28px",
                marginBottom: 18,
              }}
            >
              <FlagImg cc={cur.cc} size={26} />
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-.03em",
                }}
              >
                {cur.symbol}
                {amtN.toLocaleString("en", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                background: colors.inputBg,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 14,
                padding: "2px 14px",
                marginBottom: 18,
              }}
            >
              {[
                ["Recipient", recipientName || identifier],
                ["Method", st?.label],
                ["Currency", `${cur.code} – ${cur.name}`],
                ["Fee", "₦0.00 (Free ✓)"],
                ["Status", "✅ Completed"],
              ].map(([k, v], i, a) => (
                <div key={k}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>
                      {k}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color:
                          k === "Fee" || k === "Status"
                            ? colors.success
                            : colors.text,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                  {i < a.length - 1 && (
                    <div
                      style={{ height: 1, background: colors.borderLight }}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                width: "100%",
                padding: "13px",
                background: colors.accentGrad,
                color: "#fff",
                border: "none",
                borderRadius: 13,
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: `0 4px 16px ${colors.accent}55`,
              }}
            >
              <i className="bi bi-house-fill" /> Back to Dashboard
            </button>
            <button
              onClick={() => {
                setDone(false);
                setStep(1);
                setIdentifier("");
                setAmount("");
                setRecipientName("");
                setRecipientAvatar("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                padding: "11px",
                background: "transparent",
                color: colors.textSecondary,
                border: "none",
                borderRadius: 13,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Send to someone else
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "11px 16px",
              borderTop: `1px solid ${colors.borderLight}`,
              fontSize: 11,
              color: colors.textSecondary,
              fontWeight: 600,
              background: colors.inputBg,
            }}
          >
            <i
              className="bi bi-shield-lock-fill"
              style={{ color: colors.accent }}
            />{" "}
            End-to-end encrypted & secured
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 12px 48px",
        fontFamily: "'DM Sans','Nunito','Segoe UI',sans-serif",
        position: "relative",
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 100,
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
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
        }}
      >
        <i
          className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
        />{" "}
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: colors.cardBg,
          borderRadius: 20,
          boxShadow: "0 6px 32px rgba(91,46,219,.13)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: colors.accentGrad,
            color: "#fff",
            padding: "9px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          <i className="bi bi-stars" style={{ color: "#FFD700" }} />
          <span>
            All transactions are <strong>completely free</strong> — no hidden
            charges, ever.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 16px 14px",
            borderBottom: `1px solid ${colors.borderLight}`,
          }}
        >
          <button
            onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
            style={{
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
            }}
          >
            <i className="bi bi-chevron-left" style={{ fontSize: 15 }} />
          </button>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                color: colors.text,
                lineHeight: 1.2,
              }}
            >
              Send Money
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: colors.textSecondary,
                marginTop: 1,
              }}
            >
              {step === 1 ? "Enter recipient details" : "Review & confirm"}
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
                background: step === 2 ? colors.accent : colors.border,
                transition: "all .3s",
              }}
            />
          </div>
        </div>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canGo) setStep(2);
            }}
            style={{
              padding: "16px 16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {beneficiaries.length > 0 && (
              <div>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
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
                  {beneficiaries.slice(0, 6).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => pickBene(b)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                        background: colors.accentLight,
                        border: `1.5px solid ${colors.border}`,
                        borderRadius: 12,
                        padding: "8px 12px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <Avatar
                        name={b.full_name}
                        image={b.avatar_url}
                        size={34}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: colors.text,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {b.full_name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Send via
              </p>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {SEND_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      setSendType(t.value);
                      setIdentifier("");
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      padding: "8px 4px",
                      background:
                        sendType === t.value
                          ? colors.accent
                          : colors.accentLight,
                      border: `1.5px solid ${sendType === t.value ? colors.accent : colors.border}`,
                      borderRadius: 10,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        sendType === t.value ? "#fff" : colors.textSecondary,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <i className={`bi ${t.icon}`} style={{ fontSize: 13 }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {st?.label}
              </p>
              <div style={{ position: "relative" }}>
                <i
                  className={`bi ${st?.icon}`}
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: colors.textMuted,
                    fontSize: 14,
                    zIndex: 1,
                  }}
                />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={st?.placeholder}
                  required
                  autoComplete="off"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "10px 36px 10px 34px",
                    background: colors.inputBg,
                    border: `1.5px solid ${lookupErr ? colors.error : recipientName ? colors.success : colors.border}`,
                    borderRadius: 11,
                    fontSize: 13,
                    color: colors.text,
                    fontFamily: "inherit",
                    transition: "border-color .2s",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {lookingUp && (
                    <i
                      className="bi bi-arrow-repeat"
                      style={{
                        color: colors.textMuted,
                        animation: "spin .8s linear infinite",
                      }}
                    />
                  )}
                  {!lookingUp && recipientName && (
                    <i
                      className="bi bi-check-circle-fill"
                      style={{ color: colors.success }}
                    />
                  )}
                </span>
              </div>
              {st?.hint && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 11,
                    color: colors.textSecondary,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <i className="bi bi-info-circle" /> {st.hint}
                </p>
              )}
              {recipientName && !lookupErr && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: colors.greenLight,
                    border: `1.5px solid ${colors.greenBorder || colors.border}`,
                    borderRadius: 10,
                    padding: "9px 12px",
                    marginTop: 4,
                  }}
                >
                  <Avatar
                    name={recipientName}
                    image={recipientAvatar}
                    size={32}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 13,
                        color: colors.text,
                      }}
                    >
                      {recipientName}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        color: colors.textSecondary,
                      }}
                    >
                      Verified ✓
                    </p>
                  </div>
                </div>
              )}
              {lookupErr && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 12,
                    color: colors.error,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <i className="bi bi-exclamation-circle-fill" /> {lookupErr}
                </p>
              )}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Amount
              </p>
              <div style={{ display: "flex", gap: 8, position: "relative" }}>
                <CurrencySelect
                  value={currency}
                  onChange={setCurrency}
                  disabled={loading}
                  colors={colors}
                />
                <div style={{ position: "relative", flex: 1 }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 11,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontWeight: 700,
                      color: colors.textMuted,
                      fontSize: 14,
                      pointerEvents: "none",
                    }}
                  >
                    {cur.symbol}
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 10px 10px 26px",
                      background: colors.inputBg,
                      border: `1.5px solid ${colors.border}`,
                      borderRadius: 11,
                      fontSize: 16,
                      fontWeight: 800,
                      color: colors.text,
                      fontFamily: "inherit",
                    }}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 6,
                }}
              >
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q.toString())}
                    style={{
                      padding: "5px 11px",
                      background:
                        parseFloat(amount) === q
                          ? colors.accent
                          : colors.accentLight,
                      border: `1.5px solid ${parseFloat(amount) === q ? colors.accent : colors.border}`,
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 700,
                      color: parseFloat(amount) === q ? "#fff" : colors.accent,
                      cursor: "pointer",
                    }}
                  >
                    {cur.symbol}
                    {q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            {recipientName && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
                onClick={() => setSaveBene((v) => !v)}
              >
                <div
                  style={{
                    width: 38,
                    height: 20,
                    borderRadius: 99,
                    position: "relative",
                    background: saveBene ? colors.accent : colors.border,
                    transition: "background .25s",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      width: 16,
                      height: 16,
                      borderRadius: 99,
                      background: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,.2)",
                      transition: "left .25s",
                      left: saveBene ? 18 : 2,
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: colors.textSecondary }}>
                  Save <strong>{recipientName.split(" ")[0]}</strong> as
                  beneficiary for next time
                </span>
              </div>
            )}
            {txError && (
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: colors.error,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <i className="bi bi-x-circle-fill" /> {txError}
              </p>
            )}
            <button
              type="submit"
              disabled={!canGo}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                width: "100%",
                padding: "13px",
                background: colors.accentGrad,
                color: "#fff",
                border: "none",
                borderRadius: 13,
                fontSize: 14,
                fontWeight: 800,
                cursor: canGo ? "pointer" : "not-allowed",
                opacity: canGo ? 1 : 0.45,
                boxShadow: `0 4px 16px ${colors.accent}55`,
                letterSpacing: ".01em",
              }}
            >
              Continue{" "}
              <i className="bi bi-arrow-right-short" style={{ fontSize: 18 }} />
            </button>
          </form>
        )}

        {step === 2 && (
          <div
            style={{
              padding: "16px 16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: colors.accentLight,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 14,
                padding: "14px 14px",
              }}
            >
              <Avatar name={recipientName} image={recipientAvatar} size={44} />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  {recipientName}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: colors.textSecondary,
                    marginTop: 2,
                  }}
                >
                  <i className={`bi ${st?.icon}`} /> {st?.label} · {identifier}
                </p>
              </div>
              <i
                className="bi bi-patch-check-fill"
                style={{ color: colors.accent, fontSize: 18 }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                background: colors.accentGrad,
                borderRadius: 16,
                padding: "22px 16px",
                color: "#fff",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 12,
                  color: "rgba(255,255,255,.8)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                You're sending
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <FlagImg cc={cur.cc} size={28} />
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-.03em",
                  }}
                >
                  {cur.symbol}
                  {amtN.toLocaleString("en", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                {cur.name}
              </p>
            </div>
            <div
              style={{
                background: colors.inputBg,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 14,
                padding: "2px 14px",
              }}
            >
              {[
                { icon: "bi-send", label: "Transfer method", val: st?.label },
                {
                  icon: "bi-person",
                  label: "To",
                  val: recipientName || identifier,
                },
                {
                  icon: "bi-wallet2",
                  label: "Currency",
                  val: `${cur.code}`,
                  extra: <FlagImg cc={cur.cc} size={16} />,
                },
                {
                  icon: "bi-gift",
                  label: "Transaction fee",
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
                        color: colors.textSecondary,
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
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {row.extra}
                      {row.val}
                    </span>
                  </div>
                  {i < a.length - 1 && (
                    <div
                      style={{ height: 1, background: colors.borderLight }}
                    />
                  )}
                </div>
              ))}
            </div>
            {txError && (
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
                <i className="bi bi-exclamation-triangle-fill" /> {txError}
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                width: "100%",
                padding: "13px",
                background: colors.accentGrad,
                color: "#fff",
                border: "none",
                borderRadius: 13,
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <i
                    className="bi bi-arrow-repeat"
                    style={{ animation: "spin .8s linear infinite" }}
                  />{" "}
                  Sending…
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill" /> Send {cur.symbol}
                  {amtN.toLocaleString()}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setTxError("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                padding: "11px",
                background: "transparent",
                color: colors.textSecondary,
                border: "none",
                borderRadius: 13,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
              disabled={loading}
            >
              <i className="bi bi-pencil" /> Edit details
            </button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "11px 16px",
            borderTop: `1px solid ${colors.borderLight}`,
            fontSize: 11,
            color: colors.textSecondary,
            fontWeight: 600,
            background: colors.inputBg,
          }}
        >
          <i
            className="bi bi-shield-lock-fill"
            style={{ color: colors.accent }}
          />{" "}
          Your transaction is end-to-end encrypted & secured
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; } input[type=number] { -moz-appearance: textfield; } input:focus, select:focus { outline:none; border-color:${colors.accent} !important; box-shadow: 0 0 0 3px ${colors.accent}20; }`}</style>
    </div>
  );
}
