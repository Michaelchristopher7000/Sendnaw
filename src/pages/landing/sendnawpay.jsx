// SendnawPay.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const SendnawPay = () => {
  useEffect(() => {
    AOS.init({ delay: 900 });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="py-5 my-5" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2
                className="display-4 fw-bold mb-4"
                style={{ color: '#7c3aed', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Send money for free, every day.
              </h2>
              <p
                className="text-dark mb-5"
                style={{ fontSize: '1.15rem', lineHeight: 1.3, fontFamily: "'Poppins', sans-serif" }}
              >
                Your Sendnaw account comes with 25 free transfers to other banks every month. That’s up to 15,000 naira saved on transfers every year.
              </p>
              <Link
                to="/signup"
                className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
                style={{ backgroundColor: '#7c3aed', borderRadius: '12px', fontSize: '1.1rem' }}
              >
                Join Sendnaw
              </Link>
            </div>

            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center position-relative">
              {/* Decorative circle */}
              <div
                className="position-absolute"
                style={{
                  width: '500px',
                  height: '500px',
                  backgroundColor: '#cfccdc',
                  borderRadius: '50%',
                  zIndex: 0,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-40%, -50%)',
                }}
              />

              {/* Balance Card */}
              <div
                className="card border-0 shadow position-absolute p-3"
                style={{
                  width: '200px',
                  borderRadius: '12px',
                  zIndex: 3,
                  left: '-30px',
                  top: '20%',
                  background: '#fff',
                }}
              >
                <p className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>Balance</p>
                <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem' }}>₦ 10,000,000.00</h5>
              </div>

              {/* Free Transfers Card */}
              <div
                className="card border-0 shadow position-absolute p-3 text-white d-flex flex-row justify-content-between align-items-center"
                style={{
                  width: '180px',
                  borderRadius: '12px',
                  zIndex: 3,
                  left: '-10px',
                  top: '45%',
                  background: '#2e1065',
                }}
              >
                <div>
                  <p className="mb-0" style={{ fontSize: '0.65rem', opacity: 0.8 }}>Free transfers</p>
                  <p className="mb-0" style={{ fontSize: '0.65rem', opacity: 0.8 }}>to other banks</p>
                </div>
                <h4 className="fw-bold mb-0">25</h4>
              </div>

              {/* Phone mockup */}
              <div
                className="card border-0 shadow-lg position-relative"
                style={{
                  width: '280px',
                  height: '500px',
                  borderRadius: '35px',
                  zIndex: 2,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '8px solid #1a1a1a',
                }}
              >
                <div className="p-3 text-center bg-white border-bottom">
                  <span className="fw-bold small">Send Money</span>
                </div>
                <div className="p-3">
                  <div className="bg-light rounded-2 p-2 mb-3 text-muted" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-search me-2"></i> Search for anything
                  </div>
                  <p className="fw-bold mb-2" style={{ fontSize: '0.7rem' }}>Beneficiaries</p>
                  <div className="d-flex gap-2 mb-4 overflow-hidden">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{ width: '35px', height: '35px', flexShrink: 0, fontSize: '0.7rem' }}
                    >F</div>
                    <div
                      className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                      style={{ width: '35px', height: '35px', flexShrink: 0, fontSize: '0.7rem' }}
                    >A</div>
                    <div
                      className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center"
                      style={{ width: '35px', height: '35px', flexShrink: 0, fontSize: '0.7rem' }}
                    >J</div>
                    <div
                      className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center"
                      style={{ width: '35px', height: '35px', flexShrink: 0, fontSize: '0.7rem' }}
                    >T</div>
                  </div>
                  <div className="p-2 border rounded-3 mb-2 d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-bank me-2 text-primary"></i>
                    <div>
                      <p className="mb-0 fw-bold">Send to Bank Account</p>
                      <p className="mb-0 text-muted" style={{ fontSize: '0.6rem' }}>Send to any local bank account</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Naira symbols */}
              <div
                className="position-absolute shadow-sm p-2 d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '35px',
                  background: '#10b981',
                  borderRadius: '8px',
                  bottom: '15%',
                  left: '10%',
                  zIndex: 4,
                  transform: 'rotate(-15deg)',
                }}
              >
                <span className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>₦</span>
              </div>
              <div
                className="position-absolute shadow-sm p-2 d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '35px',
                  background: '#10b981',
                  borderRadius: '8px',
                  top: '20%',
                  right: '5%',
                  zIndex: 4,
                  transform: 'rotate(20deg)',
                }}
              >
                <span className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>₦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { icon: 'bi-credit-card-2-front-fill', text: 'Withdraw cash for payments free of charge at over 3,000 ATMs.' },
              { icon: 'bi-send-fill', text: 'Get 25 free transfers on the first day of every month.' },
              { icon: 'bi-link-45deg', text: 'Send money free of charge without an account number.' },
            ].map((item, idx) => (
              <div className="col-md-4" data-aos="fade-up" key={idx}>
                <div
                  className="card border-0 h-100 shadow-sm p-4"
                  style={{ borderRadius: '20px', transition: 'transform 0.3s ease' }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-4"
                    style={{ width: '48px', height: '48px', backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                  >
                    <i className={`bi ${item.icon}`} style={{ color: '#7c3aed', fontSize: '1.2rem' }}></i>
                  </div>
                  <h5
                    className="fw-bold mb-0"
                    style={{ color: '#1a1a1a', lineHeight: 1.5, fontSize: '1.1rem' }}
                  >
                    {item.text}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Transfers Life Section */}
      <section className="py-5 my-5" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 d-flex justify-content-center position-relative mb-5 mb-lg-0">
              {/* Decorative circle */}
              <div
                className="position-absolute"
                style={{
                  width: '500px',
                  height: '500px',
                  backgroundColor: '#a0bad4',
                  borderRadius: '50%',
                  zIndex: 0,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              {/* Send Money mockup */}
              <div
                className="card border-0 shadow-lg position-relative"
                style={{ width: '340px', borderRadius: '20px', zIndex: 2, background: '#ffffff', padding: '25px' }}
              >
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-chevron-left fw-bold" style={{ fontSize: '1.2rem', color: '#1a1a1a' }}></i>
                  <span className="mx-auto fw-bold" style={{ fontSize: '1rem' }}>Send Money</span>
                  <button
                    className="btn btn-sm text-white px-3"
                    style={{ backgroundColor: '#2e1065', borderRadius: '8px', fontSize: '0.8rem' }}
                  >
                    Next
                  </button>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center p-2 mb-4 mx-auto"
                  style={{
                    background: '#fdfbff',
                    border: '1px solid #7c3aed',
                    borderRadius: '10px',
                    width: '90%',
                  }}
                >
                  <span style={{ fontSize: '0.65rem', color: '#7c3aed', fontWeight: 500 }}>
                    Free transfers to other banks
                  </span>
                  <span className="fw-bold" style={{ color: '#7c3aed', fontSize: '0.8rem' }}>25</span>
                </div>
                <p className="text-center text-muted mb-4" style={{ fontSize: '0.75rem' }}>
                  Account Balance: ₦200,000.45
                </p>
                <div className="mb-3">
                  <div className="d-flex align-items-center p-3 mb-3" style={{ background: '#f8f9fa', borderRadius: '12px' }}>
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                      style={{ width: '32px', height: '32px', fontSize: '0.7rem', color: 'white' }}
                    >
                      SN
                    </div>
                    <span className="fw-medium" style={{ fontSize: '0.9rem' }}>Sendnaw User</span>
                    <i className="bi bi-chevron-down ms-auto text-muted"></i>
                  </div>
                  <div
                    className="p-3 mb-3"
                    style={{ background: '#f8f9fa', borderRadius: '12px', color: '#1a1a1a', fontWeight: 500 }}
                  >
                    0001111234
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ background: '#f8f9fa', borderRadius: '12px' }}
                  >
                    <span className="fw-bold">₦50,000.00</span>
                    <span className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>NGN</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
              <h2
                className="display-5 fw-bold mb-4"
                style={{ color: '#7c3aed', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Free transfers will make your life easier.
              </h2>
              <p
                className="text-dark mb-0"
                style={{ fontSize: '1.15rem', lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}
              >
                We believe in moving money quickly and free of charge, so you can count on getting 25 free transfers to other banks every month forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Debit Card Section */}
      <section className="py-5 my-5" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
              <h2
                className="display-4 fw-bold mb-4"
                style={{ color: '#1a1a1a', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Sendnaw debit card = <br />
                <span style={{ color: '#7c3aed' }}>A simpler life</span>
              </h2>
              <p
                className="text-dark mb-0"
                style={{ fontSize: '1.15rem', lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}
              >
                You can't avoid spending. That's how you pay for your needs. Pick up your Sendnaw card or have us deliver it to your address and never pay a card maintenance fee.
              </p>
              <Link
                to="/virtual-card"
                className="text-decoration-none fw-bold d-inline-flex align-items-center transition-link mt-3"
                style={{ color: '#7c3aed', fontSize: '1.15rem' }}
              >
                Learn More About Virtual Cards
                <i className="bi bi-chevron-right ms-2" style={{ WebkitTextStroke: '1px' }}></i>
              </Link>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center position-relative">
              <div
                className="position-absolute"
                style={{
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: '#f0e68c',
                  zIndex: 0,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="position-relative shadow-lg"
                style={{
                  width: '260px',
                  height: '400px',
                  background: '#f3f0ff',
                  borderRadius: '20px',
                  zIndex: 1,
                  transform: 'rotate(-15deg) translateX(30px)',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                }}
              >
                <div className="p-4">
                  <span className="fw-bold" style={{ color: '#7c3aed', opacity: 0.5, fontSize: '0.8rem' }}>
                    SENDNAW VIRTUAL
                  </span>
                </div>
              </div>
              <div
                className="position-absolute shadow-lg"
                style={{
                  width: '260px',
                  height: '400px',
                  background: '#7c3aed',
                  borderRadius: '20px',
                  zIndex: 2,
                  top: 0,
                  transform: 'rotate(5deg) translateY(20px)',
                }}
              >
                <div className="p-4 h-100 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-start">
                    <h4 className="text-white fw-bold mb-0" style={{ letterSpacing: '1px' }}>sendnaw.</h4>
                    <i className="bi bi-wifi text-white fs-3" style={{ transform: 'rotate(90deg)' }}></i>
                  </div>
                  <div className="mt-auto">
                    <p className="text-white opacity-75 mb-0" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                      Debit
                    </p>
                  </div>
                </div>
                <div
                  className="w-100 position-absolute bottom-0"
                  style={{
                    height: '6px',
                    background: 'linear-gradient(90deg, #ff4d4d, #f9c80e, #3abff8)',
                    borderRadius: '0 0 20px 20px',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATM Withdrawal Section */}
      <section className="py-5 my-5" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 d-flex justify-content-center position-relative mb-5 mb-lg-0">
              <div
                className="position-absolute"
                style={{
                  width: '480px',
                  height: '480px',
                  backgroundColor: 'rgba(124, 58, 237, 0.08)',
                  borderRadius: '50%',
                  zIndex: 0,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="position-relative shadow-lg d-flex flex-column"
                style={{
                  width: '280px',
                  height: '440px',
                  background: '#f8f9fa',
                  borderRadius: '24px',
                  zIndex: 1,
                  border: '1px solid #e9ecef',
                }}
              >
                <div
                  className="m-3 bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-center flex-column"
                  style={{ height: '190px', border: '4px solid #dee2e6' }}
                >
                  <div
                    className="fw-bold text-muted mb-2"
                    style={{ fontSize: '1.8rem', letterSpacing: '6px', opacity: 0.4 }}
                  >
                    ₦₦₦
                  </div>
                  <div className="w-75 bg-light rounded-pill mb-1" style={{ height: '8px' }}></div>
                  <div className="w-50 bg-light rounded-pill" style={{ height: '8px' }}></div>
                </div>
                <div className="px-4 mt-3 row g-2">
                  {[...Array(4)].map((_, i) => (
                    <div className="col-6" key={i}>
                      <div className="bg-secondary rounded-1" style={{ height: '10px', opacity: 0.15 }}></div>
                    </div>
                  ))}
                </div>
                <div
                  className="mx-auto mt-auto mb-5 bg-dark rounded-pill"
                  style={{ width: '150px', height: '14px', opacity: 0.8 }}
                ></div>
              </div>
              <div
                className="position-absolute shadow-lg"
                style={{
                  width: '140px',
                  height: '200px',
                  background: '#7c3aed',
                  borderRadius: '12px',
                  zIndex: 3,
                  bottom: '8%',
                  left: '12%',
                  transform: 'rotate(-12deg)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div className="p-3 h-100 d-flex flex-column justify-content-between">
                  <span className="text-white fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                    sendnaw.
                  </span>
                  <div className="mt-auto">
                    <i
                      className="bi bi-wifi text-white"
                      style={{ transform: 'rotate(90deg)', display: 'block', fontSize: '1.1rem', opacity: 0.8 }}
                    ></i>
                    <div
                      className="w-100 mt-3"
                      style={{
                        height: '3px',
                        background: 'linear-gradient(90deg, #ff4d4d, #f9c80e, #3abff8)',
                        borderRadius: '10px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
              <h2
                className="display-5 fw-bold mb-4"
                style={{ color: '#1a1a1a', letterSpacing: '-1.5px', lineHeight: 1.1 }}
              >
                Need to pay with cash? <br />
                <span style={{ color: '#7c3aed' }}>Withdraw it for free.</span>
              </h2>
              <p
                className="text-dark mb-0"
                style={{ fontSize: '1.15rem', lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}
              >
                Transfers are best but if you need to pay with cash, you can withdraw free of charge with your Sendnaw Card at over 3,000 ATMs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Username Section */}
      <section style={{ padding: '80px 0', fontFamily: "'Poppins', sans-serif" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right">
              <h2 style={{ color: '#7c3aed', fontWeight: 800, fontSize: '3rem', lineHeight: 1.2, marginBottom: '24px' }}>
                Send money <br /> without an account <br /> number.
              </h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '450px', lineHeight: 1.6 }}>
                There's more than one way to send money for free. Create a Sendnaw Username for quick transfers to other Sendnaw Usernames.
              </p>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 mb-5 mb-lg-0 d-flex justify-content-center">
              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  background: '#eef2ff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    background: 'white',
                    width: '280px',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: '#fbbf24',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: '0 auto 20px',
                    }}
                  >
                    j
                  </div>
                  <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>
                    Share your new Username with your friends.
                  </p>
                  <div
                    style={{
                      background: '#f9fafb',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #f3f4f6',
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <small
                        style={{
                          display: 'block',
                          fontSize: '10px',
                          color: '#6b7280',
                          textTransform: 'uppercase',
                        }}
                      >
                        Your username
                      </small>
                      <span style={{ fontWeight: 'bold', color: '#1f2937' }}>@jane</span>
                    </div>
                    <span
                      style={{ color: '#10b981', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      COPY <i className="bi bi-copy"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pay ID Section */}
      <section style={{ padding: '80px 0', fontFamily: "'Poppins', sans-serif" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 d-flex justify-content-center">
              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  background: '#fdf2f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    background: 'white',
                    width: '280px',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: '#7c3aed',
                      borderRadius: '10px',
                      margin: '0 auto 15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    ****
                  </div>
                  <h5 style={{ fontWeight: 700, color: '#1f2937' }}>Your Pay ID is ready.</h5>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
                    It will expire in 10 minutes. Keep it safe till you've used it.
                  </p>
                  <div
                    style={{
                      background: '#f9fafb',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>123456</span>
                    <span
                      style={{ color: '#7c3aed', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      COPY
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5" data-aos="fade-left">
              <h2 style={{ color: '#7c3aed', fontWeight: 'bold', fontSize: '3rem', lineHeight: 1.2, marginBottom: '24px' }}>
                Pay online without <br /> a debit card.
              </h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '450px', lineHeight: 1.6 }}>
                Pay directly from your Sendnaw account on online stores with Pay ID, no card needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 0', fontFamily: "'Poppins', sans-serif" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ color: '#000', fontWeight: 800, fontSize: '2.5rem', marginBottom: '15px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Everything you need to know about SendnawPay.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="accordion accordion-flush"
                id="sendnawFAQ"
                style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(124, 58, 237, 0.05)' }}
              >
                {[
                  {
                    id: 'faq1',
                    question: 'What is a Sendnaw Username?',
                    answer:
                      'Your Sendnaw Username is a unique handle (like @jane) that allows you to receive money without sharing your private bank account details. It\'s faster, easier, and more secure for personal transfers.',
                  },
                  {
                    id: 'faq2',
                    question: 'How does the Pay ID work?',
                    answer:
                      'Pay ID generates a temporary 6-digit code that you can use at checkout on partner websites. It expires in 10 minutes, ensuring that your main account balance remains secure and you never have to type in card numbers.',
                  },
                  {
                    id: 'faq3',
                    question: 'Are there any fees for sending money?',
                    answer:
                      'Transfers between Sendnaw Usernames are completely free. For external bank transfers, we offer a set number of free monthly transfers, after which a minimal flat fee applies.',
                  },
                  {
                    id: 'faq4',
                    question: 'Is Sendnaw regulated?',
                    answer:
                      'Yes, we are fully licensed and regulated by the relevant financial authorities. Your deposits are insured, and we use bank-grade encryption to protect your data.',
                  },
                  {
                    id: 'faq5',
                    question: 'Can I use Sendnaw internationally?',
                    answer:
                      'Currently, Sendnaw focuses on seamless local transfers and online payments. We are working hard to bring international remittance features to your app very soon!',
                  },
                  {
                    id: 'faq6',
                    question: 'What should I do if I lose my phone?',
                    answer:
                      'You can immediately freeze your account by logging in through our web portal or by contacting our 24/7 support team from another device. Your money remains safe as every transaction requires biometric or PIN authorization.',
                  },
                ].map((faq, idx) => (
                  <div className="accordion-item" style={{ border: 'none', marginBottom: '10px', borderRadius: '12px' }} key={idx}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${idx !== 0 ? 'collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${faq.id}`}
                        style={{ fontWeight: 600, color: '#1f2937', padding: '20px', boxShadow: 'none' }}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={faq.id}
                      className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                      data-bs-parent="#sendnawFAQ"
                    >
                      <div className="accordion-body" style={{ color: '#4b5563', lineHeight: 1.6, padding: '0 20px 20px' }}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SendnawPay;