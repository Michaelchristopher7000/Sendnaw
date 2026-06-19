import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- add this line
import { useTheme } from "../../context/themecontext";

// Light & Dark themes
const lightTheme = {
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accent: "#4F46E5", // indigo
  accent2: "#9333EA", // purple
  green: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  success: "#10B981",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  darkBg: "#F9FAFB",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  accent: "#8A5CF7", // lighter indigo
  accent2: "#A78BFA",
  green: "#34D399",
  danger: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
  success: "#34D399",
  gray: "#6B7280",
  lightGray: "#334155",
  darkBg: "#0F172A",
};

const font = `'DM Sans', 'Segoe UI', sans-serif`;

function fmt(n) {
  return (
    "₦" +
    Number(n).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function SummaryCard({ label, value, icon, color, colors }) {
  return (
    <div
      style={{
        background: colors.cardBg,
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          color: color,
        }}
      >
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div>
        <p
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            marginBottom: 4,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: colors.text,
            margin: 0,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Badge({ status, colors }) {
  const map = {
    pending: {
      bg: "#FEF3C7",
      color: "#D97706",
      icon: "hourglass-split",
      label: "Pending",
    },
    approved: {
      bg: "#DBEAFE",
      color: "#2563EB",
      icon: "check-circle",
      label: "Approved",
    },
    disbursed: {
      bg: "#D1FAE5",
      color: "#059669",
      icon: "cash-stack",
      label: "Disbursed",
    },
    rejected: {
      bg: "#FEE2E2",
      color: "#DC2626",
      icon: "x-circle",
      label: "Rejected",
    },
    repaid: {
      bg: "#E5E7EB",
      color: "#4B5563",
      icon: "check2-circle",
      label: "Repaid",
    },
  };
  const s = map[status] || map.pending;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
        padding: "3px 10px",
        borderRadius: 20,
        textTransform: "uppercase",
        fontFamily: font,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <i className={`bi bi-${s.icon}`} style={{ fontSize: "10px" }}></i>
      {s.label}
    </span>
  );
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 16,
        height: 16,
        border: `2px solid rgba(255,255,255,0.3)`,
        borderTop: `2px solid white`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

function RepayModal({ loan, onClose, onRepay, colors }) {
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const handleSubmit = async () => {
    if (!amount) return;
    setBusy(true);
    await onRepay(loan.id, parseFloat(amount));
    setBusy(false);
    onClose();
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
        padding: 20,
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: "20px",
          padding: 28,
          width: "100%",
          maxWidth: 380,
          fontFamily: font,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <p style={{ color: colors.textSecondary, fontSize: 12, margin: 0 }}>
              REPAY LOAN
            </p>
            <h3 style={{ color: colors.text, margin: "4px 0 0", fontSize: 18 }}>
              #{loan.id} · {loan.product_name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: colors.border,
              border: "none",
              color: colors.textSecondary,
              width: 32,
              height: 32,
              borderRadius: 50,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="bi bi-x-lg" style={{ fontSize: "12px" }}></i>
          </button>
        </div>
        <div
          style={{
            background: colors.lightGray,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 11,
              margin: "0 0 4px",
              letterSpacing: 1,
            }}
          >
            NEXT INSTALLMENT DUE
          </p>
          <p
            style={{
              color: colors.green,
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
            }}
          >
            {fmt(loan.monthly_installment || 0)}
          </p>
        </div>
        <label
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            display: "block",
            marginBottom: 6,
          }}
        >
          AMOUNT TO REPAY
        </label>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: colors.green,
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            ₦
          </span>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              background: colors.cardBg,
              border: `1.5px solid ${colors.border}`,
              borderRadius: 12,
              padding: "13px 14px 13px 30px",
              color: colors.text,
              fontSize: 18,
              fontWeight: 700,
              outline: "none",
            }}
            autoFocus
          />
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <button
            onClick={onClose}
            style={{
              background: colors.cardBg,
              border: `1.5px solid ${colors.border}`,
              color: colors.textSecondary,
              borderRadius: 12,
              padding: "13px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={busy || !amount}
            style={{
              background: busy || !amount ? colors.gray : colors.green,
              border: "none",
              color: "#fff",
              borderRadius: 12,
              padding: "13px",
              fontWeight: 700,
              fontSize: 14,
              cursor: busy || !amount ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: !amount ? 0.6 : 1,
            }}
          >
            {busy ? <Spinner /> : <i className="bi bi-check2-circle"></i>} Repay
            Now
          </button>
        </div>
      </div>
    </div>
  );
}

function LoanCard({ loan, onRepay, colors }) {
  const [hovered, setHovered] = useState(false);
  const progress =
    loan.total_due > 0
      ? Math.min(
          100,
          ((loan.total_due - (loan.outstanding || loan.total_due)) /
            loan.total_due) *
            100,
        )
      : 0;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${loan.status === "disbursed" ? colors.green + "80" : colors.border}`,
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.2s ease",
        cursor: "default",
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
        fontFamily: font,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 11,
              margin: "0 0 4px",
              letterSpacing: 1,
            }}
          >
            <i className="bi bi-tag"></i> LOAN #{loan.id}
          </p>
          <p
            style={{
              color: colors.text,
              fontWeight: 700,
              fontSize: 16,
              margin: 0,
            }}
          >
            {loan.product_name}
          </p>
        </div>
        <Badge status={loan.status} colors={colors} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: colors.lightGray,
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 10,
              letterSpacing: 1,
              margin: "0 0 4px",
            }}
          >
            LOAN AMOUNT
          </p>
          <p
            style={{
              color: colors.text,
              fontWeight: 800,
              fontSize: 18,
              margin: 0,
            }}
          >
            {fmt(loan.amount)}
          </p>
        </div>
        <div
          style={{
            background: colors.lightGray,
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 10,
              letterSpacing: 1,
              margin: "0 0 4px",
            }}
          >
            TOTAL DUE
          </p>
          <p
            style={{
              color: colors.warning,
              fontWeight: 800,
              fontSize: 18,
              margin: 0,
            }}
          >
            {fmt(loan.total_due)}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span style={{ color: colors.textSecondary, fontSize: 13 }}>
          Monthly installment
        </span>
        <span style={{ color: colors.text, fontWeight: 700, fontSize: 14 }}>
          {fmt(loan.monthly_installment)}
        </span>
      </div>
      {loan.status === "disbursed" && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ color: colors.textSecondary, fontSize: 11 }}>
              Repayment progress
            </span>
            <span
              style={{ color: colors.green, fontSize: 11, fontWeight: 700 }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: colors.lightGray,
              borderRadius: 999,
            }}
          >
            <div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${colors.accent}, ${colors.green})`,
                borderRadius: 999,
                width: `${progress}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      )}
      {loan.status === "disbursed" && (
        <button
          onClick={() => onRepay(loan)}
          style={{
            width: "100%",
            background: `linear-gradient(135deg, ${colors.green}, ${colors.green}dd)`,
            border: "none",
            color: "#fff",
            borderRadius: 12,
            padding: "12px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <i className="bi bi-arrow-repeat"></i> Make Repayment
        </button>
      )}
      {loan.status === "approved" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: `${colors.info}20`,
            border: `1px solid ${colors.info}40`,
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <i className="bi bi-clock-history" style={{ color: colors.info }}></i>
          <span style={{ color: colors.info, fontSize: 13, fontWeight: 600 }}>
            Awaiting disbursement to your wallet
          </span>
        </div>
      )}
      {loan.status === "pending" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: `${colors.warning}20`,
            border: `1px solid ${colors.warning}40`,
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <i
            className="bi bi-hourglass-split"
            style={{ color: colors.warning }}
          ></i>
          <span
            style={{ color: colors.warning, fontSize: 13, fontWeight: 600 }}
          >
            Application under review
          </span>
        </div>
      )}
    </div>
  );
}

export default function Loans() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [myLoans, setMyLoans] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [repayingLoan, setRepayingLoan] = useState(null);
  const [activeTab, setActiveTab] = useState("apply");
  const [notification, setNotification] = useState(null);
  const applySectionRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchMyLoans();
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes notifSlide { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
      * { box-sizing: border-box; }
      input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      input[type=number] { -moz-appearance: textfield; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const showToast = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/loan/products.php",
      );
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchMyLoans = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/loan/my_loans.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setMyLoans(data.loans);
    } catch (err) {
      console.error(err);
    }
  };

  const applyLoan = async () => {
    if (!selectedProduct || !loanAmount) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/loan/apply.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            product_id: selectedProduct,
            amount: parseFloat(loanAmount),
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showToast("Loan application submitted. Awaiting approval.");
        fetchMyLoans();
        setLoanAmount("");
        setSelectedProduct("");
        setActiveTab("loans");
      } else showToast(data.message, "error");
    } catch (err) {
      showToast("Network error. Try again.", "error");
    }
    setLoading(false);
  };

  const repayLoan = async (loanId, amount) => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/loan/repay.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ loan_id: loanId, amount }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        fetchMyLoans();
      } else showToast(data.message, "error");
    } catch (err) {
      showToast("Network error. Try again.", "error");
    }
  };

  const selectedProductData = products.find(
    (p) => String(p.id) === String(selectedProduct),
  );
  const activeLoans = myLoans.filter(
    (l) => l.status !== "repaid" && l.status !== "rejected",
  ).length;
  const totalBorrowed = myLoans.reduce(
    (sum, l) => sum + parseFloat(l.amount || 0),
    0,
  );
  const totalRepaid = myLoans.reduce(
    (sum, l) => sum + parseFloat(l.amount_repaid || 0),
    0,
  );
  const nextDue = myLoans
    .filter((l) => l.status === "disbursed")
    .reduce((sum, l) => sum + parseFloat(l.monthly_installment || 0), 0);
  const scrollToApply = () => {
    if (applySectionRef.current) {
      applySectionRef.current.scrollIntoView({ behavior: "smooth" });
      setActiveTab("apply");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: font,
        color: colors.text,
        padding: "0 0 60px",
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

      {notification && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background:
              notification.type === "error" ? colors.danger : colors.green,
            color: "#fff",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 600,
            fontSize: 14,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: "notifSlide 0.3s ease",
            maxWidth: 320,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i
            className={`bi bi-${notification.type === "error" ? "x-circle" : "check-circle"}`}
          ></i>
          {notification.msg}
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
        <button
          onClick={scrollToApply}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: colors.accent,
            border: "none",
            borderRadius: "40px",
            padding: "10px 20px",
            cursor: "pointer",
            marginBottom: "1.5rem",
            boxShadow: `0 2px 6px ${colors.accent}55`,
          }}
        >
          <i
            className="bi bi-plus-circle"
            style={{ fontSize: "1.2rem", color: "#fff" }}
          ></i>
          <span style={{ fontWeight: 600, color: "#fff", fontSize: "14px" }}>
            Apply for Loan
          </span>
        </button>

        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            Loans
          </h2>
          <p
            style={{ fontSize: 14, color: colors.textSecondary, marginTop: 6 }}
          >
            Get quick credit with flexible repayment plans
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          <SummaryCard
            label="Active Loans"
            value={activeLoans}
            icon="file-text"
            color={colors.accent}
            colors={colors}
          />
          <SummaryCard
            label="Total Borrowed"
            value={fmt(totalBorrowed)}
            icon="cash"
            color={colors.accent2}
            colors={colors}
          />
          <SummaryCard
            label="Total Repaid"
            value={fmt(totalRepaid)}
            icon="arrow-repeat"
            color={colors.green}
            colors={colors}
          />
          <SummaryCard
            label="Next Due (monthly)"
            value={fmt(nextDue)}
            icon="calendar"
            color={colors.warning}
            colors={colors}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: `1px solid ${colors.border}`,
            marginBottom: "1.5rem",
          }}
        >
          {[
            { id: "apply", label: "Apply", icon: "plus-circle" },
            {
              id: "loans",
              label: `My Loans${myLoans.length ? ` (${myLoans.length})` : ""}`,
              icon: "folder2-open",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                color:
                  activeTab === tab.id ? colors.accent : colors.textSecondary,
                fontFamily: font,
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 14,
                padding: "12px 0 14px",
                cursor: "pointer",
                borderBottom: `2px solid ${activeTab === tab.id ? colors.accent : "transparent"}`,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <i
                className={`bi bi-${tab.icon}`}
                style={{ fontSize: "1rem" }}
              ></i>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "apply" && (
          <div ref={applySectionRef} style={{ animation: "fadeIn 0.3s ease" }}>
            <div
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  color: colors.textSecondary,
                  fontSize: 11,
                  letterSpacing: 1,
                  margin: "0 0 12px",
                }}
              >
                CHOOSE LOAN PRODUCT
              </p>
              <div style={{ display: "grid", gap: 10 }}>
                {products.length === 0 ? (
                  <p
                    style={{
                      color: colors.textSecondary,
                      fontSize: 14,
                      margin: 0,
                    }}
                  >
                    Loading products…
                  </p>
                ) : (
                  products.map((p) => (
                    <label
                      key={p.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        background:
                          String(selectedProduct) === String(p.id)
                            ? `${colors.accent}10`
                            : colors.lightGray,
                        border: `1.5px solid ${String(selectedProduct) === String(p.id) ? colors.accent : colors.border}`,
                        borderRadius: 12,
                        padding: "14px 16px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="product"
                        value={p.id}
                        checked={String(selectedProduct) === String(p.id)}
                        onChange={() => setSelectedProduct(p.id)}
                        style={{
                          accentColor: colors.accent,
                          width: 18,
                          height: 18,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: "0 0 2px",
                            fontWeight: 700,
                            fontSize: 15,
                            color: colors.text,
                          }}
                        >
                          {p.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: colors.textSecondary,
                          }}
                        >
                          {p.interest_rate}% monthly · {p.duration_months}{" "}
                          months
                        </p>
                      </div>
                      <div
                        style={{
                          background:
                            String(selectedProduct) === String(p.id)
                              ? colors.accent
                              : colors.border,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {p.duration_months}mo
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  color: colors.textSecondary,
                  fontSize: 11,
                  letterSpacing: 1,
                  margin: "0 0 12px",
                }}
              >
                LOAN AMOUNT
              </p>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: colors.accent,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  ₦
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  style={{
                    width: "100%",
                    background: colors.lightGray,
                    border: `1.5px solid ${colors.border}`,
                    borderRadius: 12,
                    padding: "16px 16px 16px 40px",
                    color: colors.text,
                    fontSize: 24,
                    fontWeight: 800,
                    outline: "none",
                  }}
                />
              </div>
              {selectedProductData && loanAmount && (
                <div
                  style={{
                    marginTop: 14,
                    background: colors.lightGray,
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: "Monthly repayment",
                      value: fmt(
                        (parseFloat(loanAmount) *
                          (1 + selectedProductData.interest_rate / 100)) /
                          selectedProductData.duration_months,
                      ),
                    },
                    {
                      label: "Total repayment",
                      value: fmt(
                        parseFloat(loanAmount) *
                          (1 + selectedProductData.interest_rate / 100),
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          color: colors.textSecondary,
                          fontSize: 10,
                          letterSpacing: 1,
                          margin: "0 0 2px",
                        }}
                      >
                        {item.label.toUpperCase()}
                      </p>
                      <p
                        style={{
                          color: colors.green,
                          fontWeight: 800,
                          fontSize: 15,
                          margin: 0,
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={applyLoan}
              disabled={loading || !selectedProduct || !loanAmount}
              style={{
                width: "100%",
                padding: "16px",
                background:
                  loading || !selectedProduct || !loanAmount
                    ? colors.lightGray
                    : `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`,
                border: "none",
                color:
                  loading || !selectedProduct || !loanAmount
                    ? colors.textSecondary
                    : "#fff",
                borderRadius: 14,
                fontWeight: 800,
                fontSize: 16,
                cursor:
                  loading || !selectedProduct || !loanAmount
                    ? "not-allowed"
                    : "pointer",
                opacity: !selectedProduct || !loanAmount ? 0.6 : 1,
                boxShadow:
                  selectedProduct && loanAmount
                    ? `0 4px 12px ${colors.accent}40`
                    : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <Spinner /> Processing…
                </>
              ) : (
                <>
                  <i className="bi bi-send"></i> Submit Application
                </>
              )}
            </button>
            <p
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              <i className="bi bi-info-circle"></i> By applying you agree to our
              loan terms and repayment schedule.
            </p>
          </div>
        )}

        {activeTab === "loans" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {myLoans.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 20,
                }}
              >
                <i
                  className="bi bi-inbox"
                  style={{ fontSize: "48px", color: colors.textSecondary }}
                ></i>
                <h3 style={{ color: colors.text, margin: "16px 0 8px" }}>
                  No loans yet
                </h3>
                <p
                  style={{
                    color: colors.textSecondary,
                    margin: "0 0 20px",
                    fontSize: 14,
                  }}
                >
                  Apply for your first loan to get started
                </p>
                <button
                  onClick={() => setActiveTab("apply")}
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`,
                    border: "none",
                    color: "#fff",
                    borderRadius: 12,
                    padding: "12px 24px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Apply Now
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {myLoans.map((loan) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    onRepay={setRepayingLoan}
                    colors={colors}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {repayingLoan && (
        <RepayModal
          loan={repayingLoan}
          onClose={() => setRepayingLoan(null)}
          onRepay={repayLoan}
          colors={colors}
        />
      )}
    </div>
  );
}
