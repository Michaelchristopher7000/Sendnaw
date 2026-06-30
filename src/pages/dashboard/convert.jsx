import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/themecontext";

// ─── Light & Dark Theme Definitions ─────────────────────────────────────────
const lightTheme = {
  bg: "#F9F7FF",
  cardBg: "#FFFFFF",
  text: "#1C1130",
  textSecondary: "#7C6FA0",
  border: "#F3F0FF",
  purple: "#6B21E8",
  purpleLight: "#EDE9FE",
  green: "#10B981",
  greenLight: "#D1FAE5",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  gray: "#9CA3AF",
  grayMid: "#6B7280",
  orange: "#F97316",
  cyan: "#06B6D4",
  amber: "#F59E0B",
  surface: "#F9F7FF",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  purple: "#8A5CF7",
  purpleLight: "#2D2A4A",
  green: "#34D399",
  greenLight: "#064E3B",
  danger: "#F87171",
  dangerLight: "#7F1D1D",
  gray: "#6B7280",
  grayMid: "#9CA3AF",
  orange: "#FB923C",
  cyan: "#22D3EE",
  amber: "#FBBF24",
  surface: "#1A1530",
};

const font = `'DM Sans', 'Segoe UI', sans-serif`;

// FlagCDN base URL for country flags
const FLAG_BASE_URL = "https://flagcdn.com/w80/";

// Popular currencies list with country names and currency codes
const POPULAR_CURRENCIES = [
  { code: "USD", name: "US Dollar", country: "us", flag: "us", symbol: "$" },
  { code: "EUR", name: "Euro", country: "eu", flag: "eu", symbol: "€" },
  { code: "GBP", name: "British Pound", country: "gb", flag: "gb", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", country: "ng", flag: "ng", symbol: "₦" },
  { code: "JPY", name: "Japanese Yen", country: "jp", flag: "jp", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", country: "ca", flag: "ca", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", country: "au", flag: "au", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", country: "ch", flag: "ch", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", country: "cn", flag: "cn", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", country: "in", flag: "in", symbol: "₹" },
  { code: "ZAR", name: "South African Rand", country: "za", flag: "za", symbol: "R" },
  { code: "GHS", name: "Ghanaian Cedi", country: "gh", flag: "gh", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", country: "ke", flag: "ke", symbol: "KSh" },
  { code: "EGP", name: "Egyptian Pound", country: "eg", flag: "eg", symbol: "E£" },
  { code: "AED", name: "UAE Dirham", country: "ae", flag: "ae", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", country: "sa", flag: "sa", symbol: "﷼" },
  { code: "TRY", name: "Turkish Lira", country: "tr", flag: "tr", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", country: "ru", flag: "ru", symbol: "₽" },
  { code: "BRL", name: "Brazilian Real", country: "br", flag: "br", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", country: "mx", flag: "mx", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", country: "sg", flag: "sg", symbol: "S$" },
  { code: "MYR", name: "Malaysian Ringgit", country: "my", flag: "my", symbol: "RM" },
  { code: "THB", name: "Thai Baht", country: "th", flag: "th", symbol: "฿" },
  { code: "VND", name: "Vietnamese Dong", country: "vn", flag: "vn", symbol: "₫" },
  { code: "PHP", name: "Philippine Peso", country: "ph", flag: "ph", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", country: "pk", flag: "pk", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", country: "bd", flag: "bd", symbol: "৳" },
  { code: "LKR", name: "Sri Lankan Rupee", country: "lk", flag: "lk", symbol: "₨" },
  { code: "NPR", name: "Nepalese Rupee", country: "np", flag: "np", symbol: "₨" },
];

// ─── Exchange Rate API ──────────────────────────────────────────────────────
// Uses a Vercel serverless function as a proxy to avoid CORS issues
const getExchangeRate = async (from, to) => {
  try {
    // Call the Vercel proxy endpoint
    const response = await fetch(`/api/convert?from=${from}&to=${to}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch exchange rate');
    }
    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error("Exchange rate error:", error);
    return null;
  }
};

// Format number with proper decimal places
const formatAmount = (amount) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Currency Selector Component
function CurrencySelector({ value, onChange, label, currencies, colors }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectedCurrency = currencies.find((c) => c.code === value);

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 9,
          fontWeight: 700,
          fontSize: 11,
          color: colors.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <i className="bi bi-currency-exchange" style={{ fontSize: 13, color: colors.purple }} />
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderRadius: 16,
            border: `1.5px solid ${colors.border}`,
            background: colors.cardBg,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <img
            src={`${FLAG_BASE_URL}${selectedCurrency?.flag}.png`}
            alt={selectedCurrency?.country}
            style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = "https://flagcdn.com/w80/un.png";
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: colors.text }}>
              {selectedCurrency?.code}
            </div>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>
              {selectedCurrency?.name}
            </div>
          </div>
          <i
            className={`bi bi-chevron-${isOpen ? "up" : "down"}`}
            style={{ fontSize: 14, color: colors.textSecondary }}
          />
        </div>

        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 90 }}
            />
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                background: colors.cardBg,
                borderRadius: 16,
                border: `1px solid ${colors.border}`,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "8px 12px", borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ position: "relative" }}>
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: colors.textSecondary,
                      fontSize: 14,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search currency..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 8px 8px 32px",
                      borderRadius: 8,
                      border: `1px solid ${colors.border}`,
                      background: colors.cardBg,
                      color: colors.text,
                      fontSize: 13,
                      outline: "none",
                    }}
                    autoFocus
                  />
                </div>
              </div>
              <div style={{ maxHeight: 250, overflowY: "auto" }}>
                {filteredCurrencies.map((currency) => (
                  <div
                    key={currency.code}
                    onClick={() => {
                      onChange(currency.code);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      cursor: "pointer",
                      background: value === currency.code ? colors.purpleLight : "transparent",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (value !== currency.code) {
                        e.currentTarget.style.background = colors.surface;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (value !== currency.code) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <img
                      src={`${FLAG_BASE_URL}${currency.flag}.png`}
                      alt={currency.country}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "https://flagcdn.com/w80/un.png";
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: colors.text }}>
                        {currency.code}
                      </div>
                      <div style={{ fontSize: 11, color: colors.textSecondary }}>
                        {currency.name}
                      </div>
                    </div>
                    {value === currency.code && (
                      <i className="bi bi-check-lg" style={{ color: colors.purple, fontSize: 16 }} />
                    )}
                  </div>
                ))}
                {filteredCurrencies.length === 0 && (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: colors.textSecondary,
                      fontSize: 13,
                    }}
                  >
                    No currencies found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Swap currencies component
function SwapButton({ onSwap, colors }) {
  return (
    <div style={{ textAlign: "center", margin: "-8px 0 8px" }}>
      <button
        onClick={onSwap}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
          background: colors.purpleLight,
          border: `1.5px solid ${colors.border}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.purple;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.purpleLight;
          e.currentTarget.style.color = colors.purple;
        }}
      >
        <i className="bi bi-arrow-left-right" style={{ fontSize: 18, color: colors.purple }} />
      </button>
    </div>
  );
}

// Main Component
export default function Convert() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch exchange rate when currencies change
  useEffect(() => {
    const fetchRate = async () => {
      if (!fromCurrency || !toCurrency) return;
      setLoading(true);
      setError("");
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      if (rate) {
        setExchangeRate(rate);
        setLastUpdated(new Date());
        if (amount && !isNaN(parseFloat(amount))) {
          setConvertedAmount(parseFloat(amount) * rate);
        }
      } else {
        setError("Unable to fetch exchange rate. Please try again.");
        setExchangeRate(null);
      }
      setLoading(false);
    };
    fetchRate();
  }, [fromCurrency, toCurrency]);

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && !isNaN(parseFloat(value)) && exchangeRate) {
      setConvertedAmount(parseFloat(value) * exchangeRate);
    } else {
      setConvertedAmount(null);
    }
  };

  // Swap currencies
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setAmount("");
    setConvertedAmount(null);
  };

  // Get selected currency objects
  const fromCurrencyObj = POPULAR_CURRENCIES.find((c) => c.code === fromCurrency);
  const toCurrencyObj = POPULAR_CURRENCIES.find((c) => c.code === toCurrency);

  // Calculate display values
  const displayConverted = convertedAmount !== null ? formatAmount(convertedAmount) : "";
  const displayRate = exchangeRate ? formatAmount(exchangeRate) : "—";

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div
        style={{
          background: colors.cardBg,
          borderRadius: 32,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleLight})`,
            padding: "24px 28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -30,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <i className="bi bi-arrow-left-right" />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.4px",
                }}
              >
                Currency Converter
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Real-time exchange rates
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "28px 28px 32px" }}>
          {/* Amount Input */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <i className="bi bi-cash-stack" style={{ fontSize: 13, color: colors.purple }} />
              Amount
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontWeight: 800,
                  color: colors.purple,
                  fontSize: 20,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {fromCurrencyObj?.symbol || "$"}
              </span>
              <input
                type="number"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                style={{
                  width: "100%",
                  padding: "15px 16px 15px 48px",
                  borderRadius: 16,
                  border: `1.5px solid ${colors.border}`,
                  background: colors.cardBg,
                  color: colors.text,
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.purple;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.purple}20`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Currency Selectors */}
          <CurrencySelector
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
            currencies={POPULAR_CURRENCIES}
            colors={colors}
          />

          <SwapButton onSwap={handleSwap} colors={colors} />

          <CurrencySelector
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
            currencies={POPULAR_CURRENCIES}
            colors={colors}
          />

          {/* Conversion Result Card */}
          {(convertedAmount !== null || loading || error) && (
            <div
              style={{
                marginTop: 24,
                padding: "20px",
                borderRadius: 20,
                background: colors.purpleLight,
                border: `1px solid ${colors.border}`,
              }}
            >
              {loading && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <i
                    className="bi bi-arrow-repeat spin"
                    style={{ fontSize: 24, color: colors.purple, display: "inline-block" }}
                  />
                  <p style={{ marginTop: 8, color: colors.textSecondary, fontSize: 13 }}>
                    Fetching exchange rate...
                  </p>
                </div>
              )}

              {error && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    background: colors.dangerLight,
                    borderRadius: 16,
                  }}
                >
                  <i
                    className="bi bi-exclamation-triangle"
                    style={{ fontSize: 20, color: colors.danger }}
                  />
                  <p style={{ marginTop: 6, color: colors.danger, fontSize: 13 }}>{error}</p>
                </div>
              )}

              {!loading && !error && convertedAmount !== null && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          color: colors.textSecondary,
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        You get
                      </p>
                      <p
                        style={{
                          fontSize: 32,
                          fontWeight: 800,
                          color: colors.text,
                          margin: 0,
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {toCurrencyObj?.symbol || "$"}
                        {displayConverted}
                      </p>
                    </div>
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        background: colors.cardBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="bi bi-check-lg" style={{ fontSize: 24, color: colors.green }} />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: colors.textSecondary }}>Exchange rate</span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: colors.text,
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      1 {fromCurrency} = {displayRate} {toCurrency}
                    </span>
                  </div>

                  {lastUpdated && (
                    <div style={{ marginTop: 12, fontSize: 11, color: colors.textSecondary }}>
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Popular conversions */}
          {fromCurrency && toCurrency && !loading && exchangeRate && (
            <div
              style={{
                marginTop: 20,
                padding: "16px",
                borderRadius: 16,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                Popular conversions
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 12,
                }}
              >
                {[1, 5, 10, 50, 100, 500].map((num) => (
                  <div
                    key={num}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: 12,
                      background: colors.cardBg,
                    }}
                  >
                    <span style={{ fontSize: 13, color: colors.textSecondary }}>{num} {fromCurrency}</span>
                    <span style={{ fontWeight: 600, color: colors.text, fontFamily: "'DM Mono', monospace" }}>
                      {toCurrencyObj?.symbol || "$"}{formatAmount(num * exchangeRate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            background: colors.surface,
            borderTop: `1px solid ${colors.border}`,
            padding: "12px 28px",
            fontSize: 11,
            color: colors.textSecondary,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <i className="bi bi-shield-check" style={{ fontSize: 12, color: colors.green }} />
          <span>Powered by Frankfurter API (ECB rates)</span>
          <i className="bi bi-clock" style={{ fontSize: 12, color: colors.cyan }} />
          <span>Real-time • No hidden fees</span>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}