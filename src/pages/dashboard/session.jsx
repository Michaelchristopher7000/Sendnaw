import { useEffect, useState } from "react";
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

const getDeviceIcon = (deviceName) => {
  const name = deviceName?.toLowerCase() || "";
  if (
    name.includes("mobile") ||
    name.includes("android") ||
    name.includes("iphone")
  )
    return "bi-phone";
  if (name.includes("tablet") || name.includes("ipad")) return "bi-tablet";
  if (name.includes("windows")) return "bi-windows";
  if (name.includes("mac")) return "bi-apple";
  return "bi-laptop";
};

function RevokeModal({ session, onClose, onConfirm, colors }) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(session.id);
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
            Revoke Session
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
        <p
          style={{
            fontSize: "0.9rem",
            color: colors.textSecondary,
            marginBottom: "1rem",
          }}
        >
          Are you sure you want to revoke this session?
          <br />
          <strong>{session.device_name}</strong> will be logged out immediately.
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
            onClick={handleConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "40px",
              background: colors.danger,
              border: "none",
              color: "#fff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <i className="bi bi-hourglass-split"></i> : "Revoke"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sessions() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revokingSession, setRevokingSession] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/settings/session.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setSessions(data.sessions);
      else
        showNotification(
          "SendNaw",
          data.message || "Failed to load sessions",
          "error",
        );
    } catch {
      showNotification("SendNaw", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (tokenId) => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/settings/revoke_session.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ token_id: tokenId }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Session revoked successfully", "success");
        fetchSessions();
      } else
        showNotification(
          "SendNaw",
          data.message || "Failed to revoke",
          "error",
        );
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
  };

  const getRelativeTime = (dateStr) => {
    const date = new Date(dateStr),
      now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.darkBg,
        fontFamily: "'DM Sans', -apple-system, sans-serif",
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

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem,5vw,1.8rem)",
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            Active Sessions
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              color: colors.textSecondary,
              marginTop: "0.25rem",
            }}
          >
            Manage devices where you're logged in
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: `3px solid ${colors.lightGray}`,
                borderTop: `3px solid ${colors.indigo}`,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto",
              }}
            />
            <p style={{ marginTop: "1rem", color: colors.textSecondary }}>
              Loading sessions...
            </p>
          </div>
        ) : sessions.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              background: colors.cardBg,
              borderRadius: "24px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <i
              className="bi bi-wifi-off"
              style={{ fontSize: "3rem", color: colors.textSecondary }}
            ></i>
            <h3 style={{ marginTop: "1rem", color: colors.text }}>
              No active sessions
            </h3>
            <p style={{ color: colors.textSecondary }}>
              You are only logged in on this device.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {sessions.map((session) => {
              const isCurrent =
                session.is_current === 1 || session.current === 1;
              const deviceIcon = getDeviceIcon(session.device_name);
              return (
                <div
                  key={session.id}
                  style={{
                    background: colors.cardBg,
                    borderRadius: "20px",
                    border: isCurrent
                      ? `2px solid ${colors.indigo}`
                      : `1px solid ${colors.border}`,
                    padding: "1rem",
                    transition: "all 0.2s",
                    boxShadow: isCurrent
                      ? `0 4px 12px ${colors.indigo}20`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flex: "2 1 200px",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "16px",
                          background: `${colors.indigo}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: colors.indigo,
                        }}
                      >
                        <i
                          className={`bi ${deviceIcon}`}
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontWeight: 700,
                            margin: 0,
                            color: colors.text,
                            fontSize: "0.95rem",
                          }}
                        >
                          {session.device_name || "Unknown device"}
                          {isCurrent && (
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                background: colors.indigo,
                                color: "#fff",
                                padding: "2px 8px",
                                borderRadius: "40px",
                              }}
                            >
                              Current
                            </span>
                          )}
                        </p>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: colors.textSecondary,
                            margin: "4px 0 0",
                          }}
                        >
                          <i className="bi bi-globe"></i>{" "}
                          {session.ip_address || "IP unknown"}
                        </p>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: colors.textSecondary,
                            margin: "2px 0 0",
                          }}
                        >
                          <i className="bi bi-clock"></i> Last active:{" "}
                          {getRelativeTime(session.last_activity)}
                        </p>
                      </div>
                    </div>
                    {!isCurrent && (
                      <button
                        onClick={() => setRevokingSession(session)}
                        style={{
                          background: "transparent",
                          border: `1px solid ${colors.border}`,
                          borderRadius: "40px",
                          padding: "8px 20px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: colors.danger,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = `${colors.danger}10`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <i className="bi bi-x-circle"></i> Revoke
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: "0.7rem",
            color: colors.textSecondary,
          }}
        >
          <i className="bi bi-shield-check"></i> Revoking a session will sign
          that device out immediately.
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {revokingSession && (
        <RevokeModal
          session={revokingSession}
          onClose={() => setRevokingSession(null)}
          onConfirm={revokeSession}
          colors={colors}
        />
      )}
    </div>
  );
}
