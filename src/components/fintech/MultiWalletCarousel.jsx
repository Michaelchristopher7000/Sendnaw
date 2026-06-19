// src/components/fintech/MultiWalletCarousel.jsx
import { useState } from "react";

// Reuse design tokens – we import them from Dashboard (or you can move them to a shared theme file later)
// For now, we'll duplicate the minimal needed tokens to keep the component independent.
const T = {
  primary: "#6366f1",
  green: "#10b981",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  muted: "#64748b",
  card: "#0f1624",
};
const rgba = (hex, a) => {
  if (!hex || hex.startsWith("rgba")) return hex;
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const btnSolid = (color, extra = {}) => ({
  background: color,
  border: "none",
  color: "#fff",
  borderRadius: 12,
  padding: "8px 20px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "opacity 0.18s",
  ...extra,
});

export default function MultiWalletCarousel({
  wallets,
  selectedCurrency,
  setSelectedCurrency,
  exchangeRates,
  ratesLoading,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const convertBalance = (balance, fromCurr, toCurr) => {
    if (fromCurr === toCurr) return balance;
    if (ratesLoading || !exchangeRates[toCurr]) return balance;
    // Assume exchangeRates are in NGN base (1 NGN = X of other currency)
    // So to convert from any to any, first convert to NGN then to target.
    const inNGN = fromCurr === "NGN" ? balance : balance / exchangeRates[fromCurr];
    const result = inNGN * exchangeRates[toCurr];
    return result;
  };

  const activeWallet = wallets[activeIndex];
  const displayBalance = convertBalance(
    activeWallet.balance,
    activeWallet.currency,
    selectedCurrency
  );

  const symbols = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
    BTC: "₿",
  };
  const flagEmoji = {
    USD: "🇺🇸",
    NGN: "🇳🇬",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    BTC: "₿",
  };

  return (
    <div
      style={{
        background: "linear-gradient(145deg,#1a0f3d 0%,#0e0a28 100%)",
        borderRadius: 28,
        padding: "24px 20px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: rgba(T.primary, 0.18),
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 80,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: rgba(T.cyan, 0.06),
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* Wallet tabs and currency selector */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {wallets.map((w, i) => (
              <button
                key={w.currency}
                onClick={() => setActiveIndex(i)}
                style={{
                  background: i === activeIndex ? T.primary : "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: 20,
                  padding: "6px 14px",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{flagEmoji[w.currency]}</span>
                <span>{w.currency}</span>
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${rgba(T.primary, 0.4)}`,
                borderRadius: 10,
                color: T.text,
                padding: "6px 28px 6px 12px",
                fontSize: 12,
                fontWeight: 700,
                appearance: "none",
                cursor: "pointer",
              }}
            >
              {wallets.map((w) => (
                <option key={w.currency} value={w.currency}>
                  {flagEmoji[w.currency]} {w.currency}
                </option>
              ))}
            </select>
            <i
              className="bi bi-chevron-down"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 12,
                color: T.muted,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Balance display */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div
            style={{
              fontSize: 13,
              color: "#aaa",
              marginBottom: 4,
              letterSpacing: 0.5,
            }}
          >
            {activeWallet.currency} Balance
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: "#fff",
              fontFamily: "monospace",
              letterSpacing: -1,
            }}
          >
            {symbols[selectedCurrency] || "$"}
            {displayBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: activeWallet.currency === "BTC" ? 8 : 2,
            })}
          </div>
        </div>

        {/* Quick action buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <button style={btnSolid(T.primary, { padding: "8px 20px", fontSize: 13 })}>
            Send
          </button>
          <button style={btnSolid(T.green, { padding: "8px 20px", fontSize: 13 })}>
            Receive
          </button>
          <button style={btnSolid(T.cyan, { padding: "8px 20px", fontSize: 13 })}>
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}