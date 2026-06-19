import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountRecovery = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [input, setInput] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState("danger");

  const showToast = (msg, type = "danger") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Step 1 — Send reset code
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!input.trim())
      return showToast("Please enter your phone number or email");

    setLoading(true);
    try {
      const response = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/auth/forgot_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: input.trim() }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setPhone(input.replace(/\D/g, ""));
        showToast("Reset code sent successfully", "success");
        setStep(2);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify code and set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!code.trim()) return showToast("Please enter the reset code");
    if (!password.trim()) return showToast("Please enter your new password");
    if (password.length < 6)
      return showToast("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return showToast("Password must contain at least one uppercase letter");
    if (!/[0-9]/.test(password))
      return showToast("Password must contain at least one number");

    setLoading(true);
    try {
      const response = await fetch(
        "https://sendnawtechnologies.infinityfree.io/api/auth/reset_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phone,
            code: code.trim(),
            password: password,
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        showToast(
          "Password reset successfully. Redirecting to sign in...",
          "success",
        );
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
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
          backgroundColor: "#6f42c1",
          marginTop: "-90px",
          paddingTop: "90px",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
              {/* Back to Home */}
              <div className="mb-4">
                <Link
                  to="/"
                  className="text-white text-decoration-none fw-bold"
                >
                  ← Back to Home
                </Link>
              </div>

              <div className="card border-0 rounded-5 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  {/* Icon */}
                  <div className="text-center mb-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-4 shadow-sm mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#6f42c1",
                      }}
                    >
                      <i className="bi bi-lock-fill text-white fs-4"></i>
                    </div>
                    <h2 className="h4 fw-bold text-dark mb-1">
                      {step === 1 ? "Forgot Password?" : "Reset Password"}
                    </h2>
                    <p className="text-muted small">
                      {step === 1
                        ? "Enter your phone number or email to receive a reset code"
                        : "Enter the code sent to your phone and your new password"}
                    </p>
                  </div>

                  {/* Step 1 — Request Code */}
                  {step === 1 && (
                    <form onSubmit={handleSendCode}>
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">
                          PHONE NUMBER OR EMAIL
                        </label>
                        <input
                          type="text"
                          className="form-control border-0 bg-light py-3 rounded-3 shadow-none"
                          placeholder="08012345678 or you@example.com"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold rounded-pill text-white border-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #6f42c1, #8f6cf6)",
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="d-flex align-items-center justify-content-center gap-2">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                            ></span>
                            Sending Code...
                          </span>
                        ) : (
                          "Send Reset Code"
                        )}
                      </button>
                    </form>
                  )}

                  {/* Step 2 — Enter Code and New Password */}
                  {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">
                          RESET CODE
                        </label>
                        <input
                          type="text"
                          className="form-control border-0 bg-light py-3 rounded-3 shadow-none text-center fw-bold fs-5"
                          placeholder="000000"
                          value={code}
                          onChange={(e) =>
                            setCode(
                              e.target.value.replace(/\D/g, "").slice(0, 6),
                            )
                          }
                          maxLength={6}
                          inputMode="numeric"
                        />
                        <small className="text-muted">
                          Check your phone for the 6-digit code.{" "}
                          <button
                            type="button"
                            className="btn btn-link p-0 small text-decoration-none fw-bold"
                            style={{ color: "#6f42c1" }}
                            onClick={() => setStep(1)}
                          >
                            Resend
                          </button>
                        </small>
                      </div>

                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">
                          NEW PASSWORD
                        </label>
                        <div
                          className="d-flex align-items-center rounded-3 px-3 pe-2 bg-light"
                          style={{ border: "1px solid #dee2e6" }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control border-0 bg-transparent shadow-none py-3"
                            placeholder="Enter new password"
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
                        <div className="d-flex flex-column gap-1 mt-2">
                          <small
                            className={
                              password.length >= 6
                                ? "text-success"
                                : "text-muted"
                            }
                          >
                            <i
                              className={`bi ${password.length >= 6 ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                            ></i>
                            At least 6 characters
                          </small>
                          <small
                            className={
                              /[A-Z]/.test(password)
                                ? "text-success"
                                : "text-muted"
                            }
                          >
                            <i
                              className={`bi ${/[A-Z]/.test(password) ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                            ></i>
                            One uppercase letter
                          </small>
                          <small
                            className={
                              /\d/.test(password)
                                ? "text-success"
                                : "text-muted"
                            }
                          >
                            <i
                              className={`bi ${/\d/.test(password) ? "bi-check-circle-fill" : "bi-circle"} me-1`}
                            ></i>
                            One number
                          </small>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold rounded-pill text-white border-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #6f42c1, #8f6cf6)",
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="d-flex align-items-center justify-content-center gap-2">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                            ></span>
                            Resetting Password...
                          </span>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </form>
                  )}

                  {/* Sign In Link */}
                  <div className="text-center mt-4">
                    <p className="small text-secondary mb-0">
                      Remembered your password?{" "}
                      <Link
                        to="/signin"
                        className="text-decoration-none fw-bold"
                        style={{ color: "#6f42c1" }}
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountRecovery;
