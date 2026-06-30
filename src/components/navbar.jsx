import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  // Do not render navbar on dashboard pages (they use Layout component)
  if (location.pathname.startsWith("/dashboard") || 
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/send-money") ||
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/settings") ||
      location.pathname.startsWith("/transactions") ||
      location.pathname.startsWith("/withdraw") ||
      location.pathname.startsWith("/kyc") ||
      location.pathname.startsWith("/invest") ||
      location.pathname.startsWith("/bills") ||
      location.pathname.startsWith("/virtualcard") ||
      location.pathname.startsWith("/ajo") ||
      location.pathname.startsWith("/saving") ||
      location.pathname.startsWith("/giftcards") ||
      location.pathname.startsWith("/loans")) {
    return null;
  }

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-white bg-opacity-75 border-bottom py-3"
      style={{
        backdropFilter: "blur(15px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        zIndex: 1030,
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img
            src="/images/SendNaw_logo_main-removebg-preview.png"
            alt="SendNaw"
            height="45"
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sendnawNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="sendnawNav">
          <ul className="navbar-nav mx-auto align-items-center">
            {/* Features Dropdown */}
            <li className="nav-item dropdown position-static mx-lg-3">
              <button
                className="nav-link dropdown-toggle fw-semibold text-dark px-0 border-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                style={{ borderBottom: "2px solid transparent" }}
              >
                Features
              </button>
              <div
                className="dropdown-menu shadow-lg border-0 rounded-4 mt-2 p-4"
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="row g-4">
                  {/* Payments */}
                  <div className="col-md-6">
                    <h6
                      className="text-uppercase small fw-bold text-primary mb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Payments
                    </h6>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/instant-transfers"
                    >
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                        <i className="bi bi-send-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">
                          Instant Transfers
                        </div>
                        <small className="text-muted">
                          Move money in seconds
                        </small>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/sendnawpay"
                    >
                      <div className="bg-info bg-opacity-10 p-2 rounded-3 text-info">
                        <i className="bi bi-cart-check-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">SendNaw Pay</div>
                        <small className="text-muted">
                          One‑click checkout for merchants
                        </small>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/cashback"
                    >
                      <div
                        className="bg-info bg-opacity-10 p-2 rounded-3"
                        style={{ color: "#ff7f50" }}
                      >
                        <i className="bi bi-cash"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Cashback</div>
                        <small className="text-muted">Earn from payments</small>
                      </div>
                    </Link>
                  </div>

                  {/* Lifestyle */}
                  <div className="col-md-6">
                    <h6
                      className="text-uppercase small fw-bold text-warning mb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Lifestyle
                    </h6>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/bills-airtime"
                    >
                      <div className="bg-warning bg-opacity-10 p-2 rounded-3 text-warning">
                        <i className="bi bi-lightning-charge-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Bills & Airtime</div>
                        <small className="text-muted">
                          Utility payments made easy
                        </small>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/virtual-card"
                    >
                      <div
                        className="p-2 rounded-3"
                        style={{
                          color: "#6f42c1",
                          backgroundColor: "rgba(111,66,193,0.1)",
                        }}
                      >
                        <i className="bi bi-credit-card-2-front-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Virtual Cards</div>
                        <small className="text-muted">
                          Shop globally with your cards
                        </small>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/gift-card"
                    >
                      <div
                        className="p-2 rounded-3"
                        style={{
                          color: "#ff6347",
                          backgroundColor: "rgba(111,66,193,0.1)",
                        }}
                      >
                        <i className="bi bi-credit-card-2-front-fill"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Gift Card</div>
                        <small className="text-muted">
                          Buy and sell your gift cards on SendNaw
                        </small>
                      </div>
                    </Link>
                  </div>

                  {/* Global Commerce */}
                  <div className="col-md-6">
                    <h6
                      className="text-uppercase small fw-bold text-danger mb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Global Commerce
                    </h6>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/virtual-card#usd-cards"
                    >
                      <div className="bg-danger bg-opacity-10 p-2 rounded-3 text-danger">
                        <i className="bi bi-globe2"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">
                          USD Virtual Cards
                        </div>
                        <small className="text-muted">
                          Pay for Netflix, Amazon & Ads
                        </small>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/multi-currency-wallets"
                    >
                      <div
                        className="p-2 rounded-3"
                        style={{
                          color: "#6f42c1",
                          backgroundColor: "rgba(111,66,193,0.1)",
                        }}
                      >
                        <i className="bi bi-cash-stack"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">
                          Multi‑Currency Wallets
                        </div>
                        <small className="text-muted">
                          Hold Naira, Dollars, and Pounds
                        </small>
                      </div>
                    </Link>
                  </div>

                  {/* Credit & Growth */}
                  <div className="col-md-6">
                    <h6
                      className="text-uppercase small fw-bold text-success mb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Credit & Growth
                    </h6>
                    <Link
                      className="dropdown-item d-flex align-items-start gap-3 py-2 rounded-3"
                      to="/loan"
                    >
                      <div className="bg-success bg-opacity-10 p-2 rounded-3 text-success">
                        <i className="bi bi-cash-stack"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">Instant Loans</div>
                        <small className="text-muted">
                          Flexible credit with low interest
                        </small>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* Company Dropdown */}
            <li className="nav-item dropdown mx-lg-3">
              <button
                className="nav-link dropdown-toggle fw-semibold text-dark px-0 border-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                style={{ borderBottom: "2px solid transparent" }}
              >
                Company
              </button>
              <div
                className="dropdown-menu shadow-lg border-0 rounded-4 p-2 mt-2"
                style={{ minWidth: "200px" }}
              >
                <Link
                  className="dropdown-item py-2 rounded-2 fw-medium"
                  to="/about"
                >
                  About Us
                </Link>
                <Link
                  className="dropdown-item py-2 rounded-2 fw-medium"
                  to="/career"
                >
                  Careers
                </Link>
                <Link
                  className="dropdown-item py-2 rounded-2 fw-medium"
                  to="/contact"
                >
                  Contact
                </Link>
                <Link
                  className="dropdown-item py-2 rounded-2 fw-medium"
                  to="/loan#calculator"
                >
                  Loan Calculator
                </Link>
              </div>
            </li>

            {/* FAQ */}
            <li className="nav-item mx-lg-3">
              <Link className="nav-link fw-semibold text-dark px-0" to="/faq">
                FAQ
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <>
                <span className="fw-bold text-dark small">
                  Hi, {user.full_name.split(" ")[0]}
                </span>
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin"
                      : user.role === "ceo"
                        ? "/ceo"
                        : "/dashboard"
                  }
                  className="btn px-4 py-2 rounded-pill fw-bold shadow-sm border-0 text-white"
                  style={{ backgroundColor: "#6f42c1" }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="nav-link fw-bold px-0 text-dark text-decoration-none"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn px-4 py-2 rounded-pill fw-bold shadow-sm border-0 text-white"
                  style={{ backgroundColor: "#6f42c1" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;