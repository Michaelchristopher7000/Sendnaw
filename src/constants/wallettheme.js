// ─── Shared Theme & Currency Constants ───────────────────────────────────
// Extracted from Dashboard.jsx so every wallet screen (Dashboard, Deposit,
// Withdraw, Convert, etc.) stays pixel-identical in color and branding.

export const getThemeColors = (isLight) => ({
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

export const CURRENCY_META = {
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
    EUR: {
        symbol: "€",
        flagImg: "https://flagcdn.com/w40/eu.png",
        label: "Euro",
    },
    GHS: {
        symbol: "GH₵",
        flagImg: "https://flagcdn.com/w40/gh.png",
        label: "Ghana Cedis",
    },
};