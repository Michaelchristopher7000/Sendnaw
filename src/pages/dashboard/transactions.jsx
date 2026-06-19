import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
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
  accentLight: "#F3F4F6",
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
  accentLight: "#1E293B",
};

const font = `'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    minAmount: "",
    maxAmount: "",
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      params.append("limit", 100);
      const res = await fetch(
        `https://sendnawtechnologies.infinityfree.io/api/transactions/history.php?${params}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setTransactions(data.transactions);
      else
        showNotification(
          "SendNaw",
          data.message || "Failed to load transactions",
          "error",
        );
    } catch (err) {
      showNotification("SendNaw", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const params = new URLSearchParams(filters);
    window.location.href = `https://sendnawtechnologies.infinityfree.io/api/transactions/export_csv.php?${params}&token=${localStorage.getItem("token")}`;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchTransactions();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      type: "",
      minAmount: "",
      maxAmount: "",
    });
    setTimeout(fetchTransactions, 0);
    setShowFilters(false);
  };

  const openReceipt = (txId) => navigate(`/receipts/${txId}`);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.darkBg,
        fontFamily: font,
        padding: "1rem",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 5vw, 1.8rem)",
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            Transaction History
          </h2>
          <p
            style={{
              fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
              color: colors.textSecondary,
              marginTop: "0.25rem",
            }}
          >
            View and download all your transactions
          </p>
        </div>

        <div
          style={{
            background: colors.cardBg,
            borderRadius: "20px",
            padding: "1rem",
            border: `1px solid ${colors.border}`,
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: colors.indigo,
                border: "none",
                borderRadius: "40px",
                padding: "8px 16px",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-funnel"></i>{" "}
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={exportCSV}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: colors.green,
                border: "none",
                borderRadius: "40px",
                padding: "8px 16px",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-file-earmark-spreadsheet"></i> Export CSV
            </button>
          </div>
          {(showFilters || window.innerWidth >= 768) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
                marginTop: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    color: colors.textSecondary,
                    marginBottom: "0.25rem",
                    display: "block",
                  }}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    fontSize: "0.8rem",
                    background: colors.cardBg,
                    color: colors.text,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    color: colors.textSecondary,
                    marginBottom: "0.25rem",
                    display: "block",
                  }}
                >
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    fontSize: "0.8rem",
                    background: colors.cardBg,
                    color: colors.text,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    color: colors.textSecondary,
                    marginBottom: "0.25rem",
                    display: "block",
                  }}
                >
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    fontSize: "0.8rem",
                    background: colors.cardBg,
                    color: colors.text,
                  }}
                >
                  <option value="">All Types</option>
                  <option value="send">Sent</option>
                  <option value="receive">Received</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdraw">Withdrawal</option>
                  <option value="airtime">Airtime</option>
                  <option value="bill">Bill</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    color: colors.textSecondary,
                    marginBottom: "0.25rem",
                    display: "block",
                  }}
                >
                  Min (₦)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleFilterChange("minAmount", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    fontSize: "0.8rem",
                    background: colors.cardBg,
                    color: colors.text,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.7rem",
                    color: colors.textSecondary,
                    marginBottom: "0.25rem",
                    display: "block",
                  }}
                >
                  Max (₦)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleFilterChange("maxAmount", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    fontSize: "0.8rem",
                    background: colors.cardBg,
                    color: colors.text,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-end",
                }}
              >
                <button
                  onClick={applyFilters}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "40px",
                    background: colors.indigo,
                    border: "none",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "40px",
                    background: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    color: colors.textSecondary,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
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
              Loading transactions...
            </p>
          </div>
        )}
        {!loading && transactions.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              background: colors.cardBg,
              borderRadius: "24px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <i
              className="bi bi-inbox"
              style={{ fontSize: "3rem", color: colors.textSecondary }}
            ></i>
            <h3
              style={{
                marginTop: "1rem",
                fontSize: "1.2rem",
                color: colors.text,
              }}
            >
              No transactions found
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Try adjusting your filters
            </p>
          </div>
        )}
        {!loading && transactions.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {transactions.map((tx) => {
              const isDebit =
                tx.type === "send" ||
                tx.type === "withdraw" ||
                tx.type === "bill" ||
                tx.type === "airtime";
              return (
                <div
                  key={tx.id}
                  onClick={() => openReceipt(tx.id)}
                  style={{
                    background: colors.cardBg,
                    borderRadius: "20px",
                    padding: "0.9rem",
                    border: `1px solid ${colors.border}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flex: "2 1 200px",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px",
                        background: isDebit
                          ? `${colors.danger}20`
                          : `${colors.green}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className={`bi ${isDebit ? "bi-arrow-up-right" : "bi-arrow-down-left"}`}
                        style={{
                          fontSize: "1.3rem",
                          color: isDebit ? colors.danger : colors.green,
                        }}
                      ></i>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontWeight: 700,
                          margin: 0,
                          textTransform: "capitalize",
                          color: colors.text,
                          fontSize: "0.9rem",
                        }}
                      >
                        {tx.type}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: colors.textSecondary,
                          margin: "4px 0 0",
                        }}
                      >
                        {formatDate(tx.created_at)} ·{" "}
                        {formatTime(tx.created_at)}
                      </p>
                      {tx.description && (
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: colors.textSecondary,
                            margin: "2px 0 0",
                            wordBreak: "break-word",
                          }}
                        >
                          {tx.description.length > 45
                            ? tx.description.slice(0, 45) + "…"
                            : tx.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p
                      style={{
                        fontWeight: 800,
                        fontSize: "1rem",
                        margin: 0,
                        color: isDebit ? colors.danger : colors.green,
                      }}
                    >
                      {isDebit ? "-" : "+"}
                      {tx.amount} {tx.currency}
                    </p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        margin: "4px 0 0",
                        color: colors.textSecondary,
                      }}
                    >
                      {tx.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media (max-width: 640px) { .filter-grid { grid-template-columns: 1fr; } }`}</style>
      </div>
    </div>
  );
}
