// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ChatModal from "../../components/chatmodal"; // ← import the chat

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="py-5 px-3 px-md-5" style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className="hero-gradient text-white rounded-5 p-4 p-md-5 shadow-lg">
            <div className="row align-items-center g-4 g-md-5">
              <div className="col-lg-7 text-center text-lg-start">
                <h1 className="display-3 fw-bold mb-3 lh-sm">
                  Send & Receive Money{" "}
                  <span style={{ color: "#ffc107" }}>Instantly</span>
                </h1>
                <p className="lead opacity-90 mb-4 fs-4">
                  Transfer money, pay bills, and buy airtime —{" "}
                  <span className="fw-bold" style={{ color: "#ffc107" }}>
                    fast, secure, and free
                  </span>
                  . All you need is a{" "}
                  <span className="fst-italic">SendNawtag®</span>.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-5">
                  <Link
                    to="/signup"
                    className="btn btn-warning btn-lg px-5 py-3 fw-bold rounded-pill shadow"
                  >
                    Get Started Now
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill"
                  >
                    <i className="bi bi-play-circle me-2"></i>How it works
                  </Link>
                </div>
                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-5">
                  <a
                    href="#"
                    className="btn btn-dark btn-sm px-3 py-2 rounded-3 d-flex align-items-center gap-2 border-secondary"
                  >
                    <i className="bi bi-apple fs-4"></i>
                    <div className="text-start">
                      <small style={{ fontSize: "10px" }} className="d-block">
                        Download on
                      </small>
                      <span className="fw-bold">App Store</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="btn btn-dark btn-sm px-3 py-2 rounded-3 d-flex align-items-center gap-2 border-secondary"
                  >
                    <i className="bi bi-google-play fs-4"></i>
                    <div className="text-start">
                      <small style={{ fontSize: "10px" }} className="d-block">
                        Get it on
                      </small>
                      <span className="fw-bold">Google Play</span>
                    </div>
                  </a>
                </div>
                <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start small opacity-75">
                  <span>
                    <i className="bi bi-shield-check text-warning me-1"></i>{" "}
                    NDIC Insured
                  </span>
                  <span>
                    <i className="bi bi-patch-check text-warning me-1"></i> CBN
                    Licensed
                  </span>
                  <span>
                    <i className="bi bi-lock text-warning me-1"></i> 256-bit
                    Encryption
                  </span>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
                <div className="position-relative">
                  <div
                    className="phone-mockup shadow-lg rounded-5 overflow-hidden border border-4 border-dark"
                    style={{
                      width: "290px",
                      height: "580px",
                      background: "#000",
                    }}
                  >
                    <div
                      className="h-100 w-100 p-4 text-white d-flex flex-column"
                      style={{
                        background:
                          "linear-gradient(180deg, #7c3aed 0%, #4c1d95 100%)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                        <span className="small fw-bold">SendNaw</span>
                      </div>
                      <div className="bg-white bg-opacity-10 rounded-4 p-4 text-center mb-4">
                        <p className="small opacity-75 mb-1">Total Balance</p>
                        <h2 className="fw-bold mb-0">₦285,000.00</h2>
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="bg-white bg-opacity-20 rounded-4 p-3 text-center">
                            <i className="bi bi-arrow-up-right-circle fs-3 mb-1"></i>
                            <p className="small mb-0">Send</p>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-white bg-opacity-20 rounded-4 p-3 text-center">
                            <i className="bi bi-plus-circle fs-3 mb-1"></i>
                            <p className="small mb-0">Add Money</p>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-white bg-opacity-20 rounded-4 p-3 text-center">
                            <i className="bi bi-phone fs-3 mb-1"></i>
                            <p className="small mb-0">Airtime</p>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-white bg-opacity-20 rounded-4 p-3 text-center">
                            <i className="bi bi-grid-fill fs-3 mb-1"></i>
                            <p className="small mb-0">Bills</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto mb-2">
                        <p className="small fw-bold opacity-75 mb-2">
                          Recent Transactions
                        </p>
                        <div className="bg-white bg-opacity-10 rounded-3 p-2 d-flex align-items-center gap-2 mb-2">
                          <div
                            className="bg-success rounded-circle"
                            style={{ width: "10px", height: "10px" }}
                          ></div>
                          <span className="small">Received ₦5,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-warning text-dark p-2 px-3 shadow-lg"
                    style={{ zIndex: 10 }}
                  >
                    <i className="bi bi-lightning-fill"></i> Instant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="stat-card shadow-sm">
                <div className="counter">2.5M+</div>
                <p className="stat-label mb-0">Active Users</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card shadow-sm">
                <div className="counter">₦50B+</div>
                <p className="stat-label mb-0">Processed</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card shadow-sm">
                <div className="counter text-dark">
                  <span className="pulse-green"></span>99.9%
                </div>
                <p className="stat-label mb-0">Uptime Rate</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card shadow-sm">
                <div className="counter">150+</div>
                <p className="stat-label mb-0">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8 text-center">
              <h2 className="display-3 fw-bold mb-4 text-dark">
                Bank with <span style={{ color: "#6f42c1" }}>SendNaw</span>.
              </h2>
              <p className="fs-4 text-dark mb-4 px-md-5">
                Join millions of users worldwide who trust SendNaw for their
                financial needs.
              </p>
              <p className="text-muted mb-5 fs-6 px-lg-5">
                Experience seamless banking with SendNaw. Send money instantly,
                pay bills with ease, manage your finances securely, and enjoy
                exclusive rewards — all in one app. Your financial freedom
                starts here.
              </p>
              <div className="d-grid d-sm-flex justify-content-sm-center gap-3">
                <Link
                  to="/signup"
                  className="btn btn-lg px-5 py-3 rounded-pill fw-bold shadow border-0 text-white"
                  style={{ backgroundColor: "#6610f2" }}
                >
                  Create Free Account
                </Link>
                <Link
                  to="/about"
                  className="btn btn-lg px-5 py-3 rounded-pill fw-bold border-2"
                  style={{ color: "#6610f2", borderColor: "#6610f2" }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Cards Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark">Why choose SendNaw?</h2>
          <p className="text-muted">
            Experience the future of seamless digital banking.
          </p>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 shadow-sm rounded-4 p-4 feature-card">
              <div className="card-body d-flex flex-column">
                <i className="bi bi-lightning-charge-fill fs-1 text-primary mb-3"></i>
                <h4 className="card-title fw-bold">Fast Transfers</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  CASHBACK ENABLED
                </p>
                <p className="card-text text-secondary">
                  Send and receive money instantly with secure transfers. Move
                  funds in seconds using SendNawtag®.
                </p>
                <Link to="/signup" className="btn btn-indigo mt-auto rounded-3">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm rounded-4 p-4 feature-card">
              <div className="card-body d-flex flex-column">
                <i
                  className="bi bi-credit-card-2-back-fill fs-1 mb-3"
                  style={{ color: "#6f42c1" }}
                ></i>
                <h4 className="card-title fw-bold">Pay Bills</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  UTILITIES & RENT
                </p>
                <p className="card-text text-secondary">
                  Quickly settle your monthly utilities and subscriptions while
                  keeping a perfect track of your history.
                </p>
                <Link to="/signin" className="btn btn-indigo mt-auto rounded-3">
                  Pay Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm rounded-4 p-4 feature-card">
              <div className="card-body d-flex flex-column">
                <i className="bi bi-shield-check fs-1 text-success mb-3"></i>
                <h4 className="card-title fw-bold">Join SendNaw</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  COMMUNITY DRIVEN
                </p>
                <p className="card-text text-secondary">
                  Create an account in minutes and enjoy premium banking
                  features tailored just for your lifestyle.
                </p>
                <Link to="/signup" className="btn btn-indigo mt-auto rounded-3">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-4 p-4 border-0">
              <div className="card-body d-flex flex-column">
                <i
                  className="bi bi-shield-lock-fill fs-1 mb-3"
                  style={{ color: "#6610f2" }}
                ></i>
                <h4 className="card-title fw-bold">Advanced Safety Measures</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  STATE-OF-THE-ART SECURITY
                </p>
                <p className="card-text text-secondary">
                  SendNaw uses up-to-date cybersecurity technology to protect
                  your information and prevent unauthorized use.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-4 p-4 border-0">
              <div className="card-body d-flex flex-column">
                <i
                  className="bi bi-bank2 fs-1 mb-3"
                  style={{ color: "#28a745" }}
                ></i>
                <h4 className="card-title fw-bold">Insurance</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  PROTECTION AND PEACE OF MIND
                </p>
                <p className="card-text text-secondary">
                  Your funds are insured for up to ₦250,000 by the Nigerian
                  Deposit Insurance Corporation (NDIC) via SendNaw.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-4 p-4 border-0">
              <div className="card-body d-flex flex-column">
                <i
                  className="bi bi-graph-up-arrow fs-1 mb-3"
                  style={{ color: "#dc3545" }}
                ></i>
                <h4 className="card-title fw-bold">Simple Limit Upgrade</h4>
                <p className="fw-bold small mb-2" style={{ color: "#6610f2" }}>
                  REACH FOR THE STARS!
                </p>
                <p className="card-text text-secondary">
                  Effortlessly upgrade your transaction limits and explore new
                  financial possibilities with SendNaw's tiered verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <span
                className="badge bg-indigo-soft text-primary px-3 py-2 rounded-pill mb-2"
                style={{ background: "#eef2ff" }}
              >
                REWARDS
              </span>
              <h2 className="display-5 fw-bold mb-3">Save for Your Dreams</h2>
              <p className="lead text-muted mb-4">
                Whether you dream of traveling abroad, buying a house, or owning
                property, you can create a savings plan for your goals and earn{" "}
                <span className="text-success fw-bold">
                  up to 16% interest p.a.
                </span>
              </p>
              <Link to="/savings" className="btn btn-indigo">
                Start Saving
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/images/savings.png"
                alt="Savings"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Card Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-lg-6 text-center text-lg-start">
              <span
                className="badge px-3 py-2 rounded-pill mb-2"
                style={{ background: "#f3e8ff", color: "#7e22ce" }}
              >
                CONVENIENCE
              </span>
              <h2 className="display-5 fw-bold mb-3">Instant Debit Cards</h2>
              <p className="lead text-muted mb-4">
                If transfers are not your jam, request a physical card and have
                it delivered within 48 hours. Activate it in minutes and start
                spending globally.
              </p>
              <Link to="/virtual-card" className="btn btn-indigo">
                Request Card
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/images/Verve card.png"
                alt="Debit Card"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Up Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h2 className="display-5 fw-bold mb-3">
                Stay Connected Effortlessly
              </h2>
              <p className="lead text-muted mb-4">
                Buying airtime and data has never been this fast. Top up any
                network instantly — whether renewing your plan or sending data
                to loved ones.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <i className="bi bi-wifi text-primary fs-3"></i>
                <i className="bi bi-phone text-primary fs-3"></i>
                <i className="bi bi-lightning-fill text-warning fs-3"></i>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/images/topupp.png"
                alt="Connectivity"
                className="img-fluid rounded-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-5 bg-light">
        <div className="container py-lg-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">
              Open an account in{" "}
              <span style={{ color: "#6610f2" }}>5 minutes</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
              Getting started with SendNaw is simple. Follow these three easy
              steps to unlock a new world of banking.
            </p>
          </div>

          <div className="row position-relative d-none d-lg-flex mb-4">
            <div
              className="position-absolute top-50 start-0 translate-middle-y w-100"
              style={{ height: "2px", background: "#e0e0e0", zIndex: 0 }}
            ></div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="col-4 text-center position-relative"
                style={{ zIndex: 1 }}
              >
                <div
                  className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "2px solid #6610f2",
                  }}
                >
                  <span className="fw-bold fs-4" style={{ color: "#6610f2" }}>
                    {n}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4 text-center text-lg-start">
            {[
              {
                step: "Step 1",
                title: "Download the App",
                body: "Head to your App Store or Play Store. Search for SendNaw and hit download to begin.",
              },
              {
                step: "Step 2",
                title: "Register in Minutes",
                body: "Provide your phone number and BVN. We use secure biometrics to verify it's really you.",
              },
              {
                step: "Step 3",
                title: "Fund & Transact",
                body: "Receive money into your new account and start enjoying instant transfers and airtime top-ups.",
              },
            ].map((s) => (
              <div key={s.step} className="col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                  <div className="d-lg-none mb-3">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: "#f8f5ff", color: "#6610f2" }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h5 className="fw-bold mt-2">{s.title}</h5>
                  <p className="text-secondary small">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 d-flex flex-wrap justify-content-center gap-3">
            {[
              { icon: "bi-apple", store: "App Store", sub: "Download on the" },
              {
                icon: "bi-google-play",
                store: "Google Play",
                sub: "Get it on",
              },
            ].map((a) => (
              <a
                key={a.store}
                href="#"
                className="btn btn-dark btn-lg px-4 py-2 rounded-3 d-flex align-items-center gap-2"
              >
                <i className={`bi ${a.icon} fs-3`}></i>
                <div className="text-start" style={{ lineHeight: 1.1 }}>
                  <small style={{ fontSize: "10px" }}>{a.sub}</small>
                  <div className="fw-bold">{a.store}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Customer Support Chat ── */}
      <ChatModal />
    </>
  );
};

export default Home;
