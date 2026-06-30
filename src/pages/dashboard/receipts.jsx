import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#f4f0fb",
  cardBg: "#ffffff",
  text: "#1e293b",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  accent: "#6f42c1",
  accentLight: "#ede9fb",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  success: "#34D399",
  danger: "#F87171",
  warning: "#FBBF24",
};

export default function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(
          `https://sendnawbackend.onrender.com/api/transactions/get_receipt_data.php?txn_id=${id}&token=${token}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();
        if (data.success) setTx(data.transaction);
        else setError(data.message || "Transaction not found");
      } catch (err) {
        setError("Failed to load receipt. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReceipt();
  }, [id, navigate]);

  const copyTxId = () => {
    navigator.clipboard.writeText(tx.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const downloadPDF = () => {
    const token = localStorage.getItem("token");
    window.open(
      `https://sendnawbackend.onrender.com/api/transactions/receipt.php?txn_id=${id}&token=${token}`,
      "_blank",
    );
  };
  const saveAsImage = () => {
    const el = document.getElementById("receipt-printable");
    html2canvas(el, { scale: 3, backgroundColor: colors.cardBg, useCORS: true })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = `sendnaw_receipt_${id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch(() => alert("Could not generate image"));
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: colors.bg,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            border: `2.5px solid ${colors.border}`,
            borderTopColor: colors.accent,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: colors.bg,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `${colors.danger}20`,
            color: colors.danger,
            fontSize: 22,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          !
        </div>
        <p style={{ color: colors.danger, marginTop: 12 }}>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 16,
            padding: "8px 20px",
            borderRadius: 8,
            background: colors.accent,
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go back
        </button>
      </div>
    );
  if (!tx) return null;

  const isDebit = ["send", "withdraw", "debit"].includes(
    tx.type?.toLowerCase(),
  );
  const dateFormatted = new Date(tx.created_at).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeFormatted = new Date(tx.created_at).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const isSuccess = tx.status?.toLowerCase() === "success";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: "'DM Sans', sans-serif",
        padding: "32px 16px 64px",
        position: "relative",
      }}
    >

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: colors.textSecondary,
            fontSize: 13,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
          }}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to transactions
        </button>

        <div
          id="receipt-printable"
          style={{
            background: colors.cardBg,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow:
              "0 1px 3px rgba(111,66,193,0.08), 0 8px 32px rgba(111,66,193,0.12)",
          }}
        >
          <div
            style={{
              background: colors.accent,
              padding: "28px 32px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/SendNaw_logo_main-removebg-preview.png"
                    alt="SendNaw"
                    style={{ height: 22, width: "auto" }}
                  />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
                  SendNaw
                </span>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px 4px 8px",
                  borderRadius: 40,
                  fontSize: 12,
                  fontWeight: 500,
                  background: isSuccess
                    ? "rgba(16,185,129,0.15)"
                    : "rgba(239,68,68,0.15)",
                  color: isSuccess ? "#6effc4" : "#f87171",
                  border: `1px solid ${isSuccess ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.2)"}`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "currentColor",
                  }}
                />
                {isSuccess
                  ? "Successful"
                  : tx.status?.toUpperCase() || "PENDING"}
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Amount transferred
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 300,
                  letterSpacing: "-1.5px",
                  color: isDebit ? "#fca5a5" : "#86efac",
                }}
              >
                {isDebit ? "−" : "+"}
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 400,
                    verticalAlign: "top",
                    marginTop: 6,
                    display: "inline-block",
                    opacity: 0.7,
                  }}
                >
                  ₦
                </span>
                {new Intl.NumberFormat("en-NG").format(tx.amount)}
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "inline-block",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 20,
                  textTransform: "uppercase",
                }}
              >
                {tx.type || "Transfer"}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: colors.bg,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: colors.bg,
                marginLeft: -14,
              }}
            />
            <div
              style={{ flex: 1, borderTop: `2px dashed ${colors.border}` }}
            />
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: colors.bg,
                marginRight: -14,
              }}
            />
          </div>

          <div style={{ padding: "24px 32px 28px" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: colors.textSecondary,
                marginBottom: 14,
              }}
            >
              Transaction details
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Reference ID
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: colors.text,
                    }}
                  >
                    {tx.id}
                  </span>
                  <button
                    onClick={copyTxId}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: colors.textSecondary,
                    }}
                  >
                    {copied ? (
                      <i
                        className="bi bi-check-lg"
                        style={{ color: colors.success }}
                      />
                    ) : (
                      <i className="bi bi-copy" />
                    )}
                  </button>
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Date
                </span>
                <span style={{ color: colors.text, fontSize: 13 }}>
                  {dateFormatted}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Time
                </span>
                <span style={{ color: colors.text, fontSize: 13 }}>
                  {timeFormatted}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Description
                </span>
                <span style={{ color: colors.text, fontSize: 13 }}>
                  {tx.description || "—"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  Fee
                </span>
                <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                  ₦0.00
                </span>
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: `1px dashed ${colors.border}`,
                  margin: "16px 0",
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: colors.textSecondary,
                  marginBottom: 14,
                }}
              >
                Parties
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={
                      tx.sender_avatar ||
                      `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(tx.sender_name || "sender")}&background=${colors.accent.slice(1)}`
                    }
                    alt="Sender"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginBottom: 2,
                      }}
                    >
                      Sender
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {tx.sender_name || "—"}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={
                      tx.receiver_avatar ||
                      `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(tx.receiver_name || "receiver")}&background=${colors.accent.slice(1)}`
                    }
                    alt="Receiver"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginBottom: 2,
                      }}
                    >
                      Receiver
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {tx.receiver_name || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: colors.accentLight,
              borderTop: `1px solid ${colors.border}`,
              padding: "18px 32px 22px",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={downloadPDF}
                style={{
                  flex: 1,
                  padding: "11px 16px",
                  borderRadius: 10,
                  background: "#fff",
                  border: `1px solid ${colors.border}`,
                  color: colors.accent,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <i className="bi bi-download"></i> Download PDF
              </button>
              <button
                onClick={saveAsImage}
                style={{
                  flex: 1,
                  padding: "11px 16px",
                  borderRadius: 10,
                  background: colors.accent,
                  border: "none",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                }}
              >
                <i className="bi bi-image"></i> Save as image
              </button>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 11,
                color: colors.textSecondary,
              }}
            >
              Secured by SendNaw · {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
