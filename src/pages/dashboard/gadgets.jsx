import { useState } from "react";
import { useTheme } from "../../context/themecontext";
import { showNotification } from "../../utils/notify";

const lightTheme = {
  bg: "#F9F7FF",
  cardBg: "#FFFFFF",
  text: "#1C1130",
  textSecondary: "#7C6FA0",
  border: "#F3F0FF",
  purple: "#6B21E8",
  purpleLight: "#EDE9FE",
  green: "#10B981",
  gray: "#9CA3AF",
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
  gray: "#6B7280",
};

const font = `'DM Sans', 'Segoe UI', sans-serif`;

// Notify Modal (collects email)
function NotifyModal({ isOpen, onClose, onSuccess, colors }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      showNotification("SendNaw", "Please enter a valid email address", "error");
      return;
    }
    setLoading(true);
    // Simulate API call – replace with actual backend endpoint if needed
    setTimeout(() => {
      setLoading(false);
      onSuccess(email);  // trigger success popup
      onClose();         // close the email modal
      setEmail("");
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.cardBg,
          borderRadius: 24,
          padding: "1.5rem",
          width: "90%",
          maxWidth: 400,
          boxShadow: "0 20px 35px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: colors.text }}>
            Get notified
          </h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: colors.textSecondary }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <p style={{ fontSize: "0.85rem", color: colors.textSecondary, marginBottom: "1rem" }}>
          Be the first to know when Gadgets are available.
        </p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            background: colors.cardBg,
            color: colors.text,
            fontSize: "0.9rem",
            marginBottom: "1rem",
            outline: "none",
          }}
          autoFocus
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 40,
            background: colors.purple,
            border: "none",
            color: "#fff",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? <i className="bi bi-hourglass-split" /> : "Notify Me"}
        </button>
      </div>
    </div>
  );
}

// Success Modal (popup after successful submission)
function SuccessModal({ isOpen, onClose, email, colors }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.cardBg,
          borderRadius: 24,
          padding: "2rem 1.5rem",
          width: "90%",
          maxWidth: 360,
          textAlign: "center",
          boxShadow: "0 20px 35px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: colors.green + "20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <i className="bi bi-check-lg" style={{ fontSize: 32, color: colors.green }} />
        </div>
        <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: colors.text }}>
          Submission Successful!
        </h3>
        <p style={{ fontSize: "0.85rem", color: colors.textSecondary, margin: "0.5rem 0 1.5rem" }}>
          We'll notify you at <strong>{email}</strong> when Gadgets launch.
        </p>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 40,
            background: colors.purple,
            border: "none",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function Gadgets() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSuccess = (email) => {
    setSubmittedEmail(email);
    setShowSuccess(true);
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: font,
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          background: colors.cardBg,
          borderRadius: 32,
          border: `1px solid ${colors.border}`,
          padding: "2.5rem 2rem",
          textAlign: "center",
          boxShadow: "0 20px 35px -12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Decorative icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            background: colors.purpleLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <i className="bi bi-laptop" style={{ fontSize: 40, color: colors.purple }} />
        </div>

        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            color: colors.text,
            margin: "0 0 0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Gadgets
        </h1>

        <div
          style={{
            display: "inline-block",
            background: colors.purpleLight,
            borderRadius: 40,
            padding: "4px 12px",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: colors.purple,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Coming Soon
          </span>
        </div>

        <p
          style={{
            fontSize: "1rem",
            color: colors.textSecondary,
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          We're working hard to bring you the latest gadgets and devices.
          <br />
          Stay tuned for exclusive tech deals and smart devices.
        </p>

        {/* Progress indicator */}
        <div
          style={{
            width: "100%",
            height: 6,
            background: colors.border,
            borderRadius: 3,
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "45%",
              height: "100%",
              background: `linear-gradient(90deg, ${colors.purple}, ${colors.green})`,
              borderRadius: 3,
            }}
          />
        </div>

        <p
          style={{
            fontSize: "0.75rem",
            color: colors.textSecondary,
            margin: 0,
          }}
        >
          Estimated launch: <strong>Q3 2025</strong>
        </p>

        {/* Notify Me button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "2rem",
            background: "transparent",
            border: `1.5px solid ${colors.purple}`,
            borderRadius: 40,
            padding: "10px 24px",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: colors.purple,
            cursor: "pointer",
            transition: "all 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.purpleLight;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <i className="bi bi-envelope-paper" />
          Notify Me
        </button>
      </div>

      {/* Email collection modal */}
      <NotifyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
        colors={colors}
      />

      {/* Success popup modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        email={submittedEmail}
        colors={colors}
      />
    </div>
  );
}