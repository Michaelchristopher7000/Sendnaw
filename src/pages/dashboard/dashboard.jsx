import { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext";
import { useTheme } from "../../context/themecontext";
import { getWalletBalances, getTransactionHistory } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

// ─── Light & Dark Theme Definitions ──────────────────────────────────────
const getThemeColors = (isLight) => ({
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
});

const CURRENCY_META = {
  NGN: {
    symbol: "₦",
    flagImg: "https://flagcdn.com/w40/ng.png",
    label: "Nigerian Naira",
  },
  USD: {
    symbol: "$",
    flagImg: "https://flagcdn.com/w40/us.png",
    label: "US Dollar",
  },
  GBP: {
    symbol: "£",
    flagImg: "https://flagcdn.com/w40/gb.png",
    label: "British Pound",
  },
};

const isDebit = (tx) =>
  ["send", "withdraw", "debit", "payment"].includes(tx.type);
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

// ─── Wallet Card ──────────────────────────────────────────────────────────
function WalletCard({
  user,
  balances,
  displayCurrency,
  setDisplayCurrency,
  showBalance,
  setShowBalance,
  total,
  meta,
  handleCopy,
  copied,
  colors,
}) {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const isWide = window.innerWidth >= 768;
  const balanceFontSize = isWide ? 46 : 36;

  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${colors.purpleDeep} 0%, ${colors.purpleMid} 60%, ${colors.purplePill} 100%)`,
        borderRadius: isWide ? 28 : 24,
        padding: isWide ? "28px 32px 24px" : "22px 20px 18px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative circles */}
      <div
        style={{
          position: "absolute",
          width: isWide ? 280 : 200,
          height: isWide ? 280 : 200,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
          top: -80,
          right: -50,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: isWide ? 180 : 130,
          height: isWide ? 180 : 130,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          top: -20,
          right: 30,
        }}
      />

      {/* BVN banner */}
      {user?.kyc_tier === 0 && (
        <Link
          to="/kyc"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 10,
            padding: "8px 12px",
            marginBottom: 16,
            textDecoration: "none",
          }}
        >
          <i
            className="bi bi-exclamation-circle"
            style={{ color: colors.amber, fontSize: 15 }}
          />
          <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
            Verify your BVN to unlock all features
          </span>
          <i
            className="bi bi-chevron-right"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              marginLeft: "auto",
            }}
          />
        </Link>
      )}

      {/* Currency selector + hide toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowCurrencyDropdown((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.28)",
              borderRadius: 40,
              padding: "6px 13px 6px 8px",
              cursor: "pointer",
            }}
          >
            <img
              src={meta.flagImg}
              alt={displayCurrency}
              style={{
                width: 24,
                height: 17,
                borderRadius: 3,
                objectFit: "cover",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
              {displayCurrency}
            </span>
            <i
              className={`bi bi-chevron-${showCurrencyDropdown ? "up" : "down"}`}
              style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}
            />
          </button>
          {showCurrencyDropdown && (
            <>
              <div
                onClick={() => setShowCurrencyDropdown(false)}
                style={{ position: "fixed", inset: 0, zIndex: 90 }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: 0,
                  background: "#fff",
                  borderRadius: 18,
                  boxShadow: "0 16px 40px rgba(76,29,149,0.22)",
                  overflow: "hidden",
                  zIndex: 100,
                  minWidth: 240,
                  border: "1px solid rgba(109,40,217,0.1)",
                }}
              >
                {balances.map((b) => {
                  const m = CURRENCY_META[b.currency_code] || {
                    symbol: "₦",
                    flagImg: "https://flagcdn.com/w40/ng.png",
                    label: b.currency_code,
                  };
                  const active = displayCurrency === b.currency_code;
                  return (
                    <button
                      key={b.currency_code}
                      onClick={() => {
                        setDisplayCurrency(b.currency_code);
                        localStorage.setItem("sn_currency", b.currency_code);
                        setShowCurrencyDropdown(false);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "13px 16px",
                        border: "none",
                        background: active ? "#F5F0FF" : "#fff",
                        cursor: "pointer",
                        borderBottom: "1px solid #F3F0FF",
                      }}
                    >
                      <img
                        src={m.flagImg}
                        alt={b.currency_code}
                        style={{
                          width: 32,
                          height: 22,
                          borderRadius: 4,
                          objectFit: "cover",
                          flexShrink: 0,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        }}
                      />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1C1130",
                          }}
                        >
                          {b.currency_code}
                        </p>
                        <p
                          style={{ margin: 0, fontSize: 11, color: "#7C6FA0" }}
                        >
                          {m.label}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: active ? "#6B21E8" : "#6B7280",
                        }}
                      >
                        {m.symbol}
                        {showBalance
                          ? parseFloat(b.balance).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })
                          : "••••"}
                      </span>
                      {active && (
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ fontSize: 15, color: "#6B21E8" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 40,
              padding: "6px 13px",
              cursor: "pointer",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <i
              className={`bi ${copied ? "bi-check-lg" : "bi-copy"}`}
              style={{ fontSize: 12 }}
            />
            {copied ? "Copied!" : `Acc: ${user?.account_number || ""}`}
          </button> */}
          <button
            onClick={() => setShowBalance((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.28)",
              borderRadius: 40,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            <i
              className={`bi ${showBalance ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
              style={{ fontSize: 14, color: "#fff" }}
            />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {showBalance ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </div>

      <p
        style={{
          fontSize: 13,
          opacity: 0.75,
          margin: "0 0 5px",
          fontWeight: 500,
          color: "#fff",
        }}
      >
        Wallet balance
      </p>
      <p
        style={{
          fontSize: balanceFontSize,
          fontWeight: 800,
          margin: "0 0 22px",
          letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
          color: "#fff",
        }}
      >
        {showBalance
          ? `${meta.symbol}${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          : `${meta.symbol} ••••••`}
      </p>

      {/* Mini currency pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 14,
          flexWrap: "wrap",
        }}
      >
        {balances.map((b) => {
          const m = CURRENCY_META[b.currency_code] || {
            symbol: "₦",
            flagImg: "https://flagcdn.com/w40/ng.png",
          };
          const active = displayCurrency === b.currency_code;
          return (
            <button
              key={b.currency_code}
              onClick={() => {
                setDisplayCurrency(b.currency_code);
                localStorage.setItem("sn_currency", b.currency_code);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: active
                  ? "rgba(255,255,255,0.22)"
                  : "rgba(255,255,255,0.08)",
                border: active
                  ? "1px solid rgba(255,255,255,0.38)"
                  : "1px solid transparent",
                borderRadius: 10,
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              <img
                src={m.flagImg}
                alt={b.currency_code}
                style={{
                  width: 18,
                  height: 13,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: 10,
                    opacity: 0.7,
                    margin: 0,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  {b.currency_code}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    margin: 0,
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  {m.symbol}
                  {showBalance ? parseFloat(b.balance).toFixed(2) : "••••"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent Transactions ───────────────────────────────────────────────────
function RecentTransactions({ transactions, handleReceipt, colors }) {
  const recent = transactions.slice(0, 5);
  if (recent.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px 0",
          background: colors.card,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
        }}
      >
        <i
          className="bi bi-inbox"
          style={{
            fontSize: 36,
            color: colors.border,
            display: "block",
            marginBottom: 8,
          }}
        />
        <p style={{ color: colors.textSub, fontSize: 13 }}>
          No recent transactions
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: colors.text,
            margin: 0,
          }}
        >
          Recent Transactions
        </h3>
        <Link
          to="/transactions"
          style={{
            fontSize: 13,
            color: colors.purple,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          View All <i className="bi bi-arrow-right-short" />
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {recent.map((tx) => (
          <div
            key={tx.id}
            onClick={() => handleReceipt(tx.id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 18,
              padding: "12px 16px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: isDebit(tx) ? colors.redLight : colors.greenLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className={`bi ${isDebit(tx) ? "bi-arrow-up-right" : "bi-arrow-down-left"}`}
                  style={{
                    fontSize: 16,
                    color: isDebit(tx) ? colors.red : colors.green,
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    margin: 0,
                    textTransform: "capitalize",
                    color: colors.text,
                  }}
                >
                  {tx.type}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: colors.textSub,
                    margin: "2px 0 0",
                  }}
                >
                  {new Date(tx.created_at).toLocaleDateString()} ·{" "}
                  {new Date(tx.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <p
              style={{
                fontWeight: 700,
                margin: 0,
                color: isDebit(tx) ? colors.red : colors.green,
                fontSize: 14,
              }}
            >
              {isDebit(tx) ? "-" : "+"}
              {tx.amount} {tx.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Helper Components ─────────────────────────────────────────────────────
function ActionBtn({ icon, label, color, bg, onClick, to, colors }) {
  const iconBg = bg || `${color}18`;
  const inner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 20,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className={`bi ${icon}`} style={{ fontSize: 26, color }} />
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.text,
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
  if (to)
    return (
      <Link to={to} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  return inner;
}

function QuickActionsCard({
  colors,
  onAddCash,
  onConvert,
  onWithdraw,
  isMobile,
}) {
  // Desktop full grid
  if (!isMobile) {
    return (
      <div
        style={{
          background: colors.card,
          borderRadius: 24,
          padding: "20px 16px",
          border: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.textSub,
            margin: "0 0 16px 4px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Quick Actions
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <ActionBtn
            icon="bi-laptop"
            label="Gadgets"
            color={colors.purpleMid}
            bg={colors.purpleLight}
            to="/gadgets"
            colors={colors}
          />
          <ActionBtn
            icon="bi-arrow-left-right"
            label="Convert"
            color={colors.green}
            bg={colors.greenLight}
            onClick={onConvert}
            colors={colors}
          />
          <ActionBtn
            icon="bi-plus-circle"
            label="Add Cash"
            color={colors.orange}
            bg="#FFF0E6"
            onClick={onAddCash}
            colors={colors}
          />
          <ActionBtn
            icon="bi-cash-stack"
            label="Withdraw"
            color={colors.red}
            bg={colors.redLight}
            onClick={onWithdraw}
            colors={colors}
          />
          <ActionBtn
            icon="bi-send"
            label="Send Money"
            color={colors.cyan}
            bg="#E0F9FF"
            to="/send-money"
            colors={colors}
          />
        </div>
        <div
          style={{ height: 1, background: colors.border, margin: "0 0 20px" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          <ActionBtn
            icon="bi-receipt"
            label="Bills"
            color="#8B5CF6"
            bg={colors.purpleLight}
            to="/bills?type=electricity"
            colors={colors}
          />
          <ActionBtn
            icon="bi-phone"
            label="Airtime"
            color={colors.green}
            bg={colors.greenLight}
            to="/airtime"
            colors={colors}
          />
          <ActionBtn
            icon="bi-wifi"
            label="Data"
            color={colors.cyan}
            bg="#E0F9FF"
            to="/data"
            colors={colors}
          />
          <ActionBtn
            icon="bi-gift"
            label="Gift Cards"
            color={colors.orange}
            bg="#FFF0E6"
            to="/giftcards"
            colors={colors}
          />
        </div>
      </div>
    );
  }

  // Mobile: compact row + "View More" button
  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 24,
        padding: "16px",
        border: `1px solid ${colors.border}`,
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: colors.textSub,
          margin: "0 0 12px 4px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Quick Actions
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <ActionBtn
          icon="bi-plus-circle"
          label="Add Cash"
          color={colors.orange}
          bg="#FFF0E6"
          onClick={onAddCash}
          colors={colors}
        />
        <ActionBtn
          icon="bi-send"
          label="Send"
          color={colors.cyan}
          bg="#E0F9FF"
          to="/send-money"
          colors={colors}
        />
        <ActionBtn
          icon="bi-phone"
          label="Airtime"
          color={colors.green}
          bg={colors.greenLight}
          to="/airtime"
          colors={colors}
        />
        <ActionBtn
          icon="bi-cash-stack"
          label="Withdraw"
          color={colors.red}
          bg={colors.redLight}
          onClick={onWithdraw}
          colors={colors}
        />
      </div>
      <button
        onClick={() => (window.location.href = "/services")}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: 40,
          background: "transparent",
          border: `1px solid ${colors.border}`,
          color: colors.purple,
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <i className="bi bi-grid-3x3-gap-fill" /> View More Services
      </button>
    </div>
  );
}

function KycBanner({ colors }) {
  return (
    <div
      style={{
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
        borderRadius: 20,
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div>
        <p
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "#C2410C",
            margin: "0 0 3px",
          }}
        >
          Upgrade to Tier 2
        </p>
        <p style={{ fontSize: 12, color: "#9A3412", margin: 0 }}>
          Unlock higher limits and more features.
        </p>
      </div>
      <Link
        to="/kyc"
        style={{
          background: colors.orange,
          color: "#fff",
          padding: "9px 18px",
          borderRadius: 40,
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        Upgrade Now
      </Link>
    </div>
  );
}

function BeneficiariesCard({ colors }) {
  return (
    <div
      style={{
        background: colors.card,
        borderRadius: 20,
        padding: "16px 20px",
        border: `1px solid ${colors.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: colors.text,
            margin: "0 0 3px",
          }}
        >
          Beneficiaries
        </p>
        <p style={{ fontSize: 12, color: colors.textSub, margin: 0 }}>
          Save contacts for faster transfers
        </p>
      </div>
      <Link
        to="/send-money"
        style={{
          background: colors.purpleLight,
          borderRadius: 40,
          padding: "8px 16px",
          fontWeight: 700,
          fontSize: 13,
          color: colors.purple,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <i className="bi bi-plus-lg" /> Add
      </Link>
    </div>
  );
}

function KycProfileRow({ user, colors }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Link
        to="/kyc"
        style={{
          textDecoration: "none",
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 18,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: colors.purpleLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-shield-check"
            style={{ fontSize: 18, color: colors.purple }}
          />
        </div>
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: 13,
              margin: 0,
              color: colors.text,
            }}
          >
            Verify KYC
          </p>
          <p style={{ fontSize: 11, color: colors.textSub, margin: 0 }}>
            Tier {user?.kyc_tier || 1}
          </p>
        </div>
      </Link>
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 18,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "#E0F9FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-person-circle"
            style={{ fontSize: 18, color: colors.cyan }}
          />
        </div>
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: 13,
              margin: 0,
              color: colors.text,
            }}
          >
            My Profile
          </p>
          <p style={{ fontSize: 11, color: colors.textSub, margin: 0 }}>
            Account settings
          </p>
        </div>
      </Link>
    </div>
  );
}

function TabBar({ activeTab, setActiveTab, colors }) {
  return (
    <div
      style={{
        display: "flex",
        background: colors.card,
        borderRadius: 16,
        padding: 4,
        border: `1px solid ${colors.border}`,
        marginBottom: 16,
      }}
    >
      {["spend", "save", "borrow", "invest"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            flex: 1,
            padding: "9px 4px",
            border: "none",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            background: activeTab === tab ? colors.purple : "transparent",
            color: activeTab === tab ? "#fff" : colors.textSub,
            transition: "all 0.15s",
            textTransform: "capitalize",
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}

function TabContent({ activeTab, transactions, handleReceipt, colors }) {
  if (activeTab === "spend")
    return (
      <RecentTransactions
        transactions={transactions}
        handleReceipt={handleReceipt}
        colors={colors}
      />
    );
  if (activeTab === "save")
    return (
      <div
        style={{
          background: colors.card,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: colors.greenLight,
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-piggy-bank"
            style={{ fontSize: 34, color: colors.green }}
          />
        </div>
        <p
          style={{
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Save & Grow
        </p>
        <p style={{ color: colors.textSub, marginBottom: 24, fontSize: 14 }}>
          Create savings plans, join Ajo groups, and watch your money grow.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link
            to="/saving"
            style={{
              background: colors.green,
              color: "#fff",
              padding: "11px 22px",
              borderRadius: 40,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Savings Plans
          </Link>
          <Link
            to="/ajo"
            style={{
              background: colors.orange,
              color: "#fff",
              padding: "11px 22px",
              borderRadius: 40,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Ajo Groups
          </Link>
        </div>
      </div>
    );
  if (activeTab === "borrow")
    return (
      <div
        style={{
          background: colors.card,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: "#E0F2FE",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-cash-stack"
            style={{ fontSize: 34, color: "#0369A1" }}
          />
        </div>
        <p
          style={{
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Borrow Money
        </p>
        <p style={{ color: colors.textSub, marginBottom: 24, fontSize: 14 }}>
          Apply for personal loans, overdrafts, and emergency funds.
        </p>
        <Link
          to="/loans"
          style={{
            display: "inline-block",
            background: colors.purple,
            color: "#fff",
            padding: "11px 28px",
            borderRadius: 40,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Apply for Loan
        </Link>
      </div>
    );
  if (activeTab === "invest")
    return (
      <div
        style={{
          background: colors.card,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: colors.purpleLight,
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="bi bi-graph-up-arrow"
            style={{ fontSize: 34, color: colors.purpleMid }}
          />
        </div>
        <p
          style={{
            fontWeight: 800,
            fontSize: 18,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Invest & Earn
        </p>
        <p style={{ color: colors.textSub, marginBottom: 24, fontSize: 14 }}>
          Invest in stocks, fixed income, and high-yield opportunities.
        </p>
        <Link
          to="/invest"
          style={{
            display: "inline-block",
            background: colors.purpleMid,
            color: "#fff",
            padding: "11px 28px",
            borderRadius: 40,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Start Investing
        </Link>
      </div>
    );
  return null;
}

// ==================== MODAL COMPONENTS ====================
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

function ConvertModal({ isOpen, onClose, balances, colors }) {
  const [from, setFrom] = useState("NGN");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const rates = { NGN: 1, USD: 1580, GBP: 1990 };
  const converted = amount
    ? ((parseFloat(amount) * rates[from]) / rates[to]).toFixed(2)
    : "";
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(76,29,149,0.35)",
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
          borderRadius: 24,
          padding: "28px 24px",
          width: 460,
          maxWidth: "90%",
          boxShadow: "0 24px 60px rgba(76,29,149,0.2)",
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
          <p
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
            }}
          >
            Convert Currency
          </p>
          <button
            onClick={onClose}
            style={{
              background: colors.surface,
              border: "none",
              borderRadius: 10,
              width: 32,
              height: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="bi bi-x-lg"
              style={{ fontSize: 14, color: colors.grayMid }}
            />
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 12,
                color: colors.textSub,
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: `1.5px solid ${colors.border}`,
                background: colors.purpleLight,
                fontSize: 14,
                fontWeight: 600,
                color: colors.text,
                outline: "none",
              }}
            >
              {Object.keys(CURRENCY_META).map((c) => (
                <option key={c} value={c}>
                  {c} – {CURRENCY_META[c].label}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: 4,
            }}
          >
            <i
              className="bi bi-arrow-left-right"
              style={{ fontSize: 20, color: colors.purple }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: 12,
                color: colors.textSub,
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: `1.5px solid ${colors.border}`,
                background: colors.purpleLight,
                fontSize: 14,
                fontWeight: 600,
                color: colors.text,
                outline: "none",
              }}
            >
              {Object.keys(CURRENCY_META).map((c) => (
                <option key={c} value={c}>
                  {c} – {CURRENCY_META[c].label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            background: colors.purpleLight,
            borderRadius: 16,
            padding: "14px 16px",
            border: `1.5px solid ${colors.border}`,
            marginBottom: 12,
          }}
        >
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 700,
              color: colors.text,
              outline: "none",
            }}
          />
        </div>
        {converted && (
          <div
            style={{
              background: colors.purpleLight,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: colors.purpleMid }}>
              You receive
            </span>
            <span
              style={{ fontWeight: 700, fontSize: 18, color: colors.purple }}
            >
              {CURRENCY_META[to].symbol}
              {converted}
            </span>
          </div>
        )}
        <button
          style={{
            width: "100%",
            background: colors.purple,
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Convert Now
        </button>
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = getThemeColors(theme === "light");
  const navigate = useNavigate();

  const [displayCurrency, setDisplayCurrency] = useState(
    () => localStorage.getItem("sn_currency") || "NGN",
  );
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("spend");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const load = async () => {
      try {
        const [balRes, txRes] = await Promise.all([
          getWalletBalances(),
          getTransactionHistory(20),
        ]);
        if (balRes?.success) setBalances(balRes.balances || []);
        if (txRes?.success) setTransactions(txRes.transactions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      balances.length &&
      !balances.find((b) => b.currency_code === displayCurrency)
    ) {
      const first = balances[0].currency_code;
      setDisplayCurrency(first);
      localStorage.setItem("sn_currency", first);
    }
  }, [balances, displayCurrency]);

  const selectedBalance = balances.find(
    (b) => b.currency_code === displayCurrency,
  );
  const total = selectedBalance ? parseFloat(selectedBalance.balance) : 0;
  const meta = CURRENCY_META[displayCurrency] || CURRENCY_META.NGN;

  const grouped = transactions.reduce((g, tx) => {
    const date = new Date(tx.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!g[date]) g[date] = [];
    g[date].push(tx);
    return g;
  }, {});

  const handleDeposit = async (amount) => {
    const res = await fetch(
      "http://sendnawtechnologies.infinityfree.io/api/deposit/initialized.php",
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

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.account_number || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleReceipt = (txId) => navigate(`/receipts/${txId}`);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: `3px solid ${colors.border}`,
            borderTop: `3px solid ${colors.purple}`,
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <WalletCard
          user={user}
          balances={balances}
          displayCurrency={displayCurrency}
          setDisplayCurrency={setDisplayCurrency}
          showBalance={showBalance}
          setShowBalance={setShowBalance}
          total={total}
          meta={meta}
          handleCopy={handleCopy}
          copied={copied}
          colors={colors}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 999,
            border: `1.5px solid ${copied ? colors.green : colors.border}`,
            background: copied ? colors.greenLight : colors.card,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: copied ? colors.green : colors.grayMid,
          }}
        >
          <i
            className={`bi ${copied ? "bi-check-lg" : "bi-copy"}`}
            style={{ fontSize: 13 }}
          />
          {copied ? "Copied!" : `Account: ${user?.account_number || "—"}`}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth >= 1200 ? "1fr 1fr" : "1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div>
          <QuickActionsCard
            colors={colors}
            onAddCash={() => setShowDepositModal(true)}
            onConvert={() => setShowConvertModal(true)}
            onWithdraw={() => navigate("/withdraw")}
            isMobile={isMobile}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {user?.kyc_tier === 1 && <KycBanner colors={colors} />}
          <BeneficiariesCard colors={colors} />
          <KycProfileRow user={user} colors={colors} />
        </div>
      </div>

      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        colors={colors}
      />
      <TabContent
        activeTab={activeTab}
        transactions={transactions}
        handleReceipt={handleReceipt}
        colors={colors}
      />

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDeposit={handleDeposit}
        colors={colors}
      />
      <ConvertModal
        isOpen={showConvertModal}
        onClose={() => setShowConvertModal(false)}
        balances={balances}
        colors={colors}
      />
    </div>
  );
}
