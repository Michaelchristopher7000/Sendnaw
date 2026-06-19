import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Bootstrap Icons (ensure loaded)
if (
  !document.querySelector(
    `link[href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"]`,
  )
) {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href =
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
  document.head.appendChild(l);
}

// Light & Dark theme definitions
const lightTheme = {
  indigo: "#4F46E5",
  purple: "#9333EA",
  green: "#10B981",
  white: "#FFFFFF",
  black: "#111827",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  darkBg: "#F9FAFB",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  cardBg: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accentLight: "#F3F4F6",
};

const darkTheme = {
  indigo: "#8A5CF7",
  purple: "#A78BFA",
  green: "#34D399",
  white: "#1E293B",
  black: "#F1F5F9",
  gray: "#94A3B8",
  lightGray: "#334155",
  darkBg: "#0F172A",
  danger: "#F87171",
  warning: "#FBBF24",
  info: "#60A5FA",
  cardBg: "#1E293B",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  border: "#334155",
  accentLight: "#1E293B",
};

function fmt(n) {
  return (
    "₦" +
    Number(n).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function initials(str) {
  return str
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function SellModal({ entry, onConfirm, onCancel, colors }) {
  const [qty, setQty] = useState("");
  const maxQty = entry.quantity;
  const handleSubmit = () => {
    const num = parseInt(qty);
    if (isNaN(num) || num <= 0 || num > maxQty) {
      showNotification(
        "SendNaw",
        `Enter quantity between 1 and ${maxQty}`,
        "error",
      );
      return;
    }
    onConfirm(entry.id, num);
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "24px",
          padding: "1.5rem",
          maxWidth: 320,
          width: "90%",
          boxShadow: "0 20px 35px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: colors.textPrimary,
            marginBottom: 8,
          }}
        >
          Sell {entry.symbol}
        </p>
        <p
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 16,
          }}
        >
          You own {maxQty} shares · avg {fmt(entry.average_buy_price)}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 20,
          }}
        >
          <label
            style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}
          >
            Number of shares
          </label>
          <input
            type="number"
            min="1"
            max={maxQty}
            placeholder={`1 - ${maxQty}`}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: "40px",
              padding: "10px 16px",
              fontSize: 14,
              background: colors.cardBg,
              color: colors.textPrimary,
              outline: "none",
            }}
            autoFocus
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleSubmit}
            style={{
              background: colors.danger,
              color: "#fff",
              border: "none",
              borderRadius: "40px",
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Confirm Sell
          </button>
          <button
            onClick={onCancel}
            style={{
              background: "transparent",
              border: `1px solid ${colors.border}`,
              borderRadius: "40px",
              padding: "10px 20px",
              fontSize: 14,
              color: colors.textSecondary,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, variant, hidden, colors }) {
  let valueColor = colors.textPrimary;
  if (variant === "up") valueColor = colors.green;
  if (variant === "down") valueColor = colors.danger;
  const displayValue = hidden ? "••••••" : value;
  return (
    <div
      style={{
        background: colors.cardBg,
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: `1px solid ${colors.border}`,
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: colors.textSecondary,
          marginBottom: 6,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </p>
      <p
        style={{ fontSize: 22, fontWeight: 600, color: valueColor, margin: 0 }}
      >
        {displayValue}
      </p>
    </div>
  );
}

function StockRow({ stock, isSelected, onBuyClick, colors }) {
  const isUp = stock.change_percent >= 0;
  const logoUrl = stock.logo_url;
  const showLogo = logoUrl && logoUrl.trim() !== "";
  return (
    <div
      style={{
        background: colors.cardBg,
        border: isSelected
          ? `2px solid ${colors.indigo}`
          : `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: showLogo ? "transparent" : `${colors.indigo}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {showLogo ? (
          <img
            src={logoUrl}
            alt={stock.company_name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = initials(stock.company_name);
            }}
          />
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.indigo }}>
            {initials(stock.company_name)}
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          {stock.symbol}
        </p>
        <p
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            margin: "2px 0 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {stock.company_name}
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          {fmt(stock.current_price)}
        </p>
        <p
          style={{
            fontSize: 12,
            margin: "2px 0 0",
            color: isUp ? colors.green : colors.danger,
            fontWeight: 500,
          }}
        >
          {isUp ? "+" : ""}
          {stock.change_percent}%
        </p>
      </div>
      <button
        onClick={() => onBuyClick(stock)}
        style={{
          background: colors.indigo,
          color: "#fff",
          border: "none",
          borderRadius: "40px",
          padding: "7px 20px",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Buy
      </button>
    </div>
  );
}

function BuyPanel({ stock, onConfirm, onCancel, colors }) {
  const [qty, setQty] = useState("");
  const estimated = qty ? parseFloat(qty) * stock.current_price : 0;
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: "20px",
        padding: "1.5rem",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: colors.textPrimary,
          marginBottom: 4,
        }}
      >
        Buy {stock.symbol}
      </p>
      <p
        style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}
      >
        {stock.company_name} · {fmt(stock.current_price)} per share
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          maxWidth: 260,
        }}
      >
        <label
          style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}
        >
          Number of shares
        </label>
        <input
          type="number"
          min="1"
          placeholder="0"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: "40px",
            padding: "10px 16px",
            fontSize: 14,
            background: colors.cardBg,
            color: colors.textPrimary,
            outline: "none",
          }}
        />
      </div>
      <p
        style={{
          fontSize: 14,
          color: colors.textSecondary,
          padding: "14px 0 6px",
          margin: 0,
        }}
      >
        Estimated cost:{" "}
        <span style={{ color: colors.textPrimary, fontWeight: 600 }}>
          {fmt(estimated)}
        </span>
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button
          onClick={() =>
            qty && parseInt(qty) > 0 && onConfirm(stock.id, parseInt(qty))
          }
          style={{
            background: colors.purple,
            color: "#fff",
            border: "none",
            borderRadius: "40px",
            padding: "10px 24px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Confirm purchase
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "transparent",
            border: `1px solid ${colors.border}`,
            borderRadius: "40px",
            padding: "10px 24px",
            fontSize: 14,
            color: colors.textSecondary,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PortfolioRow({ entry, onSellClick, hideBalance, colors }) {
  const isUp = entry.profit_loss >= 0;
  const logoUrl = entry.logo_url;
  const displayValue = hideBalance ? "••••••" : fmt(entry.current_value);
  const displayPL = hideBalance
    ? "••••••"
    : (entry.profit_loss >= 0 ? "+" : "") + fmt(entry.profit_loss);
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: logoUrl ? "transparent" : `${colors.green}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={entry.symbol}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.green }}>
            {entry.symbol.slice(0, 2)}
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          {entry.symbol}
        </p>
        <p
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            margin: "2px 0 0",
          }}
        >
          {entry.quantity} shares · avg {fmt(entry.average_buy_price)}
        </p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          {displayValue}
        </p>
        <p
          style={{
            fontSize: 12,
            margin: "2px 0 0",
            color: isUp ? colors.green : colors.danger,
            fontWeight: 500,
          }}
        >
          {displayPL}
        </p>
      </div>
      <button
        onClick={() => onSellClick(entry)}
        style={{
          background: "transparent",
          border: `1px solid ${colors.border}`,
          borderRadius: "40px",
          padding: "7px 18px",
          fontSize: 13,
          color: colors.textSecondary,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Sell
      </button>
    </div>
  );
}

export default function Invest() {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sellEntry, setSellEntry] = useState(null);
  const [hideBalance, setHideBalance] = useState(false);
  const stocksRef = useRef(null);

  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/invest/stocks.php",
      );
      const data = await res.json();
      if (data.success) setStocks(data.stocks);
    } catch {
      showNotification("SendNaw", "Failed to load stocks", "error");
    }
  };

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/invest/portfolio.php",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      if (data.success) setPortfolio(data.portfolio);
    } catch {
      showNotification("SendNaw", "Failed to load portfolio", "error");
    }
  };

  const handleBuyConfirm = async (stockId, quantity) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/invest/buy.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ stock_id: stockId, quantity }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", data.message, "success");
        setSelectedStock(null);
        fetchPortfolio();
        fetchStocks();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Purchase failed", "error");
    }
    setLoading(false);
  };

  const handleSellConfirm = async (stockId, quantity) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/invest/sell.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ stock_id: stockId, quantity }),
        },
      );
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", data.message, "success");
        setSellEntry(null);
        fetchPortfolio();
        fetchStocks();
      } else showNotification("SendNaw", data.message, "error");
    } catch {
      showNotification("SendNaw", "Sell failed", "error");
    }
    setLoading(false);
  };

  const totalValue = portfolio.reduce(
    (s, p) => s + parseFloat(p.current_value ?? 0),
    0,
  );
  const totalInvested = portfolio.reduce(
    (s, p) =>
      s + parseFloat(p.average_buy_price ?? 0) * parseInt(p.quantity ?? 0),
    0,
  );
  const totalReturn = totalValue - totalInvested;
  const returnVariant =
    totalReturn > 0 ? "up" : totalReturn < 0 ? "down" : "neutral";

  const sectionLabel = {
    fontSize: 13,
    fontWeight: 600,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "1rem",
    marginTop: "2rem",
  };

  const handleAddInvestmentClick = () => {
    if (stocksRef.current)
      stocksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: colors.darkBg,
        minHeight: "100vh",
        position: "relative",
      }}
    >
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
          color: colors.textPrimary,
          fontWeight: 600,
          fontSize: 13,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <i
          className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
        />{" "}
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <button
        onClick={handleAddInvestmentClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: colors.indigo,
          border: "none",
          borderRadius: "40px",
          padding: "10px 20px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 6px rgba(79,70,229,0.3)",
        }}
      >
        <i
          className="bi bi-plus-circle"
          style={{ fontSize: "1.2rem", color: "#fff" }}
        ></i>
        <span style={{ fontWeight: 600, color: "#fff", fontSize: "14px" }}>
          Add Investment
        </span>
      </button>

      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          Investments
        </h2>
        <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 6 }}>
          Buy and sell simulated stocks from your wallet balance
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
          marginBottom: "2rem",
        }}
      >
        <SummaryCard
          label="Portfolio value"
          value={fmt(totalValue)}
          hidden={hideBalance}
          colors={colors}
        />
        <SummaryCard
          label="Total invested"
          value={fmt(totalInvested)}
          hidden={hideBalance}
          colors={colors}
        />
        <SummaryCard
          label="Total return"
          value={(totalReturn >= 0 ? "+" : "") + fmt(totalReturn)}
          variant={returnVariant}
          hidden={hideBalance}
          colors={colors}
        />
        <SummaryCard
          label="Holdings"
          value={portfolio.length}
          hidden={false}
          colors={colors}
        />
      </div>

      <div ref={stocksRef}>
        <p style={sectionLabel}>Available stocks</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: selectedStock ? "1.5rem" : "2rem",
          }}
        >
          {stocks.map((s) => (
            <StockRow
              key={s.id}
              stock={s}
              isSelected={selectedStock?.id === s.id}
              onBuyClick={setSelectedStock}
              colors={colors}
            />
          ))}
        </div>
      </div>

      {selectedStock && (
        <div style={{ marginBottom: "2rem" }}>
          <BuyPanel
            stock={selectedStock}
            onConfirm={handleBuyConfirm}
            onCancel={() => setSelectedStock(null)}
            colors={colors}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        <p style={{ ...sectionLabel, marginBottom: 0, marginTop: 0 }}>
          My portfolio
        </p>
        <button
          onClick={() => setHideBalance(!hideBalance)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: colors.textSecondary,
            padding: "4px 8px",
            borderRadius: "40px",
          }}
        >
          <i className={hideBalance ? "bi bi-eye-slash" : "bi bi-eye"}></i>
        </button>
      </div>

      {portfolio.length === 0 ? (
        <div
          style={{
            background: colors.cardBg,
            borderRadius: "20px",
            padding: "2.5rem",
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: 14,
            border: `1px solid ${colors.border}`,
          }}
        >
          No holdings yet. Buy your first stock above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {portfolio.map((p) => (
            <PortfolioRow
              key={p.id}
              entry={p}
              onSellClick={setSellEntry}
              hideBalance={hideBalance}
              colors={colors}
            />
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: colors.cardBg,
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          fontSize: "12px",
          color: colors.textSecondary,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 6px 0",
            fontWeight: 500,
            color: colors.textPrimary,
          }}
        >
          ⚠️ Important Notice
        </p>
        <p style={{ margin: 0 }}>
          This investment platform is designed to help users explore and
          understand financial markets. Investment opportunities may involve
          varying levels of risk, and returns are not guaranteed. Users are
          encouraged to carefully assess their financial goals, risk tolerance,
          and investment objectives before making any decisions. Past
          performance is not indicative of future results. By using this
          platform, you acknowledge and accept the risks associated with
          investing and agree to make informed financial decisions.
        </p>
      </div>

      {sellEntry && (
        <SellModal
          entry={sellEntry}
          onConfirm={handleSellConfirm}
          onCancel={() => setSellEntry(null)}
          colors={colors}
        />
      )}
    </div>
  );
}
