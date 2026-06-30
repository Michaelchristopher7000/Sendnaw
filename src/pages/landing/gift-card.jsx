import React, { useEffect } from "react";
import AOS from "aos";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
const GiftCard = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Hero section */}
      <section className="py-5 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1
                className="display-5 fw-semibold mb-4"
                style={{ color: "#7c3aed", lineHeight: 1.2 }}
              >
                Buy gift cards on Sendnaw to pay subscriptions and shop online
                around the world.
              </h1>
              <p
                className="mb-5"
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "poppins, sans-serif",
                }}
              >
                You’ll find gift cards for Apple, Google Play, PlayStation,
                Amazon and more on the Sendnaw app.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a
                  href="#"
                  className="btn btn-dark d-flex align-items-center px-4 py-2"
                  style={{ borderRadius: "10px", backgroundColor: "#000" }}
                >
                  <i className="bi bi-apple fs-2 me-2"></i>
                  <div className="text-start">
                    <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                      Download on the
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "1.1rem", lineHeight: 1 }}
                    >
                      App Store
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="btn btn-dark d-flex align-items-center px-4 py-2"
                  style={{ borderRadius: "10px", backgroundColor: "#000" }}
                >
                  <i className="bi bi-google-play fs-2 me-2"></i>
                  <div className="text-start">
                    <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                      GET IT ON
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "1.1rem", lineHeight: 1 }}
                    >
                      Google Play
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-6 position-relative d-flex justify-content-center">
              <div
                className="position-absolute"
                style={{
                  width: "450px",
                  height: "450px",
                  backgroundColor: "#f5f3ff",
                  borderRadius: "50%",
                  zIndex: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-40%, -50%)",
                }}
              ></div>
              <div
                className="position-relative card border-0 shadow-lg"
                style={{
                  width: "280px",
                  borderRadius: "35px",
                  zIndex: 2,
                  overflow: "hidden",
                  border: "8px solid #000 !important",
                }}
              >
                <div
                  className="card-body p-0"
                  style={{ height: "500px", background: "white" }}
                >
                  <div className="p-3 d-flex justify-content-between align-items-center mt-2">
                    <i className="bi bi-x-lg text-secondary"></i>
                  </div>
                  <div className="p-4">
                    <div className="row g-3 text-center">
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-amazon text-dark fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-play-fill text-primary fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-apple text-dark fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-playstation text-primary fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-apple text-dark fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-spotify text-success fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-steam text-primary fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-spotify text-success fs-5"></i>
                        </div>
                      </div>
                      <div className="col-4">
                        <div
                          className="shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#ffffff",
                            margin: "0 auto",
                          }}
                        >
                          <i className="bi bi-steam text-primary fs-5"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <h5 className="fw-bold mb-2">Gift Cards Are Here!</h5>
                      <p className="small text-muted">
                        Get gift cards and vouchers to shop at top brands around
                        the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="position-absolute shadow-sm d-flex align-items-center justify-content-center bg-white rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  top: "10%",
                  left: "10%",
                  zIndex: 3,
                }}
              >
                <i className="bi bi-spotify text-success fs-3"></i>
              </div>
              <div
                className="position-absolute shadow-sm d-flex align-items-center justify-content-center bg-white rounded-circle"
                style={{
                  width: "50px",
                  height: "50px",
                  bottom: "20%",
                  left: "5%",
                  zIndex: 3,
                }}
              >
                <i className="bi bi-amazon fs-4"></i>
              </div>
              <div
                className="position-absolute shadow-sm d-flex align-items-center justify-content-center bg-white rounded-circle"
                style={{
                  width: "55px",
                  height: "55px",
                  top: "20%",
                  right: "10%",
                  zIndex: 3,
                }}
              >
                <i className="bi bi-apple fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlight */}
      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f3effd",
                  borderRadius: "12px",
                  color: "#7c3aed",
                }}
              >
                <i className="bi bi-bag-fill"></i>
              </div>
              <h5 className="fw-bold">
                Buy Apple, iTunes and Play Store gift cards for different
                countries.
              </h5>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f3effd",
                  borderRadius: "12px",
                  color: "#7c3aed",
                }}
              >
                <i className="bi bi-cursor-fill"></i>
              </div>
              <h5 className="fw-bold">
                Pay on foreign stores like Amazon and Walmart without a dollar
                card.
              </h5>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm p-4"
              style={{ borderRadius: "20px" }}
            >
              <div
                className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f3effd",
                  borderRadius: "12px",
                  color: "#7c3aed",
                }}
              >
                <i className="bi bi-credit-card-2-front-fill"></i>
              </div>
              <h5 className="fw-bold">
                Buy any gift card for yourself or someone else in minutes.
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Split content (Pay on foreign stores) */}
      <section className="py-5 my-5" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 d-flex justify-content-center position-relative mb-5 mb-lg-0">
              <div
                className="position-absolute"
                style={{
                  width: "480px",
                  height: "480px",
                  backgroundColor: "rgba(124, 58, 237, 0.1)",
                  borderRadius: "50%",
                  zIndex: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="position-absolute"
                style={{
                  width: "320px",
                  height: "320px",
                  background:
                    "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(255,255,255,0) 70%)",
                  borderRadius: "50%",
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="card border-0 shadow-lg position-relative"
                style={{
                  width: "280px",
                  height: "520px",
                  borderRadius: "35px",
                  zIndex: 2,
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "8px solid #1a1a1a !important",
                }}
              >
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
                  <i className="bi bi-chevron-left text-dark fw-bold"></i>
                  <span className="fw-bold small">Spotify</span>
                  <button
                    className="btn btn-sm text-white px-3"
                    style={{
                      backgroundColor: "#7c3aed",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Buy
                  </button>
                </div>
                <div className="p-4 text-center">
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "65px",
                      height: "65px",
                      background: "#000",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <i className="bi bi-spotify text-success fs-1"></i>
                  </div>
                  <div
                    className="p-2 border rounded-3 mb-4 d-flex align-items-center justify-content-between bg-light"
                    style={{
                      fontSize: "0.8rem",
                      borderColor: "#eee !important",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-2">🇺🇸</span>
                      <span className="text-dark fw-medium">United States</span>
                    </div>
                    <i className="bi bi-chevron-down text-muted small"></i>
                  </div>
                  <p
                    className="text-start mb-3 fw-bold text-secondary"
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Choose Amount
                  </p>
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <div
                        className="py-2 border rounded text-muted small"
                        style={{ background: "#fafafa", cursor: "pointer" }}
                      >
                        $10
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="py-2 border rounded text-muted small"
                        style={{ background: "#fafafa", cursor: "pointer" }}
                      >
                        $20
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="py-2 border rounded fw-bold"
                        style={{
                          borderColor: "#7c3aed !important",
                          color: "#7c3aed",
                          background: "#f5f3ff",
                          cursor: "pointer",
                        }}
                      >
                        $30
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="py-2 border rounded text-muted small"
                        style={{ background: "#fafafa", cursor: "pointer" }}
                      >
                        $60
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-top mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        Price in Naira:
                      </span>
                      <span
                        className="fw-bold text-dark"
                        style={{ fontSize: "1rem" }}
                      >
                        ₦17,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="position-absolute shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#7c3aed",
                  borderRadius: "50%",
                  bottom: "10%",
                  right: "15%",
                  zIndex: 3,
                  opacity: 0.8,
                }}
              ></div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h2
                className="display-5 fw-bold mb-4"
                style={{
                  color: "#1a1a1a",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                }}
              >
                Pay on foreign stores{" "}
                <span style={{ color: "#7c3aed" }}>without a dollar card.</span>
              </h2>
              <p
                className="text-secondary mb-4"
                style={{ fontSize: "1.2rem", lineHeight: 1.6 }}
              >
                Shop abroad with gift cards for popular online stores like
                Amazon, Walmart and Best Buy on the Sendnaw app.
              </p>
              <a
                href="/signup.html"
                className="text-decoration-none fw-bold d-inline-flex align-items-center transition-link"
                style={{ color: "#7c3aed", fontSize: "1.15rem" }}
              >
                Join Sendnaw <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gifting section */}
      <section className="py-5 my-5" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2
                className="display-5 fw-bold mb-4"
                style={{
                  color: "#7c3aed",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                }}
              >
                Unlock apps, streaming platforms and games.
              </h2>
              <p
                className="text-secondary mb-4"
                style={{ fontSize: "1.15rem", lineHeight: 1.6 }}
              >
                Increase your entertainment options with gift cards for Apple,
                iTunes, Play Store, Xbox, PlayStation and mobile games.
              </p>
              <a
                href="#"
                className="text-decoration-none fw-bold d-inline-flex align-items-center transition-link"
                style={{ color: "#7c3aed", fontSize: "1.15rem" }}
              >
                Download Sendnaw <i className="bi bi-chevron-right ms-2"></i>
              </a>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center position-relative">
              <div
                className="position-absolute"
                style={{
                  width: "520px",
                  height: "520px",
                  backgroundColor: "#fff8eb",
                  borderRadius: "50%",
                  zIndex: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-40%, -50%)",
                }}
              ></div>
              <div
                className="card border-0 shadow-lg position-relative"
                style={{
                  width: "290px",
                  height: "540px",
                  borderRadius: "35px",
                  zIndex: 2,
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "8px solid #1a1a1a !important",
                }}
              >
                <div className="p-3 border-bottom d-flex align-items-center bg-white">
                  <i className="bi bi-chevron-left text-dark me-auto"></i>
                  <span className="fw-bold small mx-auto">Gift Cards 🇳🇬</span>
                </div>
                <div className="px-3 pt-3">
                  <div
                    className="bg-light rounded-2 p-2 d-flex align-items-center text-muted"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <i className="bi bi-search me-2"></i>
                    <span>Search</span>
                  </div>
                </div>
                <div
                  className="d-flex gap-2 px-3 py-3 overflow-hidden"
                  style={{ whiteSpace: "nowrap", fontSize: "0.7rem" }}
                >
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{ backgroundColor: "#7c3aed" }}
                  >
                    Most Popular
                  </span>
                  <span className="badge rounded-pill px-3 py-2 border text-dark bg-transparent">
                    All
                  </span>
                  <span className="badge rounded-pill px-3 py-2 border text-dark bg-transparent">
                    App
                  </span>
                </div>
                <div className="px-3">
                  <div className="row g-2">
                    <div className="col-6 mb-2">
                      <div
                        className="p-3 border rounded-3 text-center shadow-sm"
                        style={{ background: "#fff" }}
                      >
                        <div
                          className="bg-black rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <i className="bi bi-amazon text-white small"></i>
                        </div>
                        <p
                          className="mb-0 fw-bold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          Amazon USA
                        </p>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div
                        className="p-3 border rounded-3 text-center shadow-sm"
                        style={{ background: "#fff" }}
                      >
                        <div
                          className="bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <i className="bi bi-apple text-dark small"></i>
                        </div>
                        <p
                          className="mb-0 fw-bold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          iTunes USA
                        </p>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div
                        className="p-3 border rounded-3 text-center shadow-sm"
                        style={{ background: "#fff" }}
                      >
                        <div
                          className="bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <i className="bi bi-google-play text-primary small"></i>
                        </div>
                        <p
                          className="mb-0 fw-bold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          Google Play
                        </p>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div
                        className="p-3 border rounded-3 text-center shadow-sm"
                        style={{ background: "#fff" }}
                      >
                        <div
                          className="bg-primary rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                          style={{ width: "35px", height: "35px" }}
                        >
                          <i className="bi bi-playstation text-white small"></i>
                        </div>
                        <p
                          className="mb-0 fw-bold"
                          style={{ fontSize: "0.65rem" }}
                        >
                          PlayStation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treat yourself section */}
      <section className="py-5 my-5" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 d-flex justify-content-center position-relative mb-5 mb-lg-0">
              <div
                className="position-absolute"
                style={{
                  width: "480px",
                  height: "480px",
                  backgroundColor: "#eeefff",
                  borderRadius: "50%",
                  zIndex: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="card border-0 shadow-lg position-relative"
                style={{
                  width: "380px",
                  borderRadius: "24px",
                  zIndex: 2,
                  background: "#ffffff",
                  padding: "40px 30px",
                }}
              >
                <h5
                  className="text-center fw-bold mb-5"
                  style={{ fontSize: "1.25rem" }}
                >
                  Who’s this gift card for?
                </h5>
                <div
                  className="d-flex align-items-center p-3 mb-3 border-bottom shadow-sm-hover"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "#e0fcf4",
                    }}
                  >
                    <i
                      className="bi bi-person-fill"
                      style={{ color: "#10b981" }}
                    ></i>
                  </div>
                  <span
                    className="fw-bold text-dark"
                    style={{ fontSize: "1.1rem" }}
                  >
                    For You
                  </span>
                  <i className="bi bi-chevron-right ms-auto text-muted"></i>
                </div>
                <div
                  className="d-flex align-items-center p-3"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "#e0f2fe",
                    }}
                  >
                    <i
                      className="bi bi-gift-fill"
                      style={{ color: "#0ea5e9" }}
                    ></i>
                  </div>
                  <span
                    className="fw-bold text-dark"
                    style={{ fontSize: "1.1rem" }}
                  >
                    For Someone Else
                  </span>
                  <i className="bi bi-chevron-right ms-auto text-muted"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h2
                className="display-5 fw-bold mb-4"
                style={{
                  color: "#7c3aed",
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                }}
              >
                Treat yourself or someone else in minutes.
              </h2>
              <p
                className="text-secondary mb-4"
                style={{ fontSize: "1.15rem", lineHeight: 1.6 }}
              >
                Buy a gift card for yourself or someone else on the Sendnaw app
                and it’ll automatically be delivered by email.
              </p>
              <a
                href="#"
                className="text-decoration-none fw-bold d-inline-flex align-items-center transition-link"
                style={{ color: "#7c3aed", fontSize: "1.15rem" }}
              >
                Download Sendnaw <i className="bi bi-chevron-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="text-center fw-bold mb-5" style={{ color: "#1a1a1a" }}>
            Gift Card FAQs
          </h2>
          <div className="accordion accordion-flush" id="faqAccordion">
            <div className="accordion-item border-bottom mb-3">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q1"
                  style={{ color: "#1a1a1a", background: "none" }}
                >
                  How do I redeem a gift card?
                </button>
              </h2>
              <div
                id="q1"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  To redeem a gift card, follow the instructions in the gift
                  card email. You'll usually have to copy the gift card code in
                  the email or click a link in the email to get the code. Once
                  you've copied the code, redeem it by pasting it on the app or
                  website where you want to use it.
                </div>
              </div>
            </div>
            <div className="accordion-item border-bottom mb-3">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q2"
                  style={{ color: "#1a1a1a", background: "none" }}
                >
                  What gift cards can I buy on the Sendnaw app?
                </button>
              </h2>
              <div
                id="q2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted">
                  We offer a wide range of global cards including Amazon, Apple,
                  Google Play, Netflix, and many more.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GiftCard;
