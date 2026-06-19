import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const countryCodes = [
  { code: "+234", flag: "https://flagcdn.com/w40/ng.png", name: "Nigeria" },
  { code: "+233", flag: "https://flagcdn.com/w40/gh.png", name: "Ghana" },
  { code: "+254", flag: "https://flagcdn.com/w40/ke.png", name: "Kenya" },
  { code: "+1", flag: "https://flagcdn.com/w40/us.png", name: "USA" },
  { code: "+44", flag: "https://flagcdn.com/w40/gb.png", name: "UK" },
];
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // new email state
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState("danger");
  const [activeTab, setActiveTab] = useState("phone");
  const [countryCode, setCountryCode] = useState("+234");

  const showToast = (msg, type = "danger") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validation based on active tab
    if (activeTab === "phone") {
      if (!phone.trim()) {
        return showToast("Please enter your phone number");
      }
    } else if (activeTab === "username") {
      if (!phone.trim()) {
        return showToast("Please enter your username or SendNaw tag");
      }
    } else {
      // email tab
      if (!email.trim()) {
        return showToast("Please enter your email address");
      }
      // optional: basic email format check
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
        return showToast("Please enter a valid email address");
      }
    }

    if (!password.trim()) {
      return showToast("Please enter your password");
    }

    setLoading(true);

    // Build request body
    let body = {};
    if (activeTab === "phone") {
      body = {
        phone: phone.replace(/\D/g, ""),
        password: password,
        country_code: countryCode,
      };
    } else if (activeTab === "username") {
      body = {
        username: phone.trim(),
        password: password,
      };
    } else {
      body = {
        email: email.trim(),
        password: password,
      };
    }

    try {
      const response = await fetch(
        "http://sendnawtechnologies.infinityfree.io/api/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.success) {
        console.log("LOGIN RESPONSE:", data);
        console.log("TOKEN RECEIVED:", data.token);
        login(data.user, data.token);
        showToast("Login successful. Redirecting...", "success");

        setTimeout(() => {
          navigate(data.redirect);
        }, 1000);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  return (
    <>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className="toast show align-items-center text-white border-0 rounded-3 shadow"
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

      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #6f42c1, #4c2aa8)",
          marginTop: "-56px",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "24px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <Link to="/">
                      <img
                        src="/images/SendNaw_logo_main-removebg-preview.png"
                        alt="SendNaw"
                        height="45"
                      />
                    </Link>
                    <h4 className="fw-bold mb-1 pt-3">Welcome to SendNaw</h4>
                    <p className="text-muted small mb-0">
                      Secure access to your fintech account
                    </p>
                  </div>

                  {/* Tabs - now three buttons */}
                  <div
                    className="d-flex rounded-pill p-1 mb-4"
                    style={{ backgroundColor: "#f1f3f9" }}
                  >
                    <button
                      className="btn rounded-pill fw-semibold py-2 border-0"
                      style={{
                        flex: 1,
                        backgroundColor:
                          activeTab === "phone" ? "#6f42c1" : "transparent",
                        color: activeTab === "phone" ? "#fff" : "#6c757d",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setActiveTab("phone")}
                    >
                      Phone
                    </button>
                    <button
                      className="btn rounded-pill fw-semibold py-2 border-0"
                      style={{
                        flex: 1,
                        backgroundColor:
                          activeTab === "username" ? "#6f42c1" : "transparent",
                        color: activeTab === "username" ? "#fff" : "#6c757d",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setActiveTab("username")}
                    >
                      Username
                    </button>
                    <button
                      className="btn rounded-pill fw-semibold py-2 border-0"
                      style={{
                        flex: 1,
                        backgroundColor:
                          activeTab === "email" ? "#6f42c1" : "transparent",
                        color: activeTab === "email" ? "#fff" : "#6c757d",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setActiveTab("email")}
                    >
                      Email
                    </button>
                  </div>

                  <form onSubmit={handleSignIn}>
                    {/* Phone Input */}
                    {activeTab === "phone" && (
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">
                          PHONE NUMBER
                        </label>
                        <div
                          className="d-flex align-items-center rounded-3"
                          style={{
                            backgroundColor: "#f8f9fc",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <div
                            className="d-flex align-items-center px-3"
                            style={{ minWidth: "150px", gap: "8px" }}
                          >
                            <img
                              src={selectedCountry.flag}
                              alt={selectedCountry.name}
                              width="24"
                              height="18"
                              style={{
                                objectFit: "cover",
                                borderRadius: "3px",
                              }}
                            />
                            <select
                              className="form-select border-0 bg-transparent shadow-none fw-semibold p-0"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              style={{ cursor: "pointer" }}
                            >
                              {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.code}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div
                            style={{
                              width: "1px",
                              height: "30px",
                              backgroundColor: "#dee2e6",
                            }}
                          ></div>
                          <input
                            type="tel"
                            className="form-control border-0 bg-transparent shadow-none py-3 px-3"
                            placeholder="080 000 0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            inputMode="numeric"
                          />
                        </div>
                      </div>
                    )}

                    {/* Username Input */}
                    {activeTab === "username" && (
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">
                          USERNAME OR SENDNAW TAG
                        </label>
                        <div
                          className="d-flex align-items-center rounded-3 px-3"
                          style={{
                            backgroundColor: "#f8f9fc",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <span className="text-muted small me-2">@</span>
                          <input
                            type="text"
                            className="form-control border-0 bg-transparent shadow-none py-3"
                            placeholder="yourtag"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Email Input */}
                    {activeTab === "email" && (
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">
                          EMAIL ADDRESS
                        </label>
                        <div
                          className="d-flex align-items-center rounded-3 px-3"
                          style={{
                            backgroundColor: "#f8f9fc",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <input
                            type="email"
                            className="form-control border-0 bg-transparent shadow-none py-3"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Password Input (unchanged) */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted">
                        PASSWORD
                      </label>
                      <div
                        className="d-flex align-items-center rounded-3 px-3 pe-2"
                        style={{
                          backgroundColor: "#f8f9fc",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control border-0 bg-transparent shadow-none py-3"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-link text-muted text-decoration-none p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                          ></i>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button (unchanged) */}
                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-bold rounded-pill text-white border-0"
                      style={{
                        background: "linear-gradient(135deg, #6f42c1, #8f6cf6)",
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
                          Signing in...
                        </span>
                      ) : (
                        "Continue"
                      )}
                    </button>

                    <div className="text-center pt-4">
                      <Link
                        to="/account-recovery"
                        className="text-decoration-none fw-bold small"
                        style={{ color: "#6f42c1" }}
                      >
                        Forgot your details?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-white small mb-0">
                  New to SendNaw?{" "}
                  <Link
                    to="/signup"
                    className="fw-bold text-white text-decoration-underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
