// src/components/fintech/PredictionWidget.jsx
import { Link } from "react-router-dom";

// Design tokens (consistent with previous widgets)
const T = {
  primary: "#6366f1",
  green: "#10b981",
  red: "#f43f5e",
  yellow: "#f59e0b",
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

export default function PredictionWidget({ predictions }) {
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
          <span style={{ fontSize: 20 }}>🎯</span>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: T.text }}>
            Prediction Markets
          </h3>
        </div>
        <Link to="/dashboard/predictions">
          <button style={btn(T.primary)}>View All</button>
        </Link>
      </div>

      {/* Predictions grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {predictions.map((pred) => (
          <div
            key={pred.id}
            style={{
              background: rgba(T.primary, 0.05),
              borderRadius: 16,
              padding: "14px",
              border: `1px solid ${rgba(T.primary, 0.1)}`,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onClick={() => {
              // Will open prediction modal or navigate to details page later
              console.log("Open prediction:", pred.id);
            }}
          >
            <div style={{ fontWeight: 700, color: T.text, marginBottom: 8 }}>
              {pred.title}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 13, color: T.muted }}>
                Ends: {new Date(pred.endDate).toLocaleDateString()}
              </div>
              <div
                style={{
                  background: rgba(T.yellow, 0.15),
                  color: T.yellow,
                  padding: "4px 10px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Odds: {pred.odds.toFixed(2)}x
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: T.muted,
              }}
            >
              <span>💰 Volume: ${(pred.volume / 1000).toFixed(0)}k</span>
              <span>🔥 {Math.floor(pred.volume * 0.003)} participants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}