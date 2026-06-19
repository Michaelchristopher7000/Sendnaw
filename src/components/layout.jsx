/**
 * SendNaw Layout – Desktop: Sidebar + Top bar (right of sidebar); Mobile: original header + bottom nav
 * Dark mode toggle stays inside sidebar. Top bar does not overlap sidebar.
 * "Add Cash" button in sidebar opens a deposit modal (defined below).
 */

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { useTheme } from "../context/themecontext";
import { useState, useEffect } from "react";

// ─── Device detection ─────────────────────────────────────────────────────
const getDevice = (w) =>
  w >= 1200 ? "desktop" : w >= 768 ? "tablet" : "mobile";
const getDeviceInfo = () => {
  if (typeof window === "undefined")
    return { deviceKind: "desktop", isTouch: false };
  const w = window.innerWidth;
  const ua = navigator.userAgent || "";
  const isTouch = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  let deviceKind;
  if (w < 480) deviceKind = "phone";
  else if (w < 768) deviceKind = "large-phone";
  else if (w < 1200) deviceKind = "laptop";
  else if (w < 1536) deviceKind = "laptop";
  else if (w < 1920) deviceKind = "desktop";
  else deviceKind = "wide-desktop";
  return { deviceKind, isTouch };
};

const getDeviceMetrics = (info) => ({
  sidebarDefault:
    info.deviceKind === "wide-desktop"
      ? 260
      : info.deviceKind === "desktop"
        ? 240
        : 220,
  isTouch: info.isTouch,
});

// ─── Deposit Modal Component ──────────────────────────────────────────────
function DepositModal({ isOpen, onClose, onDeposit, colors }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);

  const currencies = [
    {
      code: "NGN",
      symbol: "₦",
      flag: "https://flagcdn.com/ng.svg",
      label: "Nigerian Naira",
    },
    {
      code: "USD",
      symbol: "$",
      flag: "https://flagcdn.com/us.svg",
      label: "US Dollar",
    },
    {
      code: "GBP",
      symbol: "£",
      flag: "https://flagcdn.com/gb.svg",
      label: "British Pound",
    },
  ];
  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleSubmit = async () => {
    if (!amount) return;
    setLoading(true);
    await onDeposit(amount);
    setLoading(false);
    onClose();
  };
  const handleQuickAmount = (amt) => setAmount(amt.toString());
  if (!isOpen) return null;
  const currentCurrency =
    currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.card,
          borderRadius: 28,
          padding: "32px 28px",
          width: 480,
          maxWidth: "90%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: colors.text,
            }}
          >
            Add Money
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              color: colors.textSub,
            }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.textSub,
              marginBottom: 8,
            }}
          >
            Select currency
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                border: `1.5px solid ${colors.border}`,
                borderRadius: 16,
                background: colors.purpleLight,
                width: "100%",
                cursor: "pointer",
                justifyContent: "space-between",
                color: colors.text,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={currentCurrency.flag}
                  alt={currentCurrency.code}
                  style={{ width: 28, height: 20, borderRadius: 4 }}
                />
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  {currentCurrency.code} - {currentCurrency.label}
                </span>
              </div>
              <i
                className={`bi bi-chevron-${showCurrencySelector ? "up" : "down"}`}
                style={{ fontSize: 14, color: colors.textSub }}
              />
            </button>
            {showCurrencySelector && (
              <>
                <div
                  onClick={() => setShowCurrencySelector(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 90 }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    background: colors.card,
                    borderRadius: 16,
                    border: `1px solid ${colors.border}`,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCurrency(c.code);
                        setShowCurrencySelector(false);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 16px",
                        border: "none",
                        background:
                          selectedCurrency === c.code
                            ? colors.purpleLight
                            : colors.card,
                        cursor: "pointer",
                        textAlign: "left",
                        color: colors.text,
                      }}
                    >
                      <img
                        src={c.flag}
                        alt={c.code}
                        style={{ width: 28, height: 20, borderRadius: 4 }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>
                          {c.code}
                        </div>
                        <div style={{ fontSize: 12, color: colors.textSub }}>
                          {c.label}
                        </div>
                      </div>
                      {selectedCurrency === c.code && (
                        <i
                          className="bi bi-check-lg"
                          style={{ marginLeft: "auto", color: colors.purple }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.textSub,
              marginBottom: 8,
            }}
          >
            Amount
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `1.5px solid ${colors.border}`,
              borderRadius: 16,
              padding: "12px 16px",
              background: colors.purpleLight,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: colors.purple,
                marginRight: 8,
              }}
            >
              {currentCurrency.symbol}
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 24,
                fontWeight: 600,
                color: colors.text,
                outline: "none",
                padding: 0,
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.textSub,
              marginBottom: 12,
            }}
          >
            Quick amounts
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleQuickAmount(amt)}
                style={{
                  padding: "10px 0",
                  background: colors.purpleLight,
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = colors.border)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = colors.purpleLight)
                }
              >
                {currentCurrency.symbol}
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 2,
              background: colors.purple,
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: 40,
              fontWeight: 700,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "transparent",
              border: `1.5px solid ${colors.border}`,
              borderRadius: 40,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              color: colors.textSub,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar (with dark mode toggle) ───────────────────────────────────────
function Sidebar({
  user,
  logout,
  onDeposit,
  onConvert,
  collapsed,
  setCollapsed,
  metrics,
  navigate,
  colors,
  toggleTheme,
}) {
  const sidebarWidth = collapsed ? 72 : (metrics?.sidebarDefault ?? 240);
  const goToProfile = () => navigate("/profile");

  const NAV_ITEMS = [
    { icon: "bi-grid-1x2-fill", label: "Dashboard", to: "/dashboard" },
    { icon: "bi-send-fill", label: "Send Money", to: "/send-money" },
    { icon: "bi-plus-circle", label: "Add Cash", onClick: onDeposit }, // ← opens modal
    { icon: "bi-phone", label: "Airtime", to: "/airtime" },
    { icon: "bi-receipt", label: "Bills", to: "/bills?type=electricity" },
    { icon: "bi-wifi", label: "Data", to: "/data" },
    { icon: "bi-gift", label: "Gift Cards", to: "/giftcards" },
  ];
  const EXTRA_ITEMS = [{ icon: "bi-gear", label: "Settings", to: "/settings" }];

  const renderNavItem = (item, idx) => {
    const isSpecial = !item.to && item.onClick;
    const handleClick = isSpecial ? item.onClick : undefined;
    const navPadV = metrics?.isTouch ? "13px" : "10px";
    const inner = (
      <div
        key={item.label}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: collapsed ? `${navPadV} 0` : `${navPadV} 20px`,
          justifyContent: collapsed ? "center" : "flex-start",
          cursor: "pointer",
          borderRadius: 12,
          margin: "2px 8px",
          transition: "background 0.12s",
        }}
        onMouseEnter={(e) =>
          !metrics?.isTouch &&
          (e.currentTarget.style.background = colors.purpleLight)
        }
        onMouseLeave={(e) =>
          !metrics?.isTouch &&
          (e.currentTarget.style.background = "transparent")
        }
      >
        <i
          className={`bi ${item.icon}`}
          style={{
            fontSize: metrics?.isTouch ? 20 : 18,
            color: colors.purple,
            flexShrink: 0,
          }}
        />
        {!collapsed && (
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </span>
        )}
      </div>
    );
    if (item.to)
      return (
        <Link key={idx} to={item.to} style={{ textDecoration: "none" }}>
          {inner}
        </Link>
      );
    return inner;
  };

  return (
    <div
      style={{
        width: sidebarWidth,
        minHeight: "100vh",
        background: colors.card,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* User profile */}
      <div
        style={{
          padding: collapsed ? "16px 0" : "16px 20px",
          borderBottom: `1px solid ${colors.border}`,
          cursor: "pointer",
        }}
        onClick={goToProfile}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <img
            src={
              user?.avatar_url ||
              `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user?.email || "user")}&background=6B21E8`
            }
            alt="Avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: 13,
              objectFit: "cover",
            }}
          />
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                {user?.full_name || "User"}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: colors.textSub }}>
                {user?.email || ""}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      {!collapsed && (
        <button
          onClick={() => setCollapsed((v) => !v)}
          style={{
            position: "absolute",
            top: 20,
            right: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: colors.grayMid,
            zIndex: 45,
          }}
        >
          <i
            className="bi bi-layout-sidebar-reverse"
            style={{ fontSize: 16 }}
          />
        </button>
      )}

      {/* Dark mode toggle */}
      <div style={{ padding: collapsed ? "8px 0" : "8px 20px", marginTop: 8 }}>
        <button
          onClick={toggleTheme}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
            background: "none",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            color: colors.textSub,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = colors.purpleLight)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <i
            className={`bi ${colors.text === "#1C1130" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
            style={{ fontSize: 18 }}
          />
          {!collapsed && (
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {colors.text === "#1C1130" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </button>
      </div>

      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV_ITEMS.map((item, idx) => renderNavItem(item, idx))}
        <div
          style={{ height: 1, background: colors.border, margin: "12px 16px" }}
        />
        {EXTRA_ITEMS.map((item, idx) => renderNavItem(item, idx))}
      </nav>

      {/* Logout */}
      <div
        style={{ padding: "12px 8px", borderTop: `1px solid ${colors.border}` }}
      >
        <button
          onClick={logout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: 12,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = colors.redLight)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <i
            className="bi bi-box-arrow-left"
            style={{ fontSize: metrics?.isTouch ? 20 : 18, color: colors.red }}
          />
          {!collapsed && (
            <span style={{ fontSize: 14, fontWeight: 600, color: colors.red }}>
              Logout
            </span>
          )}
        </button>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "12px 0",
            color: colors.grayMid,
            textAlign: "center",
          }}
        >
          <i className="bi bi-chevron-double-right" style={{ fontSize: 16 }} />
        </button>
      )}
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────
export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const colors = {
    bg: isLight ? "#F9F7FF" : "#0F0A1A",
    card: isLight ? "#FFFFFF" : "#1A1530",
    text: isLight ? "#1C1130" : "#F1F5F9",
    textSub: isLight ? "#7C6FA0" : "#A8A4C0",
    border: isLight ? "#F3F0FF" : "#2A2440",
    purple: isLight ? "#6B21E8" : "#8A5CF7",
    purpleMid: isLight ? "#7C3AED" : "#9F7AEA",
    purpleDeep: isLight ? "#4C1D95" : "#6B21E8",
    purpleLight: isLight ? "#EDE9FE" : "#2D2A4A",
    purplePill: isLight ? "#8B5CF6" : "#A78BFA",
    green: isLight ? "#10B981" : "#34D399",
    greenLight: isLight ? "#D1FAE5" : "#064E3B",
    red: isLight ? "#EF4444" : "#F87171",
    redLight: isLight ? "#FEE2E2" : "#7F1D1D",
    gray: isLight ? "#9CA3AF" : "#6B7280",
    grayMid: isLight ? "#6B7280" : "#9CA3AF",
    orange: isLight ? "#F97316" : "#FB923C",
    cyan: isLight ? "#06B6D4" : "#22D3EE",
    amber: isLight ? "#F59E0B" : "#FBBF24",
    surface: isLight ? "#F9F7FF" : "#1A1530",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [device, setDevice] = useState(() => getDevice(window.innerWidth));
  const [deviceInfo, setDeviceInfo] = useState(() => getDeviceInfo());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const metrics = getDeviceMetrics(deviceInfo);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Deposit handler
  const handleDeposit = async (amount) => {
    const res = await fetch(
      "https://sendnawbackend.onrender.com/api/deposit/initialized.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount), currency: "NGN" }),
      },
    );
    const data = await res.json();
    if (data.success) window.location.href = data.authorization_url;
    else alert(data.message);
  };

  useEffect(() => {
    const handler = () => {
      setDevice(getDevice(window.innerWidth));
      setDeviceInfo(getDeviceInfo());
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isActive = (path) => location.pathname === path;
  const avatarSrc =
    user?.avatar_url ||
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user?.email || "user")}`;

  // MOBILE layout
  if (device === "mobile") {
    const MOBILE_NAV = [
      { to: "/dashboard", icon: "bi-house-fill", label: "Home" },
      { to: "/send-money", icon: "bi-send-fill", label: "Send" },
      { to: "/transactions", icon: "bi-clock-history", label: "History" },
      { to: "/profile", icon: "bi-person-fill", label: "Profile" },
    ];

    return (
      <>
        <div
          style={{
            minHeight: "100vh",
            background: colors.bg,
            paddingBottom: 64,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: colors.card,
              borderBottom: `1px solid ${colors.border}`,
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -50,
              marginBottom: 30,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: colors.purpleLight,
                  overflow: "hidden",
                }}
              >
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: colors.textSub,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  Good{" "}
                  {new Date().getHours() < 12
                    ? "morning"
                    : new Date().getHours() < 18
                      ? "afternoon"
                      : "evening"}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    margin: 0,
                    color: colors.text,
                  }}
                >
                  {user?.full_name?.split(" ")[0] || "Welcome"} 👋
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link
                to="/notifications"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <i
                  className="bi bi-bell"
                  style={{ fontSize: 16, color: colors.grayMid }}
                />
              </Link>
              <Link
                to="/settings"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <i
                  className="bi bi-gear"
                  style={{ fontSize: 16, color: colors.grayMid }}
                />
              </Link>
            </div>
          </div>
          <main style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
            <Outlet />
          </main>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: colors.card,
              borderTop: `1px solid ${colors.border}`,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "8px 0",
              zIndex: 100,
            }}
          >
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  textDecoration: "none",
                  padding: "4px 12px",
                  color: isActive(item.to) ? colors.purple : colors.textSub,
                }}
              >
                <i className={`bi ${item.icon}`} style={{ fontSize: 20 }} />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: isActive(item.to) ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <DepositModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          onDeposit={handleDeposit}
          colors={colors}
        />
      </>
    );
  }

  // DESKTOP / TABLET layout
  const sidebarW = sidebarCollapsed ? 72 : (metrics?.sidebarDefault ?? 240);
  return (
    <div style={{ minHeight: "100vh", background: colors.bg }}>
      {/* Top bar – right of sidebar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: sidebarW,
          transition: "margin-left 0.2s ease",
          marginTop: -50,
        }}
      >
        <Link
          to="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/images/SendNaw_logo_main-removebg-preview.png"
            alt="SendNaw"
            height="36"
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            to="/notifications"
            style={{
              color: colors.text,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="bi bi-bell" style={{ fontSize: 20 }} />
          </Link>
          <Link
            to="/transactions"
            style={{
              color: colors.text,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="bi bi-clock-history" style={{ fontSize: 20 }} />
          </Link>
          <Link
            to="/virtual"
            style={{
              color: colors.text,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="bi bi-credit-card" style={{ fontSize: 20 }} />
          </Link>
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              padding: "4px 8px",
              borderRadius: 40,
              backgroundColor: colors.purpleLight,
            }}
          >
            <img
              src={avatarSrc}
              alt="avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: 600, fontSize: 13, color: colors.text }}>
              {user?.full_name?.split(" ")[0] || "Account"}
            </span>
          </Link>
        </div>
      </div>

      {/* Sidebar + Main content */}
      <div style={{ display: "flex" }}>
        <Sidebar
          user={user}
          logout={logout}
          onDeposit={() => setShowDepositModal(true)}
          onConvert={() => navigate("/convert")}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          metrics={metrics}
          navigate={navigate}
          colors={colors}
          toggleTheme={toggleTheme}
        />
        <div
          style={{
            marginLeft: sidebarW,
            flex: 1,
            transition: "margin-left 0.2s ease",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <main
            style={{ padding: "24px 32px", maxWidth: 1400, margin: "0 auto" }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
        colors={colors}
      />
    </div>
  );
}
