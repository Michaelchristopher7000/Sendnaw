import re
import os

filepath = r"c:\xampp\htdocs\sendnaw\frontend\src\pages\landing\signup.jsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update State
state_insert = """  const [accountType, setAccountType] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("NGN");"""
content = content.replace('  const [accountType, setAccountType] = useState("");', state_insert)

# 2. Update steps array
steps_old = """  const steps = [
    "Phone Number",
    "Consent Request",
    "Verification",
    "Email Address",
    "Setup Password",
  ];"""
steps_new = """  const steps = [
    "Email Address",
    "Consent Request",
    "Verification",
    "Phone & Currency",
    "Setup Password",
  ];"""
content = content.replace(steps_old, steps_new)

# 3. Update validateStep
validate_old = """    switch (currentStep) {
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
          : null;"""
validate_new = """    switch (currentStep) {
      case 1:
        return !email.includes("@")
          ? "Please enter a valid email address"
          : null;
      case 2:
        return !termsChecked || !privacyChecked
          ? "Please agree to both Terms and Privacy Policy"
          : null;
      case 3:
        return otp.join("").length < 6
          ? "Please enter the complete 6-digit code"
          : null;
      case 4: {
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
      }"""
content = content.replace(validate_old, validate_new)

# 4. Update handleNext OTP send (move from currentStep === 1 to currentStep === 2)
send_otp_old = """    if (currentStep === 1) {
      // Send OTP when moving from step 1 to step 2
      try {
        const fullPhone =
          countryCode.replace("+", "") + phone.replace(/\D/g, "");
        const response = await fetch(
          "https://sendnawbackend.onrender.com/api/auth/send_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: fullPhone }),
          },
        );"""
send_otp_new = """    if (currentStep === 2) {
      // Send OTP when moving from step 2 to step 3
      try {
        const response = await fetch(
          "https://sendnawbackend.onrender.com/api/auth/send_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
          },
        );"""
content = content.replace(send_otp_old, send_otp_new)
content = content.replace('showToast("Verification code sent to your phone", "success");', 'showToast("Verification code sent to your email", "success");')

# 5. Update handleNext Verify OTP
verify_otp_old = """    if (currentStep === 3) {
      // Verify OTP when moving from step 3 to step 4
      try {
        const fullPhone =
          countryCode.replace("+", "") + phone.replace(/\D/g, "");
        const response = await fetch(
          "https://sendnawbackend.onrender.com/api/auth/verify_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: fullPhone,
              otp: otp.join(""),
            }),
          },
        );"""
verify_otp_new = """    if (currentStep === 3) {
      // Verify OTP when moving from step 3 to step 4
      try {
        const response = await fetch(
          "https://sendnawbackend.onrender.com/api/auth/verify_otp.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              otp: otp.join(""),
            }),
          },
        );"""
content = content.replace(verify_otp_old, verify_otp_new)

# 6. Update Register API Payload
register_old = """          body: JSON.stringify({
            full_name: fullName,
            phone: fullPhone,
            email: email,
            password: password,
            country_code: countryCode,
          }),"""
register_new = """          body: JSON.stringify({
            full_name: fullName,
            phone: fullPhone,
            email: email,
            password: password,
            country_code: countryCode,
            account_type: accountType === "personal" ? "Personal" : accountType === "business" ? "Business" : "Banking",
            default_currency: defaultCurrency,
          }),"""
content = content.replace(register_old, register_new)

# 7. Update Resend OTP
resend_old = """      const fullPhone = countryCode.replace("+", "") + phone.replace(/\D/g, "");

      const response = await fetch(
        "https://sendnawbackend.onrender.com/api/auth/send_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullPhone }),
        },
      );"""
resend_new = """      const response = await fetch(
        "https://sendnawbackend.onrender.com/api/auth/send_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        },
      );"""
content = content.replace(resend_old, resend_new)

# 8. Render step content replacements
content = content.replace('Enter the 6-digit code sent via SMS.', 'Enter the 6-digit code sent to your email.')

case1_old = """      case 1: {
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
      }"""

case4_old = """      case 4:
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
        );"""

case1_new = """      case 1:
        return (
          <>
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
        );"""

case4_new = """      case 4: {
        const selectedCountry = countryCodes.find(
          (c) => c.code === countryCode,
        );
        const digitsOnly = phone.replace(/\D/g, "");
        const isOver = digitsOnly.length > selectedCountry.digits;
        const isComplete = digitsOnly.length === selectedCountry.digits;
        const isEmpty = digitsOnly.length === 0;

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
            <h2 className="fw-bold mb-2">Account Details</h2>
            <p className="text-muted mb-4">
              Complete your profile by adding your phone and selecting a currency.
            </p>
            
            <div className="mb-4">
              <label className="form-label small fw-semibold">
                Default Currency
              </label>
              <select
                className="form-select py-3 px-3 rounded-3 shadow-none"
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
              >
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

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
      }"""

content = content.replace(case1_old, case1_new)
content = content.replace(case4_old, case4_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done updating signup.jsx")
