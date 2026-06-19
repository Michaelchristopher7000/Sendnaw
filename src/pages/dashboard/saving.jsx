import { useState, useEffect } from "react";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

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

function fmt(n) {
  return (
    "₦" +
    Number(n).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

const getPlanIcon = (type) => {
  const icons = {
    fixed: "calendar-check",
    flexible: "arrow-left-right",
    locked: "lock",
    rent: "house",
    emergency: "exclamation-triangle",
    education: "book",
    business: "briefcase",
  };
  return icons[type] || "piggy-bank";
};

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
          color,
        }}
      >
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div>
        <p
          style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 4 }}
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

function PlanCard({ plan, selected, onSelect, colors }) {
  return (
    <div
      onClick={() => onSelect(plan.id)}
      style={{
        background: selected ? `${colors.indigo}10` : colors.cardBg,
        border: `1.5px solid ${selected ? colors.indigo : colors.border}`,
        borderRadius: "16px",
        padding: "1rem",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `${colors.indigo}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.indigo,
            }}
          >
            <i className={`bi bi-${getPlanIcon(plan.type)}`}></i>
          </div>
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: colors.text,
                margin: 0,
              }}
            >
              {plan.name}
            </p>
            <p style={{ fontSize: 11, color: colors.textSecondary, margin: 0 }}>
              {plan.type}
            </p>
          </div>
        </div>
        <div
          style={{
            background: selected ? colors.indigo : colors.border,
            width: 20,
            height: 20,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: selected ? "#fff" : colors.textSecondary,
          }}
        >
          {selected && (
            <i className="bi bi-check-lg" style={{ fontSize: 12 }}></i>
          )}
        </div>
      </div>
      <p style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 6 }}>
        <strong style={{ color: colors.green }}>{plan.interest_rate}%</strong>{" "}
        p.a. · Min ₦{plan.min_amount.toLocaleString()}
        {plan.duration_days && ` · ${plan.duration_days} days`}
      </p>
      <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
        {plan.type === "locked"
          ? "🔒 Locked – early liquidation requires admin approval (72h)"
          : plan.type === "fixed"
            ? `📅 Fixed term – maturity after ${plan.duration_days} days`
            : "✅ Flexible – withdraw anytime"}
      </p>
    </div>
  );
}

function SavingCard({ saving, onWithdraw, onLiquidate, colors }) {
  const [hovered, setHovered] = useState(false);
  const isMatured = saving.end_date && new Date(saving.end_date) < new Date();
  const canWithdraw =
    saving.type === "flexible" || (saving.type === "fixed" && isMatured);
  const isLocked = saving.type === "locked";
  const computeInterest = () => {
    if (saving.type === "fixed")
      return saving.amount * (saving.interest_rate / 100);
    if (saving.type === "flexible" && saving.start_date) {
      const days = Math.floor(
        (new Date() - new Date(saving.start_date)) / 86400000,
      );
      return saving.amount * (saving.interest_rate / 100) * (days / 365);
    }
    return 0;
  };
  const estimatedInterest = computeInterest();
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: "20px",
        padding: "1.25rem",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 8px 20px rgba(0,0,0,0.05)"
          : "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            {saving.name}
          </p>
          <p
            style={{ fontSize: 11, color: colors.textSecondary, marginTop: 4 }}
          >
            <i className="bi bi-tag"></i> {saving.type} · Started{" "}
            {new Date(saving.start_date).toLocaleDateString()}
          </p>
        </div>
        <div
          style={{
            background:
              saving.status === "active"
                ? `${colors.green}20`
                : `${colors.gray}20`,
            borderRadius: "40px",
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 600,
            color:
              saving.status === "active" ? colors.green : colors.textSecondary,
          }}
        >
          {saving.status}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <p style={{ fontSize: 10, color: colors.textSecondary, margin: 0 }}>
            Amount saved
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            {fmt(saving.amount)}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 10, color: colors.textSecondary, margin: 0 }}>
            Est. interest
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: colors.green,
              margin: 0,
            }}
          >
            {fmt(estimatedInterest)}
          </p>
        </div>
      </div>
      {saving.end_date && (
        <div
          style={{
            marginBottom: 16,
            fontSize: 11,
            color: colors.textSecondary,
          }}
        >
          <i className="bi bi-calendar"></i> Maturity:{" "}
          {new Date(saving.end_date).toLocaleDateString()}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {canWithdraw && saving.status === "active" && (
          <button
            onClick={() => onWithdraw(saving.id)}
            style={{
              flex: 1,
              background: colors.green,
              color: "#fff",
              border: "none",
              borderRadius: "40px",
              padding: "8px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <i className="bi bi-cash-stack"></i> Withdraw
          </button>
        )}
        {isLocked && saving.status === "active" && (
          <button
            onClick={() => onLiquidate(saving.id)}
            style={{
              flex: 1,
              background: colors.warning,
              color: "#fff",
              border: "none",
              borderRadius: "40px",
              padding: "8px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <i className="bi bi-arrow-repeat"></i> Request Liquidation
          </button>
        )}
      </div>
    </div>
  );
}

const durationOptions = [
  { label: "30 days (1 month)", value: 30 },
  { label: "60 days (2 months)", value: 60 },
  { label: "90 days (3 months)", value: 90 },
  { label: "180 days (6 months)", value: 180 },
  { label: "365 days (1 year)", value: 365 },
  { label: "Custom", value: "custom" },
];

function CreateSavingModal({ plans, onClose, onCreated, colors }) {
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [amount, setAmount] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [customDays, setCustomDays] = useState("");
  const [loading, setLoading] = useState(false);
  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const showDurationPicker =
    selectedPlan &&
    selectedPlan.type !== "flexible" &&
    selectedPlan.type !== "fixed";
  const minAmount = selectedPlan?.min_amount || 0;

  const handleSubmit = async () => {
    if (!selectedPlanId) {
      showNotification("SendNaw", "Please select a plan", "error");
      return;
    }
    const numAmount = parseFloat(amount);
    if (!amount || numAmount < minAmount) {
      showNotification(
        "SendNaw",
        `Minimum amount is ${fmt(minAmount)}`,
        "error",
      );
      return;
    }
    let finalDuration = null;
    if (showDurationPicker) {
      if (durationDays === "custom") {
        const custom = parseInt(customDays);
        if (!customDays || custom < 1) {
          showNotification(
            "SendNaw",
            "Please enter a valid custom duration (minimum 1 day)",
            "error",
          );
          return;
        }
        finalDuration = custom;
      } else if (durationDays) finalDuration = parseInt(durationDays);
      else {
        showNotification("SendNaw", "Please select a duration", "error");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/savings/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            plan_id: selectedPlanId,
            amount: numAmount,
            duration_days: finalDuration,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Savings plan started!", "success");
        onCreated();
        onClose();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setLoading(false);
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
          borderRadius: "24px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Start New Savings
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: colors.textSecondary,
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSecondary,
              display: "block",
              marginBottom: 8,
            }}
          >
            Choose Plan
          </label>
          <div
            style={{
              display: "grid",
              gap: 10,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlanId === plan.id}
                onSelect={setSelectedPlanId}
                colors={colors}
              />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSecondary,
              display: "block",
              marginBottom: 8,
            }}
          >
            Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Min ${minAmount.toLocaleString()}`}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: 16,
              background: colors.cardBg,
              color: colors.text,
            }}
          />
        </div>
        {showDurationPicker && (
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                display: "block",
                marginBottom: 8,
              }}
            >
              Duration (days)
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
                outline: "none",
                fontSize: 14,
                background: colors.cardBg,
                color: colors.text,
                marginBottom: durationDays === "custom" ? 12 : 0,
              }}
            >
              <option value="">Select duration</option>
              {durationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {durationDays === "custom" && (
              <input
                type="number"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                placeholder="Enter number of days"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: `1px solid ${colors.border}`,
                  outline: "none",
                  fontSize: 14,
                  marginTop: 8,
                  background: colors.cardBg,
                  color: colors.text,
                }}
              />
            )}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !selectedPlanId ||
            !amount ||
            parseFloat(amount) < minAmount ||
            (showDurationPicker && !durationDays)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "40px",
            background:
              loading ||
              !selectedPlanId ||
              !amount ||
              parseFloat(amount) < minAmount ||
              (showDurationPicker && !durationDays)
                ? colors.border
                : `linear-gradient(135deg, ${colors.indigo}, ${colors.purple})`,
            border: "none",
            color:
              loading ||
              !selectedPlanId ||
              !amount ||
              parseFloat(amount) < minAmount ||
              (showDurationPicker && !durationDays)
                ? colors.textSecondary
                : "#fff",
            fontWeight: 700,
            cursor:
              loading ||
              !selectedPlanId ||
              !amount ||
              parseFloat(amount) < minAmount ||
              (showDurationPicker && !durationDays)
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading ? (
            <i className="bi bi-hourglass-split"></i>
          ) : (
            <i className="bi bi-plus-circle"></i>
          )}{" "}
          Start Saving
        </button>
      </div>
    </div>
  );
}

function LiquidateModal({ saving, onClose, onConfirm, colors }) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(saving.id);
    setLoading(false);
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
          borderRadius: "24px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Early Liquidation Request
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: colors.textSecondary,
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <p
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 12,
          }}
        >
          You are requesting to liquidate your <strong>{saving.name}</strong>{" "}
          savings of <strong>{fmt(saving.amount)}</strong>.
        </p>
        <div
          style={{
            background: `${colors.warning}20`,
            padding: "12px",
            borderRadius: "12px",
            marginBottom: 20,
          }}
        >
          <i
            className="bi bi-info-circle"
            style={{ color: colors.warning }}
          ></i>
          <span style={{ fontSize: 12, color: colors.warning, marginLeft: 8 }}>
            This request will be sent to admin and takes up to 72 hours to
            process. Early liquidation may incur penalty fees.
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
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
            onClick={handleConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.warning,
              border: "none",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <i className="bi bi-hourglass-split"></i>
            ) : (
              "Request Liquidation"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Savings() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [plans, setPlans] = useState([]);
  const [mySavings, setMySavings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [liquidatingSaving, setLiquidatingSaving] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
    fetchMySavings();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/savings/plans.php",
      );
      const data = await res.json();
      if (data.success) setPlans(data.plans);
    } catch {
      showNotification("SendNaw", "Failed to load plans", "error");
    }
  };
  const fetchMySavings = async () => {
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/savings/list.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setMySavings(data.savings);
    } catch {
      showNotification("SendNaw", "Failed to load savings", "error");
    }
  };

  const withdrawSaving = async (savingId) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/savings/withdraw.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ saving_id: savingId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification(
          "SendNaw",
          `Withdrawn ${fmt(data.amount)} (interest ${fmt(data.interest)})`,
          "success",
        );
        fetchMySavings();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setLoading(false);
  };

  const requestLiquidation = async (savingId) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/savings/liquidate.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ saving_id: savingId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification(
          "SendNaw",
          "Liquidation request sent to admin. It will be processed within 72 hours.",
          "success",
        );
        fetchMySavings();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
    setLoading(false);
  };

  const totalSaved = mySavings.reduce(
    (sum, s) => sum + parseFloat(s.amount || 0),
    0,
  );
  const totalInterest = mySavings.reduce((sum, s) => {
    if (s.type === "fixed") return sum + s.amount * (s.interest_rate / 100);
    if (s.type === "flexible" && s.start_date) {
      const days = Math.floor((new Date() - new Date(s.start_date)) / 86400000);
      return sum + s.amount * (s.interest_rate / 100) * (days / 365);
    }
    return sum;
  }, 0);
  const activeSavings = mySavings.filter((s) => s.status === "active").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.darkBg,
        fontFamily: `'DM Sans','Segoe UI',sans-serif`,
        padding: "2rem 1rem",
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

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: colors.text,
                margin: 0,
              }}
            >
              Savings
            </h2>
            <p
              style={{
                fontSize: 14,
                color: colors.textSecondary,
                marginTop: 4,
              }}
            >
              Grow your money with flexible plans
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: colors.indigo,
              border: "none",
              borderRadius: "40px",
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <i className="bi bi-plus-circle"></i> New Savings
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          <SummaryCard
            label="Total Saved"
            value={fmt(totalSaved)}
            icon="piggy-bank"
            color={colors.green}
            colors={colors}
          />
          <SummaryCard
            label="Est. Interest"
            value={fmt(totalInterest)}
            icon="graph-up"
            color={colors.purple}
            colors={colors}
          />
          <SummaryCard
            label="Active Plans"
            value={activeSavings}
            icon="calendar-check"
            color={colors.indigo}
            colors={colors}
          />
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              My Savings
            </p>
            <span style={{ fontSize: 12, color: colors.textSecondary }}>
              {mySavings.length} total
            </span>
          </div>
          {mySavings.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: colors.cardBg,
                borderRadius: "24px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <i
                className="bi bi-inbox"
                style={{ fontSize: 48, color: colors.textSecondary }}
              ></i>
              <h3 style={{ marginTop: 16, color: colors.text }}>
                No active savings
              </h3>
              <p style={{ color: colors.textSecondary }}>
                Start a savings plan to grow your money.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  marginTop: 12,
                  background: colors.indigo,
                  border: "none",
                  borderRadius: "40px",
                  padding: "10px 20px",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Start Saving
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {mySavings.map((saving) => (
                <SavingCard
                  key={saving.id}
                  saving={saving}
                  onWithdraw={withdrawSaving}
                  onLiquidate={(id) => {
                    const savingObj = mySavings.find((s) => s.id === id);
                    setLiquidatingSaving(savingObj);
                  }}
                  colors={colors}
                />
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: colors.cardBg,
            borderRadius: "16px",
            border: `1px solid ${colors.border}`,
            fontSize: "12px",
            color: colors.textSecondary,
            textAlign: "center",
          }}
        >
          <i className="bi bi-shield-check"></i> Savings are protected. Early
          withdrawal may incur fees. Locked plans require admin approval for
          early liquidation (72h processing).
        </div>
      </div>
      {showCreateModal && (
        <CreateSavingModal
          plans={plans}
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchMySavings}
          colors={colors}
        />
      )}
      {liquidatingSaving && (
        <LiquidateModal
          saving={liquidatingSaving}
          onClose={() => setLiquidatingSaving(null)}
          onConfirm={requestLiquidation}
          colors={colors}
        />
      )}
    </div>
  );
}
