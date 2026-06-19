// src/components/fintech/StockWidget.jsx
import { Link } from "react-router-dom";

// Design tokens (consistent with CryptoWidget)
const T = {
  primary: "#6366f1",
  green: "#10b981",
  red: "#f43f5e",
  text: "#e2e8f0",
  muted: "#64748b",
  card: "#0f1624",
  border: "rgba(99,102,241,0.13)",
};
const rgba = (hex, a) => {
  if (!hex || hex.startsWith("rgba")) return hex;
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const btn = (color, extra = {}) => ({
  background: rgba(color, 0.14),
  border: `1px solid ${rgba(color, 0.32)}`,
  color: color,
  borderRadius: 12,
  padding: "4px 12px",
  fontSize: 11,
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "all 0.18s",
  ...extra,
});

export default function StockWidget({ stocks }) {
  return (
    <div
      style={{
        background: T.card,
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        border: `1px solid ${T.border}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>📊</span>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: T.text }}>
            Trending Stocks
          </h3>
        </div>
        <Link to="/dashboard/stocks">
          <button style={btn(T.primary)}>View All</button>
        </Link>
      </div>

      {/* Stock grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            style={{
              background: rgba(T.primary, 0.05),
              borderRadius: 16,
              padding: "12px 14px",
              border: `1px solid ${rgba(T.primary, 0.1)}`,
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
              <div>
                <div style={{ fontWeight: 800, color: T.text, fontSize: 14 }}>
                  {stock.symbol}
                </div>
                <div style={{ fontSize: 11, color: T.muted }}>{stock.name}</div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 12,
                  background:
                    stock.change >= 0 ? rgba(T.green, 0.12) : rgba(T.red, 0.12),
                  color: stock.change >= 0 ? T.green : T.red,
                }}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change}%
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: T.text,
                fontFamily: "monospace",
                marginBottom: 6,
              }}
            >
              ${stock.price.toFixed(2)}
            </div>
            <div style={{ fontSize: 10, color: T.muted }}>
              {stock.sector} · Vol {Math.floor(stock.volume / 1000)}k
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}