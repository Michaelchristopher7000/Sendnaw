import { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accent: "#4F46E5",
  purple: "#9333EA",
  green: "#10B981",
  info: "#3B82F6",
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
  accent: "#8A5CF7",
  purple: "#A78BFA",
  green: "#34D399",
  info: "#60A5FA",
  gray: "#6B7280",
  lightGray: "#334155",
  darkBg: "#0F172A",
};

const font = `'DM Sans', 'Segoe UI', sans-serif`;

export default function Notifications() {
  const { token } = useAuth();
  const { theme } = useTheme(); // only need theme, not toggle (layout provides toggle)
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/notifications/list.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(
        "https://sendnawbackend.onrender.com/api/notifications/mark_read.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ notification_id: id }),
        },
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: 1 } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(
        "https://sendnawbackend.onrender.com/api/notifications/mark_all_read.php",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: 1 })));
      showNotification("SendNaw", "All notifications marked as read");
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = notifications.filter((n) =>
    filter === "all" ? true : !n.read,
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${colors.lightGray}`,
            borderTop: `3px solid ${colors.accent}`,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.text,
            margin: 0,
          }}
        >
          Notifications
        </h2>
        <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 4 }}>
          Stay updated on your account activity
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            background: colors.cardBg,
            padding: "4px",
            borderRadius: "40px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "6px 20px",
              borderRadius: "40px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: filter === "all" ? colors.accent : "transparent",
              color: filter === "all" ? "#fff" : colors.textSecondary,
              border: "none",
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={{
              padding: "6px 20px",
              borderRadius: "40px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: filter === "unread" ? colors.accent : "transparent",
              color: filter === "unread" ? "#fff" : colors.textSecondary,
              border: "none",
            }}
          >
            Unread
          </button>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllAsRead}
            style={{
              background: "transparent",
              border: `1px solid ${colors.accent}`,
              borderRadius: "40px",
              padding: "6px 16px",
              fontSize: 12,
              fontWeight: 500,
              color: colors.accent,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <i className="bi bi-check2-all"></i> Mark all read
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
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
            No notifications
          </h3>
          <p style={{ color: colors.textSecondary, fontSize: 14 }}>
            You're all caught up!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && markAsRead(notif.id)}
              style={{
                background: colors.cardBg,
                border: `1px solid ${notif.read ? colors.border : colors.purple + "80"}`,
                borderRadius: "16px",
                padding: "1rem",
                cursor: notif.read ? "default" : "pointer",
                boxShadow: !notif.read
                  ? `0 2px 8px ${colors.purple}20`
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background:
                      notif.type === "transaction"
                        ? `${colors.green}20`
                        : notif.type === "kyc"
                          ? `${colors.info}20`
                          : `${colors.purple}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      notif.type === "transaction"
                        ? colors.green
                        : notif.type === "kyc"
                          ? colors.info
                          : colors.purple,
                  }}
                >
                  <i
                    className={`bi ${
                      notif.type === "transaction"
                        ? "bi-arrow-left-right"
                        : notif.type === "kyc"
                          ? "bi-shield-check"
                          : "bi-bell"
                    }`}
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <p
                      style={{
                        fontWeight: notif.read ? 500 : 700,
                        color: colors.text,
                        margin: 0,
                        fontSize: 14,
                      }}
                    >
                      {notif.title}
                    </p>
                    <span style={{ fontSize: 11, color: colors.textSecondary }}>
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: colors.textSecondary,
                      marginTop: 6,
                      marginBottom: 0,
                    }}
                  >
                    {notif.message}
                  </p>
                </div>
                {!notif.read && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: colors.purple,
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "12px",
          color: colors.textSecondary,
        }}
      >
        <i className="bi bi-bell"></i> Notifications are kept for 30 days
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
