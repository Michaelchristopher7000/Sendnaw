import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const SETTINGS_API = import.meta.env.DEV
  ? "/api/settings"
  : "https://sendnawbackend.onrender.com/api/settings";

const TabButton = ({ tab, label, icon, activeTab, setActiveTab, COLORS }) => (
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

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const COLORS = theme === "dark" ? darkTheme : lightTheme;

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "default",
  );
  const [pushEnabled, setPushEnabled] = useState(false);

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

  // Transaction PIN state
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinPassword, setPinPassword] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Profile update
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${SETTINGS_API}/update_profile.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Profile updated. Refresh to see changes.");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage(data.message);
      }
    } catch {
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
      const res = await fetch(`${SETTINGS_API}/change_password.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Password changed");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Network error");
    }
  };

  // 2FA setup
  const setup2FA = async () => {
    try {
      const res = await fetch(`${SETTINGS_API}/2fa_setup.php`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
    } catch {
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
      const res = await fetch(`${SETTINGS_API}/2fa_enable.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ code: otpCode, secret }),
      });
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
    } catch {
      setMessage("Network error");
    }
  };

  // Disable 2FA
  const disable2FA = async () => {
    try {
      const res = await fetch(`${SETTINGS_API}/2fa_disable.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessage("2FA disabled");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Network error");
    }
  };

  const handleSetPin = async () => {
    setPinMessage("");
    if (pin.length !== 4 || confirmPin.length !== 4) {
      setPinMessage("Enter a valid 4-digit PIN in both fields.");
      return;
    }
    if (pin !== confirmPin) {
      setPinMessage("PINs do not match.");
      return;
    }
    if (!pinPassword) {
      setPinMessage("Enter your current password to confirm.");
      return;
    }

    setPinLoading(true);
    try {
      const res = await fetch(`${SETTINGS_API}/set_pin.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ pin, password: pinPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPinMessage("Transaction PIN saved successfully.");
        setPin("");
        setConfirmPin("");
        setPinPassword("");
        await refreshUser();
      } else {
        setPinMessage(data.message || "Failed to save PIN.");
      }
    } catch {
      setPinMessage("Network error. Please try again.");
    } finally {
      setPinLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteMessage("");
    if (!deletePassword) {
      setDeleteMessage("Enter your password to confirm account deletion.");
      return;
    }
    const confirmed = window.confirm(
      "Delete your account? This action will deactivate your account and sign you out.",
    );
    if (!confirmed) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`${SETTINGS_API}/delete_account.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await res.json();
      if (data.success) {
        setDeleteMessage("Your account has been deactivated.");
        logout();
        navigate("/login");
      } else {
        setDeleteMessage(data.message || "Failed to delete account.");
      }
    } catch {
      setDeleteMessage("Network error. Please try again.");
    } finally {
      setDeleteLoading(false);
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
        <TabButton
          tab="profile"
          label="Profile"
          icon="bi-person-circle"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="password"
          label="Password"
          icon="bi-key"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="security"
          label="Transaction PIN"
          icon="bi-lock-fill"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="2fa"
          label="2FA"
          icon="bi-shield-lock"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="sessions"
          label="Sessions"
          icon="bi-windows"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="notifications"
          label="Notifications"
          icon="bi-bell"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="support"
          label="Help & Legal"
          icon="bi-life-preserver"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
        <TabButton
          tab="theme"
          label="Theme"
          icon="bi-palette"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          COLORS={COLORS}
        />
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

      {/* Security Tab */}
      {activeTab === "security" && (
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
            Transaction PIN
          </h3>
          <p style={{ color: COLORS.textSecondary, marginBottom: 20 }}>
            A transaction PIN helps protect money transfers and withdrawals. You
            will need it to confirm every transfer or withdrawal.
          </p>
          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: 18,
                background: COLORS.inputBg,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Current status
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 13,
                  color: user?.has_pin ? COLORS.success : COLORS.textSecondary,
                }}
              >
                {user?.has_pin
                  ? "PIN is set and active. You must enter it when sending money or withdrawing."
                  : "No transaction PIN configured yet. Set one now to secure your account."}
              </p>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSetPin();
              }}
              style={{ display: "grid", gap: 16 }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 500,
                    color: COLORS.gray,
                  }}
                >
                  4-digit PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter new PIN"
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
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 500,
                    color: COLORS.gray,
                  }}
                >
                  Confirm PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) =>
                    setConfirmPin(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Repeat new PIN"
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
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 500,
                    color: COLORS.gray,
                  }}
                >
                  Current password
                </label>
                <input
                  type="password"
                  value={pinPassword}
                  onChange={(e) => setPinPassword(e.target.value)}
                  placeholder="Enter your account password"
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
                disabled={pinLoading}
                style={{
                  background: COLORS.purple,
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 40,
                  fontWeight: 600,
                  cursor: pinLoading ? "not-allowed" : "pointer",
                }}
              >
                {user?.has_pin ? "Update PIN" : "Set PIN"}
              </button>
              {pinMessage && (
                <p
                  style={{
                    margin: 0,
                    color: pinMessage.includes("success")
                      ? COLORS.success
                      : COLORS.danger,
                    fontWeight: 600,
                  }}
                >
                  {pinMessage}
                </p>
              )}
            </form>
          </div>
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

      {activeTab === "support" && (
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
            Help & Legal
          </h3>
          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 18,
                background: COLORS.inputBg,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Support
              </p>
              <p style={{ margin: "8px 0 0", color: COLORS.textSecondary }}>
                Need help with your account? Reach out to our support team.
              </p>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: COLORS.purple,
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@sendnaw.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: COLORS.cardBg,
                    color: COLORS.text,
                    border: `1px solid ${COLORS.border}`,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Email Support
                </a>
              </div>
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 18,
                background: COLORS.inputBg,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Legal & Policies
              </p>
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                <a
                  href="/privacy-policy"
                  style={{
                    color: COLORS.purple,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  style={{
                    color: COLORS.purple,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 18,
                background: COLORS.inputBg,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                Delete account
              </p>
              <p style={{ margin: "8px 0 12px", color: COLORS.textSecondary }}>
                Deactivating your account will sign you out and block future
                logins. This action cannot be undone from the dashboard.
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password to confirm"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.cardBg,
                  color: COLORS.text,
                  marginBottom: 12,
                }}
              />
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                style={{
                  background: COLORS.danger,
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 40,
                  fontWeight: 600,
                  cursor: deleteLoading ? "not-allowed" : "pointer",
                }}
              >
                {deleteLoading ? "Deleting account…" : "Delete my account"}
              </button>
              {deleteMessage && (
                <p
                  style={{
                    margin: "12px 0 0",
                    color: deleteMessage.includes("success")
                      ? COLORS.success
                      : COLORS.danger,
                    fontWeight: 600,
                  }}
                >
                  {deleteMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "theme" && (
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
            Theme
          </h3>
          <p style={{ marginBottom: 24, color: COLORS.textSecondary }}>
            Select the app theme that suits your preference.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setTheme("light")}
              style={{
                flex: 1,
                minWidth: 140,
                background: theme === "light" ? COLORS.purple : COLORS.cardBg,
                color: theme === "light" ? "#fff" : COLORS.text,
                border: `1px solid ${COLORS.border}`,
                padding: "12px 20px",
                borderRadius: 40,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Light Theme
            </button>
            <button
              onClick={() => setTheme("dark")}
              style={{
                flex: 1,
                minWidth: 140,
                background: theme === "dark" ? COLORS.purple : COLORS.cardBg,
                color: theme === "dark" ? "#fff" : COLORS.text,
                border: `1px solid ${COLORS.border}`,
                padding: "12px 20px",
                borderRadius: 40,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Dark Theme
            </button>
          </div>
          <p style={{ marginTop: 24, color: COLORS.textSecondary }}>
            Current selection:{" "}
            <strong>{theme === "light" ? "Light" : "Dark"}</strong>
          </p>
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
