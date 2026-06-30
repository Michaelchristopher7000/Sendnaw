// src/pages/landing/multiCurrencyWallets.jsx
import  { useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const MultiCurrencyWallets = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 800, once: true, easing: 'ease-out' });
    }
  }, []);

  return (
    <>
      <style>
        {`
          :root {
            --indigo: #6610f2;
            --purple: #6f42c1;
            --accent-green: #00c853;
            --soft-bg: #f8fafc;
            --text-main: #1e293b;
          }
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: var(--text-main);
            overflow-x: hidden;
            padding-top: 90px;
          }
          .hero-section {
            background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
            position: relative;
            padding: 100px 0 120px;
            overflow: hidden;
          }
          .hero-blob {
            position: absolute;
            width: 400px;
            height: 400px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
          }
          .blob-1 { top: -100px; left: -100px; }
          .blob-2 { bottom: -100px; right: -100px; background: rgba(0, 200, 83, 0.15); }
          .glass-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 30px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          .wallet-item {
            transition: all 0.3s ease;
            cursor: pointer;
            border: 1px solid transparent;
          }
          .wallet-item:hover {
            transform: scale(1.02);
            background: #ffffff !important;
            border-color: var(--primary-purple);
          }
          .btn-custom-primary {
            background-color: var(--accent-green);
            color: white;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 700;
            border: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .btn-custom-primary:hover {
            background-color: #00a844;
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 200, 83, 0.3);
            color: white;
          }
          .feature-card {
            background: white;
            border-radius: 24px;
            padding: 40px;
            height: 100%;
            transition: all 0.4s ease;
            border: 1px solid #e2e8f0;
          }
          .feature-card:hover {
            border-color: var(--primary-purple);
            box-shadow: 0 20px 40px rgba(124, 58, 237, 0.08);
            transform: translateY(-10px);
          }
          .icon-box {
            width: 64px;
            height: 64px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            margin-bottom: 25px;
          }
          .step-item {
            position: relative;
            padding-left: 70px;
            margin-bottom: 50px;
          }
          .step-number {
            position: absolute;
            left: 0;
            top: 0;
            width: 48px;
            height: 48px;
            background: var(--purple);
            color: white;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
            z-index: 2;
          }
          .step-line::before {
            content: '';
            position: absolute;
            left: 23px;
            top: 48px;
            bottom: -50px;
            width: 2px;
            background: linear-gradient(to bottom, var(--purple), transparent);
            z-index: 1;
          }
          .conversion-preview {
            transform: rotate(-1deg);
            transition: transform 0.5s ease;
          }
          .conversion-preview:hover {
            transform: rotate(0deg);
          }
        `}
      </style>

      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start" data-aos="fade-up">
              <span className="badge bg-white bg-opacity-10 border border-light border-opacity-25 rounded-pill px-3 py-2 mb-4">
                <i className="bi bi-stars me-2"></i> Trusted by 50,000+ users worldwide
              </span>
              <h1 className="display-3 fw-bold mb-4 lh-1">
                One Wallet.<br />
                <span style={{ color: '#ffc107' }}>Infinite Possibilities.</span>
              </h1>
              <p className="lead mb-5 text-white-50 fs-4">
                Stop juggling banks. Hold, swap, and spend in USD, GBP, EUR, and NGN with the world's most versatile wallet.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <button className="btn-custom-primary">Open Your Wallet Now</button>
                <button className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold">View Rates</button>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1" data-aos="zoom-in" data-aos-delay="200">
              <div className="glass-card p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div>
                    <small className="text-white-50 text-uppercase fw-bold ls-1">Available Balance</small>
                    <h2 className="fw-bold mb-0 mt-1">$12,847.63</h2>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-4 p-3">
                    <i className="bi bi-graph-up-arrow text-white fs-4"></i>
                  </div>
                </div>
                <div className="wallet-item bg-white rounded-4 p-3 mb-3 d-flex justify-content-between align-items-center text-dark shadow-sm">
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-3">🇺🇸</div>
                    <div>
                      <div className="fw-bold">US Dollar</div>
                      <small className="text-muted">Primary Wallet</small>
                    </div>
                  </div>
                  <div className="fw-bold text-end">$8,200.00</div>
                </div>
                <div className="wallet-item bg-white bg-opacity-75 rounded-4 p-3 mb-4 d-flex justify-content-between align-items-center text-dark shadow-sm">
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-3">🇳🇬</div>
                    <div>
                      <div className="fw-bold">NGN Naira</div>
                      <small className="text-muted">Local Wallet</small>
                    </div>
                  </div>
                  <div className="fw-bold text-end">₦1,450,000</div>
                </div>
                <div className="bg-dark bg-opacity-50 rounded-4 p-3 border border-white border-opacity-10">
                  <div className="d-flex align-items-center gap-2">
                    <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                    <small className="fw-bold">Live: $1 = 1,520.45</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 my-5">
        <div className="container py-lg-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold display-5 mb-3">Built for Global Citizens</h2>
            <p className="text-muted mx-auto fs-5" style={{ maxWidth: 650 }}>A modern multi-currency wallet designed for borderless living, working, and payments.</p>
          </div>
          <div className="row g-4">
            {[
              { icon: 'bi-arrow-left-right', color: 'primary', title: 'Instant Currency Conversion', desc: 'Convert between supported currencies instantly at transparent, real-time exchange rates.' },
              { icon: 'bi-shield-lock', color: 'success', title: 'Bank-Grade Security', desc: 'Your funds are protected with encryption, multi-layer security, and segregated accounts.' },
              { icon: 'bi-globe', color: 'info', title: 'Multi-Currency Wallet', desc: 'Hold, receive, and manage multiple currencies from a single, unified wallet.' },
              { icon: 'bi-send', color: 'warning', title: 'International Transfers', desc: 'Send money locally or across borders with fast processing and clear pricing.' },
              { icon: 'bi-phone', color: 'secondary', title: 'Mobile-First Experience', desc: 'Designed for smartphones with a clean interface that works seamlessly on any device.' },
              { icon: 'bi-headset', color: 'dark', title: '24/7 Human Support', desc: 'Our global support team is always available to assist you whenever you need help.' }
            ].map((feat, idx) => (
              <div className="col-md-4" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="feature-card h-100">
                  <div className={`icon-box bg-${feat.color} bg-opacity-10 text-${feat.color}`}>
                    <i className={`bi ${feat.icon}`}></i>
                  </div>
                  <h4 className="fw-bold">{feat.title}</h4>
                  <p className="text-muted mb-0">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px', background: '#ffffff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 50px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>🇺🇸</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>US Dollar</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>United States</div>
                </div>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#000', marginBottom: '5px' }}>$2,847.63</div>
              <div style={{ color: '#64748b', fontSize: '16px' }}>≈ $2,847.63 USD</div>
              <div style={{ textAlign: 'right', marginTop: '20px', fontWeight: 600, color: '#cbd5e1' }}>USD</div>
            </div>
            <div style={{ flex: 1.5, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[
                { label: 'Supported Currencies', value: '50+', sub: 'Global currencies', bg: '#ecfdf5', icon: 'bi-globe', iconColor: '#10b981' },
                { label: 'Transfer Speed', value: 'Instant', sub: 'Real-time processing', bg: '#ecfdf5', icon: 'bi-clock', iconColor: '#10b981' },
                { label: 'Security Level', value: 'Bank-grade', sub: '256-bit encryption', bg: '#fffbeb', icon: 'bi-shield-check', iconColor: '#f59e0b' },
                { label: 'Global Coverage', value: '180+', sub: 'Countries supported', bg: '#f1f5f9', icon: 'bi-people', iconColor: '#64748b' }
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#f8fafc', borderRadius: '20px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '5px' }}>{stat.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b' }}>{stat.value}</div>
                    <div style={{ color: '#94a3b8', fontSize: '12px' }}>{stat.sub}</div>
                  </div>
                  <div style={{ background: stat.bg, color: stat.iconColor, padding: '10px', borderRadius: '12px' }}>
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="display-5 fw-bold mb-5">Seamless Onboarding</h2>
              <div className="step-list">
                <div className="step-item step-line">
                  <div className="step-number">1</div>
                  <h5 className="fw-bold">Quick Sign-up</h5>
                  <p className="text-white-50">Enter your basic details and get your account in under 60 seconds.</p>
                </div>
                <div className="step-item step-line">
                  <div className="step-number">2</div>
                  <h5 className="fw-bold">Verify & Secure</h5>
                  <p className="text-white-50">Upload your ID for a secure, AI-powered identity verification check.</p>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <h5 className="fw-bold">Go Global</h5>
                  <p className="text-white-50">Deposit funds and start making international payments immediately.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1" data-aos="fade-left">
              <div className="conversion-preview bg-white text-dark rounded-5 p-4 p-md-5 shadow-lg">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold m-0">Live Converter</h4>
                  <span className="badge bg-light text-dark border">Market Rate</span>
                </div>
                <div className="bg-light border rounded-4 p-4 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <input type="number" className="form-control border-0 bg-transparent fw-bold fs-2 p-0 shadow-none" value="1000" style={{ width: '60%' }} readOnly />
                    <div className="dropdown">
                      <button className="btn btn-white border rounded-pill dropdown-toggle fw-bold" type="button">USD 🇺🇸</button>
                    </div>
                  </div>
                </div>
                <div className="text-center my-n2 position-relative z-3">
                  <button className="btn btn-primary rounded-circle p-2 shadow" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-arrow-down-up"></i>
                  </button>
                </div>
                <div className="bg-light border rounded-4 p-4 mb-4 mt-n2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="mb-0 fw-bold text-success">920.50</h2>
                    <div className="dropdown">
                      <button className="btn btn-white border rounded-pill dropdown-toggle fw-bold" type="button">EUR 🇪🇺</button>
                    </div>
                  </div>
                </div>
                <a href="/signup" className="btn btn-dark w-100 py-3 fw-bold rounded-4 fs-5">Get Started Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MultiCurrencyWallets;