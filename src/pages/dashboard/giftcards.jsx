import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/notify";
import { useTheme } from "../../context/themecontext";

// Bootstrap Icons (ensure loaded once)
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

const API = "https://sendnawbackend.onrender.com/api/giftcards";
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// Available countries (unchanged)
const COUNTRIES = [
  {
    code: "NGN",
    name: "Nigeria",
    flag: "https://flagcdn.com/ng.svg",
    symbol: "₦",
  },
  {
    code: "USD",
    name: "United States",
    flag: "https://flagcdn.com/us.svg",
    symbol: "$",
  },
  {
    code: "GBP",
    name: "United Kingdom",
    flag: "https://flagcdn.com/gb.svg",
    symbol: "£",
  },
  {
    code: "EUR",
    name: "Eurozone",
    flag: "https://flagcdn.com/eu.svg",
    symbol: "€",
  },
  {
    code: "CAD",
    name: "Canada",
    flag: "https://flagcdn.com/ca.svg",
    symbol: "C$",
  },
  {
    code: "AUD",
    name: "Australia",
    flag: "https://flagcdn.com/au.svg",
    symbol: "A$",
  },
];

// Brand metadata (unchanged)
const BRAND_META = {
  amazon: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  apple: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  google: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  steam: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
  },
  netflix: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  spotify: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  xbox: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg",
  },
  playstation: {
    logo: "https://i.pinimg.com/736x/d2/a6/5e/d2a65e282c8fe6ee53afb8a765e8ae34.jpg",
  },
  nintendo: {
    logo: "https://i.pinimg.com/1200x/10/fe/e1/10fee12e3fbd00aff49c0073933b6978.jpg",
  },
  sephora: {
    logo: "https://i.pinimg.com/1200x/98/44/82/9844821c4b50abec18e860689e29eca8.jpg",
  },
  walmart: {
    logo: "https://i.pinimg.com/1200x/92/86/93/9286935afb95765686fe4288bb3b494e.jpg",
  },
  target: {
    logo: "https://i.pinimg.com/1200x/a9/1c/b3/a91cb39305b9319826c428aaa2a62ad7.jpg",
  },
  paysafe: {
    logo: "https://i.pinimg.com/1200x/80/75/24/80752474df2dfb34309e2ca37b1d0994.jpg",
  },
  ebay: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
  },
  itunes: {
    logo: "https://i.pinimg.com/736x/53/12/73/5312738a7102a3edb2728eea63f636de.jpg",
  },
  uber: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
  },
  doordash: {
    logo: "https://i.pinimg.com/1200x/22/c5/9b/22c59bd425d482fd8459037801aed958.jpg",
  },
  nike: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  adidas: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
  },
  razer: {
    logo: "https://i.pinimg.com/736x/f2/39/60/f239603a11eec3c6ae6781930e9e46e1.jpg",
  },
  googleplay: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_2022_logo.svg",
  },
  starbucks: {
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg",
  },
};

const getBrandMeta = (name = "") => {
  const key = Object.keys(BRAND_META).find((k) =>
    name.toLowerCase().includes(k),
  );
  if (key) return { logo: BRAND_META[key].logo, name: key };
  return { logo: null, name };
};

// Logo component (unchanged, but receives no theme – it's brand‑specific)
function BrandLogo({ meta, size = 50 }) {
  const [err, setErr] = useState(false);
  if (meta.logo && !err) {
    return (
      <img
        src={meta.logo}
        alt={meta.name}
        onError={() => setErr(true)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#F0EBFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: "#5B2EDB",
      }}
    >
      {meta.name?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

// ── Purchase Modal (now receives theme colors) ────────────────────────────
function PurchaseModal({ card, onClose, onConfirm, loading, colors }) {
  const [amount, setAmount] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const meta = getBrandMeta(card?.brand);
  if (!card) return null;

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      showNotification("SendNaw", "Please enter a valid amount", "error");
      return;
    }
    onConfirm(card.id, parseFloat(amount), selectedCountry.code);
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      background: colors.cardBg,
      borderRadius: 24,
      width: "90%",
      maxWidth: 400,
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "20px 24px",
      borderBottom: `1px solid ${colors.border}`,
    },
    title: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      color: colors.text,
      flex: 1,
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: 18,
      cursor: "pointer",
      color: colors.textSub,
    },
    body: {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    field: { display: "flex", flexDirection: "column", gap: 6 },
    label: {
      fontSize: 12,
      fontWeight: 700,
      color: colors.textSub,
      textTransform: "uppercase",
      letterSpacing: ".06em",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: 12,
      border: `1.5px solid ${colors.borderDark}`,
      background: colors.inputBg,
      fontSize: 16,
      fontWeight: 600,
      color: colors.text,
    },
    countrySelector: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 12px",
      borderRadius: 12,
      border: `1.5px solid ${colors.borderDark}`,
      background: colors.inputBg,
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
      color: colors.text,
    },
    flagIcon: { width: 24, height: 18, objectFit: "cover", borderRadius: 2 },
    countryList: {
      marginTop: 8,
      border: `1px solid ${colors.borderDark}`,
      borderRadius: 12,
      overflow: "hidden",
      background: colors.cardBg,
    },
    countrySearch: {
      position: "relative",
      padding: "8px 12px",
      borderBottom: `1px solid ${colors.border}`,
    },
    countrySearchInput: {
      width: "100%",
      padding: "8px 8px 8px 32px",
      borderRadius: 8,
      border: `1px solid ${colors.borderDark}`,
      fontSize: 13,
      outline: "none",
      background: colors.inputBg,
      color: colors.text,
    },
    countryItems: { maxHeight: 200, overflowY: "auto" },
    countryItem: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      width: "100%",
      border: "none",
      background: colors.cardBg,
      cursor: "pointer",
      textAlign: "left",
      color: colors.text,
    },
    noResults: {
      padding: "12px",
      textAlign: "center",
      color: colors.textSub,
      fontSize: 12,
    },
    footer: {
      display: "flex",
      gap: 12,
      padding: "16px 24px 24px",
      borderTop: `1px solid ${colors.border}`,
    },
    cancelBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: 40,
      background: colors.accentLight,
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      color: colors.accent,
    },
    confirmBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: 40,
      background: colors.accent,
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      color: "#fff",
    },
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={modalStyles.header}>
          <BrandLogo meta={meta} size={40} />
          <h3 style={modalStyles.title}>{card.brand} Gift Card</h3>
          <button onClick={onClose} style={modalStyles.closeBtn}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div style={modalStyles.body}>
          <div style={modalStyles.field}>
            <label style={modalStyles.label}>Amount (Face Value)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={modalStyles.input}
              autoFocus
            />
          </div>
          <div style={modalStyles.field}>
            <label style={modalStyles.label}>Country / Currency</label>
            <button
              type="button"
              onClick={() => setShowCountryList(!showCountryList)}
              style={modalStyles.countrySelector}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.code}
                style={modalStyles.flagIcon}
              />
              <span>
                {selectedCountry.name} ({selectedCountry.code})
              </span>
              <i
                className="bi bi-chevron-down"
                style={{ marginLeft: "auto", fontSize: 12 }}
              />
            </button>
            {showCountryList && (
              <div style={modalStyles.countryList}>
                <div style={modalStyles.countrySearch}>
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      left: 10,
                      top: 10,
                      color: colors.textSub,
                      fontSize: 14,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    style={modalStyles.countrySearchInput}
                  />
                </div>
                <div style={modalStyles.countryItems}>
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c);
                        setShowCountryList(false);
                        setCountrySearch("");
                      }}
                      style={modalStyles.countryItem}
                    >
                      <img
                        src={c.flag}
                        alt={c.code}
                        style={modalStyles.flagIcon}
                      />
                      <span>
                        {c.name} ({c.code})
                      </span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div style={modalStyles.noResults}>No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={modalStyles.footer}>
          <button onClick={onClose} style={modalStyles.cancelBtn}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !amount}
            style={{
              ...modalStyles.confirmBtn,
              opacity: loading || !amount ? 0.6 : 1,
            }}
          >
            {loading ? <i className="bi bi-arrow-repeat spin" /> : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main GiftCards Component ──────────────────────────────────────────────
export default function GiftCards() {
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ hook inside component
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const [activeTab, setActiveTab] = useState("buy");

  useEffect(() => {
    fetchCards();
    fetchMyCards();
  }, []);

  useEffect(() => {
    filterCards();
  }, [cards, searchTerm]);

  const fetchCards = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${API}/list.php`);
      const data = await res.json();
      if (data.success) setCards(data.cards || []);
    } catch {
    } finally {
      setFetching(false);
    }
  };

  const fetchMyCards = async () => {
    try {
      const res = await fetch(`${API}/my_cards.php`, { headers: auth() });
      const data = await res.json();
      if (data.success) setMyCards(data.cards || []);
    } catch {}
  };

  const filterCards = () => {
    let filtered = cards;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((c) => c.brand.toLowerCase().includes(term));
    }
    setFilteredCards(filtered);
  };

  const handleBuy = async (cardId, amount, currencyCode) => {
    setPurchasing(true);
    try {
      const res = await fetch(`${API}/buy.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify({
          card_id: cardId,
          amount,
          currency: currencyCode,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("SendNaw", `Gift card purchased! Code: ${data.code}`);
        setSelectedCard(null);
        fetchCards();
        fetchMyCards();
        setActiveTab("mine");
      } else {
        showNotification("SendNaw", data.message || "Purchase failed", "error");
      }
    } catch {
      showNotification("SendNaw", "Network error. Try again.", "error");
    } finally {
      setPurchasing(false);
    }
  };

  // Dynamic styles based on theme
  const getStyles = (colors) => ({
    page: {
      minHeight: "100vh",
      background: colors.bg,
      display: "flex",
      justifyContent: "center",
      padding: "12px",
      position: "relative",
    },
    card: {
      width: "100%",
      maxWidth: 520,
      background: colors.cardBg,
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 20px",
      borderBottom: `1px solid ${colors.border}`,
    },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 50,
      background: colors.accentLight,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: colors.accent,
    },
    title: { margin: 0, fontSize: 20, fontWeight: 800, color: colors.text },
    subtitle: { margin: 0, fontSize: 12, color: colors.textSub },
    headerIcon: { fontSize: 24, opacity: 0.6, color: colors.textSub },
    tabBar: {
      display: "flex",
      gap: 8,
      padding: "12px 20px 0",
      borderBottom: `1px solid ${colors.border}`,
    },
    tabBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px",
      border: "none",
      background: "transparent",
      fontSize: 13,
      fontWeight: 700,
      color: colors.textSub,
      cursor: "pointer",
      borderBottom: "2px solid transparent",
    },
    tabBtnOn: { color: colors.accent, borderBottomColor: colors.accent },
    body: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    searchBox: { position: "relative", display: "flex", alignItems: "center" },
    searchIcon: {
      position: "absolute",
      left: 12,
      color: colors.textSub,
      fontSize: 14,
    },
    searchInput: {
      width: "100%",
      padding: "12px 32px 12px 40px",
      borderRadius: 40,
      border: `1px solid ${colors.borderDark}`,
      background: colors.inputBg,
      fontSize: 14,
      outline: "none",
      color: colors.text,
    },
    clearSearch: {
      position: "absolute",
      right: 12,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: colors.textSub,
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: 16,
    },
    cardBtn: {
      background: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: 20,
      padding: "16px 8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      transition: "transform 0.1s",
      color: colors.text,
    },
    cardLogo: { display: "flex", justifyContent: "center" },
    cardBrand: { fontSize: 12, fontWeight: 600, textAlign: "center" },
    shimmerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: 16,
    },
    shimmerCard: {
      height: 96,
      borderRadius: 20,
      background: `linear-gradient(90deg,${colors.shimmer.start} 25%,${colors.shimmer.mid} 50%,${colors.shimmer.end} 75%)`,
      backgroundSize: "400px 100%",
      animation: "shimmer 1.2s infinite",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "40px 16px",
      textAlign: "center",
    },
    emptyTitle: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      color: colors.text,
    },
    emptySub: { margin: 0, fontSize: 13, color: colors.textSub },
    sellHero: {
      background: colors.accentGradient,
      borderRadius: 24,
      padding: "24px",
      textAlign: "center",
      color: "#fff",
    },
    sellHeroIcon: { fontSize: 32, marginBottom: 8 },
    sellHeroTitle: { margin: "0 0 4px", fontSize: 18, fontWeight: 800 },
    sellHeroSub: { margin: 0, fontSize: 12, opacity: 0.85 },
    field: { display: "flex", flexDirection: "column", gap: 6 },
    fieldLabel: {
      fontSize: 12,
      fontWeight: 700,
      color: colors.textSub,
      textTransform: "uppercase",
      letterSpacing: ".06em",
    },
    inIcon: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.textSub,
      fontSize: 14,
    },
    input: {
      width: "100%",
      padding: "12px 12px 12px 36px",
      borderRadius: 12,
      border: `1.5px solid ${colors.borderDark}`,
      background: colors.inputBg,
      fontSize: 13,
      color: colors.text,
    },
    primaryBtn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      width: "100%",
      padding: "14px",
      borderRadius: 40,
      background: colors.accent,
      color: "#fff",
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
    },
    myCardsList: { display: "flex", flexDirection: "column", gap: 12 },
    myCardItem: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px",
      background: colors.inputBg,
      borderRadius: 16,
      border: `1px solid ${colors.border}`,
    },
    myCardLogo: { flexShrink: 0 },
    myCardInfo: { flex: 1 },
    myCardBrand: {
      margin: 0,
      fontSize: 14,
      fontWeight: 700,
      color: colors.text,
    },
    myCardCode: {
      margin: "4px 0 0",
      fontSize: 12,
      fontFamily: "monospace",
      color: colors.textSub,
    },
    myCardStatus: {
      margin: "4px 0 0",
      fontSize: 11,
      fontWeight: 600,
      color: colors.success,
    },
    e2eFooter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      padding: "12px",
      borderTop: `1px solid ${colors.border}`,
      fontSize: 11,
      color: colors.textSub,
      background: colors.inputBg,
    },
    themeToggle: {
      position: "fixed",
      top: "1rem",
      right: "1rem",
      zIndex: 100,
      background: colors.cardBg,
      border: `1px solid ${colors.borderDark}`,
      borderRadius: "40px",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      color: colors.text,
      fontWeight: 600,
      fontSize: 13,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  });

  const styles = getStyles(colors);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <i className="bi bi-chevron-left" style={{ fontSize: 15 }} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={styles.title}>Gift Cards</h1>
            <p style={styles.subtitle}>Buy & sell instantly</p>
          </div>
          <div style={styles.headerIcon}>
            <i className="bi bi-gift-fill"></i>
          </div>
        </div>

        <div style={styles.tabBar}>
          <button
            onClick={() => setActiveTab("buy")}
            style={{
              ...styles.tabBtn,
              ...(activeTab === "buy" ? styles.tabBtnOn : {}),
            }}
          >
            <i className="bi bi-bag-fill" /> Buy
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            style={{
              ...styles.tabBtn,
              ...(activeTab === "sell" ? styles.tabBtnOn : {}),
            }}
          >
            <i className="bi bi-cash-coin" /> Sell
          </button>
          <button
            onClick={() => setActiveTab("mine")}
            style={{
              ...styles.tabBtn,
              ...(activeTab === "mine" ? styles.tabBtnOn : {}),
            }}
          >
            <i className="bi bi-wallet2" /> My Cards
          </button>
        </div>

        {activeTab === "buy" && (
          <div style={styles.body}>
            <div style={styles.searchBox}>
              <i className="bi bi-search" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search gift cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={styles.clearSearch}
                >
                  <i className="bi bi-x-circle-fill" />
                </button>
              )}
            </div>

            {fetching ? (
              <div style={styles.shimmerGrid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} style={styles.shimmerCard} />
                ))}
              </div>
            ) : filteredCards.length === 0 ? (
              <div style={styles.emptyState}>
                <i
                  className="bi bi-emoji-frown"
                  style={{ fontSize: 40, color: colors.textSub }}
                />
                <p style={styles.emptyTitle}>No gift cards found</p>
                <p style={styles.emptySub}>Try a different search</p>
              </div>
            ) : (
              <div style={styles.cardsGrid}>
                {filteredCards.map((card) => {
                  const meta = getBrandMeta(card.brand);
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      style={styles.cardBtn}
                    >
                      <div style={styles.cardLogo}>
                        <BrandLogo meta={meta} size={44} />
                      </div>
                      <span style={styles.cardBrand}>{card.brand}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "sell" && (
          <div style={styles.body}>
            <div style={styles.sellHero}>
              <i className="bi bi-gift-fill" style={styles.sellHeroIcon} />
              <p style={styles.sellHeroTitle}>Got a gift card?</p>
              <p style={styles.sellHeroSub}>
                Enter your card code and we'll credit your wallet instantly
              </p>
            </div>
            <div style={styles.field}>
              <p style={styles.fieldLabel}>Card Code</p>
              <div style={{ position: "relative" }}>
                <i className="bi bi-upc-scan" style={styles.inIcon} />
                <input
                  type="text"
                  placeholder="e.g. AMZN-XXXX-XXXX-XXXX"
                  style={styles.input}
                />
              </div>
            </div>
            <button style={styles.primaryBtn}>Sell Card</button>
          </div>
        )}

        {activeTab === "mine" && (
          <div style={styles.body}>
            {myCards.length === 0 ? (
              <div style={styles.emptyState}>
                <i
                  className="bi bi-credit-card"
                  style={{ fontSize: 40, color: colors.textSub }}
                />
                <p style={styles.emptyTitle}>No cards yet</p>
                <p style={styles.emptySub}>
                  Buy a gift card and it will appear here
                </p>
                <button
                  onClick={() => setActiveTab("buy")}
                  style={{ ...styles.primaryBtn, marginTop: 8 }}
                >
                  Browse Cards
                </button>
              </div>
            ) : (
              <div style={styles.myCardsList}>
                {myCards.map((card) => {
                  const meta = getBrandMeta(card.brand);
                  return (
                    <div key={card.id} style={styles.myCardItem}>
                      <div style={styles.myCardLogo}>
                        <BrandLogo meta={meta} size={36} />
                      </div>
                      <div style={styles.myCardInfo}>
                        <p style={styles.myCardBrand}>{card.brand}</p>
                        <p style={styles.myCardCode}>{card.code}</p>
                        <p style={styles.myCardStatus}>
                          {card.status === "used" ? "Used" : "Active"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div style={styles.e2eFooter}>
          <i
            className="bi bi-shield-lock-fill"
            style={{ color: colors.accent }}
          />
          Secured by SendNaw
        </div>
      </div>

      {selectedCard && (
        <PurchaseModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onConfirm={handleBuy}
          loading={purchasing}
          colors={colors}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin .8s linear infinite; display: inline-block; }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      `}</style>
    </div>
  );
}

// ── Light & Dark Theme Definitions ─────────────────────────────────────────
const lightTheme = {
  bg: "#F8F6FF",
  cardBg: "#FFFFFF",
  text: "#1A0060",
  textSub: "#9B8FCC",
  textMuted: "#7B6FAE",
  border: "#F0EBFF",
  borderDark: "#E0D8FF",
  inputBg: "#FAFAFF",
  accent: "#5B2EDB",
  accentLight: "#F0EBFF",
  accentGradient: "linear-gradient(135deg,#5B2EDB 0%,#7B4FEE 100%)",
  success: "#2DBE8C",
  shimmer: { start: "#F0EBFF", mid: "#E8E0FF", end: "#F0EBFF" },
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSub: "#A8A4C0",
  textMuted: "#6B6B8F",
  border: "#2A2440",
  borderDark: "#3D2E5A",
  inputBg: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  accentGradient: "linear-gradient(135deg,#8A5CF7 0%,#A78BFA 100%)",
  success: "#34D399",
  shimmer: { start: "#2A2440", mid: "#3D2E5A", end: "#2A2440" },
};
