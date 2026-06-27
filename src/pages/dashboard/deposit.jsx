import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import { useTheme } from "../../context/themecontext";
import { getThemeColors, CURRENCY_META } from "../../constants/wallettheme";

// ─── Static bank-transfer details ────────────────────────────────────────
// Replace BANK_NAME with whatever bank/processor actually issues the
// dedicated/virtual account number behind `user.account_number`
// (e.g. Paystack-Titan, Flutterwave-Wema, Providus, etc).
const BANK_NAME = "SendNaw Microfinance Bank";

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000, 50000];

export default function DepositPage() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const colors = getThemeColors(theme === "light");
    const navigate = useNavigate();

    const [method, setMethod] = useState("transfer"); // "transfer" | "card"
    const [copied, setCopied] = useState(false);
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState(
        () => localStorage.getItem("sn_currency") || "NGN",
    );
    const [showCurrencySelector, setShowCurrencySelector] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const meta = CURRENCY_META[currency] || CURRENCY_META.NGN;
    const accountNumber = user?.account_number || "";
    const accountName = user?.full_name || user?.name || "—";

    useEffect(() => {
        document.title = "Add Money";
    }, []);

    const handleCopy = () => {
        if (!accountNumber) return;
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (!accountNumber) return;
        const text = `Send money to my ${BANK_NAME} account.\nAccount Number: ${accountNumber}\nAccount Name: ${accountName}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: "My deposit account", text });
            } catch {
                /* user cancelled share – no action needed */
            }
        } else {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleQuickAmount = (amt) => setAmount(amt.toString());

    const handleCardDeposit = async () => {
        setError("");
        const numericAmount = parseFloat(amount);
        if (!numericAmount || numericAmount <= 0) {
            setError("Enter a valid amount to continue.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                "https://sendnawbackend.onrender.com/api/deposit/initialized.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ amount: numericAmount, currency }),
                },
            );
            const data = await res.json();
            if (data.success && data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                setError(data.message || "Could not start this payment. Try again.");
            }
        } catch {
            setError("Something went wrong. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: colors.bg,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100%", maxWidth: 480, padding: "0 0 40px" }}>
                {/* ─── Header ─── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "20px 20px 8px",
                    }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            border: `1px solid ${colors.border}`,
                            background: colors.card,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <i
                            className="bi bi-arrow-left"
                            style={{ fontSize: 17, color: colors.text }}
                        />
                    </button>
                    <h1
                        style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: colors.text,
                            margin: 0,
                        }}
                    >
                        Add Money
                    </h1>
                </div>

                {/* ─── Method tabs ─── */}
                <div style={{ padding: "12px 20px 0" }}>
                    <div
                        style={{
                            display: "flex",
                            background: colors.card,
                            borderRadius: 16,
                            padding: 4,
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        {[
                            { key: "transfer", label: "Bank Transfer", icon: "bi-bank2" },
                            { key: "card", label: "Debit Card", icon: "bi-credit-card" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    setMethod(tab.key);
                                    setError("");
                                }}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 7,
                                    padding: "11px 4px",
                                    border: "none",
                                    borderRadius: 13,
                                    fontSize: 13.5,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    background: method === tab.key ? colors.purple : "transparent",
                                    color: method === tab.key ? "#fff" : colors.textSub,
                                    transition: "all 0.15s",
                                }}
                            >
                                <i className={`bi ${tab.icon}`} style={{ fontSize: 15 }} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── Bank Transfer panel ─── */}
                {method === "transfer" && (
                    <div style={{ padding: "18px 20px 0" }}>
                        <div
                            style={{
                                background: `linear-gradient(145deg, ${colors.purpleDeep} 0%, ${colors.purpleMid} 60%, ${colors.purplePill} 100%)`,
                                borderRadius: 24,
                                padding: "24px 22px",
                                color: "#fff",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: 200,
                                    height: 200,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    top: -80,
                                    right: -50,
                                }}
                            />
                            <p
                                style={{
                                    fontSize: 12,
                                    opacity: 0.75,
                                    margin: "0 0 4px",
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Transfer to this account
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    margin: "6px 0 4px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 800,
                                        letterSpacing: "0.03em",
                                        fontVariantNumeric: "tabular-nums",
                                    }}
                                >
                                    {accountNumber || "—"}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        background: "rgba(255,255,255,0.18)",
                                        border: "1px solid rgba(255,255,255,0.3)",
                                        borderRadius: 10,
                                        width: 32,
                                        height: 32,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                    }}
                                    aria-label="Copy account number"
                                >
                                    <i
                                        className={`bi ${copied ? "bi-check-lg" : "bi-copy"}`}
                                        style={{ fontSize: 14, color: "#fff" }}
                                    />
                                </button>
                            </div>
                            <p style={{ fontSize: 13, opacity: 0.85, margin: "0 0 2px" }}>
                                {accountName}
                            </p>
                            <p style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>
                                {BANK_NAME}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 18,
                                }}
                            >
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        flex: 1,
                                        background: "rgba(255,255,255,0.16)",
                                        border: "1px solid rgba(255,255,255,0.3)",
                                        borderRadius: 40,
                                        padding: "10px 0",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        cursor: "pointer",
                                    }}
                                >
                                    {copied ? "Copied!" : "Copy Number"}
                                </button>
                                <button
                                    onClick={handleShare}
                                    style={{
                                        flex: 1,
                                        background: "#fff",
                                        border: "none",
                                        borderRadius: 40,
                                        padding: "10px 0",
                                        color: colors.purpleDeep,
                                        fontWeight: 700,
                                        fontSize: 13,
                                        cursor: "pointer",
                                    }}
                                >
                                    Share Details
                                </button>
                            </div>
                        </div>

                        {/* How it works */}
                        <div
                            style={{
                                background: colors.card,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 20,
                                padding: "16px 18px",
                                marginTop: 16,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: colors.textSub,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    margin: "0 0 12px",
                                }}
                            >
                                How it works
                            </p>
                            {[
                                "Copy the account number above",
                                "Open your bank app or USSD code",
                                "Transfer any amount to the account",
                                "Your wallet is credited instantly",
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 10,
                                        marginBottom: i === 3 ? 0 : 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            background: colors.purpleLight,
                                            color: colors.purple,
                                            fontSize: 11,
                                            fontWeight: 800,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            marginTop: 1,
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 13.5,
                                            color: colors.text,
                                            margin: 0,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 8,
                                marginTop: 14,
                                padding: "0 4px",
                            }}
                        >
                            <i
                                className="bi bi-shield-check"
                                style={{ color: colors.green, fontSize: 14, marginTop: 1 }}
                            />
                            <p style={{ fontSize: 12, color: colors.textSub, margin: 0 }}>
                                This account number is unique to you and never expires. Only
                                send Naira transfers to this account.
                            </p>
                        </div>
                    </div>
                )}

                {/* ─── Card panel ─── */}
                {method === "card" && (
                    <div style={{ padding: "18px 20px 0" }}>
                        {/* Currency selector */}
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: colors.textSub,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                margin: "0 0 8px",
                            }}
                        >
                            Currency
                        </p>
                        <div style={{ position: "relative", marginBottom: 18 }}>
                            <button
                                onClick={() => setShowCurrencySelector((v) => !v)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "12px 16px",
                                    border: `1.5px solid ${colors.border}`,
                                    borderRadius: 16,
                                    background: colors.purpleLight,
                                    width: "100%",
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                    color: colors.text,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <img
                                        src={meta.flagImg}
                                        alt={currency}
                                        style={{ width: 26, height: 18, borderRadius: 3 }}
                                    />
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>
                                        {currency} – {meta.label}
                                    </span>
                                </div>
                                <i
                                    className={`bi bi-chevron-${showCurrencySelector ? "up" : "down"}`}
                                    style={{ fontSize: 13, color: colors.textSub }}
                                />
                            </button>
                            {showCurrencySelector && (
                                <>
                                    <div
                                        onClick={() => setShowCurrencySelector(false)}
                                        style={{ position: "fixed", inset: 0, zIndex: 90 }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "calc(100% + 8px)",
                                            left: 0,
                                            right: 0,
                                            background: colors.card,
                                            borderRadius: 16,
                                            border: `1px solid ${colors.border}`,
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                            zIndex: 100,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {Object.entries(CURRENCY_META).map(([code, m]) => (
                                            <button
                                                key={code}
                                                onClick={() => {
                                                    setCurrency(code);
                                                    setShowCurrencySelector(false);
                                                }}
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "13px 16px",
                                                    border: "none",
                                                    background:
                                                        currency === code ? colors.purpleLight : colors.card,
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    color: colors.text,
                                                }}
                                            >
                                                <img
                                                    src={m.flagImg}
                                                    alt={code}
                                                    style={{ width: 26, height: 18, borderRadius: 3 }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                                                        {code}
                                                    </div>
                                                    <div style={{ fontSize: 11.5, color: colors.textSub }}>
                                                        {m.label}
                                                    </div>
                                                </div>
                                                {currency === code && (
                                                    <i
                                                        className="bi bi-check-lg"
                                                        style={{ marginLeft: "auto", color: colors.purple }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Amount */}
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: colors.textSub,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                margin: "0 0 8px",
                            }}
                        >
                            Amount
                        </p>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                border: `1.5px solid ${colors.border}`,
                                borderRadius: 16,
                                padding: "14px 16px",
                                background: colors.purpleLight,
                                marginBottom: 16,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 26,
                                    fontWeight: 700,
                                    color: colors.purple,
                                    marginRight: 8,
                                }}
                            >
                                {meta.symbol}
                            </span>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    background: "transparent",
                                    fontSize: 26,
                                    fontWeight: 700,
                                    color: colors.text,
                                    outline: "none",
                                    padding: 0,
                                }}
                            />
                        </div>

                        {/* Quick amounts */}
                        <p
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: colors.textSub,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                margin: "0 0 10px",
                            }}
                        >
                            Quick amounts
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 10,
                                marginBottom: 20,
                            }}
                        >
                            {QUICK_AMOUNTS.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => handleQuickAmount(amt)}
                                    style={{
                                        padding: "11px 0",
                                        background:
                                            amount === amt.toString()
                                                ? colors.purple
                                                : colors.purpleLight,
                                        border: "none",
                                        borderRadius: 12,
                                        fontSize: 13.5,
                                        fontWeight: 700,
                                        color: amount === amt.toString() ? "#fff" : colors.text,
                                        cursor: "pointer",
                                    }}
                                >
                                    {meta.symbol}
                                    {amt.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div
                                style={{
                                    background: colors.redLight,
                                    color: colors.red,
                                    borderRadius: 12,
                                    padding: "10px 14px",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    marginBottom: 16,
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleCardDeposit}
                            disabled={loading}
                            style={{
                                width: "100%",
                                background: colors.purple,
                                color: "#fff",
                                border: "none",
                                padding: "15px",
                                borderRadius: 40,
                                fontWeight: 700,
                                fontSize: 15,
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                            }}
                        >
                            {loading
                                ? "Processing..."
                                : `Pay ${meta.symbol}${amount ? parseFloat(amount).toLocaleString() : "0"}`}
                        </button>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                marginTop: 16,
                            }}
                        >
                            <i
                                className="bi bi-lock-fill"
                                style={{ fontSize: 12, color: colors.textSub }}
                            />
                            <span style={{ fontSize: 12, color: colors.textSub }}>
                                Secured with 256-bit encryption · Powered by Paystack
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                                justifyContent: "center",
                                marginTop: 10,
                            }}
                        >
                            {["bi-credit-card-2-front", "bi-credit-card", "bi-wallet2"].map(
                                (icon) => (
                                    <div
                                        key={icon}
                                        style={{
                                            width: 34,
                                            height: 24,
                                            borderRadius: 6,
                                            background: colors.purpleLight,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <i
                                            className={`bi ${icon}`}
                                            style={{ fontSize: 13, color: colors.purple }}
                                        />
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}