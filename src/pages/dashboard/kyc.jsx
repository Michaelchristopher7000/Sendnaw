import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themecontext";

const lightTheme = {
  bg: "#F9FAFB",
  cardBg: "#FFFFFF",
  text: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accent: "#6f42c1",
  accentLight: "#f0ebff",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

const darkTheme = {
  bg: "#0F0A1A",
  cardBg: "#1A1530",
  text: "#F1F5F9",
  textSecondary: "#A8A4C0",
  border: "#2A2440",
  accent: "#8A5CF7",
  accentLight: "#2D2A4A",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
};

// Steps per tier
const STEPS_T1 = ["Personal", "Document", "Upload", "Review"];
const STEPS_T2 = ["Address", "Document", "Upload", "Review"];

// Document options per tier
const DOCS_T1 = [
  { value: "id_front", label: "National ID (Front)", icon: "bi-card-heading" },
  { value: "id_back", label: "National ID (Back)", icon: "bi-card-heading" },
  { value: "passport", label: "Int'l Passport", icon: "bi-bookmarks" },
  { value: "drivers_license", label: "Driver's License", icon: "bi-truck" },
  { value: "selfie", label: "Selfie with ID", icon: "bi-camera" },
];
const DOCS_T2 = [
  { value: "proof_of_address", label: "Utility Bill", icon: "bi-house" },
  { value: "bank_statement", label: "Bank Statement", icon: "bi-bank" },
];

export default function Kyc() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  // Determine current tier and next tier
  const currentTier = Math.max(1, user?.kyc_tier ?? 1);
  const requestedTier = currentTier < 3 ? currentTier + 1 : null;
  const isUpgradeToTier2 = currentTier === 1;
  const isUpgradeToTier3 = currentTier === 2;

  // Steps and documents depend on current tier
  const steps = isUpgradeToTier2 ? STEPS_T1 : STEPS_T2;
  const docOptions = isUpgradeToTier2 ? DOCS_T1 : DOCS_T2;

  // UI state
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgOk, setMsgOk] = useState(false);

  // Form fields
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [address, setAddress] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [verifyingNin, setVerifyingNin] = useState(false);

  const flash = (text, ok = false) => {
    setMsg(text);
    setMsgOk(ok);
    setTimeout(() => setMsg(""), 4500);
  };

  const pickFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result);
    r.readAsDataURL(f);
  };

  const canNext = () => {
    const stepName = steps[step];
    if (stepName === "Personal") {
      if (!gender) {
        flash("Please select your gender");
        return false;
      }
      if (!dob) {
        flash("Please enter your date of birth");
        return false;
      }
      if (!bvn && !nin) {
        flash("Please enter BVN or NIN");
        return false;
      }
      return true;
    }
    if (stepName === "Address") {
      if (!address) {
        flash("Please enter your residential address");
        return false;
      }
      return true;
    }
    if (stepName === "Document") {
      if (!docType) {
        flash("Please select a document type");
        return false;
      }
      return true;
    }
    if (stepName === "Upload") {
      if (!file) {
        flash("Please upload your document image");
        return false;
      }
      return true;
    }
    return true;
  };

  // ─── Verify NIN function (UPDATED: sends both nin and dob) ──────────
  const handleVerifyNin = async () => {
    const inputValue = nin || bvn;
    if (!inputValue) {
      flash("Please enter BVN or NIN first");
      return;
    }
    if (!dob) {
      flash("Please enter your Date of Birth first");
      return;
    }
    setVerifyingNin(true);
    try {
      const res = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/user/verify_nin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ nin: inputValue, dob: dob }),
        },
      );
      const data = await res.json();
      if (data.success) {
        if (data.data.gender) setGender(data.data.gender);
        if (data.data.dob) setDob(data.data.dob);
        if (data.data.address) setAddress(data.data.address);
        flash("NIN verified – details auto‑filled!", true);
      } else {
        flash(data.message || "NIN verification failed");
      }
    } catch {
      flash("Network error – is the verification service running?");
    } finally {
      setVerifyingNin(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const payload = {
          document_type: docType,
          file: reader.result,
        };
        // Add tier-specific fields
        if (isUpgradeToTier2) {
          payload.gender = gender;
          payload.dob = dob;
          payload.bvn = bvn || nin;
          payload.nin = nin || bvn;
        }
        if (isUpgradeToTier3) {
          payload.address = address;
        }

        const r1 = await fetch(
          "https://sendnawtechnologies.infinityfree.io/api/kyc/submit.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
          },
        );
        const d1 = await r1.json();
        if (!d1.success) {
          flash(d1.message);
          setLoading(false);
          return;
        }

        if (requestedTier) {
          const r2 = await fetch(
            "https://sendnawtechnologies.infinityfree.io/api/kyc/upgrade_request.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ tier: requestedTier }),
            },
          );
          const d2 = await r2.json();
          flash(
            d2.success
              ? "Verification submitted! Admin will review shortly."
              : d2.message,
            d2.success,
          );
        } else {
          flash("Document submitted successfully.", true);
        }
        setTimeout(() => navigate("/profile"), 2200);
      } catch {
        flash("Network error. Please try again.");
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const selectedDoc = docOptions.find((d) => d.value === docType);

  // Loading state
  if (authLoading || !user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          background: colors.bg,
        }}
      >
        <div
          className="spinner"
          style={{
            width: 32,
            height: 32,
            border: `3px solid ${colors.border}`,
            borderTop: `3px solid ${colors.accent}`,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Already pending
  if (user?.kyc_status === "pending") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "20px",
          background: colors.bg,
        }}
      >
        <div
          style={{
            background: colors.cardBg,
            borderRadius: "20px",
            padding: "48px 36px",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            border: `1px solid ${colors.border}`,
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              background: "#fff3cd",
              color: "#856404",
            }}
          >
            <i className="bi bi-hourglass-split" />
          </div>
          <h2
            style={{
              fontSize: "21px",
              fontWeight: 800,
              margin: "0 0 10px",
              color: colors.text,
            }}
          >
            Under Review
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              margin: "0 0 20px",
              color: colors.textSecondary,
            }}
          >
            Your documents are being reviewed. We'll notify you — usually within
            24 hours.
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              background: "#fff3cd",
              color: "#856404",
            }}
          >
            <i className="bi bi-clock me-1" />
            Pending Review
          </span>
        </div>
      </div>
    );
  }

  // Already fully verified (Tier 3)
  if (user?.kyc_status === "verified" && currentTier >= 3) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "20px",
          background: colors.bg,
        }}
      >
        <div
          style={{
            background: colors.cardBg,
            borderRadius: "20px",
            padding: "48px 36px",
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            border: `1px solid ${colors.border}`,
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              background: "#d4edda",
              color: "#155724",
            }}
          >
            <i className="bi bi-patch-check-fill" />
          </div>
          <h2
            style={{
              fontSize: "21px",
              fontWeight: 800,
              margin: "0 0 10px",
              color: colors.text,
            }}
          >
            Fully Verified
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              margin: "0 0 20px",
              color: colors.textSecondary,
            }}
          >
            Your account is fully verified at Tier 3. You have access to all
            features.
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
              background: "#d4edda",
              color: "#155724",
            }}
          >
            <i className="bi bi-shield-check me-1" />
            Tier 3 Verified
          </span>
        </div>
      </div>
    );
  }

  // Main KYC form (unchanged)
  return (
    <div
      style={{
        maxWidth: 620,
        margin: "0 auto",
        padding: "28px 16px 60px",
        background: colors.bg,
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
          color: colors.text,
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        <i
          className={`bi ${theme === "light" ? "bi-moon-stars" : "bi-brightness-high-fill"}`}
        />{" "}
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: colors.accent,
          fontWeight: 600,
          fontSize: "14px",
          marginBottom: "20px",
          padding: 0,
        }}
      >
        <i className="bi bi-arrow-left"></i> Back to Dashboard
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "21px",
              fontWeight: 800,
              color: colors.text,
              margin: "0 0 4px",
              letterSpacing: "-0.3px",
            }}
          >
            <i className="bi bi-shield-lock me-2" />
            Identity Verification
          </h1>
          <p
            style={{ fontSize: "14px", color: colors.textSecondary, margin: 0 }}
          >
            {isUpgradeToTier2
              ? "Complete identity verification to unlock Tier 2 benefits"
              : "Submit address proof to reach Tier 3 level"}
          </p>
        </div>
        <span
          style={{
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: `0 2px 8px ${colors.accent}55`,
          }}
        >
          <i className="bi bi-arrow-up-circle me-1" />
          Upgrading to Tier {requestedTier}
        </span>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              flex: 1,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background:
                  i < step
                    ? colors.success
                    : i === step
                      ? colors.accent
                      : colors.border,
                border:
                  i === step
                    ? `2px solid ${colors.accent}`
                    : `2px solid ${colors.border}`,
                color:
                  i < step
                    ? "#fff"
                    : i === step
                      ? "#fff"
                      : colors.textSecondary,
                fontSize: "13px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                boxShadow: i === step ? `0 0 0 5px ${colors.accent}22` : "none",
              }}
            >
              {i < step ? (
                <i className="bi bi-check-lg" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color:
                  i === step
                    ? colors.accent
                    : i < step
                      ? colors.success
                      : colors.textSecondary,
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "17px",
                  left: "55%",
                  width: "90%",
                  height: "2px",
                  background: i < step ? colors.success : colors.border,
                  zIndex: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Card content (unchanged) */}
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "20px",
          padding: "28px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          border: `1px solid ${colors.border}`,
        }}
        key={step}
      >
        {steps[step] === "Personal" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: colors.accentLight,
                  color: colors.accent,
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <i className="bi bi-person-circle" />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: colors.text,
                  margin: "0 0 4px",
                }}
              >
                Personal Details
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Confirm your basic information
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                Full Name
              </label>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: colors.accentLight,
                  border: `1px solid ${colors.border}`,
                  fontSize: "14px",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                <i className="bi bi-person me-2" />
                {user?.full_name || "—"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                Email Address
              </label>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: colors.accentLight,
                  border: `1px solid ${colors.border}`,
                  fontSize: "14px",
                  color: colors.textSecondary,
                  fontWeight: 500,
                }}
              >
                <i className="bi bi-envelope me-2" />
                {user?.email || "—"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                Gender <span style={{ color: colors.danger }}>*</span>
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { val: "male", icon: "bi-gender-male", label: "Male" },
                  { val: "female", icon: "bi-gender-female", label: "Female" },
                  { val: "other", icon: "bi-gender-ambiguous", label: "Other" },
                ].map((g) => (
                  <button
                    key={g.val}
                    type="button"
                    onClick={() => setGender(g.val)}
                    style={{
                      flex: 1,
                      padding: "13px 8px",
                      borderRadius: "12px",
                      border: `2px solid ${gender === g.val ? colors.accent : colors.border}`,
                      background:
                        gender === g.val ? colors.accentLight : colors.cardBg,
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      color:
                        gender === g.val ? colors.accent : colors.textSecondary,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      boxShadow:
                        gender === g.val
                          ? `0 0 0 3px ${colors.accent}22`
                          : "none",
                    }}
                  >
                    <i
                      className={`bi ${g.icon}`}
                      style={{ fontSize: "20px" }}
                    />{" "}
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                Date of Birth <span style={{ color: colors.danger }}>*</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${colors.border}`,
                  background: colors.cardBg,
                  color: colors.text,
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                BVN or NIN <span style={{ color: colors.danger }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter BVN or NIN"
                value={bvn || nin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 11) setBvn(val);
                  else setNin(val.slice(0, 12));
                }}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${colors.border}`,
                  background: colors.cardBg,
                  color: colors.text,
                  fontSize: "14px",
                }}
              />
              <small style={{ fontSize: "12px", color: colors.textSecondary }}>
                Enter BVN (11 digits) or NIN (12 digits)
              </small>

              {/* ─── Verify NIN button ─────────────────────────────── */}
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={handleVerifyNin}
                  disabled={verifyingNin}
                  style={{
                    padding: "8px 18px",
                    background: verifyingNin ? colors.border : colors.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: verifyingNin ? "default" : "pointer",
                    fontWeight: 600,
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {verifyingNin ? (
                    <>
                      <span
                        className="spinner"
                        style={{
                          display: "inline-block",
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin 0.6s linear infinite",
                        }}
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-shield-check" /> Verify NIN
                    </>
                  )}
                </button>
                <small
                  style={{ color: colors.textSecondary, fontSize: "12px" }}
                >
                  Fetch gender, DOB, and address automatically
                </small>
              </div>
              <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
              `}</style>
            </div>
          </div>
        )}

        {steps[step] === "Address" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: colors.accentLight,
                  color: colors.accent,
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <i className="bi bi-house" />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: colors.text,
                  margin: "0 0 4px",
                }}
              >
                Address Details
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Enter your current residential address
              </p>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "7px",
                }}
              >
                Residential Address{" "}
                <span style={{ color: colors.danger }}>*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                placeholder="House number, street, city, state, country"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: `1px solid ${colors.border}`,
                  background: colors.cardBg,
                  color: colors.text,
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        )}

        {steps[step] === "Document" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: colors.accentLight,
                  color: colors.accent,
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <i className="bi bi-file-earmark-text" />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: colors.text,
                  margin: "0 0 4px",
                }}
              >
                Select Document
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Choose the document you'll use for verification
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {docOptions.map((doc) => (
                <button
                  key={doc.value}
                  type="button"
                  onClick={() => setDocType(doc.value)}
                  style={{
                    padding: "15px 10px",
                    borderRadius: "12px",
                    border: `2px solid ${docType === doc.value ? colors.accent : colors.border}`,
                    background:
                      docType === doc.value
                        ? colors.accentLight
                        : colors.cardBg,
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: colors.text,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "7px",
                    position: "relative",
                    boxShadow:
                      docType === doc.value
                        ? `0 0 0 3px ${colors.accent}22`
                        : "none",
                  }}
                >
                  <i
                    className={`bi ${doc.icon}`}
                    style={{ fontSize: "24px", color: colors.accent }}
                  />
                  <span style={{ color: colors.text }}>{doc.label}</span>
                  {docType === doc.value && (
                    <span
                      style={{
                        position: "absolute",
                        top: "7px",
                        right: "7px",
                        width: "19px",
                        height: "19px",
                        borderRadius: "50%",
                        background: colors.accent,
                        color: "#fff",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="bi bi-check-lg" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {steps[step] === "Upload" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: colors.accentLight,
                  color: colors.accent,
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <i className="bi bi-cloud-arrow-up" />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: colors.text,
                  margin: "0 0 4px",
                }}
              >
                Upload Document
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Upload a clear photo of your {selectedDoc?.label || "document"}
              </p>
            </div>
            {!preview ? (
              <div
                onClick={() => document.getElementById("kycFileInput").click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  pickFile(e.dataTransfer.files[0]);
                }}
                style={{
                  border: `2px dashed ${dragOver ? colors.accent : colors.border}`,
                  borderRadius: "14px",
                  padding: "40px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: dragOver ? colors.accentLight : colors.cardBg,
                  transition: "all 0.2s",
                }}
              >
                <i
                  className="bi bi-cloud-arrow-up-fill"
                  style={{
                    fontSize: "40px",
                    color: colors.accent,
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: colors.text,
                    margin: "0 0 5px",
                  }}
                >
                  Drag & drop your image here
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    margin: 0,
                  }}
                >
                  or click to browse · JPG, PNG up to 10MB
                </p>
                <input
                  id="kycFileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => pickFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    padding: "10px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: colors.accentLight,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: colors.text,
                  }}
                >
                  <span>
                    <i className="bi bi-file-earmark-image me-2" />
                    {file?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: colors.danger,
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-x-circle me-1" />
                    Remove
                  </button>
                </div>
              </div>
            )}
            <div
              style={{
                marginTop: "16px",
                padding: "13px 15px",
                background: `${colors.warning}15`,
                borderRadius: "10px",
                border: `1px solid ${colors.warning}40`,
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: colors.warning,
                  margin: "0 0 7px",
                }}
              >
                <i className="bi bi-lightbulb me-2" />
                Upload Tips
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  fontSize: "13px",
                  color: colors.warning,
                  lineHeight: "1.9",
                }}
              >
                <li>Ensure all text is clearly legible</li>
                <li>Avoid glare, shadows, or obstructions</li>
                <li>All four corners must be visible</li>
              </ul>
            </div>
          </div>
        )}

        {steps[step] === "Review" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "16px",
                  background: colors.accentLight,
                  color: colors.accent,
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <i className="bi bi-search" />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: colors.text,
                  margin: "0 0 4px",
                }}
              >
                Review & Submit
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Confirm everything looks correct before submitting
              </p>
            </div>
            <div
              style={{
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
                overflow: "hidden",
              }}
            >
              {isUpgradeToTier2 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 16px",
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      <i className="bi bi-gender-ambiguous me-2" />
                      Gender
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 16px",
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      Date of Birth
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {dob || "—"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "13px 16px",
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      BVN / NIN
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {bvn || nin || "—"}
                    </span>
                  </div>
                </>
              )}
              {isUpgradeToTier3 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "13px 16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: colors.textSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Address
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: colors.text,
                      maxWidth: "55%",
                      textAlign: "right",
                      wordBreak: "break-word",
                    }}
                  >
                    {address || "—"}
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 16px",
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  <i className="bi bi-file-earmark me-2" />
                  Document
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {selectedDoc && (
                    <i className={`bi ${selectedDoc.icon} me-1`} />
                  )}
                  {selectedDoc?.label}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 16px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    fontWeight: 500,
                  }}
                >
                  <i className="bi bi-arrow-up-circle me-2" />
                  Tier Requested
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: colors.accent,
                  }}
                >
                  Tier {requestedTier}
                </span>
              </div>
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  marginTop: "14px",
                  borderRadius: "10px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "13px 15px",
                background: colors.accentLight,
                borderRadius: "10px",
                border: `1px solid ${colors.border}`,
                marginTop: "14px",
                alignItems: "flex-start",
              }}
            >
              <i
                className="bi bi-lock-fill"
                style={{
                  fontSize: "17px",
                  color: colors.accent,
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  color: colors.text,
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Your documents are encrypted and processed securely. We never
                share your data with third parties.
              </p>
            </div>
          </div>
        )}

        {msg && (
          <div
            style={{
              padding: "12px 15px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
              marginTop: "16px",
              background: msgOk ? `${colors.success}20` : `${colors.danger}20`,
              color: msgOk ? colors.success : colors.danger,
              border: msgOk
                ? `1px solid ${colors.success}40`
                : `1px solid ${colors.danger}40`,
            }}
          >
            <i
              className={`bi ${msgOk ? "bi-check-circle" : "bi-exclamation-triangle"} me-2`}
            />
            {msg}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                border: `1.5px solid ${colors.border}`,
                background: colors.cardBg,
                color: colors.text,
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <i className="bi bi-arrow-left me-2" />
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => canNext() && setStep((s) => s + 1)}
              style={{
                flex: 1,
                padding: "13px 20px",
                borderRadius: "12px",
                border: "none",
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Continue <i className="bi bi-arrow-right ms-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1,
                padding: "13px 20px",
                borderRadius: "12px",
                border: "none",
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}dd)`,
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.65 : 1,
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner"
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />{" "}
                  Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-send-check me-2" />
                  Submit Verification
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: colors.textSecondary,
          marginTop: "18px",
        }}
      >
        <i className="bi bi-shield-fill-check me-1" />
        256-bit SSL encrypted · ISO 27001 compliant · Data never sold
      </p>
    </div>
  );
}
