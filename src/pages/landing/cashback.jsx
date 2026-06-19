import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const Cashback = () => {
  const [showModule, setShowModule] = useState(false);
  const [view, setView] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    AOS.refresh();
  }, []);

  const showAccessOptions = (planName) => {
    setSelectedPlan(planName);
    setView('access');
  };

  const goBackToPlans = () => {
    setView('plans');
  };

  return (
    <div>
        <Navbar />
      {/* Hero section (unchanged) */}
      <section style={{ padding: '100px 0', fontFamily: 'Inter, sans-serif', overflow: 'hidden', marginTop: '-50px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div style={{ background: '#f5f3ff', color: '#7c3aed', padding: '6px 16px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, fontSize: '14px', marginBottom: '20px' }}>
                REWARDS FOR EVERYTHING
              </div>
              <h2 style={{ color: '#7c3aed', fontWeight: 800, fontSize: '3.2rem', lineHeight: 1.1, marginBottom: '24px' }}>
                Get paid to pay <br /> your bills and <br /> top up.
              </h2>
              <p style={{ color: '#4b5563', fontSize: '1.2rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '30px' }}>
                Why pay full price? Earn instant cashbacks every time you make <strong>Transfers</strong>, buy <strong>Airtime</strong>, pay for
                <strong>Electricity</strong>, renew <strong>Subscriptions</strong>, or buy <strong>Gift Cards</strong> on Sendnaw.
              </p>
              <ul className="list-unstyled mb-4" style={{ color: '#4b5563', fontWeight: 500 }}>
                <li className="mb-2"><span style={{ color: '#7c3aed', marginRight: '10px' }}>✓</span> Up to 5% back on Airtime & Data</li>
                <li className="mb-2"><span style={{ color: '#7c3aed', marginRight: '10px' }}>✓</span> Rewards on Cable TV & Utility Bills</li>
                <li className="mb-2"><span style={{ color: '#7c3aed', marginRight: '10px' }}>✓</span> Instant bonuses on Gift Card purchases</li>
              </ul>
              <div className="d-flex flex-wrap gap-3">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: '45px' }} /></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '45px' }} /></a>
              </div>
            </div>
            <div className="col-lg-6 position-relative d-flex justify-content-center">
              <div className="position-absolute" style={{ width: '500px', height: '500px', backgroundColor: '#cde6ffbd', borderRadius: '50%', zIndex: 0, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
              <div style={{ position: 'relative', zIndex: 1, width: '300px', background: 'white', border: '10px solid #1f2937', borderRadius: '40px', minHeight: '520px', boxShadow: '0 40px 80px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
                <div style={{ width: '130px', height: '25px', background: '#1f2937', margin: '0 auto', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}></div>
                <div style={{ padding: '20px' }}>
                  <h6 style={{ fontWeight: 800, color: '#1f2937', marginBottom: '20px', textAlign: 'left' }}>Recent Rewards</h6>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', padding: '12px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #f3f4f6' }}>
                    <div style={{ width: '40px', height: '40px', background: '#e0e7ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><i className="bi bi-phone-fill" style={{ color: '#1f2937' }}></i></div>
                    <div style={{ marginLeft: '12px', flexGrow: 1 }}><div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>MTN Airtime</div><div style={{ fontSize: '11px', color: '#6b7280' }}>Cashback Earned</div></div>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '14px' }}>+$0.50</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', padding: '12px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #f3f4f6' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><i className="bi bi-lightbulb-fill" style={{ color: '#f59e0b' }}></i></div>
                    <div style={{ marginLeft: '12px', flexGrow: 1 }}><div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>Electricity Bill</div><div style={{ fontSize: '11px', color: '#6b7280' }}>Cashback Earned</div></div>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '14px' }}>+$1.20</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', padding: '12px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #f3f4f6' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}><i className="bi bi-tv-fill" style={{ color: '#ef4444' }}></i></div>
                    <div style={{ marginLeft: '12px', flexGrow: 1 }}><div style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>Netflix Renew</div><div style={{ fontSize: '11px', color: '#6b7280' }}>Cashback Earned</div></div>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '14px' }}>+$2.00</div>
                  </div>
                  <div style={{ background: '#7c3aed', borderRadius: '15px', padding: '15px', marginTop: '20px', color: 'white', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', opacity: 0.9 }}>Total Cashback Wallet</div>
                    <div style={{ fontSize: '22px', fontWeight: 800 }}>$24.70</div>
                    <button style={{ background: 'white', color: '#7c3aed', border: 'none', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>Withdraw to Bank</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4"><div style={{ background: '#ffffffef', padding: '40px', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', height: '100%' }}><div style={{ width: '50px', height: '50px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><i className="bi bi-currency-exchange"></i></div><h4 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Increase your streams of income.</h4></div></div>
            <div className="col-md-4"><div style={{ background: '#ffffffef', padding: '40px', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', height: '100%' }}><div style={{ width: '50px', height: '50px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}><i className="bi bi-phone-fill"></i></div><h4 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Sell airtime to make more money.</h4></div></div>
            <div className="col-md-4"><div style={{ background: '#ffffffef', padding: '40px', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', height: '100%' }}><div style={{ width: '50px', height: '50px', background: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#10b981' }}><i className="bi bi-percent"></i></div><h4 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Earn 1.5% cashback instantly.</h4></div></div>
          </div>
        </div>
      </section>

      {/* ========== NEW: Savings Plan Picker Module ========== */}
      <section className="py-4">
        <div className="container text-center">
          <button
            onClick={() => setShowModule(true)}
            className="btn rounded-pill fw-bold py-3 px-4 shadow-sm"
            style={{ borderColor: '#6f42c1', color: '#6f42c1', backgroundColor: 'transparent', border: '2px solid #6f42c1', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#6f42c1'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6f42c1'; }}
          >
            Explore All Savings Plans
          </button>
        </div>

        {/* Modal-like module for savings plans */}
        {showModule && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModule(false)}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '30px', width: '90%', maxWidth: '500px', margin: 'auto', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowModule(false)} style={{ position: 'absolute', top: '15px', right: '20px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>

              {view === 'plans' ? (
                <div id="planSelectionView">
                  <h5 style={{ fontWeight: 800, marginBottom: '20px', color: '#101828' }}>Choose a Plan</h5>
                  <button
                    onClick={() => showAccessOptions('Flexible Savings')}
                    style={{ width: '100%', textAlign: 'left', padding: '15px', border: '1px solid #f2f4f7', background: '#fcfcfd', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <span style={{ display: 'block', fontWeight: 700, color: '#101828' }}>Flexible Savings</span>
                      <span style={{ fontSize: '0.8rem', color: '#667085' }}>17.5% Annual Yield</span>
                    </div>
                    <i className="bi bi-chevron-right" style={{ color: '#6f42c1' }}></i>
                  </button>
                  <button
                    onClick={() => showAccessOptions('Fixed Deposit')}
                    style={{ width: '100%', textAlign: 'left', padding: '15px', border: '1px solid #f2f4f7', background: '#fcfcfd', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <span style={{ display: 'block', fontWeight: 700, color: '#101828' }}>Fixed Deposit</span>
                      <span style={{ fontSize: '0.8rem', color: '#667085' }}>High-yield locked savings</span>
                    </div>
                    <i className="bi bi-chevron-right" style={{ color: '#6f42c1' }}></i>
                  </button>
                  <button
                    onClick={() => showAccessOptions('Ajo contribution')}
                    style={{ width: '100%', textAlign: 'left', padding: '15px', border: '1px solid #f2f4f7', background: '#fcfcfd', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <span style={{ display: 'block', fontWeight: 700, color: '#101828' }}>Ajo</span>
                      <span style={{ fontSize: '0.8rem', color: '#667085' }}>Group contribution</span>
                    </div>
                    <i className="bi bi-chevron-right" style={{ color: '#6f42c1' }}></i>
                  </button>
                </div>
              ) : (
                <div id="accessHubView" style={{ textAlign: 'center' }}>
                  <button onClick={goBackToPlans} style={{ border: 'none', background: 'none', color: '#667085', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '15px' }}>
                    <i className="bi bi-arrow-left"></i> Change Plan
                  </button>
                  <h5 style={{ fontWeight: 800, marginBottom: '10px' }}>Get Started</h5>
                  <p style={{ fontSize: '0.85rem', color: '#667085', marginBottom: '25px' }}>
                    Download or sign in to start your <span style={{ color: '#6f42c1', fontWeight: 600 }}>{selectedPlan}</span>.
                  </p>
                  <a href="./signin.html" style={{ display: 'block', background: '#6f42c1', color: 'white', textDecoration: 'none', padding: '14px', borderRadius: '50px', fontWeight: 700, marginBottom: '15px' }}>
                    SIGN IN TO ACCESS
                  </a>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="https://play.google.com" target="_blank" rel="noreferrer" style={{ flex: 1, border: '1px solid #d0d5dd', color: '#101828', textDecoration: 'none', padding: '10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>PlayStore</a>
                    <a href="https://apple.com" target="_blank" rel="noreferrer" style={{ flex: 1, border: '1px solid #d0d5dd', color: '#101828', textDecoration: 'none', padding: '10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>AppStore</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Bills & Airtime reward section */}
      <section style={{ padding: '100px 0', fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div style={{ backgroundColor: '#fff0c0fd', borderRadius: '24px', padding: '60px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '50px', marginBottom: '-20px', animation: 'bounce 2s infinite' }}><i className="bi bi-coin" style={{ color: '#D4AF37' }}></i></div>
                  <div style={{ width: '220px', height: '140px', background: '#1f2937', borderRadius: '15px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', borderBottom: '5px solid #000' }}>
                    <div style={{ position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '40px', background: '#9ca3af', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '20px', height: '20px', background: '#fbbf24', borderRadius: '50%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <div style={{ background: '#ffffffe1', color: '#fbbf24', padding: '6px 16px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, fontSize: '13px', marginBottom: '20px' }}>Rewards for Bills & Airtime</div>
              <h2 style={{ color: '#1f2937', fontWeight: 800, fontSize: '3rem', lineHeight: 1.1, marginBottom: '24px' }}>Increase your <br /> <span style={{ color: '#7c3aed' }}>streams of income</span>.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.2rem', maxWidth: '480px', lineHeight: 1.6, marginBottom: '35px' }}>Make money from cashbacks on every airtime and bill payment you make with your Sendnaw account.</p>
              <a href="/signup.html" style={{ backgroundColor: '#000000', color: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Join Sendnaw Cashbacks <span style={{ marginLeft: '12px', fontSize: '1.2rem' }}>&rsaquo;</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* Transfers reward section */}
      <section style={{ padding: '80px 0', fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-lg-1">
              <div style={{ background: '#ffffffe1', color: '#416328ce', padding: '6px 16px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, fontSize: '13px', marginBottom: '20px' }}>Rewards for Transfers</div>
              <h2 style={{ color: '#7c3aed', fontWeight: 800, fontSize: '3rem', lineHeight: 1.2, marginBottom: '24px' }}>Get rewarded for <br /> <span style={{ color: '#000' }}>every transfer </span><br /> <span style={{ color: '#000' }}>you make.</span></h2>
              <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '450px', lineHeight: 1.6 }}>Sending money shouldn't just be a cost. With Sendnaw, you earn instant cashbacks on every local transfer, making every transaction more rewarding.</p>
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '40px', height: '40px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-coin" style={{ color: '#D4AF37', fontSize: '20px' }}></i></div><span style={{ fontWeight: 600, color: '#1f2937' }}>Earn 1.5% back on all transfers instantly.</span></div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 mb-5 mb-lg-0 d-flex justify-content-center">
              <div style={{ position: 'relative', width: '400px', height: '400px', background: '#41632897', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', width: '300px', padding: '30px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px', background: '#7c3aed', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold', margin: '0 auto 20px' }}>S<div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#10b981', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '20px', border: '2px solid white' }}>+Cashback</div></div>
                  <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>Transfer to Jane successful!</p>
                  <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '8px', border: '1px dashed #10b981' }}><div style={{ textAlign: 'center' }}><small style={{ display: 'block', fontSize: '11px', color: '#065f46', textTransform: 'uppercase', fontWeight: 700 }}>Reward Earned</small><span style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>₦150.00</span></div></div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '15px' }}>Added to your Cashback Wallet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift cards reward section */}
      <section style={{ padding: '100px 0', fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 position-relative d-flex justify-content-center">
              <div style={{ position: 'absolute', width: '450px', height: '450px', background: '#dbd4ff', borderRadius: '50%', zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1, width: '290px', background: 'white', border: '10px solid #1f2937', borderRadius: '40px 40px 0px 0px', borderBottom: 'none', minHeight: '470px', boxShadow: '0 40px 80px rgba(124, 58, 237, 0.15)', overflow: 'hidden' }}>
                <div style={{ width: '120px', height: '25px', background: '#1f2937', margin: '0 auto', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}></div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 800, fontSize: '14px', marginTop: '10px' }}>Gift Cards & Vouchers</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
                    <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '12px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '85px', height: '85px' }}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" alt="Steam" style={{ height: '30px', width: 'auto', marginBottom: '8px', opacity: 0.9 }} /><div style={{ fontSize: '9px', color: '#10b981', fontWeight: 800, letterSpacing: '0.5px' }}>2.5% BACK</div></div>
                    <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '12px', border: '1px solid #eee' }}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ height: '12px', opacity: 0.7, margin: '4px 0' }} /><div style={{ fontSize: '8px', color: '#10b981', fontWeight: 800, marginTop: '5px' }}>1.5% BACK</div></div>
                    <div style={{ background: '#f9fafb', padding: '10px', borderRadius: '12px', border: '1px solid #eee' }}><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" style={{ height: '10px', opacity: 0.7, margin: '5px 0' }} /><div style={{ fontSize: '8px', color: '#10b981', fontWeight: 800, marginTop: '5px' }}>3% BACK</div></div>
                  </div>
                  <div style={{ background: '#1f2937', color: 'white', borderRadius: '15px', padding: '15px', marginTop: '25px', textAlign: 'left' }}><div style={{ fontSize: '10px', opacity: 0.8 }}>Sell Gift Cards</div><div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>Get instant Naira for your unused cards</div><div style={{ background: '#7c3aed', width: '100%', height: '4px', borderRadius: '2px', marginTop: '10px' }}></div></div>
                  <div style={{ marginTop: '25px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}><div style={{ width: '30px', height: '30px', background: '#7c3aed', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px' }}>S</div><div style={{ marginLeft: '10px', textAlign: 'left' }}><div style={{ fontSize: '10px', fontWeight: 800 }}>Gift Card Sale Reward</div><div style={{ fontSize: '9px', color: '#10b981', fontWeight: 700 }}>+₦1,200.00 Cashback</div></div></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div style={{ background: '#ffffffe1', color: '#fa0f0fce', padding: '6px 16px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, fontSize: '13px', marginBottom: '20px' }}>Rewards for Gift Cards</div>
              <h2 style={{ color: '#1f2937', fontWeight: 800, fontSize: '3.2rem', lineHeight: 1.1, marginBottom: '24px' }}><span style={{ color: '#7c3aed' }}>Buy or sell gift</span> <br /> cards and earn <br /> instant rewards.</h2>
              <p style={{ color: '#4b5563', fontSize: '1.2rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '30px' }}>Whether you are shopping for yourself on <strong>Amazon</strong> and <strong>Apple</strong>, or selling unused cards for cash, Sendnaw gives you a percentage back on every transaction.</p>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill" style={{ color: '#7c3aed', marginRight: '10px' }}></i><span style={{ fontWeight: 600, color: '#1f2937' }}>Cashback on 100+ Global Brands</span></div>
                <div className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill" style={{ color: '#7c3aed', marginRight: '10px' }}></i><span style={{ fontWeight: 600, color: '#1f2937' }}>Highest rates for selling your gift cards</span></div>
                <div className="d-flex align-items-center"><i className="bi bi-coin" style={{ color: '#D4AF37', marginRight: '10px' }}></i><span style={{ fontWeight: 600, color: '#1f2937' }}>Instant ₦ credit to your rewards wallet</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section (unchanged) */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa', fontFamily: 'Segoe UI, Roboto, Arial, sans-serif' }}>
        <div className="container py-5">
          <div className="text-center mb-5"><h2 className="display-5 fw-bold" style={{ color: '#1f2937' }}>Frequently Asked Questions</h2><p className="lead text-muted">Everything you need to know about Sendnaw Cashbacks and services.</p></div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion accordion-flush bg-white shadow-sm p-3" id="mainFaq" style={{ borderRadius: '20px' }}>
                <div className="accordion-item border-0"><h2 className="accordion-header"><button className="accordion-button fw-bold py-4 bg-transparent text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faqTransfers" style={{ boxShadow: 'none' }}>How do I earn cashback on money transfers?</button></h2><div id="faqTransfers" className="accordion-collapse collapse show" data-bs-parent="#mainFaq"><div className="accordion-body text-secondary pt-0">Every time you send money to a bank account using Sendnaw, you automatically receive a 1.5% cashback. The reward is credited immediately to your reward wallet once the transaction is confirmed.</div></div></div>
                <div className="accordion-item border-0 border-top"><h2 className="accordion-header"><button className="accordion-button collapsed fw-bold py-4 bg-transparent text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faqGiftCards" style={{ boxShadow: 'none' }}>Can I get cashback when buying gift cards?</button></h2><div id="faqGiftCards" className="accordion-collapse collapse" data-bs-parent="#mainFaq"><div className="accordion-body text-secondary pt-0">Yes! Whether you are buying Apple, Steam, or Amazon gift cards, Sendnaw offers instant rewards on every purchase. The cashback percentage varies depending on the specific brand.</div></div></div>
                <div className="accordion-item border-0 border-top"><h2 className="accordion-header"><button className="accordion-button collapsed fw-bold py-4 bg-transparent text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faqBills" style={{ boxShadow: 'none' }}>Are bill payments eligible for rewards?</button></h2><div id="faqBills" className="accordion-collapse collapse" data-bs-parent="#mainFaq"><div className="accordion-body text-secondary pt-0">Absolutely. Paying for electricity, cable TV, or data subscriptions on Sendnaw earns you cashback. It’s our way of making your essential monthly expenses more affordable.</div></div></div>
                <div className="accordion-item border-0 border-top"><h2 className="accordion-header"><button className="accordion-button collapsed fw-bold py-4 bg-transparent text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faqWithdraw" style={{ boxShadow: 'none' }}>How do I use my earned cashback?</button></h2><div id="faqWithdraw" className="accordion-collapse collapse" data-bs-parent="#mainFaq"><div className="accordion-body text-secondary pt-0">Your earnings accumulate in your Cashback Wallet. You can use these funds to pay for other services within the app or transfer them directly to your main wallet to withdraw as cash to your bank account.</div></div></div>
                <div className="accordion-item border-0 border-top"><h2 className="accordion-header"><button className="accordion-button collapsed fw-bold py-4 bg-transparent text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#faqSecurity" style={{ boxShadow: 'none' }}>Is Sendnaw safe for my transactions?</button></h2><div id="faqSecurity" className="accordion-collapse collapse" data-bs-parent="#mainFaq"><div className="accordion-body text-secondary pt-0">Sendnaw uses bank-grade encryption and multi-factor authentication to secure your funds. We are fully compliant with financial regulations to ensure every transfer and payment is safe and protected.</div></div></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5"><p className="text-muted">Still have questions?</p><a href="mailto:support@sendnaw.com" className="fw-bold text-decoration-none" style={{ color: '#7c3aed' }}>Contact Support</a></div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cashback;