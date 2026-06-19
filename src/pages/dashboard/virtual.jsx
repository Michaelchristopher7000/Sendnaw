import { useState, useEffect } from "react";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Light & Dark themes
const lightTheme = {
  indigo: "#4F46E5",
  purple: "#9333EA",
  green: "#10B981",
  white: "#FFFFFF",
  black: "#111827",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  darkBg: "#F9FAFB",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
};

const darkTheme = {
  indigo: "#8A5CF7",
  purple: "#A78BFA",
  green: "#34D399",
  white: "#1E293B",
  black: "#F1F5F9",
  gray: "#94A3B8",
  lightGray: "#334155",
  darkBg: "#0F172A",
  danger: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
  cardBg: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  border: "#334155",
};

const font = `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

function maskCardNumber(number) {
  if (!number) return "**** **** **** ****";
  const last4 = number.slice(-4);
  return `**** **** **** ${last4}`;
}

function formatExpiry(month, year) {
  return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
}

function NewCardModal({ cardData, onClose, colors }) {
  const [copied, setCopied] = useState({ number: false, cvv: false });
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "28px",
          padding: "1.8rem",
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        <i
          className="bi bi-credit-card-2-front"
          style={{ fontSize: "3rem", color: colors.indigo }}
        ></i>
        <h3
          style={{
            margin: "0.5rem 0 0.25rem",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: colors.text,
          }}
        >
          Card Created!
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: colors.textSecondary,
            marginBottom: "1.5rem",
          }}
        >
          Save these details – they won't be shown again.
        </p>
        <div
          style={{
            background: colors.lightGray,
            borderRadius: "16px",
            padding: "0.8rem 1rem",
            marginBottom: "1rem",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: colors.textSecondary,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Card number
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "1.1rem",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {cardData.card_number}
            </span>
            <button
              onClick={() => copyToClipboard(cardData.card_number, "number")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: colors.indigo,
              }}
            >
              <i
                className={`bi ${copied.number ? "bi-check-lg" : "bi-copy"}`}
              ></i>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <div
            style={{
              flex: 1,
              background: colors.lightGray,
              borderRadius: "16px",
              padding: "0.8rem 1rem",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: colors.textSecondary,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Expiry
            </p>
            <span style={{ fontWeight: 600 }}>{cardData.expiry}</span>
          </div>
          <div
            style={{
              flex: 1,
              background: colors.lightGray,
              borderRadius: "16px",
              padding: "0.8rem 1rem",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: colors.textSecondary,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              CVV
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600 }}>{cardData.cvv}</span>
              <button
                onClick={() => copyToClipboard(cardData.cvv, "cvv")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: colors.indigo,
                }}
              >
                <i
                  className={`bi ${copied.cvv ? "bi-check-lg" : "bi-copy"}`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            background: `${colors.warning}20`,
            borderRadius: "12px",
            padding: "0.8rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          <i
            className="bi bi-exclamation-triangle"
            style={{ color: colors.warning, marginRight: "0.5rem" }}
          ></i>
          <span style={{ fontSize: "0.7rem", color: colors.warning }}>
            Store these details securely. We cannot retrieve the full card
            number later.
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "40px",
            background: colors.indigo,
            border: "none",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          I've saved my card details
        </button>
      </div>
    </div>
  );
}

function ConfirmModal({ title, message, onConfirm, onClose, loading, colors }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "24px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <h3
          style={{
            margin: "0 0 0.5rem",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: colors.text,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: colors.textSecondary,
            marginBottom: "1.5rem",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.indigo,
              border: "none",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <i className="bi bi-hourglass-split"></i> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FundModal({ onClose, onFund, loading, colors }) {
  const [amount, setAmount] = useState("");
  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!amount || num <= 0) {
      showNotification("SendNaw", "Please enter a valid amount", "error");
      return;
    }
    onFund(num);
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "24px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.2rem",
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Add Funds
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: colors.textSecondary,
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              fontSize: "0.8rem",
              color: colors.textSecondary,
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Amount (USD)
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              fontSize: "1rem",
              outline: "none",
              background: colors.cardBg,
              color: colors.text,
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.indigo)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
            autoFocus
          />
          <p
            style={{
              fontSize: "0.7rem",
              color: colors.textSecondary,
              marginTop: "0.5rem",
            }}
          >
            <i className="bi bi-info-circle"></i> Funds will be deducted from
            your USD wallet.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.green,
              border: "none",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <i className="bi bi-hourglass-split"></i> : "Fund Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CvvModal({ cvv, onClose, colors }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(cvv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "24px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 320,
          textAlign: "center",
        }}
      >
        <i
          className="bi bi-shield-lock"
          style={{ fontSize: "2rem", color: colors.indigo }}
        ></i>
        <h3
          style={{
            margin: "0.5rem 0",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: colors.text,
          }}
        >
          Card CVV
        </h3>
        <p
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            letterSpacing: "0.1rem",
            color: colors.text,
            margin: "0.5rem 0",
          }}
        >
          {cvv}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "40px",
              background: colors.indigo,
              border: "none",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <i className={`bi ${copied ? "bi-check-lg" : "bi-copy"}`}></i>{" "}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "40px",
              background: colors.cardBg,
              border: `1px solid ${colors.border}`,
              color: colors.textSecondary,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VirtualCard() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showCvvModal, setShowCvvModal] = useState(false);
  const [funding, setFunding] = useState(false);
  const [newCardData, setNewCardData] = useState(null);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/cards/details.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setCard(data.card);
      else if (data.message === "No active card") setCard(null);
      else
        showNotification(
          "SendNaw",
          data.message || "Failed to load card",
          "error",
        );
    } catch {
      showNotification("SendNaw", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const createCard = async () => {
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/cards/create.php",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setNewCardData({
          card_number: data.card_number,
          expiry: data.expiry,
          cvv: data.cvv,
        });
        fetchCard();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setShowCreateConfirm(false);
  };

  const fundCard = async (amount) => {
    setFunding(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/cards/fund.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ amount }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", `$${amount} added to your card`, "success");
        fetchCard();
        setShowFundModal(false);
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setFunding(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.darkBg,
        fontFamily: font,
        padding: "2rem 1rem",
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
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

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 5vw, 1.8rem)",
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            Virtual USD Card
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: colors.textSecondary,
              marginTop: "0.25rem",
            }}
          >
            Spend securely online with your SendNaw virtual card
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: `3px solid ${colors.border}`,
                borderTop: `3px solid ${colors.indigo}`,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto",
              }}
            />
            <p style={{ marginTop: "1rem", color: colors.textSecondary }}>
              Loading card details...
            </p>
          </div>
        )}
        {!loading && !card && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem",
              background: colors.cardBg,
              borderRadius: "28px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <i
              className="bi bi-credit-card"
              style={{ fontSize: "3rem", color: colors.textSecondary }}
            ></i>
            <h3 style={{ marginTop: "1rem", color: colors.text }}>
              No virtual card yet
            </h3>
            <p style={{ color: colors.textSecondary, marginBottom: "1.5rem" }}>
              Create a virtual USD card to make secure online payments.
            </p>
            <button
              onClick={() => setShowCreateConfirm(true)}
              style={{
                background: colors.indigo,
                border: "none",
                borderRadius: "40px",
                padding: "12px 28px",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i className="bi bi-plus-circle"></i> Create Virtual Card
            </button>
          </div>
        )}
        {!loading && card && (
          <>
            <div
              style={{
                background: `linear-gradient(145deg, ${colors.indigo}, ${colors.purple})`,
                borderRadius: "28px",
                padding: "1.5rem",
                color: "#fff",
                boxShadow: "0 25px 45px -12px rgba(79,70,229,0.4)",
                marginBottom: "1.8rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  left: -40,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <img
                    src="/sendnaw-logo.png"
                    alt="SendNaw"
                    style={{ height: "28px", width: "auto" }}
                  />
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    SendNaw
                  </span>
                </div>
                <i
                  className="bi bi-wifi"
                  style={{ fontSize: "0.8rem", opacity: 0.7 }}
                ></i>
              </div>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  letterSpacing: "0.1rem",
                  fontFamily: "monospace",
                  marginBottom: "1rem",
                }}
              >
                {maskCardNumber(card.card_number)}
              </p>
              <div
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      opacity: 0.7,
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    Expires
                  </p>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "0.9rem" }}>
                    {formatExpiry(card.expiry_month, card.expiry_year)}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      opacity: 0.7,
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    CVV
                  </p>
                  <button
                    onClick={() => setShowCvvModal(true)}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "2px 10px",
                      color: "#fff",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <i className="bi bi-eye"></i> Show
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <i
                  className="bi bi-mastercard"
                  style={{ fontSize: "2rem", opacity: 0.8 }}
                ></i>
              </div>
            </div>
            <div
              style={{
                background: colors.cardBg,
                borderRadius: "20px",
                padding: "1.25rem",
                border: `1px solid ${colors.border}`,
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{ fontSize: "0.85rem", color: colors.textSecondary }}
                >
                  Available balance
                </span>
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: colors.green,
                  }}
                >
                  ${parseFloat(card.balance || 0).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setShowFundModal(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "40px",
                  background: colors.green,
                  border: "none",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <i className="bi bi-plus-circle"></i> Add Funds
              </button>
            </div>
            <div
              style={{
                background: colors.cardBg,
                borderRadius: "16px",
                padding: "1rem",
                border: `1px solid ${colors.border}`,
                fontSize: "0.75rem",
                color: colors.textSecondary,
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <i
                className="bi bi-info-circle"
                style={{ color: colors.info, fontSize: "1.1rem" }}
              ></i>
              <span>
                Use your virtual card for online payments worldwide. Funds are
                debited from your USD wallet.
              </span>
            </div>
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {showCreateConfirm && (
        <ConfirmModal
          title="Create Virtual Card"
          message="A one-time fee may apply. Your card will be issued instantly. Continue?"
          onConfirm={createCard}
          onClose={() => setShowCreateConfirm(false)}
          loading={false}
          colors={colors}
        />
      )}
      {showFundModal && (
        <FundModal
          onClose={() => setShowFundModal(false)}
          onFund={fundCard}
          loading={funding}
          colors={colors}
        />
      )}
      {showCvvModal && card && (
        <CvvModal
          cvv={card.cvv}
          onClose={() => setShowCvvModal(false)}
          colors={colors}
        />
      )}
      {newCardData && (
        <NewCardModal
          cardData={newCardData}
          onClose={() => setNewCardData(null)}
          colors={colors}
        />
      )}
    </div>
  );
}
