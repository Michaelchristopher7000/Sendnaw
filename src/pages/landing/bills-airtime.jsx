import React, { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const BillsAirtime = () => {
  useEffect(() => {
    AOS.refresh(); // Ensure AOS works after React mounts
  }, []);

  return (
    <div>
      <Navbar />
      {/* Hero section */}
      <section
        style={{
          padding: '80px 0',
          backgroundColor: '#ffffff',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1
                style={{
                  color: '#6610f2',
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                Pay bills & buy airtime in <span style={{ color: '#6610f2' }}>seconds</span>
              </h1>
              <p
                style={{
                  color: '#555555',
                  fontSize: '1.25rem',
                  marginBottom: '35px',
                  maxWidth: '480px',
                  lineHeight: 1.6,
                }}
              >
                Quickly top up your phone, pay for electricity, and renew cable TV subscriptions without leaving the
                Sendnaw app.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <a href="#" style={{ textDecoration: 'none' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    style={{ height: '48px' }}
                  />
                </a>
                <a href="#" style={{ textDecoration: 'none' }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    style={{ height: '48px' }}
                  />
                </a>
              </div>

              <div className="d-flex align-items-center gap-3" style={{ paddingTop: '25px', borderTop: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '0.8rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Trusted & Secured
                </span>
                <div style={{ height: '20px', width: '1px', background: '#ddd' }}></div>
                <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>CBN Licensed</span>
                <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>NDIC Insured</span>
              </div>
            </div>

            <div className="col-lg-6 text-center" style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '480px',
                  height: '480px',
                  background: 'linear-gradient(135deg, #f3e5f5 0%, #e8eaf6 100%)',
                  borderRadius: '50%',
                  zIndex: 1,
                }}
              ></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    background: '#ffffff',
                    width: '290px',
                    height: '580px',
                    borderRadius: '45px',
                    border: '10px solid #222',
                    margin: '0 auto',
                    boxShadow: '0 40px 80px -20px rgba(75, 0, 130, 0.25)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: '30px',
                      background: '#fff',
                      padding: '15px 25px 5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    <span>9:41</span>
                    <span>
                      <i className="bi bi-battery-half"></i>
                    </span>
                  </div>

                  <div style={{ padding: '15px', textAlign: 'left' }}>
                    <h5 style={{ color: '#6610f2', fontWeight: 800, margin: 0 }}>Bills & Airtime</h5>
                  </div>

                  <div style={{ padding: '0 15px' }}>
                    <div
                      style={{
                        background: '#f8f7ff',
                        borderRadius: '15px',
                        padding: '15px',
                        marginBottom: '15px',
                        border: '1px solid #e0d7f7',
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#6f42c1', fontWeight: 'bold', marginBottom: '8px' }}>
                        SELECT PROVIDER
                      </div>
                      <div className="d-flex justify-content-between">
                        <div
                          style={{
                            width: '45px',
                            height: '45px',
                            background: '#ffda00',
                            borderRadius: '10px',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                          }}
                        >
                          MTN
                        </div>
                        <div
                          style={{
                            width: '45px',
                            height: '45px',
                            background: '#ed1c24',
                            borderRadius: '10px',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          Airtel
                        </div>
                        <div
                          style={{
                            width: '45px',
                            height: '45px',
                            background: '#00a651',
                            borderRadius: '10px',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          Glo
                        </div>
                        <div
                          style={{
                            width: '45px',
                            height: '45px',
                            background: '#000',
                            borderRadius: '10px',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: 'white',
                          }}
                        >
                          9mob
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                      <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '5px' }}>
                        Phone Number
                      </label>
                      <div
                        style={{
                          background: '#eee',
                          height: '40px',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '0.8rem',
                          color: '#333',
                        }}
                      >
                        0801 234 5678
                      </div>
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                      <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '5px' }}>
                        Select Amount
                      </label>
                      <div className="row g-2">
                        <div className="col-4">
                          <div
                            style={{
                              border: '1px solid #6f42c1',
                              borderRadius: '8px',
                              textAlign: 'center',
                              padding: '8px',
                              fontSize: '0.75rem',
                              color: '#6f42c1',
                              fontWeight: 'bold',
                            }}
                          >
                            ₦500
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            style={{
                              background: '#6f42c1',
                              borderRadius: '8px',
                              textAlign: 'center',
                              padding: '8px',
                              fontSize: '0.75rem',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            ₦1,000
                          </div>
                        </div>
                        <div className="col-4">
                          <div
                            style={{
                              border: '1px solid #6f42c1',
                              borderRadius: '8px',
                              textAlign: 'center',
                              padding: '8px',
                              fontSize: '0.75rem',
                              color: '#6f42c1',
                              fontWeight: 'bold',
                            }}
                          >
                            ₦2,000
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{
                        width: '100%',
                        background: '#6610f2',
                        color: 'white',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 10px 20px rgba(75, 0, 130, 0.2)',
                      }}
                    >
                      Buy Airtime Now
                    </button>
                  </div>

                  <div
                    style={{
                      marginTop: 'auto',
                      padding: '15px',
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', opacity: 0.3 }}>
                      <i className="bi bi-houses"></i>
                    </span>
                    <span style={{ fontSize: '1.2rem', color: '#6f42c1' }}>
                      <i className="bi bi-journal"></i>
                    </span>
                    <span style={{ fontSize: '1.2rem', opacity: 0.3 }}>
                      <i className="bi bi-person-fill"></i>
                    </span>
                  </div>
                </div>

                {/* Floating icons */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '-20px',
                    background: 'rgb(255, 229, 226)',
                    padding: '10px',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://i.pinimg.com/1200x/56/64/ce/5664ce800352d0d526d6a88d4b1d078d.jpg"
                    alt="airtel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '-20px',
                    background: 'rgb(244, 249, 193)',
                    padding: '10px',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://i.pinimg.com/736x/53/e6/71/53e6717a6484f997f5d555bb1ce83b15.jpg"
                    alt="airtel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '-20px',
                    background: 'rgb(214, 245, 225)',
                    padding: '10px',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://i.pinimg.com/736x/80/7d/84/807d84f52f961a253331a15731877a43.jpg"
                    alt="Glo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '-20px',
                    background: 'rgb(255, 240, 161)',
                    padding: '10px',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjprybczXjAGqMKIQCWB17enuKvo4OvyRfg&s"
                    alt="MTN"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e0d7f7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '25px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4b0082" strokeWidth="2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M9 17.05a7 7 0 0 1 6 0"></path>
                    <circle cx="12" cy="20" r="2"></circle>
                  </svg>
                </div>
                <h5 style={{ color: '#4b0082', fontWeight: 700, lineHeight: 1.4, fontSize: '1.15rem' }}>
                  Buy airtime from any Nigerian mobile network.
                </h5>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e0d7f7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '25px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4b0082" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <h5 style={{ color: '#4b0082', fontWeight: 700, lineHeight: 1.4, fontSize: '1.15rem' }}>
                  Top up airtime on your phone in a few seconds.
                </h5>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  background: '#ffffff',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e0d7f7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '25px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4b0082" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h5 style={{ color: '#4b0082', fontWeight: 700, lineHeight: 1.4, fontSize: '1.15rem' }}>
                  Subscribe to your favourite mobile data plan easily.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network list section */}
      <section className="py-5 bg-white overflow-hidden">
        <div className="container py-5 mt-3">
          <div className="row align-items-center">
            <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center mb-5 mb-lg-0">
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: '520px',
                  height: '520px',
                  backgroundColor: '#fff8e7',
                  zIndex: 1,
                  top: '50%',
                  left: '45%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.7,
                }}
              ></div>
              <div
                className="bg-white rounded-4 shadow-lg p-0 overflow-hidden position-relative"
                style={{ width: '100%', maxWidth: '360px', zIndex: 2, border: '1px solid rgba(0,0,0,0.03)' }}
              >
                <div className="py-4 text-center border-bottom">
                  <h6 className="fw-bold m-0" style={{ color: '#000', fontSize: '1.1rem' }}>
                    Choose Network
                  </h6>
                </div>
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex align-items-center py-3 px-4 border-bottom">
                    <img
                      src="https://i.pinimg.com/736x/53/e6/71/53e6717a6484f997f5d555bb1ce83b15.jpg"
                      alt="9mobile"
                      className="rounded-circle me-3"
                      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    <span className="fw-medium" style={{ color: '#40196d' }}>
                      9mobile
                    </span>
                  </div>
                  <div className="list-group-item d-flex align-items-center py-3 px-4 border-bottom">
                    <img
                      src="https://i.pinimg.com/1200x/56/64/ce/5664ce800352d0d526d6a88d4b1d078d.jpg"
                      alt="Airtel"
                      className="rounded-circle me-3"
                      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    <span className="fw-medium" style={{ color: '#40196d' }}>
                      Airtel
                    </span>
                  </div>
                  <div className="list-group-item d-flex align-items-center py-3 px-4 border-bottom">
                    <img
                      src="https://i.pinimg.com/736x/80/7d/84/807d84f52f961a253331a15731877a43.jpg"
                      alt="Glo"
                      className="rounded-circle me-3"
                      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    <span className="fw-medium" style={{ color: '#40196d' }}>
                      Glo
                    </span>
                  </div>
                  <div className="list-group-item d-flex align-items-center py-3 px-4 border-0">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1200px-MTN_Logo.svg.png"
                      alt="MTN"
                      className="rounded-circle me-3"
                      style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                    />
                    <span className="fw-medium" style={{ color: '#40196d' }}>
                      MTN
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5 text-center text-lg-start">
              <h2 className="display-5 fw-bold mb-4" style={{ color: '#40196d', lineHeight: 1.1, fontWeight: 800 }}>
                Find all Nigerian <br />
                mobile networks on <br />
                Sendnaw
              </h2>
              <p className="fs-5 mb-4" style={{ color: '#40196d', fontWeight: 400, maxWidth: '480px' }}>
                Buy Airtel, Glo, MTN and 9Mobile airtime and internet data directly from your account.
              </p>
              <a
                href="/signin.html"
                className="text-decoration-none fw-bold d-inline-flex align-items-center fs-5"
                style={{ color: '#40196d', borderBottom: '2px solid transparent' }}
              >
                Join Sendnaw
                <svg className="ms-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Send airtime section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center mb-5 mb-lg-0">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '450px',
                    height: '450px',
                    backgroundColor: '#e6f9f0',
                    borderRadius: '50%',
                    zIndex: 1,
                  }}
                ></div>
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'white',
                    width: '270px',
                    height: '550px',
                    borderRadius: '40px',
                    border: '10px solid #222',
                    margin: '0 auto',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '25px 20px', textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#4b0082',
                        marginBottom: '40px',
                        position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>&lsaquo;</span> Confirm
                    </div>
                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '5px' }}>To:</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#4b0082', marginBottom: '25px' }}>
                      0805 108 0805
                    </div>

                    <div
                      style={{
                        background: '#f8f7ff',
                        borderRadius: '15px',
                        padding: '18px',
                        textAlign: 'left',
                        fontSize: '12px',
                        border: '1px solid #efeaff',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
                        <span>Amount</span>
                        <span style={{ fontWeight: 800, color: '#4b0082' }}>₦10,000.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
                        <span>Fee</span>
                        <span style={{ fontWeight: 800, color: '#4b0082' }}>₦0.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                        <span>Network</span>
                        <span style={{ fontWeight: 800, color: '#00a651' }}>● GLO</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '120px' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: '#4b0082',
                          borderRadius: '18px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 20px rgba(75, 0, 130, 0.3)',
                        }}
                      >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M12 2a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path>
                          <path d="M19 11a7 7 0 0 1-14 0"></path>
                          <line x1="12" y1="19" x2="12" y2="22"></line>
                        </svg>
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#4b0082',
                          fontWeight: 700,
                          marginTop: '15px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        TAP TO CONFIRM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2
                style={{
                  color: '#6610f2',
                  fontWeight: 800,
                  fontSize: '3.2rem',
                  lineHeight: 1.1,
                  marginBottom: '25px',
                }}
              >
                Send airtime to your friends and family.
              </h2>
              <p
                style={{
                  color: '#555555',
                  fontSize: '1.25rem',
                  marginBottom: '35px',
                  lineHeight: 1.6,
                }}
              >
                Recharge any Nigerian phone number from your Sendnaw app even when you’re abroad. No hidden fees, just
                instant value.
              </p>
              <a
                href="#"
                style={{
                  color: '#6f42c1',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Learn How To Buy Airtime <span style={{ marginLeft: '12px', fontSize: '1.4rem' }}>&rsaquo;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tokens section */}
      <section style={{ padding: '80px 0', backgroundColor: '#fcfcfc', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-6 pe-lg-5">
              <h2
                style={{
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '3.2rem',
                  lineHeight: 1.1,
                  marginBottom: '25px',
                }}
              >
                Get your tokens on the app and by email.
              </h2>
              <p
                style={{
                  color: '#333333',
                  fontSize: '1.25rem',
                  marginBottom: '40px',
                  lineHeight: 1.6,
                }}
              >
                Sendnaw makes it easy for you to find your meter, internet and TV tokens without checking your inbox.
                Pay once, stay connected.
              </p>
              <a
                href="#"
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  padding: '18px 36px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  display: 'inline-block',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                }}
              >
                Download Sendnaw Now <span style={{ marginLeft: '10px' }}>&rsaquo;</span>
              </a>
            </div>
            <div className="col-lg-6 text-center mb-5 mb-lg-0">
              <div
                style={{
                  backgroundColor: '#e0f4ff',
                  borderRadius: '30px',
                  padding: '50px 40px 0 40px',
                  display: 'inline-block',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '450px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.15,
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
                    backgroundSize: '15px 15px',
                  }}
                ></div>
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'white',
                    width: '270px',
                    height: '420px',
                    borderRadius: '35px 35px 0 0',
                    border: '10px solid #222',
                    borderBottom: 'none',
                    margin: '0 auto',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ padding: '20px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800 }}>Transaction</span>
                      <span
                        style={{
                          fontSize: '10px',
                          background: '#000',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        Share
                      </span>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '5px' }}>-₦2,000.00</div>
                      <div style={{ fontSize: '10px', color: '#888' }}>EKEDC Electricity ● May 13, 2026</div>
                    </div>
                    <div style={{ borderTop: '1px dashed #ddd', paddingTop: '15px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '9px', color: '#999', textTransform: 'uppercase' }}>Meter Number</div>
                        <div style={{ fontSize: '12px', fontWeight: 700 }}>0123456789</div>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '9px', color: '#999', textTransform: 'uppercase' }}>Token Units</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#6610f2', letterSpacing: '1px' }}>
                          4522 - 8812 - 0912
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internet & TV packages section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                style={{
                  position: 'relative',
                  height: '400px',
                  background: '#f3eaff',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(#6610f2 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    left: '10%',
                    top: '15%',
                    background: 'white',
                    width: '220px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    zIndex: 1,
                    padding: '15px',
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 800, textAlign: 'center', marginBottom: '15px' }}>
                    Choose a Provider
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginBottom: '10px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#003366',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    SPECTRANET NG
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginBottom: '10px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#00a651',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    GLO NG DATA
                  </div>
                  <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#ffda00',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    MTN NG DATA
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '10%',
                    bottom: '15%',
                    background: 'white',
                    width: '220px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    zIndex: 2,
                    padding: '15px',
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 800, textAlign: 'center', marginBottom: '15px' }}>
                    Choose A Service
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginBottom: '10px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#00aeef',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    DSTV
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginBottom: '10px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#ed1c24',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    GOTV
                  </div>
                  <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#222',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '10px',
                      }}
                    ></span>
                    SHOWMAX
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 style={{ color: '#000', fontWeight: 800, fontSize: '3rem', lineHeight: 1.1, marginBottom: '25px' }}>
                Find all popular internet and TV packages.
              </h2>
              <p style={{ color: '#333', fontSize: '1.2rem', marginBottom: '35px', lineHeight: 1.6 }}>
                Whether you have a favourite internet or TV subscription package, you'll find it on the Sendnaw app.
              </p>
              <a
                href="/signup.html"
                style={{
                  background: '#000',
                  color: '#fff',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  display: 'inline-block',
                }}
              >
                Open a Sendnaw Account <span style={{ marginLeft: '10px' }}>&rsaquo;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global money transfer banner */}
      <section style={{ padding: '40px 0', backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#0b0f1a',
              borderRadius: '30px',
              padding: '60px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.15,
                backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)',
                backgroundSize: '42px 42px',
              }}
            ></div>
            <div className="row align-items-center">
              <div className="col-lg-6" style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontWeight: 800, fontSize: '3.2rem', lineHeight: 1.1, marginBottom: '25px' }}>
                  Send money globally with <span style={{ color: '#ffc107' }}>Sendnaw</span>
                </h2>
                <p style={{ fontSize: '1.15rem', marginBottom: '35px', opacity: 0.85, maxWidth: '480px' }}>
                  Fast, secure, and seamless money transfers across borders. Pay bills, send funds, and manage your
                  finances — all in one app.
                </p>
                <div className="d-flex gap-3 mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    height="40"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Download on Google Play"
                    height="40"
                  />
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Secure Transactions • Encrypted • Trusted Globally</div>
              </div>
              <div className="col-lg-6 text-center mt-5 mt-lg-0" style={{ position: 'relative', height: '350px' }}>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-60px',
                    right: '12%',
                    width: '220px',
                    height: '400px',
                    background: '#ffffff',
                    borderRadius: '30px',
                    border: '6px solid #1c1c1c',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                    opacity: 0.9,
                  }}
                >
                  <div style={{ padding: '20px', color: '#000' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>
                      Transfer Successful
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, textAlign: 'center', color: '#00b37a' }}>
                      ₦50,000.00
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-100px',
                    left: '12%',
                    width: '220px',
                    height: '400px',
                    background: '#ffffff',
                    borderRadius: '30px',
                    border: '6px solid #1c1c1c',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.55)',
                    zIndex: 3,
                  }}
                >
                  <div style={{ padding: '20px', color: '#000' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, textAlign: 'center', marginBottom: '30px' }}>
                      Send Money
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, textAlign: 'center', color: '#0066ff' }}>
                      ₦8,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section style={{ padding: '60px 0', backgroundColor: '#f9f9f9', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: '2.8rem', marginBottom: '50px', color: '#0b0f1a' }}>
            Frequently Asked Questions
          </h2>
          <div className="accordion" id="sendnawFAQ">
            <div className="accordion-item" style={{ borderRadius: '15px', marginBottom: '15px' }}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  style={{ borderRadius: '15px', fontWeight: 600, color: '#0b0f1a' }}
                >
                  How do I pay my bills using Sendnaw?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#sendnawFAQ"
              >
                <div className="accordion-body" style={{ color: '#333', fontSize: '1rem' }}>
                  Open your Sendnaw app, select the "Pay Bills" option, choose your biller (electricity, water, cable,
                  etc.), enter your account details, and confirm payment. Your transaction is processed instantly and
                  securely.
                </div>
              </div>
            </div>
            <div className="accordion-item" style={{ borderRadius: '15px', marginBottom: '15px' }}>
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ borderRadius: '15px', fontWeight: 600, color: '#0b0f1a' }}
                >
                  Can I buy airtime for any network?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#sendnawFAQ">
                <div className="accordion-body" style={{ color: '#333', fontSize: '1rem' }}>
                  Yes! Sendnaw allows you to purchase airtime for all major Nigerian networks, including MTN, Glo,
                  Airtel, and 9mobile. Simply select "Buy Airtime", choose your network, enter the phone number and
                  amount, then confirm.
                </div>
              </div>
            </div>
            <div className="accordion-item" style={{ borderRadius: '15px', marginBottom: '15px' }}>
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  style={{ borderRadius: '15px', fontWeight: 600, color: '#0b0f1a' }}
                >
                  Are my transactions safe?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#sendnawFAQ">
                <div className="accordion-body" style={{ color: '#333', fontSize: '1rem' }}>
                  Absolutely! All Sendnaw transactions are encrypted with bank‑level security. Your account details
                  and payments are protected, ensuring safe and reliable transfers every time.
                </div>
              </div>
            </div>
            <div className="accordion-item" style={{ borderRadius: '15px', marginBottom: '15px' }}>
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  style={{ borderRadius: '15px', fontWeight: 600, color: '#0b0f1a' }}
                >
                  Is there a limit on bills or airtime purchases?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#sendnawFAQ">
                <div className="accordion-body" style={{ color: '#333', fontSize: '1rem' }}>
                  Yes, there are daily and monthly limits depending on your account verification level. Verified
                  accounts enjoy higher transaction limits. Check your limits in the "Account Settings" section of the
                  app.
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

export default BillsAirtime;