import { useState, useRef } from "react";
import { useAuth } from "../../context/authcontext";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// ─── Theme Definitions (match your layout) ──────────────────────────────────
const lightTheme = {
  bg: "#F4F1FF",
  cardBg: "#FFFFFF",
  text: "#120D2B",
  textSecondary: "#6B5FA0",
  border: "#E8E0FF",
  inputBg: "#FAFAFF",
  inputBorder: "#DDD5FF",
  inputFocusBorder: "#7C3AED",
  accent: "#7C3AED",
  accentSoft: "#EDE9FE",
  accentGrad: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
  danger: "#DC2626",
  dangerBg: "#FEF2F2",
  success: "#059669",
  successBg: "#ECFDF5",
  muted: "#9187B8",
  shimmer: "rgba(124,58,237,0.06)",
  footerBg: "#F8F5FF",
  shadow: "0 4px 24px rgba(124,58,237,0.10)",
  bankCardBg: "#FAFAFF",
  bankCardSelected: "#F0EBFF",
  bankCardBorder: "#E8E0FF",
  bankCardSelectedBorder: "#7C3AED",
  stepDone: "#7C3AED",
  stepActive: "#7C3AED",
  stepInactive: "#C4BBE8",
};

const darkTheme = {
  bg: "#080612",
  cardBg: "#110D20",
  text: "#EDE9FE",
  textSecondary: "#8B7FBB",
  border: "rgba(138,92,247,0.15)",
  inputBg: "#1A1530",
  inputBorder: "rgba(138,92,247,0.2)",
  inputFocusBorder: "#8A5CF7",
  accent: "#8A5CF7",
  accentSoft: "#1E1840",
  accentGrad: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
  danger: "#F87171",
  dangerBg: "rgba(248,113,113,0.08)",
  success: "#34D399",
  successBg: "rgba(52,211,153,0.08)",
  muted: "#6B5FA0",
  shimmer: "rgba(138,92,247,0.04)",
  footerBg: "#0D0A1C",
  shadow: "0 16px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(138,92,247,0.08)",
  bankCardBg: "#1A1530",
  bankCardSelected: "#221D40",
  bankCardBorder: "rgba(138,92,247,0.15)",
  bankCardSelectedBorder: "#8A5CF7",
  stepDone: "#8A5CF7",
  stepActive: "#8A5CF7",
  stepInactive: "rgba(138,92,247,0.25)",
};

// ─── Nigerian Banks List (full) ───────────────────────────────────────────
const ALL_BANKS = [
  {
    code: "044",
    name: "Access Bank",
    abbr: "AB",
    color: "#E30613",
    logo: "https://cdn.brandfetch.io/accessbankplc.com",
  },
  {
    code: "033",
    name: "UBA",
    abbr: "UBA",
    color: "#E31E24",
    logo: "https://cdn.brandfetch.io/ubagroup.com",
  },
  {
    code: "058",
    name: "GTBank",
    abbr: "GT",
    color: "#F76B1C",
    logo: "https://cdn.brandfetch.io/gtcoplc.com",
  },
  {
    code: "011",
    name: "First Bank",
    abbr: "FB",
    color: "#002D72",
    logo: "https://cdn.brandfetch.io/firstbanknigeria.com",
  },
  {
    code: "057",
    name: "Zenith Bank",
    abbr: "ZB",
    color: "#E30613",
    logo: "https://cdn.brandfetch.io/zenithbank.com",
  },
  {
    code: "070",
    name: "Fidelity Bank",
    abbr: "FD",
    color: "#006845",
    logo: "https://cdn.brandfetch.io/fidelitybank.ng",
  },
  {
    code: "035",
    name: "WEMA Bank",
    abbr: "WB",
    color: "#7B2D8B",
    logo: "https://cdn.brandfetch.io/wemabank.com",
  },
  {
    code: "032",
    name: "Union Bank",
    abbr: "UB",
    color: "#002F6C",
    logo: "https://cdn.brandfetch.io/unionbankng.com",
  },
  {
    code: "221",
    name: "Stanbic IBTC",
    abbr: "SI",
    color: "#0033A0",
    logo: "https://cdn.brandfetch.io/stanbicibtcbank.com",
  },
  {
    code: "090110",
    name: "Kuda Bank",
    abbr: "KD",
    color: "#430098",
    logo: "https://cdn.brandfetch.io/kuda.com",
  },
  {
    code: "090405",
    name: "Opay",
    abbr: "OP",
    color: "#00C853",
    logo: "https://cdn.brandfetch.io/opayweb.com",
  },
  {
    code: "090303",
    name: "PalmPay",
    abbr: "PP",
    color: "#05C167",
    logo: "https://cdn.brandfetch.io/palmpay.com",
  },
  {
    code: "076",
    name: "Polaris Bank",
    abbr: "PB",
    color: "#E30613",
    logo: "https://cdn.brandfetch.io/polarisbanklimited.com",
  },
  {
    code: "101",
    name: "Providus Bank",
    abbr: "PV",
    color: "#FF6B00",
    logo: "https://cdn.brandfetch.io/providusbank.com",
  },
  {
    code: "215",
    name: "Unity Bank",
    abbr: "UN",
    color: "#006B3E",
    logo: "https://cdn.brandfetch.io/unitybankng.com",
  },
  {
    code: "082",
    name: "Keystone Bank",
    abbr: "KB",
    color: "#0070C0",
    logo: "https://cdn.brandfetch.io/keystonebankng.com",
  },
  {
    code: "068",
    name: "Standard Chartered",
    abbr: "SC",
    color: "#00ADEF",
    logo: "https://cdn.brandfetch.io/sc.com",
  },
  {
    code: "102",
    name: "Titan Trust",
    abbr: "TT",
    color: "#1B4F8A",
    logo: "https://cdn.brandfetch.io/titantrustbank.com",
  },
  {
    code: "100",
    name: "SunTrust Bank",
    abbr: "ST",
    color: "#F5A623",
    logo: "https://cdn.brandfetch.io/suntrustng.com",
  },
  {
    code: "090175",
    name: "Rubies Bank",
    abbr: "RB",
    color: "#C0392B",
    logo: "https://cdn.brandfetch.io/rubiesbank.com",
  },
];

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];
const INITIAL_BANK_COUNT = 9;

// ─── Helper Components ─────────────────────────────────────────────────────
function BankLogoOrFallback({ bank, size = 40 }) {
  const [failed, setFailed] = useState(false);
  if (bank.logo && !failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={bank.logo}
          alt={bank.name}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: bank.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.3,
        color: "#fff",
        flexShrink: 0,
        letterSpacing: "-0.5px",
      }}
    >
      {bank.abbr}
    </div>
  );
}

function StepIndicator({ step, colors }) {
  const steps = ["Amount", "Bank", "Confirm"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 28px",
        borderBottom: `1px solid ${colors.border}`,
        background: colors.shimmer,
      }}
    >
      {steps.map((label, i) => {
        const num = i + 1;
        const isDone = step > num;
        const isActive = step === num;
        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < steps.length - 1 ? 1 : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  background: isDone
                    ? colors.stepDone
                    : isActive
                      ? "transparent"
                      : "transparent",
                  border: `1.5px solid ${isDone ? colors.stepDone : isActive ? colors.stepActive : colors.stepInactive}`,
                  color: isDone
                    ? "#fff"
                    : isActive
                      ? colors.stepActive
                      : colors.stepInactive,
                }}
              >
                {isDone ? (
                  <i className="bi bi-check" style={{ fontSize: 13 }} />
                ) : (
                  num
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isDone || isActive ? colors.text : colors.stepInactive,
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  margin: "0 12px",
                  background: isDone ? colors.stepDone : colors.stepInactive,
                  opacity: 0.5,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function Withdraw() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [verifying, setVerifying] = useState(false);
  const [showAllBanks, setShowAllBanks] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [acctFocused, setAcctFocused] = useState(false);

  const verifyTimer = useRef(null);

  const visibleBanks = showAllBanks
    ? ALL_BANKS
    : ALL_BANKS.slice(0, INITIAL_BANK_COUNT);

  const currentStep = (() => {
    if (!amount) return 1;
    if (!selectedBank || !accountName) return 2;
    return 3;
  })();

  const handleAmountChange = (val) => {
    setAmount(val);
    setMessage({ text: "", type: "" });
  };

  const handleQuickAmount = (val) => {
    setAmount(String(val));
    setMessage({ text: "", type: "" });
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setAccountNumber("");
    setAccountName("");
    setMessage({ text: "", type: "" });
  };

  const handleAccountNumberChange = (val) => {
    setAccountNumber(val);
    setAccountName("");
    clearTimeout(verifyTimer.current);
    if (val.length === 10 && selectedBank) {
      verifyTimer.current = setTimeout(verifyAccount, 700);
    }
  };

  const verifyAccount = () => {
    setVerifying(true);
    // Replace with real API call to backend
    setTimeout(() => {
      const mockNames = [
        "ADEBAYO JAMES OLAWALE",
        "CHIOMA GRACE OKONKWO",
        "IBRAHIM MUSA YUSUF",
        "FATIMA ABUBAKAR BELLO",
        "EMEKA CHUKWUEMEKA OBI",
      ];
      setAccountName(mockNames[Math.floor(Math.random() * mockNames.length)]);
      setVerifying(false);
    }, 900);
  };

  const handleSubmit = async () => {
    if (!amount || !selectedBank || !accountNumber || !accountName) {
      setMessage({ text: "Please complete all fields.", type: "error" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/withdraw/request.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            currency: "NGN",
            bank_code: selectedBank.code,
            account_number: accountNumber,
            account_name: accountName,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification(
          "SendNaw",
          `Withdrawal request of ₦${Number(amount).toLocaleString("en-NG")} submitted.`,
        );
        setMessage({
          text: "Withdrawal request submitted successfully!",
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setMessage({ text: data.message || "Request failed.", type: "error" });
      }
    } catch {
      setMessage({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const isReady = amount && selectedBank && accountName && !verifying;
  const formattedAmount = amount
    ? `₦${Number(amount).toLocaleString("en-NG")}`
    : "";

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div
        style={{
          background: colors.cardBg,
          borderRadius: 28,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        {/* Header – gradient card (kept visible) */}
        <div
          style={{
            background: colors.accentGrad,
            padding: "28px 28px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 28,
              transform: "translateY(-50%)",
              fontSize: 80,
              color: "rgba(255,255,255,0.07)",
              lineHeight: 1,
            }}
          >
            <i className="bi bi-bank2" />
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#fff",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <i className="bi bi-send-fill" />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.4px",
                }}
              >
                Withdraw Funds
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Transfer to your Nigerian bank account
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator step={currentStep} colors={colors} />

        {/* Form Body */}
        <div style={{ padding: "28px 28px 24px" }}>
          {/* Amount */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <i
                className="bi bi-cash-stack"
                style={{ fontSize: 13, color: colors.accent }}
              />{" "}
              Amount (NGN)
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontWeight: 800,
                  color: colors.accent,
                  fontSize: 22,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                ₦
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                onFocus={() => setAmountFocused(true)}
                onBlur={() => setAmountFocused(false)}
                style={{
                  width: "100%",
                  padding: "15px 16px 15px 44px",
                  borderRadius: 16,
                  border: `1.5px solid ${amountFocused ? colors.inputFocusBorder : colors.inputBorder}`,
                  background: colors.inputBg,
                  color: colors.text,
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxShadow: amountFocused
                    ? `0 0 0 3px ${colors.accent}18`
                    : "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: 7,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              {QUICK_AMOUNTS.map((v) => (
                <button
                  key={v}
                  onClick={() => handleQuickAmount(v)}
                  style={{
                    padding: "5px 13px",
                    borderRadius: 20,
                    border: `1px solid ${amount == v ? colors.accent : colors.inputBorder}`,
                    background: amount == v ? colors.accentSoft : "transparent",
                    color: amount == v ? colors.accent : colors.textSecondary,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  ₦{v.toLocaleString("en-NG")}
                </button>
              ))}
            </div>
          </div>

          {/* Bank Selection */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <i
                className="bi bi-bank2"
                style={{ fontSize: 13, color: colors.accent }}
              />{" "}
              Select Bank
            </label>

            {selectedBank && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderRadius: 14,
                  background: colors.accentSoft,
                  border: `1.5px solid ${colors.accent}`,
                  marginBottom: 12,
                }}
              >
                <BankLogoOrFallback bank={selectedBank} size={36} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: colors.text,
                    }}
                  >
                    {selectedBank.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: colors.textSecondary,
                      marginTop: 1,
                    }}
                  >
                    Code: {selectedBank.code}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedBank(null);
                    setAccountNumber("");
                    setAccountName("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: colors.textSecondary,
                    fontSize: 18,
                    padding: 4,
                  }}
                >
                  <i className="bi bi-x-circle" />
                </button>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {visibleBanks.map((bank) => {
                const isSelected = selectedBank?.code === bank.code;
                return (
                  <div
                    key={bank.code}
                    onClick={() => handleBankSelect(bank)}
                    style={{
                      padding: "12px 8px",
                      borderRadius: 14,
                      border: `1.5px solid ${isSelected ? colors.bankCardSelectedBorder : colors.bankCardBorder}`,
                      background: isSelected
                        ? colors.bankCardSelected
                        : colors.bankCardBg,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      position: "relative",
                      boxShadow: isSelected
                        ? `0 0 0 3px ${colors.accent}18`
                        : "none",
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 7,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: colors.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          color: "#fff",
                        }}
                      >
                        <i className="bi bi-check" />
                      </div>
                    )}
                    <BankLogoOrFallback bank={bank} size={38} />
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: isSelected ? colors.text : colors.textSecondary,
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {bank.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowAllBanks((v) => !v)}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "10px 16px",
                borderRadius: 12,
                border: `1px dashed ${colors.inputBorder}`,
                background: "transparent",
                color: colors.textSecondary,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
                e.currentTarget.style.borderColor = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
                e.currentTarget.style.borderColor = colors.inputBorder;
              }}
            >
              <i className={`bi bi-chevron-${showAllBanks ? "up" : "down"}`} />
              {showAllBanks
                ? "Show fewer banks"
                : `Show ${ALL_BANKS.length - INITIAL_BANK_COUNT} more banks`}
            </button>
          </div>

          {/* Account Number */}
          {selectedBank && (
            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 9,
                  fontWeight: 700,
                  fontSize: 11,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <i
                  className="bi bi-upc-scan"
                  style={{ fontSize: 13, color: colors.accent }}
                />{" "}
                Account Number
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="10-digit account number"
                  value={accountNumber}
                  maxLength={10}
                  onChange={(e) =>
                    handleAccountNumberChange(e.target.value.replace(/\D/g, ""))
                  }
                  onFocus={() => setAcctFocused(true)}
                  onBlur={() => setAcctFocused(false)}
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 16px",
                    borderRadius: 16,
                    border: `1.5px solid ${acctFocused ? colors.inputFocusBorder : colors.inputBorder}`,
                    background: colors.inputBg,
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    fontFamily: "'DM Mono', monospace",
                    outline: "none",
                    boxShadow: acctFocused
                      ? `0 0 0 3px ${colors.accent}18`
                      : "none",
                  }}
                />
                {verifying && (
                  <div
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <i
                      className="bi bi-arrow-repeat"
                      style={{
                        color: colors.accent,
                        fontSize: 18,
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                  </div>
                )}
                {accountName && !verifying && (
                  <div
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <i
                      className="bi bi-check-circle-fill"
                      style={{ color: colors.success, fontSize: 18 }}
                    />
                  </div>
                )}
              </div>
              {accountName && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: colors.successBg,
                    border: `1px solid ${colors.success}30`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <i
                    className="bi bi-patch-check-fill"
                    style={{
                      color: colors.success,
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: colors.success,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Account Verified
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: colors.text,
                        marginTop: 2,
                      }}
                    >
                      {accountName}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Summary Card */}
          {isReady && (
            <div
              style={{
                marginBottom: 20,
                padding: "16px",
                borderRadius: 16,
                background: colors.shimmer,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                Transfer Summary
              </div>
              {[
                {
                  label: "Amount",
                  value: `₦${Number(amount).toLocaleString("en-NG")}`,
                  mono: true,
                },
                { label: "Bank", value: selectedBank?.name },
                { label: "Account", value: accountNumber, mono: true },
                { label: "Beneficiary", value: accountName },
              ].map(({ label, value, mono }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 12, color: colors.textSecondary }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: colors.text,
                      fontFamily: mono ? "'DM Mono', monospace" : undefined,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isReady || loading}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: 40,
              background: isReady ? colors.accentGrad : colors.inputBg,
              color: isReady ? "#fff" : colors.textSecondary,
              border: `1.5px solid ${isReady ? "transparent" : colors.inputBorder}`,
              fontWeight: 700,
              fontSize: 15,
              cursor: isReady && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: isReady ? "0 8px 32px rgba(124,58,237,0.35)" : "none",
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? (
              <>
                <i
                  className="bi bi-arrow-repeat"
                  style={{
                    animation: "spin 0.8s linear infinite",
                    display: "inline-block",
                  }}
                />{" "}
                Processing...
              </>
            ) : isReady ? (
              <>
                <i className="bi bi-send-check-fill" /> Withdraw{" "}
                {formattedAmount} → {selectedBank?.name}
              </>
            ) : (
              <>
                <i className="bi bi-lock-fill" /> Complete the form above
              </>
            )}
          </button>

          {message.text && (
            <div
              style={{
                marginTop: 16,
                padding: "13px 16px",
                borderRadius: 14,
                background:
                  message.type === "success"
                    ? colors.successBg
                    : colors.dangerBg,
                border: `1px solid ${message.type === "success" ? colors.success : colors.danger}30`,
                color:
                  message.type === "success" ? colors.success : colors.danger,
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <i
                className={`bi ${message.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`}
              />
              {message.text}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            background: colors.footerBg,
            borderTop: `1px solid ${colors.border}`,
            padding: "13px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "bi-shield-lock-fill", text: "256-bit encryption" },
            { icon: "bi-clock-history", text: "Processed in 24hrs" },
            { icon: "bi-patch-check-fill", text: "CBN Licensed" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: colors.textSecondary,
              }}
            >
              <i
                className={`bi ${icon}`}
                style={{ fontSize: 13, color: colors.accent }}
              />
              {text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
