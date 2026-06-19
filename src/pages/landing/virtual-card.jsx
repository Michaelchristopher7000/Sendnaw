import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const VirtualCard = () => {
  const [processing, setProcessing] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <Navbar />

      <header className="py-5 overflow-hidden position-relative"
        style={{ background: 'linear-gradient(180deg, #fdfbff 0%, #f4f0ff 100%)', paddingTop: '90px' }}>
        <div className="container position-relative py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <span className="badge rounded-pill mb-3 px-3 py-2 text-primary shadow-sm"
                style={{ background: '#ffffff', fontWeight: '600' }}>
                <i className="bi bi-rocket-takeoff-fill text-danger"></i> NEW: PHYSICAL CARDS NOW AVAILABLE
              </span>
              <h1 className="display-3 fw-bolder mb-3" style={{ letterSpacing: '-2px', lineHeight: '1.1' }}>
                The Card Built for <br /><span style={{ color: '#6f42c1' }}>Your Freedom.</span>
              </h1>
              <p className="lead text-muted mb-5" style={{ maxWidth: '500px' }}>
                Pay online, withdraw cash, and manage your spending globally with the
                SendNaw Mastercard. Seamless, secure, and stylish.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                <a href="#request-form" className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-lg"
                  style={{ background: '#6f42c1', border: 'none' }}>
                  Get Yours Now
                </a>
                <a href="#" className="btn btn-outline-dark rounded-pill px-5 py-3 fw-bold">View Fees</a>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center py-5">
              <div className="shadow-lg rounded-4 p-4 text-white position-relative overflow-hidden"
                style={{ width: '380px', height: '230px', background: 'linear-gradient(135deg, #2D1B4E 0%, #101828 100%)', transform: 'rotate(-2deg)' }}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <span className="fw-bold small text-uppercase opacity-75" style={{ letterSpacing: '2px' }}>SendNaw Platinum</span>
                  <i className="bi bi-wifi fs-4 opacity-50" style={{ transform: 'rotate(90deg)' }}></i>
                </div>
                <div className="mb-4">
                  <div style={{ width: '48px', height: '36px', background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)', borderRadius: '6px' }}></div>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div>
                    <div className="small mb-1" style={{ letterSpacing: '2px', fontFamily: 'monospace' }}>**** **** **** 2025</div>
                    <div className="small text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', opacity: '0.9' }}>CHAMBERLAIN NWOKE</div>
                  </div>
                  <div className="d-flex">
                    <div className="rounded-circle" style={{ width: '30px', height: '30px', background: '#eb001b', marginRight: '-12px' }}></div>
                    <div className="rounded-circle" style={{ width: '30px', height: '30px', background: '#ff5f00', opacity: '0.85' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row g-4">
            {[
              { bg: '#f4ebff', color: '#6f42c1', icon: 'bi-lightning-fill', title: 'Instant Activation', text: 'Request a virtual card and start shopping online in under 60 seconds. No paperwork required.' },
              { bg: '#e0f2fe', color: '#0ea5e9', icon: 'bi-lock-fill', title: 'Dynamic Security', text: "Freeze your card instantly from the app if it's misplaced. Real-time alerts for every kobo spent." },
              { bg: '#ecfdf5', color: '#10b981', icon: 'bi-globe', title: 'Zero Global Markups', text: 'Spend anywhere in the world at the mid-market exchange rate. No hidden foreign transaction fees.' }
            ].map((card, index) => (
              <div className="col-md-4" key={index}>
                <div className="p-4 rounded-5 h-100" style={{ background: '#fcfcfd' }}>
                  <div className="mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '50px', height: '50px', background: card.bg, color: card.color }}>
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                  <h5 className="fw-bold">{card.title}</h5>
                  <p className="text-muted small lh-lg">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light position-relative" id="request-form">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 bg-white rounded-5 shadow-lg overflow-hidden">
              <div className="row">
                <div className="col-lg-6 p-5">
                  <h3 className="fw-bolder mb-2">Card Details</h3>
                  <p className="text-muted small mb-4">Complete your request and get your card delivered.</p>

                  {submitted ? (
                    <div className="alert alert-success rounded-4 py-4 text-center">
                      <i className="bi bi-check-circle-fill fs-1 text-success mb-3 d-block"></i>
                      <h5 className="fw-bold">Request Successful!</h5>
                      <p className="mb-0 small">Your SendNaw card is on the way.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">LEGAL FULL NAME</label>
                        <input type="text" className="form-control form-control-lg border-light bg-light rounded-3 shadow-none fw-bold"
                          placeholder="John Doe" style={{ fontSize: '0.9rem' }} required />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-bold text-muted">PHONE</label>
                          <input type="text" className="form-control form-control-lg border-light bg-light rounded-3 shadow-none"
                            placeholder="+234..." required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label small fw-bold text-muted">CARD TYPE</label>
                          <select className="form-select form-select-lg border-light bg-light rounded-3 shadow-none">
                            <option>Virtual</option>
                            <option>Physical</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted">DELIVERY ADDRESS (For Physical)</label>
                        <textarea className="form-control border-light bg-light rounded-3 shadow-none" rows="2"
                          placeholder="Where should we send it?"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-lg"
                        style={{ background: '#6f42c1', border: 'none', letterSpacing: '1px' }}
                        disabled={processing}>
                        {processing ? (
                          <><span className="spinner-border spinner-border-sm me-2"></span> PROCESSING...</>
                        ) : 'CONFIRM REQUEST'}
                      </button>
                    </form>
                  )}
                </div>

                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-center p-5"
                  style={{ background: 'linear-gradient(135deg, #6f42c1 0%, #3a1c71 100%)' }}>
                  <div>
                    <i className="bi bi-credit-card-2-front text-white opacity-25 display-1 mb-4"></i>
                    <h4 className="text-white fw-bold">Ready to use?</h4>
                    <p className="text-white opacity-75 small">
                      Your virtual card details will be available in the Cards tab immediately after submission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-center mb-4">Frequently Asked Questions</h3>
          <div className="accordion accordion-flush" id="cardFAQ">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#vcFaq1">
                  How long does delivery take for physical cards?
                </button>
              </h2>
              <div id="vcFaq1" className="accordion-collapse collapse" data-bs-parent="#cardFAQ">
                <div className="accordion-body text-muted small">
                  Physical cards are usually delivered within 5–7 business days depending on your location.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed fw-semibold" type="button"
                  data-bs-toggle="collapse" data-bs-target="#vcFaq2">
                  Is my card secure?
                </button>
              </h2>
              <div id="vcFaq2" className="accordion-collapse collapse" data-bs-parent="#cardFAQ">
                <div className="accordion-body text-muted small">
                  Yes, all card transactions are fully encrypted and monitored for fraud protection.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default VirtualCard