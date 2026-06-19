import { Link } from "react-router-dom";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#F9F7FF",
  card: "#FFFFFF",
  text: "#1C1130",
  textSub: "#7C6FA0",
  border: "#F3F0FF",
  purple: "#6B21E8",
  purpleMid: "#7C3AED",
  green: "#10B981",
  greenLight: "#D1FAE5",
  red: "#EF4444",
  orange: "#F97316",
  cyan: "#06B6D4",
};

const darkTheme = {
  bg: "#0F0A1A",
  card: "#1A1530",
  text: "#F1F5F9",
  textSub: "#A8A4C0",
  border: "#2A2440",
  purple: "#8A5CF7",
  purpleMid: "#9F7AEA",
  green: "#34D399",
  greenLight: "#064E3B",
  red: "#F87171",
  orange: "#FB923C",
  cyan: "#22D3EE",
};

const SERVICES = [
  { icon: "bi-laptop", label: "Gadgets", to: "/gadgets", color: "purple" },
  { icon: "bi-arrow-left-right", label: "Convert", to: "/convert", color: "green" },
  { icon: "bi-plus-circle", label: "Add Cash", to: "/deposit", color: "orange" },
  { icon: "bi-cash-stack", label: "Withdraw", to: "/withdraw", color: "red" },
  { icon: "bi-send", label: "Send Money", to: "/send-money", color: "cyan" },
  { icon: "bi-receipt", label: "Bills", to: "/bills?type=electricity", color: "purple" },
  { icon: "bi-phone", label: "Airtime", to: "/airtime", color: "green" },
  { icon: "bi-wifi", label: "Data", to: "/data", color: "cyan" },
  { icon: "bi-gift", label: "Gift Cards", to: "/giftcards", color: "orange" },
  { icon: "bi-piggy-bank", label: "Savings Plans", to: "/saving", color: "green" },
  { icon: "bi-people", label: "Ajo Groups", to: "/ajo", color: "purple" },
  { icon: "bi-graph-up-arrow", label: "Invest", to: "/invest", color: "purpleMid" },
  { icon: "bi-credit-card", label: "Virtual Card", to: "/virtual", color: "purple" },
  { icon: "bi-clock-history", label: "Transactions", to: "/transactions", color: "gray" },
  { icon: "bi-shield-check", label: "KYC", to: "/kyc", color: "purple" },
  { icon: "bi-gear", label: "Settings", to: "/settings", color: "gray" },
];

const getColor = (colorKey, colors) => {
  const map = {
    purple: colors.purple,
    purpleMid: colors.purpleMid,
    green: colors.green,
    orange: colors.orange,
    red: colors.red,
    cyan: colors.cyan,
    gray: colors.textSub,
  };
  return map[colorKey] || colors.purple;
};

export default function Services() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px", minHeight: "100vh", background: colors.bg }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.text, marginBottom: 8 }}>All Services</h1>
      <p style={{ color: colors.textSub, marginBottom: 24 }}>Everything you can do with SendNaw</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16 }}>
        {SERVICES.map((service) => (
          <Link
            key={service.label}
            to={service.to}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "16px 8px",
              background: colors.card,
              borderRadius: 20,
              border: `1px solid ${colors.border}`,
              textDecoration: "none",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <i
              className={`bi ${service.icon}`}
              style={{ fontSize: 28, color: getColor(service.color, colors) }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.text, textAlign: "center" }}>
              {service.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}