import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const countryCodes = [
  {
    code: "+234",
    name: "Nigeria",
    flag: "https://flagcdn.com/w40/ng.png",
    digits: 11,
    example: "08012345678",
  },
  {
    code: "+254",
    name: "Kenya",
    flag: "https://flagcdn.com/w40/ke.png",
    digits: 10,
    example: "0712345678",
  },
  {
    code: "+233",
    name: "Ghana",
    flag: "https://flagcdn.com/w40/gh.png",
    digits: 10,
    example: "0201234567",
  },
  {
    code: "+1",
    name: "USA",
    flag: "https://flagcdn.com/w40/us.png",
    digits: 10,
    example: "2025551234",
  },
  {
    code: "+44",
    name: "UK",
    flag: "https://flagcdn.com/w40/gb.png",
    digits: 11,
    example: "07911123456",
  },
];

const RequirementItem = ({ icon, title, description }) => (
  <div
    className="d-flex align-items-start gap-3 p-3 rounded-3 mb-2"
    style={{ backgroundColor: "rgba(111,66,193,0.05)" }}
  >
    <div
      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(111,66,193,0.1)",
        color: "#6f42c1",
      }}
    >
      <i className={`bi ${icon} fs-5`}></i>
    </div>
    <div>
      <p className="fw-semibold mb-1 lh-sm small">{title}</p>
      <p className="small text-muted mb-0 lh-sm">{description}</p>
    </div>
  </div>
);

const StepIndicator = ({ currentStep }) => {
  const steps = [
    "Phone Number",
    "Consent Request",
    "Verification",
    "Email Address",
    "Setup Password",
  ];
  return (
    <div className="d-flex flex-column mt-4">
      <p className="fw-bold h5 mb-1">Setup a Profile</p>
      <p className="text-muted small mb-3">
        Follow the steps below to get started
      </p>
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={stepNum} className="d-flex align-items-start gap-2">
            <div
              className="d-flex flex-column align-items-center"
              style={{ minWidth: "26px" }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: isCompleted
                    ? "#6f42c1"
                    : isActive
                      ? "#fff"
                      : "#fff",
                  border: isCompleted
                    ? "none"
                    : isActive
                      ? "3px solid #6f42c1"
                      : "2px solid #dee2e6",
                }}
              >
                {isCompleted ? (
                  <i
                    className="bi bi-check text-white"
                    style={{ fontSize: "12px" }}
                  ></i>
                ) : isActive ? (
                  <span
                    className="rounded-circle"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#6f42c1",
                    }}
                  ></span>
                ) : null}
              </div>
              {stepNum < steps.length && (
                <div
                  style={{
                    width: "2px",
                    minHeight: "32px",
                    backgroundColor: isCompleted ? "#6f42c1" : "#dee2e6",
                  }}
                ></div>
              )}
            </div>
            <div
              className={`pb-4 ${stepNum > currentStep ? "text-muted" : ""}`}
            >
              <p
                className="fw-semibold small mb-0"
                style={{ fontSize: "11px" }}
              >
                STEP {stepNum}
              </p>
              <p className="small mb-0">{label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Custom Country Dropdown (flags visible) ---------- */
const CountryDropdown = ({ countryCodes, selectedCode, onSelect }) => {
  const [open, setOpen] = useState(false);
  const selected =
    countryCodes.find((c) => c.code === selectedCode) || countryCodes[0];

  return (
    <div className="position-relative" style={{ maxWidth: "130px" }}>
      <button
        type="button"
        className="form-select rounded-3 shadow-none d-flex align-items-center gap-2 text-start"
        style={{ maxWidth: "130px" }}
        onClick={() => setOpen(!open)}
      >
        <img
          src={selected.flag}
          alt={selected.name}
          style={{ width: 20, height: 15 }}
        />
        <span>{selected.code}</span>
      </button>
      {open && (
        <ul
          className="position-absolute list-unstyled bg-white shadow rounded-3 mt-1 z-3 p-2"
          style={{ width: "130px" }}
        >
          {countryCodes.map((c) => (
            <li
              key={c.code}
              className="d-flex align-items-center gap-2 px-2 py-1 rounded-2"
              style={{
                cursor: "pointer",
                background: c.code === selectedCode ? "#f0e6ff" : "transparent",
              }}
              onClick={() => {
                onSelect(c.code);
                setOpen(false);
              }}
            >
              <img
                src={c.flag}
                alt={c.name}
                style={{ width: 20, height: 15 }}
              />
              <span className="small">{c.code}</span>
            </li>
          ))}
        </ul>
      )}
      {/* Click‑away overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 2,
          }}
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("accountType");
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [optionalChecked, setOptionalChecked] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState("danger");
  const [sendnawTag, setSendnawTag] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const otpRefs = useRef([]);

  const showToast = (msg, type = "danger") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const resetAll = () => {
    setPage("accountType");
    setCurrentStep(1);
    setAccountType("");
    setPhone("");
    setCountryCode("+234");
    setTermsChecked(false);
    setPrivacyChecked(false);
    setOtp(Array(6).fill(""));
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setPhoneError("");
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: {
        const selectedCountry = countryCodes.find(
          (c) => c.code === countryCode,
        );
        const digitsOnly = phone.replace(/\D/g, "");
        if (digitsOnly.length === 0) {
          return "Please enter your phone number";
        }
        if (digitsOnly.length < selectedCountry.digits) {
          return `${selectedCountry.name} phone numbers must be exactly ${selectedCountry.digits} digits. You entered ${digitsOnly.length}`;
        }
        if (digitsOnly.length > selectedCountry.digits) {
          return `${selectedCountry.name} phone numbers must be exactly ${selectedCountry.digits} digits. You entered ${digitsOnly.length}`;
        }
        return null;
      }
      case 2:
        return !termsChecked || !privacyChecked
          ? "Please agree to both Terms and Privacy Policy"
          : null;
      case 3:
        return otp.join("").length < 6
          ? "Please enter the complete 6-digit code"
          : null;
      case 4:
        return !email.includes("@")
          ? "Please enter a valid email address"
          : null;
      case 5:
        return password.length < 6
          ? "Password must be at least 6 characters"
          : null;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (page === "accountType") {
      if (!accountType) return showToast("Please select an account type");
      setPage("eligibility");
      return;
    }

    const error = validateStep();
    if (error) return showToast(error);

    // Show confirming state before moving to next step
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (currentStep === 1) {
      // Send OTP when moving from step 1 to step 2
      try {
        const fullPhone =
          countryCode.replace("+", "") + phone.replace(/\D/g, "");
        const response = await fetch(
          "http://sendnawtechnologies.infinityfree.io/api/auth/send_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: fullPhone }),
          },
        );
        const data = await response.json();
        console.log("OTP response:", data);
        if (!data.success) {
          setLoading(false);
          return showToast(data.message);
        }
        showToast("Verification code sent to your phone", "success");
      } catch (err) {
        setLoading(false);
        return showToast("Could not send verification code. Please try again.");
      }
    }

    if (currentStep === 3) {
      // Verify OTP when moving from step 3 to step 4
      try {
        const fullPhone =
          countryCode.replace("+", "") + phone.replace(/\D/g, "");
        const response = await fetch(
          "http://sendnawtechnologies.infinityfree.io/api/auth/verify_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: fullPhone,
              otp: otp.join(""),
            }),
          },
        );
        const data = await response.json();
        if (!data.success) {
          setLoading(false);
          return showToast(data.message);
        }
      } catch (err) {
        setLoading(false);
        return showToast("Verification failed. Please try again.");
      }
    }

    if (currentStep < 5) {
      setLoading(false);
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Step 5 — submit to backend
    try {
      const fullPhone = countryCode.replace("+", "") + phone.replace(/\D/g, "");
      const fullName =
        email
          .split("@")[0]
          .replace(/[^a-zA-Z\s]/g, " ")
          .replace(/\s+/g, " ")
          .trim() || "SendNaw User";
      const response = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/auth/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            phone: fullPhone,
            email: email,
            password: password,
            country_code: countryCode,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSendnawTag(data.sendnaw_tag);
        setAccountNumber(data.account_number);
        setPage("success");
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const fullPhone = countryCode.replace("+", "") + phone.replace(/\D/g, "");

      const response = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/auth/send_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone }),
        },
      );

      const data = await response.json();

      if (data.success) {
        showToast("New verification code sent", "success");
        setOtp(Array(6).fill(""));
        otpRefs.current[0]?.focus();
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: {
        const selectedCountry = countryCodes.find(
          (c) => c.code === countryCode,
        );
        const digitsOnly = phone.replace(/\D/g, "");
        const isOver = digitsOnly.length > selectedCountry.digits;
        const isComplete = digitsOnly.length === selectedCountry.digits;
        const isEmpty = digitsOnly.length === 0;

        return (
          <>
            <h2 className="fw-bold mb-2">What is your phone number?</h2>
            <p className="text-muted small mb-4">
              Enter the phone number you want to use for this account.
            </p>
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Phone number
              </label>
              <div className="d-flex gap-2">
                {/* ------ Country Code with real flags ------ */}
                <CountryDropdown
                  countryCodes={countryCodes}
                  selectedCode={countryCode}
                  onSelect={(code) => {
                    setCountryCode(code);
                    setPhone("");
                    setPhoneError("");
                  }}
                />
                <input
                  type="tel"
                  className={`form-control py-3 px-3 rounded-3 shadow-none ${
                    isOver
                      ? "border-danger"
                      : isComplete
                        ? "border-success"
                        : ""
                  }`}
                  placeholder={`e.g. ${selectedCountry.example}`}
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= selectedCountry.digits) {
                      setPhone(val);
                      setPhoneError("");
                    } else {
                      setPhoneError(
                        `${selectedCountry.name} numbers must be exactly ${selectedCountry.digits} digits`,
                      );
                    }
                  }}
                  maxLength={selectedCountry.digits}
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </div>

              {/* Real time digit counter */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small
                  className={`
            ${
              isOver
                ? "text-danger"
                : isComplete
                  ? "text-success"
                  : isEmpty
                    ? "text-muted"
                    : "text-warning"
            }
          `}
                >
                  {isEmpty
                    ? `Enter ${selectedCountry.digits} digits for ${selectedCountry.name}`
                    : isComplete
                      ? `✓ Valid ${selectedCountry.name} number`
                      : isOver
                        ? `✗ Too many digits for ${selectedCountry.name}`
                        : `${selectedCountry.digits - digitsOnly.length} more digit${selectedCountry.digits - digitsOnly.length !== 1 ? "s" : ""} needed`}
                </small>
                <small
                  className={`fw-bold ${isOver ? "text-danger" : isComplete ? "text-success" : "text-muted"}`}
                >
                  {digitsOnly.length}/{selectedCountry.digits}
                </small>
              </div>

              {/* Inline error */}
              {phoneError && (
                <div className="alert alert-danger py-2 px-3 mt-2 mb-0 small rounded-3">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  {phoneError}
                </div>
              )}
            </div>
          </>
        );
      }

      case 2:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="btn btn-link text-decoration-none p-0 mb-3 fw-semibold d-flex align-items-center gap-1"
              style={{ color: "#6f42c1" }}
            >
              <i className="bi bi-chevron-left"></i> Back
            </button>
            <h2 className="fw-bold mb-4">Consent Request</h2>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              <label
                className="form-check-label small text-muted"
                htmlFor="terms"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="fw-bold text-decoration-none"
                  style={{ color: "#6f42c1" }}
                >
                  Terms & Conditions and Data privacy statement
                </Link>
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="privacy"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
              />
              <label
                className="form-check-label small text-muted"
                htmlFor="privacy"
              >
                I have read and agree to the{" "}
                <Link
                  to="/privacy-policy"
                  className="fw-bold text-decoration-none"
                  style={{ color: "#6f42c1" }}
                >
                  Data processing consent
                </Link>
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="privacy"
                checked={optionalChecked}
                onChange={(e) => setOptionalChecked(e.target.checked)}
              />
              <label
                className="form-check-label small text-muted"
                htmlFor="privacy"
              >
                I agree to the{" "}
                <span style={{ gap: 10 }}>
                  I would like to receive marketing and promotional information
                  .
                </span>
                <Link
                  to="/privacy-policy"
                  className="fw-bold text-decoration-none"
                  style={{ color: "#6f42c1" }}
                >
                  (optional)
                </Link>
              </label>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="btn btn-link text-decoration-none p-0 mb-3 fw-semibold d-flex align-items-center gap-1"
              style={{ color: "#6f42c1" }}
            >
              <i className="bi bi-chevron-left"></i> Back
            </button>
            <h2 className="fw-bold mb-2">Verify Phone Number</h2>
            <p className="text-muted mb-4">
              Enter the 6-digit code sent via SMS.
            </p>
            <div className="d-flex justify-content-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  className="form-control text-center fw-bold fs-5 shadow-none"
                  style={{
                    width: "50px",
                    height: "55px",
                    borderRadius: "10px",
                  }}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  inputMode="numeric"
                />
              ))}
            </div>
            <p className="small text-muted text-center">
              Did not receive a code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="btn btn-link p-0 small text-decoration-none fw-bold"
                style={{ color: "#6f42c1" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Resend"}
              </button>
            </p>
          </>
        );

      case 4:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="btn btn-link text-decoration-none p-0 mb-3 fw-semibold d-flex align-items-center gap-1"
              style={{ color: "#6f42c1" }}
            >
              <i className="bi bi-chevron-left"></i> Back
            </button>
            <h2 className="fw-bold mb-2">What is your email address?</h2>
            <p className="text-muted mb-4">
              Enter the email address you want to use for this account.
            </p>
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Email address
              </label>
              <input
                type="email"
                className="form-control py-3 px-3 rounded-3 shadow-none"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="btn btn-link text-decoration-none p-0 mb-3 fw-semibold d-flex align-items-center gap-1"
              style={{ color: "#6f42c1" }}
            >
              <i className="bi bi-chevron-left"></i> Back
            </button>
            <h2 className="fw-bold mb-2">Setup Password</h2>
            <p className="text-muted mb-4">
              Choose a strong password for your account.
            </p>
            <div className="position-relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-3 px-3 pe-5 rounded-3 shadow-none"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-decoration-none text-muted pe-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
            <div className="d-flex flex-column gap-1">
              <small
                className={`${password.length >= 6 ? "text-success" : "text-muted"}`}
              >
                <i
                  className={`bi ${password.length >= 6 ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                ></i>
                At least 6 characters
              </small>
              <small
                className={`${/[A-Z]/.test(password) ? "text-success" : "text-muted"}`}
              >
                <i
                  className={`bi ${/[A-Z]/.test(password) ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                ></i>
                One uppercase letter
              </small>
              <small
                className={`${/\d/.test(password) ? "text-success" : "text-muted"}`}
              >
                <i
                  className={`bi ${/\d/.test(password) ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                ></i>
                One number
              </small>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderCard = () => {
    if (page === "accountType") {
      return (
        <div className="d-flex flex-column flex-grow-1 justify-content-center">
          <p className="fw-bold h5 mb-2">Choose Account Type</p>
          <p className="text-muted small mb-4">
            Select the type of account you want to open
          </p>
          <div className="d-grid gap-3 mb-4">
            {["personal", "business", "banking"].map((type) => (
              <button
                key={type}
                className="btn py-3 rounded-3 fw-semibold text-start px-4"
                style={{
                  backgroundColor: accountType === type ? "#6f42c1" : "#fff",
                  color: accountType === type ? "#fff" : "#6f42c1",
                  border: `2px solid ${accountType === type ? "#6f42c1" : "#dee2e6"}`,
                  transition: "all 0.2s ease",
                }}
                onClick={() => setAccountType(type)}
              >
                <i
                  className={`bi me-2 ${
                    type === "personal"
                      ? "bi-person-fill"
                      : type === "business"
                        ? "bi-briefcase-fill"
                        : "bi-bank2"
                  }`}
                ></i>
                {type.charAt(0).toUpperCase() + type.slice(1)} Account
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="btn w-100 py-3 fw-bold rounded-3 text-white border-0"
            style={{
              backgroundColor: "#6f42c1",
              opacity: loading ? 0.85 : 1,
              transition: "all 0.2s ease",
            }}
            disabled={loading}
          >
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Confirming...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      );
    }

    if (page === "eligibility") {
      return (
        <div className="d-flex flex-column flex-grow-1 justify-content-center">
          <p className="fw-bold h5 mb-2">Before you get started</p>
          <p className="text-muted small mb-4">
            Confirm you meet these requirements
          </p>
          <div className="d-flex flex-column mb-4">
            <RequirementItem
              icon="bi-person-check-fill"
              title="You are 18 years and older"
              description="You must be at least 18 years old to open an account."
            />
            <RequirementItem
              icon="bi-shield-lock-fill"
              title="You have a valid BVN or NIN"
              description="Use a valid NIN or BVN to help us verify your identity quickly."
            />
            <RequirementItem
              icon="bi-camera-video-fill"
              title="You can complete face verification"
              description="Make sure you are in a well-lit area and follow the onscreen instructions."
            />
          </div>
          <button
            onClick={() => {
              setPage("signup");
              setCurrentStep(1);
            }}
            className="btn w-100 py-3 fw-bold rounded-3 text-white border-0"
            style={{ backgroundColor: "#6f42c1" }}
          >
            Get Started
          </button>
        </div>
      );
    }

    if (page === "success") {
      return (
        <div className="text-center d-flex flex-column justify-content-center flex-grow-1 py-4">
          <div className="mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "rgba(40,167,69,0.1)",
              }}
            >
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "2.5rem" }}
              ></i>
            </div>
            <h2 className="fw-bold mb-1">Account Created!</h2>
            <p className="text-muted small">Welcome to SendNaw</p>
          </div>

          <div
            className="p-4 rounded-4 mb-4 text-start"
            style={{
              backgroundColor: "rgba(111,66,193,0.05)",
              border: "1px solid rgba(111,66,193,0.15)",
            }}
          >
            <p className="small text-muted mb-1">Your SendNaw Tag</p>
            <h4 className="fw-bold mb-3" style={{ color: "#6f42c1" }}>
              {sendnawTag}
            </h4>
            <p className="small text-muted mb-1">Bank Name</p>
            <p className="fw-semibold mb-3">SendNaw MFB</p>
            <p className="small text-muted mb-1">Account Number</p>
            <p className="fw-bold mb-0" style={{ letterSpacing: "2px" }}>
              {accountNumber}
            </p>
          </div>

          <button
            onClick={() => navigate("/signin")}
            className="btn w-100 py-3 fw-bold rounded-3 text-white border-0 mb-3"
            style={{ backgroundColor: "#6f42c1" }}
          >
            Sign In to Your Account
          </button>
          <button
            onClick={resetAll}
            className="btn w-100 py-3 fw-bold rounded-3"
            style={{ color: "#6f42c1", border: "2px solid #6f42c1" }}
          >
            Back to Home
          </button>
        </div>
      );
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="d-flex flex-column justify-content-between flex-grow-1"
      >
        <div>{renderStepContent()}</div>
        <button
          type="submit"
          className="btn w-100 py-3 fw-bold rounded-3 text-white border-0 mt-4"
          style={{ backgroundColor: "#6f42c1" }}
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {currentStep === 5 ? "Create Account" : "Next"}
        </button>
      </form>
    );
  };

  const renderLeftSide = () => {
    if (page === "signup") {
      return <StepIndicator currentStep={currentStep} />;
    }
    return (
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <h1 className="display-4 fw-bold mb-3">
          Welcome <br /> to SendNaw!
        </h1>
        <p className="lead text-secondary" style={{ maxWidth: "370px" }}>
          Collect payments, access loans and manage your finances with a
          platform built for your lifestyle.
        </p>
        <div className="mt-auto pt-5">
          <p className="small text-muted mb-1">
            SendNaw is licensed by the{" "}
            <strong className="text-dark">Central Bank of Nigeria</strong>.
          </p>
          <p className="small text-muted mb-0">
            All deposits are insured by the{" "}
            <strong className="text-dark">NDIC</strong>.
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className={`toast show align-items-center text-white border-0 rounded-3 shadow`}
            style={{
              backgroundColor: toastType === "success" ? "#28a745" : "#6f42c1",
            }}
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body fw-semibold">{toastMsg}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastMsg(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile progress bar */}
      {page === "signup" && (
        <div
          className="d-md-none px-3 pt-3 pb-2 position-fixed top-0 start-0 w-100 bg-white"
          style={{ zIndex: 100 }}
        >
          <button
            onClick={() => {
              setPage("eligibility");
              setCurrentStep(1);
            }}
            className="btn btn-link text-decoration-none p-0 mb-2"
            style={{ color: "#6f42c1" }}
          >
            <i className="bi bi-chevron-left fs-4"></i>
          </button>
          <div
            style={{
              height: "3px",
              background: "#f0e6ff",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${(currentStep / 5) * 100}%`,
                height: "3px",
                backgroundColor: "#6f42c1",
                borderRadius: "10px",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        </div>
      )}

      <div
        className="min-vh-100 d-flex align-items-center"
        style={{
          backgroundColor: "#f8f9fa",
          paddingTop: page === "signup" ? "60px" : "0",
        }}
      >
        <div className="container py-4">
          <div className="row justify-content-center align-items-stretch g-0 shadow-lg rounded-4 overflow-hidden bg-white">
            {/* Left Column */}
            <div
              className="col-md-5 d-none d-md-flex flex-column p-5"
              style={{ backgroundColor: "#faf8ff" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <img
                  src="/images/SendNaw_logo_main-removebg-preview.png"
                  alt="SendNaw"
                  height="40"
                />
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted">
                    Already have an account?
                  </span>
                  <button
                    onClick={() => navigate("/signin")}
                    className="btn btn-sm rounded-pill fw-bold px-3"
                    style={{ color: "#6f42c1", border: "2px solid #6f42c1" }}
                  >
                    Login
                  </button>
                </div>
              </div>
              {renderLeftSide()}
              <div className="d-flex gap-3 mt-4">
                <Link
                  to="/privacy-policy"
                  className="small text-muted text-decoration-none"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="small text-muted text-decoration-none"
                >
                  Terms
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="col-md-7 col-12">
              <div className="p-4 p-md-5 h-100 d-flex flex-column">
                {/* Mobile logo */}
                <div className="d-flex d-md-none align-items-center justify-content-between mb-4">
                  <img
                    src="/images/SendNaw_logo_main-removebg-preview.png"
                    alt="SendNaw"
                    height="35"
                  />
                  <button
                    onClick={() => navigate("/signin")}
                    className="btn btn-sm rounded-pill fw-bold px-3"
                    style={{ color: "#6f42c1", border: "2px solid #6f42c1" }}
                  >
                    Login
                  </button>
                </div>
                {renderCard()}
              </div>
            </div>
          </div>

          <p className="text-center text-muted small mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="fw-bold text-decoration-none"
              style={{ color: "#6f42c1" }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
