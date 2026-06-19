import { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext";
import { Link } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#F4F3FF",
  cardBg: "#FFFFFF",
  text: "#1A1035",
  textSecondary: "#7B6FA0",
  border: "#EAE6FF",
  accent: "#6f42c1",
  accentLight: "#EDE9FF",
  accentGrad: "linear-gradient(135deg, #6f42c1 0%, #9B6DFF 100%)",
  heroGrad: "linear-gradient(135deg, #4B2D9F 0%, #7B4FD8 50%, #9B6DFF 100%)",
  danger: "#EF4444",
  success: "#10B981",
  divider: "#F0ECFF",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  accentGrad: "linear-gradient(135deg, #8A5CF7 0%, #A78BFA 100%)",
  heroGrad: "linear-gradient(135deg, #4B2D9F 0%, #7B4FD8 50%, #9B6DFF 100%)",
  danger: "#F87171",
  success: "#34D399",
  divider: "#2A2440",
};

const injectStyles = (colors) => `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  .profile-root { font-family: 'Plus Jakarta Sans', sans-serif; background: ${colors.bg}; min-height: 100vh; }
  .hero-card { background: ${colors.heroGrad}; border-radius: 28px; padding: 2rem 1.5rem 4rem; position: relative; overflow: hidden; margin-bottom: 0; }
  .hero-card::before { content: ''; position: absolute; width: 260px; height: 260px; background: rgba(255,255,255,0.06); border-radius: 50%; top: -80px; right: -60px; pointer-events: none; }
  .hero-card::after { content: ''; position: absolute; width: 180px; height: 180px; background: rgba(255,255,255,0.04); border-radius: 50%; bottom: -50px; left: -40px; pointer-events: none; }
  .avatar-ring { width: 88px; height: 88px; border-radius: 50%; padding: 3px; background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%); display: inline-block; position: relative; }
  .avatar-ring img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
  .edit-badge { position: absolute; bottom: 2px; right: 2px; background: #fff; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${colors.accent}; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .floating-stats { background: ${colors.cardBg}; border-radius: 24px; margin: -2.2rem 1rem 1rem; padding: 1.2rem 1.2rem; display: grid; grid-template-columns: 1fr 1px 1fr 1px 1fr; align-items: center; box-shadow: 0 8px 32px rgba(111,66,193,0.12); border: 1px solid ${colors.border}; position: relative; z-index: 2; }
  .stat-divider { width: 1px; height: 36px; background: ${colors.divider}; margin: 0 auto; }
  .stat-item { text-align: center; padding: 0 0.5rem; }
  .stat-label { font-size: 0.68rem; font-weight: 600; color: ${colors.textSecondary}; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .stat-value { font-size: 0.92rem; font-weight: 700; color: ${colors.text}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stat-value.accent { color: ${colors.accent}; }
  .section-card { background: ${colors.cardBg}; border-radius: 24px; padding: 1.4rem; margin-bottom: 1rem; border: 1px solid ${colors.border}; }
  .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 1.1rem; }
  .section-icon { width: 36px; height: 36px; border-radius: 10px; background: ${colors.accentLight}; display: flex; align-items: center; justify-content: center; color: ${colors.accent}; font-size: 1rem; flex-shrink: 0; }
  .section-title { font-size: 1rem; font-weight: 700; color: ${colors.text}; margin: 0; }
  .limit-row { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid ${colors.divider}; }
  .limit-row:last-child { border-bottom: none; }
  .limit-label { font-size: 0.88rem; color: ${colors.textSecondary}; font-weight: 500; }
  .limit-value { font-size: 0.92rem; font-weight: 700; color: ${colors.text}; background: ${colors.accentLight}; padding: 4px 12px; border-radius: 20px; }
  .info-row { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid ${colors.divider}; }
  .info-row:last-child { border-bottom: none; }
  .info-label { font-size: 0.85rem; color: ${colors.textSecondary}; font-weight: 500; }
  .info-value { font-size: 0.9rem; font-weight: 600; color: ${colors.text}; }
  .upgrade-btn { width: 100%; background: ${colors.accentGrad}; border: none; border-radius: 14px; padding: 13px 24px; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.92rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 1rem; box-shadow: 0 4px 16px rgba(111,66,193,0.35); transition: opacity 0.2s, transform 0.15s; }
  .upgrade-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .copy-btn { background: none; border: none; cursor: pointer; color: ${colors.accent}; font-size: 0.9rem; padding: 2px 4px; border-radius: 6px; transition: background 0.15s; }
  .copy-btn:hover { background: ${colors.accentLight}; }
  .kyc-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 4px 12px; font-size: 0.75rem; font-weight: 700; color: #fff; margin-top: 6px; letter-spacing: 0.03em; }
  .refresh-btn { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; color: #fff; padding: 6px 14px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-top: 6px; transition: background 0.2s; }
  .refresh-btn:hover { background: rgba(255,255,255,0.25); }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { width: 40px; height: 40px; border: 3px solid ${colors.border}; border-top: 3px solid ${colors.accent}; border-radius: 50%; animation: spin 1s linear infinite; margin: 80px auto; }
`;

export default function Profile() {
  const { user: contextUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [limits, setLimits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // ─── Polled user state (full object) ──────────────────────────────
  const [polledUser, setPolledUser] = useState(contextUser);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ─── Fetch full user profile ──────────────────────────────────────
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/auth/get_user.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.status === "success") {
        const newUser = data.data;
        // Check if tier changed
        const oldTier = polledUser?.kyc_tier || 1;
        const newTier = newUser.kyc_tier || 1;
        if (newTier !== oldTier) {
          showNotification(
            "SendNaw",
            `🎉 KYC upgraded to Tier ${newTier}!`,
            "success",
          );
        }
        setPolledUser(newUser);
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // ─── Manual refresh handler ──────────────────────────────────────
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchUserProfile().then(() => {
      showNotification("SendNaw", "Profile refreshed", "success");
    });
  };

  // ─── Set up polling on mount ────────────────────────────────────
  useEffect(() => {
    fetchUserProfile();
    const interval = setInterval(fetchUserProfile, 15000);
    return () => clearInterval(interval);
  }, []);

  // ─── Fetch limits (unchanged) ──────────────────────────────────
  useEffect(() => {
    fetchLimits();
  }, []);

  const fetchLimits = async () => {
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/user/limit.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setLimits(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/profiles/upload_avatar.php",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", "Avatar updated");
        window.location.reload();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Network error", "error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(polledUser?.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="profile-root">
        <style>{injectStyles(colors)}</style>
        <div className="spinner" />
      </div>
    );

  // Use polledUser for all fields (falls back to contextUser if null)
  const user = polledUser || contextUser;
  const displayTier = user?.kyc_tier || 1;
  const tierLabel =
    ["", "Basic", "Verified", "Premium"][displayTier] || "Basic";

  return (
    <div className="profile-root" style={{ position: "relative" }}>
      <style>{injectStyles(colors)}</style>

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
          className={`bi ${theme === "light" ? "bi-moon-stars-fill" : "bi-brightness-high-fill"}`}
        />{" "}
        {theme === "light" ? "Dark" : "Light"}
      </button>

      {/* Hero Card */}
      <div className="hero-card">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div className="avatar-ring">
              <img
                src={
                  user?.avatar_url ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user?.email)}&background=6f42c1`
                }
                alt="Avatar"
              />
            </div>
            {user?.kyc_tier >= 2 && (
              <label htmlFor="avatarUpload" className="edit-badge">
                <i className="bi bi-pencil-fill" style={{ fontSize: 11 }} />
              </label>
            )}
            <input
              type="file"
              id="avatarUpload"
              accept="image/jpeg,image/png"
              style={{ display: "none" }}
              onChange={handleAvatarUpload}
            />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              {user?.full_name}
            </h2>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 500,
              }}
            >
              {user?.email}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div className="kyc-badge">
                <i
                  className="bi bi-patch-check-fill"
                  style={{ fontSize: "0.75rem" }}
                />{" "}
                Tier {displayTier} — {tierLabel}
              </div>
              <button
                className="refresh-btn"
                onClick={handleManualRefresh}
                disabled={isRefreshing}
              >
                <i
                  className={`bi ${isRefreshing ? "bi-arrow-repeat spin" : "bi-arrow-clockwise"}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh KYC"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="floating-stats">
        <div className="stat-item">
          <div className="stat-label">SendNaw Tag</div>
          <div className="stat-value accent">{user?.sendnaw_tag || "—"}</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-label">Account No.</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span className="stat-value">{user?.account_number || "—"}</span>
            {user?.account_number && (
              <button className="copy-btn" onClick={handleCopy} title="Copy">
                <i className={`bi ${copied ? "bi-check2" : "bi-copy"}`} />
              </button>
            )}
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-label">Phone</div>
          <div className="stat-value">{user?.phone || "—"}</div>
        </div>
      </div>

      {/* Limits & KYC */}
      <div style={{ padding: "0 1rem 2rem" }}>
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">
              <i className="bi bi-speedometer2" />
            </div>
            <h3 className="section-title">Transaction Limits</h3>
          </div>
          <div className="limit-row">
            <span className="limit-label">Daily Deposit</span>
            <span className="limit-value">
              ₦{limits?.limits?.daily_deposit_limit?.toLocaleString() ?? "—"}
            </span>
          </div>
          <div className="limit-row">
            <span className="limit-label">Daily Withdrawal</span>
            <span className="limit-value">
              ₦{limits?.limits?.daily_withdraw_limit?.toLocaleString() ?? "—"}
            </span>
          </div>
          <div className="limit-row">
            <span className="limit-label">Single Transfer</span>
            <span className="limit-value">
              ₦{limits?.limits?.single_transfer_limit?.toLocaleString() ?? "—"}
            </span>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">
              <i className="bi bi-person-vcard-fill" />
            </div>
            <h3 className="section-title">Identity & KYC</h3>
          </div>
          {displayTier >= 2 ? (
            <>
              <div className="info-row">
                <span className="info-label">Gender</span>
                <span className="info-value">
                  {user?.gender || "Not provided"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">
                  {user?.dob || "Not provided"}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">BVN / NIN</span>
                <span className="info-value">
                  {user?.bvn || user?.nin || "Not provided"}
                </span>
              </div>
              {displayTier >= 3 && (
                <div className="info-row">
                  <span className="info-label">Address</span>
                  <span
                    className="info-value"
                    style={{ maxWidth: "55%", textAlign: "right" }}
                  >
                    {user?.address || "Not provided"}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p
              style={{
                color: colors.textSecondary,
                fontSize: "0.88rem",
                margin: "0 0 0.5rem",
              }}
            >
              Complete your KYC to unlock higher limits and see verified info.
            </p>
          )}
          {displayTier < 3 && (
            <Link to="/kyc" style={{ textDecoration: "none" }}>
              <button className="upgrade-btn">
                <i className="bi bi-shield-lock-fill" />
                {displayTier === 1
                  ? "Upgrade to Tier 2 — Submit ID"
                  : "Upgrade to Tier 3 — Submit Address"}
              </button>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
