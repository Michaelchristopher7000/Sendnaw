import { useState, useEffect } from "react";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// ─── Light & Dark Theme Definitions ─────────────────────────────────────────
const lightTheme = {
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  indigo: "#4F46E5",
  purple: "#9333EA",
  green: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  gray: "#6B7280",
  surface: "#F9FAFB",
  indigoLight: "#4F46E510",
  purpleLight: "#9333EA10",
  greenLight: "#10B98110",
  dangerLight: "#EF444410",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSub: "#A8A4C0",
  textMuted: "#6B6B8F",
  border: "#2A2440",
  borderLight: "#3D2E5A",
  indigo: "#8A5CF7",
  purple: "#A78BFA",
  green: "#34D399",
  danger: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
  gray: "#6B7280",
  surface: "#1A1530",
  indigoLight: "#8A5CF720",
  purpleLight: "#A78BFA20",
  greenLight: "#34D39920",
  dangerLight: "#F8717120",
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

// Helper: get user ID from localStorage
const getUserId = () => {
  return (
    localStorage.getItem("user_id") ||
    localStorage.getItem("userId") ||
    localStorage.getItem("id") ||
    null
  );
};

// ─── Summary Card (receives colors via props) ──────────────────────────────
function SummaryCard({ label, value, icon, color, colors }) {
  const bgOpacity = colors === lightTheme ? "10" : "20";
  return (
    <div
      style={{
        background: colors.cardBg,
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: `1px solid ${colors.borderLight}`,
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
          background: `${color}${bgOpacity}`,
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
        <p style={{ fontSize: 12, color: colors.textSub, marginBottom: 4 }}>
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

// ─── Group Card (receives colors) ─────────────────────────────────────────
function GroupCard({
  group,
  onContribute,
  onPayout,
  onCloseGroup,
  currentUserId,
  colors,
}) {
  const [hovered, setHovered] = useState(false);
  const isCreator = String(group.created_by) === String(currentUserId);
  const nextPayoutAmount = group.contribution_amount * group.member_count;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.borderLight}`,
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
            {group.name}
          </p>
          <p style={{ fontSize: 11, color: colors.textSub, marginTop: 4 }}>
            <i className="bi bi-tag"></i> ID: {group.id} &nbsp;|&nbsp;
            <i className="bi bi-people"></i> {group.member_count} members
          </p>
        </div>
        <div
          style={{
            background: `${colors.indigo}20`,
            borderRadius: "40px",
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: colors.indigo,
          }}
        >
          {group.frequency}
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
          <p style={{ fontSize: 10, color: colors.textMuted, margin: 0 }}>
            Contribution
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            {fmt(group.contribution_amount)} / {group.frequency}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 10, color: colors.textMuted, margin: 0 }}>
            Next payout
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: colors.green,
              margin: 0,
            }}
          >
            {fmt(nextPayoutAmount)}
          </p>
          {group.next_payout_user && (
            <p style={{ fontSize: 10, color: colors.textSub, margin: 0 }}>
              <i className="bi bi-person-circle"></i> User #
              {group.next_payout_user}
            </p>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 16, fontSize: 11, color: colors.textSub }}>
        <i className="bi bi-arrow-repeat"></i> Cycle {group.current_cycle}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {!group.contributed && (
          <button
            onClick={() => onContribute(group.id)}
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
            <i className="bi bi-wallet2"></i> Contribute
          </button>
        )}
        {isCreator && (
          <button
            onClick={() => onPayout(group.id)}
            style={{
              flex: 1,
              background: colors.indigo,
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
            <i className="bi bi-cash-stack"></i> Payout
          </button>
        )}
        {isCreator && (
          <button
            onClick={() => onCloseGroup(group.id)}
            style={{
              flex: 0.7,
              background: colors.danger,
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
            <i className="bi bi-archive"></i> Close
          </button>
        )}
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 10,
          color: colors.textSub,
          textAlign: "center",
        }}
      >
        <i className="bi bi-info-circle"></i> Contribute manually – funds
        deducted from wallet.
      </div>
    </div>
  );
}

// ─── Create Group Modal (receives colors) ─────────────────────────────────
function CreateGroupModal({ onClose, onCreated, colors }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !amount) {
      showNotification("SendNaw", "Please fill all fields", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, amount: parseFloat(amount), frequency }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification(
          "SendNaw",
          `Group "${name}" created! ID: ${data.group_id}`,
          "success",
        );
        onCreated();
        onClose();
      } else {
        showNotification("SendNaw", data.message, "error");
      }
    } catch (err) {
      console.error(err);
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
          maxWidth: 400,
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
            Create Savings Group
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: colors.textSub,
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSub,
              display: "block",
              marginBottom: 4,
            }}
          >
            Group Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.borderLight}`,
              background: colors.surface,
              color: colors.text,
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSub,
              display: "block",
              marginBottom: 4,
            }}
          >
            Contribution Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.borderLight}`,
              background: colors.surface,
              color: colors.text,
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSub,
              display: "block",
              marginBottom: 4,
            }}
          >
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.borderLight}`,
              background: colors.surface,
              color: colors.text,
              outline: "none",
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "40px",
            background: `linear-gradient(135deg, ${colors.indigo}, ${colors.purple})`,
            border: "none",
            color: "#fff",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <i className="bi bi-hourglass-split"></i>
          ) : (
            <i className="bi bi-plus-circle"></i>
          )}{" "}
          Create Group
        </button>
      </div>
    </div>
  );
}

// ─── Join Group Modal (receives colors) ───────────────────────────────────
function JoinGroupModal({ onClose, onJoined, colors }) {
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!groupId) {
      showNotification("SendNaw", "Enter a valid group ID", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/join.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ group_id: groupId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Joined group successfully!", "success");
        onJoined();
        onClose();
      } else {
        showNotification("SendNaw", data.message, "error");
      }
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
          maxWidth: 400,
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
            Join a Group
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: colors.textSub,
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontSize: 12,
              color: colors.textSub,
              display: "block",
              marginBottom: 4,
            }}
          >
            Group ID
          </label>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="e.g., 5"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: `1px solid ${colors.borderLight}`,
              background: colors.surface,
              color: colors.text,
              outline: "none",
            }}
          />
          <p style={{ fontSize: 11, color: colors.textSub, marginTop: 6 }}>
            <i className="bi bi-info-circle"></i> Ask the group creator for the
            ID
          </p>
        </div>
        <button
          onClick={handleJoin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "40px",
            background: colors.green,
            border: "none",
            color: "#fff",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <i className="bi bi-hourglass-split"></i>
          ) : (
            <i className="bi bi-person-plus"></i>
          )}{" "}
          Join Group
        </button>
      </div>
    </div>
  );
}

// ─── Main Ajo Component ────────────────────────────────────────────────────
export default function Ajo() {
  const { theme, toggleTheme } = useTheme(); // ✅ hook inside component
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchGroups();
    setCurrentUserId(getUserId());
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/my_groups.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setGroups(data.groups);
        console.log(
          "Loaded groups:",
          data.groups.map((g) => ({ id: g.id, created_by: g.created_by })),
        );
      } else {
        console.error("Failed to load groups:", data.message);
      }
    } catch (err) {
      console.error(err);
      showNotification("SendNaw", "Failed to load groups", "error");
    }
    setLoading(false);
  };

  const contribute = async (groupId) => {
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/contribute.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ group_id: groupId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Contribution recorded!", "success");
        fetchGroups();
      } else {
        showNotification("SendNaw", data.message, "error");
      }
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
  };

  const processPayout = async (groupId) => {
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/payout.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ group_id: groupId }),
        },
      );
      const data = await res.json();
      showNotification(
        "SendNaw",
        data.message,
        data.success ? "success" : "error",
      );
      if (data.success) fetchGroups();
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
  };

  const closeGroup = async (groupId) => {
    if (
      !window.confirm(
        "Are you sure you want to close this group?\n\nMembers will no longer be able to contribute or receive payouts.",
      )
    )
      return;
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/ajo/close.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ group_id: groupId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Group closed successfully", "success");
        fetchGroups();
      } else {
        showNotification("SendNaw", data.message, "error");
      }
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
  };

  const totalSaved = groups.reduce(
    (sum, g) => sum + (g.my_total_contributions || 0),
    0,
  );
  const activeGroups = groups.length;
  const nextTotalPayout = groups.reduce(
    (sum, g) => sum + g.contribution_amount * g.member_count,
    0,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: font,
        padding: "2rem 1rem",
        position: "relative",
      }}
    >
      {/* Theme toggle button (floating) */}
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 100,
          background: colors.cardBg,
          border: `1px solid ${colors.borderLight}`,
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
        ></i>
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
              Savings Groups
            </h2>
            <p style={{ fontSize: 14, color: colors.textSub, marginTop: 4 }}>
              Ajo / Esusu – rotating savings
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setShowJoinModal(true)}
              style={{
                background: colors.cardBg,
                border: `1px solid ${colors.indigo}`,
                borderRadius: "40px",
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: colors.indigo,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <i className="bi bi-person-plus"></i> Join
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                background: colors.indigo,
                border: "none",
                borderRadius: "40px",
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <i className="bi bi-plus-circle"></i> Create
            </button>
          </div>
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
            label="Total Saved"
            value={fmt(totalSaved)}
            icon="piggy-bank"
            color={colors.green}
            colors={colors}
          />
          <SummaryCard
            label="Active Groups"
            value={activeGroups}
            icon="people"
            color={colors.indigo}
            colors={colors}
          />
          <SummaryCard
            label="Next Payout (total)"
            value={fmt(nextTotalPayout)}
            icon="cash-stack"
            color={colors.purple}
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
                color: colors.textSub,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              My Groups
            </p>
            <span style={{ fontSize: 12, color: colors.textSub }}>
              {groups.length} total
            </span>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <i
                className="bi bi-hourglass-split"
                style={{ fontSize: 32, color: colors.textSub }}
              ></i>
              <p style={{ color: colors.textSub }}>Loading groups...</p>
            </div>
          )}

          {!loading && groups.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: colors.cardBg,
                borderRadius: "24px",
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              <i
                className="bi bi-inbox"
                style={{ fontSize: 48, color: colors.textSub }}
              ></i>
              <h3 style={{ marginTop: 16, color: colors.text }}>
                No groups yet
              </h3>
              <p style={{ color: colors.textSub }}>
                Create a new group or join an existing one using a group ID.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    background: colors.indigo,
                    border: "none",
                    borderRadius: "40px",
                    padding: "10px 20px",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Create Group
                </button>
                <button
                  onClick={() => setShowJoinModal(true)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${colors.indigo}`,
                    borderRadius: "40px",
                    padding: "10px 20px",
                    color: colors.indigo,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Join Group
                </button>
              </div>
            </div>
          )}

          {!loading && groups.length > 0 && (
            <div style={{ display: "grid", gap: 16 }}>
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onContribute={contribute}
                  onPayout={processPayout}
                  onCloseGroup={closeGroup}
                  currentUserId={currentUserId}
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
            border: `1px solid ${colors.borderLight}`,
            fontSize: "12px",
            color: colors.textSub,
            textAlign: "center",
          }}
        >
          <i className="bi bi-shield-check"></i> Ajo/Esusu groups are informal
          savings circles. Payout rotates based on join order. Contribute on
          time to keep the cycle running.
        </div>
      </div>

      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchGroups}
          colors={colors}
        />
      )}
      {showJoinModal && (
        <JoinGroupModal
          onClose={() => setShowJoinModal(false)}
          onJoined={fetchGroups}
          colors={colors}
        />
      )}
    </div>
  );
}
