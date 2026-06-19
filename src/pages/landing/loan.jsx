// src/pages/landing/loans.jsx
import  { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Loans = () => {
  // Loan calculator state
  const [loanAmount, setLoanAmount] = useState(50000);
  const [duration, setDuration] = useState('15'); // days: '15' or '30'
  const [totalRepayment, setTotalRepayment] = useState(56000);

  const INTEREST_RATE = 0.12; // 12% for 15 days, but we'll adjust based on duration

  useEffect(() => {
    // Simple interest calculation: amount * rate
    // For demo: 12% for 15 days, 24% for 30 days (just example)
    const rate = duration === '15' ? 0.12 : 0.24;
    const interest = loanAmount * rate;
    setTotalRepayment(loanAmount + interest);
  }, [loanAmount, duration]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
  };

  const handleSliderChange = (e) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleDurationChange = (days) => {
    setDuration(days);
  };

  return (
    <>
      <style>
        {`
          :root {
            --primary: #6f42c1;
            --primary-dark: #6610f2;
            --accent: #00d4ff;
            --surface: #ffffff;
            --bg-gradient: linear-gradient(135deg, #fdfbfd 0%, #f4eff9 100%);
          }
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: var(--bg-gradient);
            color: #2d3748;
            overflow-x: hidden;
            padding-top: 90px;
          }
          .text-gradient {
            background: linear-gradient(90deg, var(--primary) 0%, #6610f2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .btn-primary-glow {
            background: var(--primary);
            color: white;
            border: none;
            box-shadow: 0 4px 15px rgba(106, 13, 173, 0.4);
            transition: all 0.3s ease;
          }
          .btn-primary-glow:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(106, 13, 173, 0.5);
            color: white;
          }
          .feature-card {
            background: white;
            border-radius: 20px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(106, 13, 173, 0.08);
            border-color: rgba(106, 13, 173, 0.1);
          }
          .hero-visual {
            position: relative;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .glass-card-3d {
            width: 320px;
            height: 200px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 24px;
            position: absolute;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
            z-index: 2;
            animation: float 6s ease-in-out infinite;
          }
          .purple-card-3d {
            width: 320px;
            height: 200px;
            background: linear-gradient(135deg, #6a0dad, #9d4edd);
            border-radius: 24px;
            position: absolute;
            transform: rotate(-10deg) translate(-30px, -30px);
            z-index: 1;
            box-shadow: 0 20px 40px rgba(106, 13, 173, 0.3);
          }
          .circle-deco {
            width: 150px;
            height: 150px;
            background: var(--accent);
            filter: blur(80px);
            opacity: 0.4;
            position: absolute;
            border-radius: 50%;
            z-index: 0;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .donut-chart {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient(var(--primary) 0% 85%, #e2e8f0 85% 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            position: relative;
          }
          .donut-hole {
            width: 90px;
            height: 90px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
          }
          input[type=range] { accent-color: var(--primary); height: 6px; }
          input[type=range]::-webkit-slider-thumb {
            width: 20px; height: 20px; background: var(--primary); border-radius: 50%; cursor: pointer;
          }
        `}
      </style>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-3 pb-5 mt-3 d-flex align-items-center" style={{ minHeight: '90vh' }}>
        <div className="container pt-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right" data-aos-duration="1000">
              <div className="d-inline-block px-3 py-1 rounded-pill bg-white border mb-3 shadow-sm">
                <small className="fw-bold text-primary"><i className="bi bi-rocket-takeoff" style={{ color: 'deeppink' }}></i> The #1 Digital Lender Concept</small>
              </div>
              <h1 className="display-3 fw-bold mb-3 lh-1">
                Money when it <br />
                <span className="text-gradient">matters most.</span>
              </h1>
              <p className="text-muted mb-5" style={{ maxWidth: '90%', fontFamily: 'poppins, sans-serif' }}>
                Instant credit sent directly to your bank account. No paperwork, no collateral, no awkward conversations.
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <a href="#calculatorCollapse" className="btn btn-primary-glow btn-lg rounded-pill px-5 d-flex align-items-center gap-3 border-2 border-transparent" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="calculatorCollapse">
                  <div className="text-start">
                    <span className="d-block lh-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8 }}>Apply Now</span>
                    <span className="fw-bold" style={{ fontSize: '1rem' }}>Get Started</span>
                  </div>
                </a>
                <button className="btn btn-outline-dark btn-lg rounded-pill px-4 border-2 d-flex align-items-center gap-2 hover-lift">
                  <i className="bi bi-google-play"></i>
                  <div className="text-start">
                    <span className="d-block lh-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Get it on</span>
                    <span className="fw-bold" style={{ fontSize: '1rem' }}>Google Play</span>
                  </div>
                </button>
              </div>
              <div className="mt-4 pt-3 d-flex align-items-center gap-3">
                <div className="d-flex">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-circle border border-white border-2" width="40" alt="" />
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" className="rounded-circle border border-white border-2 ms-n2" width="40" style={{ marginLeft: '-15px' }} alt="" />
                  <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-circle border border-white border-2 ms-n2" width="40" style={{ marginLeft: '-15px' }} alt="" />
                </div>
                <p className="mb-0 small text-muted">Trusted by <strong>50,000+</strong> Nigerians</p>
              </div>
            </div>
            <div className="col-lg-6 position-relative" data-aos="fade-left" data-aos-duration="1200">
              <div className="hero-visual">
                <div className="circle-deco" style={{ top: '20%', right: '20%' }}></div>
                <div className="purple-card-3d p-4 text-white">
                  <div className="d-flex justify-content-between opacity-50">
                    <i className="bi bi-wifi fs-4"></i>
                    <span>Credit</span>
                  </div>
                </div>
                <div className="glass-card-3d p-4 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5 text-primary">SendNaw</span>
                    <i className="bi bi-check-circle-fill text-success fs-4"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block">Available Balance</small>
                    <h2 className="fw-bold mb-0">₦500,000.00</h2>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <span className="badge bg-dark rounded-pill">Active</span>
                    <span className="badge bg-light text-dark border rounded-pill">Collateral-Free</span>
                  </div>
                </div>
                <div className="position-absolute bg-white px-3 py-2 rounded-3 shadow-lg d-flex align-items-center gap-2" style={{ bottom: '50px', left: '0px', animation: 'float 5s infinite ease-in-out 1s' }}>
                  <div className="bg-success bg-opacity-10 p-1 rounded-circle text-success">
                    <i className="bi bi-lightning-fill"></i>
                  </div>
                  <div>
                    <span className="d-block fw-bold small">Disbursed</span>
                    <small className="text-muted" style={{ fontSize: '10px' }}>Just now</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ background: '#ffffff', color: '#6a0dad', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1.5px', border: '1px solid rgba(106, 13, 173, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'inline-block' }}>
              TRUSTED BY INDUSTRY GIANTS
            </span>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            {[
              { name: 'PAYSTACK', desc: 'Payment Gateway', icon: 'bi-shield-lock-fill', bg: '#eef2ff', color: '#0d6efd' },
              { name: 'INTERSWITCH', desc: 'Switching Power', icon: 'bi-arrow-repeat', bg: '#ecfeff', color: '#0891b2' },
              { name: 'MASTERCARD', desc: 'Secure Issuing', icon: 'bi-credit-card-2-front-fill', bg: '#fff1f2', color: '#e11d48' },
              { name: 'NDIC', desc: 'Insured & Safe', icon: 'bi-bank2', bg: '#f0fdf4', color: '#16a34a' }
            ].map((partner, idx) => (
              <div className="col-6 col-lg-3" key={idx}>
                <div style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid #ffffff', padding: '1.25rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                  <div style={{ width: '44px', height: '44px', background: partner.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`bi ${partner.icon}`} style={{ color: partner.color, fontSize: '1.25rem' }}></i>
                  </div>
                  <div style={{ lineHeight: 1.2 }}>
                    <h6 style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>{partner.name}</h6>
                    <small style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{partner.desc}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculate Loan Section */}
      <section id="calculate" style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 style={{ fontWeight: 800, color: '#6f42c1', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '24px' }}>Try out our loan calculator.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>Set a loan amount and your preferred repayment time to see the estimated amount you'll repay monthly if you take a Sendnaw Loan.</p>
              <a href="#calculatorCollapse" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="calculatorCollapse" style={{ color: '#6f42c1', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                Calculate Loan <span style={{ marginLeft: '8px' }}>›</span>
              </a>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '450px', height: '450px', backgroundColor: '#f3f0ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                <div className="card border-0 shadow-sm" style={{ width: '85%', borderRadius: '24px', padding: '40px', background: '#fff', zIndex: 2, opacity: 0.9 }}>
                  <div className="text-center mb-4"><div style={{ height: '20px', width: '60%', background: '#f1f5f9', margin: '0 auto', borderRadius: '10px' }}></div></div>
                  <div style={{ height: '40px', background: '#f9fafb', borderRadius: '12px', marginBottom: '20px' }}></div>
                  <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '10px', marginBottom: '30px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', background: '#6f42c1', borderRadius: '50%' }}></div>
                  </div>
                  <div style={{ height: '40px', background: '#f9fafb', borderRadius: '12px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Collapse */}
      <div className="collapse" id="calculatorCollapse">
        <section id="calculator" className="py-5" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fafbff' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(111, 66, 193, 0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
          <div className="container py-lg-5">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(111, 66, 193, 0.1)', color: '#6f42c1', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  <i className="bi bi-calculator me-2"></i>Flexible Loans
                </div>
                <h2 className="fw-bold mb-4" style={{ fontSize: '2.8rem', color: '#1e293b', lineHeight: 1.2 }}>
                  Transparent Rates. <br /><span style={{ color: '#6f42c1' }}>No Hidden Fees.</span>
                </h2>
                <p className="mb-4" style={{ color: '#64748b', fontSize: '1.1rem' }}>Use our calculator to see exactly what you repay. We charge a flat interest rate—no surprises, ever.</p>
                <ul className="list-unstyled mb-5">
                  <li className="mb-3 d-flex align-items-center" style={{ fontWeight: 500, color: '#334155' }}>
                    <div style={{ width: '24px', height: '24px', background: '#6f42c1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                      <span style={{ color: 'white', fontSize: '0.8rem' }}>✓</span>
                    </div>
                    Early repayment discount
                  </li>
                  <li className="mb-3 d-flex align-items-center" style={{ fontWeight: 500, color: '#334155' }}>
                    <div style={{ width: '24px', height: '24px', background: '#6f42c1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                      <span style={{ color: 'white', fontSize: '0.8rem' }}>✓</span>
                    </div>
                    Instant disbursement
                  </li>
                </ul>
              </div>
              <div className="col-lg-7">
                <div style={{ background: '#ffffff', border: '1px solid rgba(111, 66, 193, 0.1)', borderRadius: '30px', boxShadow: '0 25px 50px -12px rgba(111, 66, 193, 0.15)', overflow: 'hidden' }}>
                  <div className="card-body p-4 p-md-5">
                    <div className="row align-items-center">
                      <div className="col-md-7 mb-4 mb-md-0">
                        <div className="d-flex justify-content-between align-items-end mb-3">
                          <label className="fw-bold" style={{ color: '#1e293b' }}>Loan Amount</label>
                          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6f42c1' }}>{formatCurrency(loanAmount)}</span>
                        </div>
                        <input type="range" className="form-range" min="10000" max="500000" step="5000" value={loanAmount} onChange={handleSliderChange} style={{ accentColor: '#6f42c1', height: '8px', borderRadius: '10px', marginBottom: '2rem' }} />
                        <label className="fw-bold mb-3 d-block" style={{ color: '#1e293b' }}>Select Duration</label>
                        <div className="d-flex gap-3 mb-4">
                          <button className={`btn ${duration === '15' ? 'active' : ''}`} style={{ flex: 1, background: duration === '15' ? '#6f42c1' : 'transparent', color: duration === '15' ? '#fff' : '#64748b', border: duration === '15' ? 'none' : '2px solid #e2e8f0', borderRadius: '15px', fontWeight: 700, padding: '12px' }} onClick={() => handleDurationChange('15')}>15 Days</button>
                          <button className={`btn ${duration === '30' ? 'active' : ''}`} style={{ flex: 1, background: duration === '30' ? '#6f42c1' : 'transparent', color: duration === '30' ? '#fff' : '#64748b', border: duration === '30' ? 'none' : '2px solid #e2e8f0', borderRadius: '15px', fontWeight: 700, padding: '12px' }} onClick={() => handleDurationChange('30')}>30 Days</button>
                        </div>
                        <div style={{ background: '#fdfbff', borderRadius: '15px', padding: '1.5rem', border: '1px dashed rgba(111, 66, 193, 0.3)' }}>
                          <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Interest Rate</span>
                            <span style={{ fontWeight: 700, color: '#1e293b' }}>{duration === '15' ? '12%' : '24%'}</span>
                          </div>
                          <div className="d-flex justify-content-between pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Total Repayment</span>
                            <span style={{ fontWeight: 800, color: '#6f42c1' }}>{formatCurrency(totalRepayment)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center" style={{ borderLeft: '1px solid #f1f5f9' }}>
                        <div style={{ position: 'relative', width: '140px', height: '140px', borderRadius: '50%', background: `conic-gradient(#6f42c1 ${(totalRepayment / (loanAmount + (loanAmount * 0.24))) * 100}%, #e2e8f0 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                          <div style={{ width: '110px', height: '110px', background: '#ffffff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <small style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700 }}>TOTAL</small>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{formatCurrency(totalRepayment).slice(0, -3)}k</span>
                          </div>
                        </div>
                        <button className="btn btn-lg w-100 rounded-pill" style={{ background: '#6f42c1', color: 'white', fontWeight: 700, padding: '12px' }}>Apply Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Borrow Section */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '450px', height: '450px', backgroundColor: '#e6f9f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                <div className="card border-0 shadow-lg" style={{ width: '85%', borderRadius: '24px', padding: '30px', background: '#fff', zIndex: 2 }}>
                  <div className="d-flex justify-content-between mb-4">
                    {[1,2,3].map(i => <div key={i} style={{ width: '35px', height: '35px', background: '#4ade80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>✓</div>)}
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    {[1,2,3].map(i => <div key={i} style={{ height: '25px', width: '28%', background: '#c1f2e0', border: '2px solid #ffffff', outline: '1px solid #c1f2e0', borderRadius: '20px' }}></div>)}
                  </div>
                  <div className="mt-2">
                    {['Principal', 'Interest', 'Monthly Interest Rate', 'Number of Repayments'].map((label, idx) => (
                      <div className="d-flex justify-content-between align-items-center mb-3" key={label}>
                        <small style={{ color: '#6c757d', fontWeight: 500 }}>{label}</small>
                        <div style={{ height: '12px', width: ['60px', '40px', '25px', '25px'][idx], background: '#d1d5db', borderRadius: '20px' }}></div>
                      </div>
                    ))}
                    <hr style={{ borderTop: '1px solid #eee', margin: '15px 0' }} />
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontWeight: 700, color: '#1f2937' }}>Total Due</span>
                      <div style={{ height: '12px', width: '35px', background: '#9ca3af', borderRadius: '20px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h2 style={{ fontWeight: 800, color: '#6f42c1', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '24px' }}>Borrow without paperwork or stories.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '400px' }}>Anyone can have an urgent money need. Get the amount you need quickly on the <strong>Sendnaw</strong> app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Statement Section */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 style={{ fontWeight: 800, color: '#6f42c1', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '24px' }}>Boost loan offers with an account statement.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>Want a better loan offer? Add your account statement to increase your chances of getting the amount you want.</p>
              <a href="/signup" style={{ color: '#6f42c1', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>Join Sendnaw <span style={{ marginLeft: '8px' }}>›</span></a>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '450px', height: '450px', backgroundColor: '#f3f0ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                <div className="card border-0 shadow-lg" style={{ width: '85%', borderRadius: '24px', padding: '40px', background: '#fff', zIndex: 2 }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#1f2937', marginBottom: '8px', display: 'block', fontWeight: 500 }}>Bank</label>
                    <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '12px', color: '#9ca3af', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Choose Bank <span><i className="bi bi-caret-down-fill"></i></span></div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.9rem', color: '#1f2937', marginBottom: '8px', display: 'block', fontWeight: 500 }}>Account Number</label>
                    <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '12px', color: '#d1d5db' }}>Account Number</div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '15%', right: '5%', zIndex: 3, background: '#fff', padding: '12px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '14px', height: '14px', background: '#9ca3af', borderRadius: '50%', marginBottom: '2px' }}></div>
                    <div style={{ width: '24px', height: '20px', background: '#4ade80', borderRadius: '10px 10px 0 0' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Offers Section */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '450px', height: '450px', backgroundColor: '#fff1f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                <div className="card border-0 shadow-lg text-center" style={{ width: '85%', borderRadius: '24px', padding: '40px', background: '#fff', zIndex: 2 }}>
                  <div style={{ width: '60px', height: '60px', background: '#00d1ff', borderRadius: '15px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}><i className="bi bi-activity"></i></div>
                  <h6 style={{ fontWeight: 700, color: '#1f2937', fontSize: '1.1rem' }}>Available Loan Offers</h6>
                  <div className="d-flex justify-content-center gap-2 my-4">
                    <span style={{ fontSize: '0.8rem', padding: '6px 16px', background: '#f3f0ff', color: '#6f42c1', borderRadius: '20px', fontWeight: 600 }}>1 month</span>
                    <span style={{ fontSize: '0.8rem', padding: '6px 16px', color: '#9ca3af', borderRadius: '20px' }}>2 months</span>
                    <span style={{ fontSize: '0.8rem', padding: '6px 16px', color: '#9ca3af', borderRadius: '20px' }}>3 months</span>
                  </div>
                  <div className="row g-3">
                    <div className="col-6"><div style={{ height: '45px', border: '2px solid #7dd3fc', background: '#e0f7ff', borderRadius: '25px' }}></div></div>
                    <div className="col-6"><div style={{ height: '45px', border: '1px solid #f3f4f6', borderRadius: '25px' }}></div></div>
                    <div className="col-6"><div style={{ height: '45px', border: '1px solid #f3f4f6', borderRadius: '25px' }}></div></div>
                    <div className="col-6"><div style={{ height: '45px', border: '1px solid #f3f4f6', borderRadius: '25px' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h2 style={{ fontWeight: 800, color: '#6f42c1', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '24px' }}>Repay your Sendnaw loan comfortably.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6 }}>Choose a monthly repayment option that's convenient for you on the app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Summary Section */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 style={{ fontWeight: 800, color: '#6f42c1', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '24px' }}>Get up to ₦150,000 in minutes.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6 }}>We'll let you choose how much you'd like to borrow after our quick loan approval process.</p>
            </div>
            <div className="col-lg-6 offset-lg-1 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '450px', height: '450px', backgroundColor: '#fffbeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
                <div className="card border-0 shadow-lg" style={{ width: '85%', borderRadius: '24px', padding: '40px', background: '#fff', zIndex: 2 }}>
                  <h6 style={{ fontWeight: 700, color: '#1f2937', marginBottom: '25px', fontSize: '1.1rem' }}>Loan Summary</h6>
                  {['Loan Amount', 'Interest'].map((label, idx) => (
                    <div className="d-flex justify-content-between mb-3" key={label}>
                      <small style={{ color: '#9ca3af', fontWeight: 500 }}>{label}</small>
                      <div style={{ height: '14px', width: idx === 0 ? '90px' : '60px', background: idx === 0 ? '#7dd3fc' : '#d1d5db', borderRadius: '20px' }}></div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mb-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
                    <small style={{ color: '#4b5563', fontWeight: 700 }}>Total Amount Due</small>
                    <div style={{ height: '14px', width: '100px', background: '#9ca3af', borderRadius: '20px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(111, 66, 193, 0.1)', color: '#6f42c1', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Support</div>
              <h2 style={{ fontWeight: 800, color: '#40196d', fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '20px' }}>Frequently Asked Questions</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Everything you need to know about Sendnaw loans, interest rates, and account security.</p>
            </div>
            <div className="col-lg-8">
              <div className="accordion accordion-flush" id="faqAccordion">
                {[
                  { q: 'How long does the loan approval take?', a: 'Our automated system processes applications instantly. Most Sendnaw users receive a decision within 3 minutes and disbursement follows immediately after approval.' },
                  { q: 'Do I need collateral to get a loan?', a: 'No, Sendnaw provides unsecured loans. You don\'t need collateral or guarantors. We use your digital footprint and account statement to determine your creditworthiness.' },
                  { q: 'How do I increase my loan limit?', a: 'The best way to increase your limit is to repay your current loans on time. Additionally, uploading a recent account statement helps us offer you higher amounts.' },
                  { q: 'Is my data safe with Sendnaw?', a: 'Yes. We use bank-grade 256-bit encryption to protect your data. We never share your personal information with third parties without your explicit consent.' }
                ].map((faq, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: '20px', marginBottom: '15px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${idx+1}`} style={{ padding: '25px', fontWeight: 700, color: '#1e293b', background: 'transparent', boxShadow: 'none' }}>{faq.q}</button>
                    </h2>
                    <div id={`faq${idx+1}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body" style={{ padding: '0 25px 25px', color: '#64748b', lineHeight: 1.6 }}>{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-8 text-center mt-5">
              <p style={{ color: '#64748b' }}>Still have questions? <a href="/contact" style={{ color: '#6f42c1', textDecoration: 'none', fontWeight: 700 }}>Chat with support</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Loans;