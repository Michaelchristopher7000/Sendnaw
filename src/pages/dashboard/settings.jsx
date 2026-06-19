import { useState, useEffect } from "react";
import { useAuth } from "../../context/authcontext";
import Sessions from "./session";
import { requestNotificationPermission } from "../../utils/notify";
import { requestFCMToken, onForegroundMessage } from "../../firebase";
import { storeFCMToken } from "../services/api";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// ─── Theme definitions (light / dark) ─────────────────────────────────────
const lightTheme = {
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#6C757D",
  border: "#E5E7EB",
  purple: "#6f42c1",
  purpleLight: "#f0ebff",
  danger: "#dc3545",
  success: "#28a745",
  gray: "#6c757d",
  inputBg: "#FFFFFF",
  inputBorder: "#E5E7EB",
  messageBg: "#333333",
  messageText: "#FFFFFF",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  purple: "#8A5CF7",
  purpleLight: "#2D2A4A",
  danger: "#F87171",
  success: "#34D399",
  gray: "#9CA3AF",
  inputBg: "#2A2440",
  inputBorder: "#3D2E5A",
  messageBg: "#1E293B",
  messageText: "#F1F5F9",
};

export default function Settings() {
  const { user, token, login } = useAuth();
  const { theme, toggleTheme } = useTheme(); // ✅ hook inside component
  const COLORS = theme === "dark" ? darkTheme : lightTheme;

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("default");
  const [pushEnabled, setPushEnabled] = useState(false);

  // Check browser notification permission
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  // Listen for foreground messages
  useEffect(() => {
    onForegroundMessage((payload) => {
      showNotification(payload.notification.title, payload.notification.body);
    });
  }, []);

  // Profile state
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2FA state
  const [secret, setSecret] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [enabling, setEnabling] = useState(false);

  // Profile update
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/settings/update_profile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email, phone }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage("Profile updated. Refresh to see changes.");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  // Change password
  const changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/settings/change_password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage("Password changed");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  // 2FA setup
  const setup2FA = async () => {
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/settings/2fa_setup.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setSecret(data.secret);
        setQrUrl(data.qr_url);
        setMessage(
          "Scan the QR code with Google Authenticator (or enter secret manually)",
        );
        setEnabling(true);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  // Enable 2FA
  const enable2FA = async () => {
    if (!otpCode) {
      setMessage("Please enter the 6-digit code from Google Authenticator");
      return;
    }
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/settings/2fa_enable.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ code: otpCode, secret }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage("2FA enabled successfully");
        setEnabling(false);
        setSecret("");
        setQrUrl("");
        setOtpCode("");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  // Disable 2FA
  const disable2FA = async () => {
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/settings/2fa_disable.php",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setMessage("2FA disabled");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  // Request browser notifications (old method)
  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationStatus(granted ? "granted" : "denied");
    if (granted) {
      setMessage("Browser notifications enabled.");
    } else {
      setMessage("Permission denied. You can change this in browser settings.");
    }
  };

  // Enable Firebase push notifications
  const handleEnablePush = async () => {
    const token = await requestFCMToken();
    if (token) {
      const ok = await storeFCMToken(token);
      if (ok) {
        setPushEnabled(true);
        showNotification("Success", "Push notifications enabled");
        setMessage(
          "Push notifications enabled. You will now receive real-time alerts.",
        );
      } else {
        setMessage("Failed to save token. Please try again.");
      }
    } else {
      setMessage(
        "Could not get permission or token. Ensure browser allows notifications.",
      );
    }
  };

  const TabButton = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 40,
        border: "none",
        background: activeTab === tab ? COLORS.purple : "transparent",
        color: activeTab === tab ? "#fff" : COLORS.gray,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: 16 }} />
      {label}
    </button>
  );

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "20px",
        background: COLORS.bg,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24,
          color: COLORS.text,
        }}
      >
        Settings & Security
      </h1>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 32,
          borderBottom: `1px solid ${COLORS.border}`,
          paddingBottom: 8,
        }}
      >
        <TabButton tab="profile" label="Profile" icon="bi-person-circle" />
        <TabButton tab="password" label="Password" icon="bi-key" />
        <TabButton tab="2fa" label="2FA" icon="bi-shield-lock" />
        <TabButton tab="sessions" label="Sessions" icon="bi-windows" />
        <TabButton tab="notifications" label="Notifications" icon="bi-bell" />
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div
          style={{
            background: COLORS.cardBg,
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <form onSubmit={updateProfile}>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                Full Name (read-only)
              </label>
              <input
                value={user?.full_name || ""}
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: COLORS.purple,
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 40,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Update Profile
            </button>
          </form>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <div
          style={{
            background: COLORS.cardBg,
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <form onSubmit={changePassword}>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 500,
                  color: COLORS.gray,
                }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.inputBg,
                  color: COLORS.text,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: COLORS.purple,
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 40,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
          </form>
        </div>
      )}

      {/* 2FA Tab */}
      {activeTab === "2fa" && (
        <div
          style={{
            background: COLORS.cardBg,
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {user?.two_factor_enabled ? (
            <div>
              <p>
                <i className="bi bi-shield-check text-success"></i>
                Two-factor authentication is <strong>enabled</strong>.
              </p>
              <button
                onClick={disable2FA}
                style={{
                  background: COLORS.danger,
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 40,
                  cursor: "pointer",
                  marginTop: 16,
                }}
              >
                Disable 2FA
              </button>
            </div>
          ) : (
            <div>
              {!enabling ? (
                <button
                  onClick={setup2FA}
                  style={{
                    background: COLORS.purple,
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 40,
                    cursor: "pointer",
                  }}
                >
                  Set up 2FA
                </button>
              ) : (
                <div>
                  {qrUrl && (
                    <img
                      src={qrUrl}
                      alt="QR Code"
                      style={{ margin: "10px 0", maxWidth: 200 }}
                    />
                  )}
                  <p>
                    Secret: <code>{secret}</code>
                  </p>
                  <p>Enter 6-digit code from Google Authenticator:</p>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      marginRight: 10,
                      background: COLORS.inputBg,
                      color: COLORS.text,
                    }}
                  />
                  <button
                    onClick={enable2FA}
                    style={{
                      background: COLORS.purple,
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: 40,
                      cursor: "pointer",
                    }}
                  >
                    Verify & Enable
                  </button>
                  <button
                    onClick={() => setEnabling(false)}
                    style={{
                      marginLeft: 10,
                      padding: "10px 20px",
                      borderRadius: 40,
                      border: `1px solid ${COLORS.border}`,
                      background: COLORS.cardBg,
                      cursor: "pointer",
                      color: COLORS.text,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && <Sessions />}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div
          style={{
            background: COLORS.cardBg,
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 16,
              color: COLORS.text,
            }}
          >
            Browser Notifications
          </h3>
          <p>
            Current status: <strong>{notificationStatus}</strong>
          </p>
          {notificationStatus !== "granted" && (
            <button
              onClick={handleEnableNotifications}
              style={{
                background: COLORS.purple,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 40,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Enable Browser Notifications
            </button>
          )}
          <hr style={{ margin: "24px 0", borderColor: COLORS.border }} />
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 16,
              color: COLORS.text,
            }}
          >
            Push Notifications (Firebase)
          </h3>
          <p>
            Receive real-time alerts on your device even when the app is closed.
          </p>
          <button
            onClick={handleEnablePush}
            disabled={pushEnabled}
            style={{
              background: pushEnabled ? COLORS.success : COLORS.purple,
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 40,
              cursor: pushEnabled ? "default" : "pointer",
              opacity: pushEnabled ? 0.7 : 1,
            }}
          >
            {pushEnabled ? (
              <>
                <i className="bi bi-bell-fill me-2"></i>
                Push Notifications Enabled
              </>
            ) : (
              <>
                <i className="bi bi-bell me-2"></i>
                Enable Push Notifications
              </>
            )}
          </button>
          {pushEnabled && (
            <p style={{ marginTop: 12, color: COLORS.success }}>
              You will now receive push notifications for transactions,
              deposits, and other important events.
            </p>
          )}
        </div>
      )}

      {/* Message toast */}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: COLORS.messageBg,
            color: COLORS.messageText,
            padding: "12px 20px",
            borderRadius: 40,
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
