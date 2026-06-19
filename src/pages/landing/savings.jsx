import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const Savings = () => {
  const [showModule, setShowModule] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <>
      <Navbar />

      <header className="py-5 text-center position-relative overflow-hidden" style={{ paddingTop: '90px' }}>
        <div className="container py-5">
          <div className="d-inline-flex align-items-center rounded-pill px-3 py-1 mb-4 shadow-sm border bg-white">
            <span className="badge rounded-pill bg-primary me-2" style={{ backgroundColor: '#6f42c1 !important' }}>NEW</span>
            <small className="fw-bold text-muted">Earn up to 17.5% per annum</small>
          </div>
          <h1 className="display-2 fw-bolder mb-3" style={{ letterSpacing: '-3px', lineHeight: '1.05' }}>
            Small Goals. <br />
            <span style={{ background: 'linear-gradient(90deg, #6f42c1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Limitless Dreams.
            </span>
          </h1>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            Join over 2 million users building wealth through automated, high-yield savings.
            Secure, smart, and built for your lifestyle.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="btn btn-dark btn-lg rounded-4 px-4 py-2 shadow-lg d-flex align-items-center border-0">
              <i className="bi bi-apple fs-2 me-3"></i>
              <div className="text-start" style={{ lineHeight: '1.2' }}>
                <small className="d-block opacity-75" style={{ fontSize: '0.65rem' }}>Download on the</small>
                <span className="fw-bold" style={{ fontSize: '1.1rem' }}>App Store</span>
              </div>
            </a>
            <a href="#" className="btn btn-dark btn-lg rounded-4 px-4 py-2 shadow-lg d-flex align-items-center border-0">
              <i className="bi bi-google-play fs-2 me-3 text-warning"></i>
              <div className="text-start" style={{ lineHeight: '1.2' }}>
                <small className="d-block opacity-75" style={{ fontSize: '0.65rem' }}>Get it on</small>
                <span className="fw-bold" style={{ fontSize: '1.1rem' }}>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <section className="container py-5">
        <div className="row g-4">
          {[
            { bg: '#f4ebff', color: '#6f42c1', icon: 'bi-lightning-charge-fill', title: 'High Yield', text: 'Beating inflation is easier when you earn 17.5% annually. We pay interest daily, so your money works as hard as you do.' },
            { bg: '#e0f2fe', color: '#0ea5e9', icon: 'bi-shield-check', title: 'Fortified Security', text: 'Your savings are NDIC-insured and protected by AES-256 encryption. Your financial safety is our highest priority.' },
            { bg: '#ecfdf5', color: '#10b981', icon: 'bi-moon-stars-fill', title: 'Ethical Saving', text: 'Our Halal Savings plan offers a no-interest alternative that follows Islamic finance principles strictly.' }
          ].map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="p-5 bg-white border rounded-5 h-100 shadow-sm" style={{ borderColor: '#f2f4f7 !important' }}>
                <div className="mb-4 d-flex align-items-center justify-content-center rounded-4 shadow-sm"
                  style={{ width: '56px', height: '56px', background: card.bg, color: card.color }}>
                  <i className={`bi ${card.icon} fs-4`}></i>
                </div>
                <h4 className="fw-bold mb-3">{card.title}</h4>
                <p className="text-muted lh-lg">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="badge rounded-pill px-3 py-2 mb-3"
                style={{ background: '#f3e8ff', color: '#6f42c1', fontWeight: '600' }}>
                <i className="bi bi-calculator me-1"></i> EARNINGS CALCULATOR
              </div>
              <h2 className="display-5 fw-bolder mb-4" style={{ letterSpacing: '-1px' }}>
                Watch your money <span style={{ color: '#6f42c1' }}>multiply.</span>
              </h2>
              <p className="text-muted mb-4 lh-lg">
                Transparency is at our core. Use our projection tool to see how much your
                savings can grow over time with our 17.5% annual yield.
              </p>
              <button
                onClick={() => setShowModule(!showModule)}
                className="btn rounded-pill fw-bold py-3 px-4 shadow-sm w-100"
                style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
              >
                Explore All Savings Plans
              </button>

              {showModule && (
                <div className="mt-4 p-4 bg-white rounded-4 border shadow-sm">
                  {!selectedPlan ? (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Choose a Plan</h5>
                        <button onClick={() => setShowModule(false)} className="btn btn-sm btn-light">✕</button>
                      </div>
                      {['Flexible Savings', 'Fixed Deposit', 'Ajo contribution'].map((plan) => (
                        <button
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className="w-100 text-start p-3 border rounded-3 mb-2 bg-light d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <span className="d-block fw-bold">{plan}</span>
                            <span className="small text-muted">17.5% Annual Yield</span>
                          </div>
                          <i className="bi bi-chevron-right text-primary"></i>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="text-center">
                      <button onClick={() => setSelectedPlan(null)} className="btn btn-sm btn-light mb-3">
                        <i className="bi bi-arrow-left"></i> Change Plan
                      </button>
                      <h5 className="fw-bold">Get Started</h5>
                      <p className="small text-muted mb-4">
                        Sign in to start your <span style={{ color: '#6f42c1' }}>{selectedPlan}</span>
                      </p>
                      <Link to="/signin" className="btn w-100 rounded-pill fw-bold text-white mb-3"
                        style={{ backgroundColor: '#6f42c1' }}>
                        SIGN IN TO ACCESS
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="col-lg-7">
              <div className="p-5 rounded-5 shadow-lg border" style={{ background: '#101828', borderColor: '#1d2939 !important' }}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="text-secondary small fw-bold text-uppercase mb-2 d-block">Initial Deposit</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-transparent border-secondary text-white">₦</span>
                      <input type="text" className="form-control bg-transparent border-secondary text-white shadow-none"
                        placeholder="50,000" style={{ fontWeight: '700' }} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-secondary small fw-bold text-uppercase mb-2 d-block">Time Period</label>
                    <select className="form-select form-select-lg bg-transparent border-secondary text-white shadow-none"
                      style={{ fontWeight: '700' }}>
                      <option className="text-dark">12 Months</option>
                      <option className="text-dark">24 Months</option>
                      <option className="text-dark">5 Years</option>
                    </select>
                  </div>
                  <div className="col-12 mt-5">
                    <div className="p-4 rounded-4"
                      style={{ background: 'rgba(111,66,193,0.15)', border: '1px dashed rgba(168,85,247,0.4)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-secondary small d-block mb-1">Estimated Total Balance</span>
                          <h2 className="text-white fw-bolder mb-0">₦58,750.00</h2>
                        </div>
                        <span className="badge bg-success rounded-pill px-3 py-2">+ 17.5% APY</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-2">
                  <div className="progress" style={{ height: '6px', background: '#1d2939' }}>
                    <div className="progress-bar" style={{ width: '75%', background: '#6f42c1' }}></div>
                  </div>
                  <small className="text-secondary d-block mt-2 text-center">
                    Interest is calculated daily and paid into your wallet automatically.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h3 className="fw-bolder mb-5 text-center fs-2" style={{ letterSpacing: '-1px' }}>Common Questions</h3>
            <div className="accordion accordion-flush shadow-sm rounded-4 border overflow-hidden bg-white" id="faqAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold py-4 px-4 shadow-none"
                    type="button" data-bs-toggle="collapse" data-bs-target="#savFaq1">
                    Is my money really safe?
                  </button>
                </h2>
                <div id="savFaq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted px-4 pb-4">
                    Yes. SendNaw works with regulated Microfinance Banks licensed by the CBN.
                    All deposits are protected up to the NDIC maximum.
                  </div>
                </div>
              </div>
              <div className="accordion-item border-0 border-top">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold py-4 px-4 shadow-none"
                    type="button" data-bs-toggle="collapse" data-bs-target="#savFaq2">
                    What are the hidden fees?
                  </button>
                </h2>
                <div id="savFaq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-muted px-4 pb-4">
                    None. We believe in transparency. No maintenance fees, no SMS charges,
                    and no withdrawal penalties on flexible plans.
                  </div>
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

export default Savings