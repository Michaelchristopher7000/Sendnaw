// src/components/fintech/CryptoWidget.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

// Design tokens (copy from Dashboard or move to shared theme later)
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

export default function CryptoWidget({ prices }) {
  const [selected, setSelected] = useState(prices[0]);

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
          <span style={{ fontSize: 20 }}>📈</span>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: T.text }}>
            Live Crypto Prices
          </h3>
        </div>
        <Link to="/dashboard/crypto">
          <button style={btn(T.primary)}>View All</button>
        </Link>
      </div>

      {/* Crypto list (horizontal scroll) */}
      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        {prices.map((p) => (
          <div
            key={p.symbol}
            onClick={() => setSelected(p)}
            style={{
              cursor: "pointer",
              background:
                selected.symbol === p.symbol ? rgba(T.primary, 0.15) : "transparent",
              borderRadius: 16,
              padding: "10px 14px",
              minWidth: 130,
              border: `1px solid ${
                selected.symbol === p.symbol ? rgba(T.primary, 0.4) : "transparent"
              }`,
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontWeight: 700, color: T.text, marginBottom: 4 }}>
              {p.name}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: T.text,
                fontFamily: "monospace",
              }}
            >
              ${p.price.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: p.change >= 0 ? T.green : T.red,
                marginTop: 4,
              }}
            >
              {p.change >= 0 ? "+" : ""}
              {p.change}%
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline chart for selected crypto */}
      {selected && selected.chart && selected.chart.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <svg
            width="100%"
            height="60"
            viewBox="0 0 300 60"
            preserveAspectRatio="none"
          >
            <polyline
              points={selected.chart
                .map((v, i) => {
                  const x = (i / (selected.chart.length - 1)) * 300;
                  const y = 60 - (v / Math.max(...selected.chart)) * 50;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke={T.primary}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polygon
              points={selected.chart
                .map((v, i) => {
                  const x = (i / (selected.chart.length - 1)) * 300;
                  const y = 60 - (v / Math.max(...selected.chart)) * 50;
                  return `${x},${y}`;
                })
                .join(" ") + ` 300,60 0,60`}
              fill={rgba(T.primary, 0.1)}
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 10,
              color: T.muted,
            }}
          >
            <span>7d</span>
            <span>24h high: ${selected.price * (1 + Math.random() * 0.05)}</span>
            <span>24h low: ${selected.price * (1 - Math.random() * 0.05)}</span>
          </div>
        </div>
      )}
    </div>
  );
}