// src/components/fintech/AIInsightCard.jsx
import { useState } from "react";

// Design tokens
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
const btnSolid = (color, extra = {}) => ({
  background: color,
  border: "none",
  color: "#fff",
  borderRadius: 12,
  padding: "8px 16px",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  transition: "opacity 0.18s",
  ...extra,
});

export default function AIInsightCard({ insight, onActionClick }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const typeColors = {
    warning: T.yellow,
    success: T.green,
    info: T.primary,
    danger: T.red,
  };
  const iconMap = {
    warning: "⚠️",
    success: "💡",
    info: "🤖",
    danger: "🔔",
  };
  const color = typeColors[insight.type] || T.primary;
  const icon = iconMap[insight.type] || "🤖";

  return (
    <div
      style={{
        background: rgba(color, 0.08),
        border: `1px solid ${rgba(color, 0.25)}`,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        position: "relative",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div
          style={{
            fontSize: 24,
            minWidth: 40,
            textAlign: "center",
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: color,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 4,
            }}
          >
            AI Financial Insight
          </div>
          <div style={{ fontSize: 14, color: T.text, marginBottom: 12 }}>
            {insight.message}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {insight.action && (
              <button
                onClick={() => {
                  if (onActionClick) onActionClick(insight.action);
                }}
                style={btnSolid(color, { padding: "6px 14px", fontSize: 12 })}
              >
                {insight.action}
              </button>
            )}
            <button
              onClick={() => setDismissed(true)}
              style={{
                background: "none",
                border: "none",
                color: T.muted,
                fontSize: 12,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}