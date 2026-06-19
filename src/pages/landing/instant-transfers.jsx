import React, { useEffect } from 'react';
import AOS from 'aos';
import Navbar  from '../../components/navbar';
import Footer from '../../components/footer';
const InstantTransfers = () => {
  useEffect(() => {
    AOS.refresh(); // ensure animations recalculate after mount
  }, []);

  return (
    <main>
      <Navbar />
      <div data-aos="fade-down" data-aos-duration="1000">
        {/* Hero section */}
        <section
          className="sn-hero-wrapper position-relative overflow-hidden py-5 pt-5 mt-4"
          style={{
            background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #6d28d9 50%, #5b21b6 75%, #4c1d95 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span
                  className="badge mb-3 px-3 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontWeight: 500,
                    letterSpacing: '1px',
                  }}
                >
                  GLOBAL REMITTANCE REVOLUTION
                </span>
                <h1 className="display-3 fw-bolder mb-4 text-white" style={{ lineHeight: 1.1 }}>
                  Secure money transfers to Africa,{' '}
                  <span style={{ color: 'var(--warning)' }}>Simplified.</span>
                </h1>
                <p className="lead mb-5 text-white" style={{ fontSize: '1.25rem' }}>
                  Send money to over 20 African countries instantly at zero cost. Join thousands
                  of users building financial credibility with every transaction.
                </p>

                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <div
                    className="p-3 bg-white rounded-4 shadow-lg d-flex align-items-center gap-3"
                    style={{ width: 'fit-content' }}
                  >
                    <img
                      src="/images/sendnawqr code.png"
                      alt="QR"
                      style={{ width: '80px' }}
                      className="img-fluid"
                    />
                    <div className="text-dark">
                      <p className="mb-1 fw-bold small">Scan to download</p>
                      <div className="d-flex gap-2">
                        <i className="bi bi-apple fs-4"></i>
                        <i className="bi bi-google-play fs-4"></i>
                      </div>
                    </div>
                  </div>
                  <div className="ps-lg-4 border-start border-white border-opacity-25 d-none d-md-block text-white">
                    <h4 className="mb-0 fw-bold">50k+</h4>
                    <p className="small opacity-75 mb-0">Active Users</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 text-center position-relative">
                <div
                  className="position-absolute top-0 start-0 translate-middle p-3 bg-white rounded-4 shadow d-none d-xl-block"
                  style={{ zIndex: 2, color: '#1a1919' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                    <span className="fw-bold small">Transaction Successful</span>
                  </div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/6928a1cb1d92a42e4cad7373_hero%20Image.png"
                  className="img-fluid rounded-5 shadow-2-strong"
                  alt="SendNaw App"
                  style={{ maxHeight: '600px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Send money section */}
        <section className="py-5" style={{ backgroundColor: '#f8fafc' }} data-aos="zoom-in-up" data-aos-duration="1000">
          <div className="container py-5">
            <div className="row mb-5">
              <div className="col-lg-6">
                <h2 className="display-5 fw-bold text-dark">
                  Send money however <br />
                  <span style={{ color: '#6d28d9' }}>you want it.</span>
                </h2>
              </div>
              <div className="col-lg-6 d-flex align-items-end">
                <p className="text-muted">
                  Choose from multiple payout methods designed for the African market. Fast,
                  reliable, and always secure.
                </p>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className="p-5 h-100 rounded-5 transition-up shadow-sm border-0"
                  style={{ background: '#1a1919', color: 'white' }}
                >
                  <span className="display-6 mb-4 d-block" style={{ color: '#10b981' }}>
                    <i className="bi bi-hash"></i>
                  </span>
                  <h3 className="fw-bold mb-3">SendNaw Tag</h3>
                  <p className="opacity-75 mb-4">
                    Instantly pay friends and family using your unique @SendNaw tag. Zero fees, zero delays.
                  </p>
                  <img
                    src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/6686b2968f6881908d35e668_Frame%20427321024.svg"
                    className="img-fluid mt-3"
                    alt="Tag UI"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-5 h-100 rounded-5 shadow-sm border bg-white">
                  <span className="display-6 mb-4 d-block" style={{ color: '#6d28d9' }}>
                    <i className="bi bi-phone"></i>
                  </span>
                  <h3 className="fw-bold mb-3">Mobile Money</h3>
                  <p className="text-muted mb-4">
                    Direct transfers to mobile wallets across the continent. M-Pesa, MTN MoMo, and more.
                  </p>
                  <img
                    src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/6686b31118cec2e458bfaf7e_Clip%20path%20group%20(3).svg"
                    className="img-fluid mt-3"
                    alt="Mobile UI"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="p-5 h-100 rounded-5 shadow-sm border-0"
                  style={{ background: '#34044f', color: 'white' }}
                >
                  <span className="display-6 mb-4 d-block" style={{ color: '#10b981' }}>
                    <i className="bi bi-bank"></i>
                  </span>
                  <h3 className="fw-bold mb-3">Bank Transfers</h3>
                  <p className="opacity-75 mb-4">
                    Traditional bank deposits to 20+ African countries with the best market exchange rates.
                  </p>
                  <img
                    src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/6686b31064e4a4d49a9610fb_Clip%20path%20group%20(4).svg"
                    className="img-fluid mt-3"
                    alt="Bank UI"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why SendNaw section */}
        <section className="py-5" style={{ backgroundColor: '#f8f9fa' }} data-aos="zoom-in-up" data-aos-duration="1000">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="h-100 p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '180px',
                      backgroundColor: '#fef3c7',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/6687660ce222af6228f3c967_Layer_28.svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Create an account - free</h5>
                  <p className="text-muted small">Register now and unlock smarter financial access.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="h-100 p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '180px',
                      backgroundColor: '#ede9fe',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66875b4240f70dad440c8579_Layer_26.svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Multi-currency wallets</h5>
                  <p className="text-muted small">Send, hold and receive money from anyone, anywhere anytime.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="h-100 p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '120px',
                      backgroundColor: '#f3f4f6',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66875b4197bb2941720d4412_Layer_22.svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Less fees</h5>
                  <p className="text-muted small">Send money to other users without worrying about hidden fees.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '180px',
                      backgroundColor: '#fff7ed',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66875b4221aa7598bd7bdfce_Layer_25.svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Best rate</h5>
                  <p className="text-muted small">We offer competitive exchange rates so you always get value.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '180px',
                      backgroundColor: '#fdf2f8',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66875cc42e26307e4568aa93_Layer_23.svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Secure transactions</h5>
                  <p className="text-muted small">We use top-grade security to protect your account and data.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="p-4 rounded-4 shadow-sm bg-white border-0 text-center">
                  <div
                    className="mb-3 rounded-4"
                    style={{
                      height: '120px',
                      backgroundColor: '#ecfdf5',
                      backgroundImage:
                        "url('https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66875ce8dab7c465cfdb5b39_Layer_24%20(1).svg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                  <h5 className="fw-bold">Timely Notifications</h5>
                  <p className="text-muted small">Instant notifications to keep you in the loop on all transfers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security section */}
        <section className="py-5" style={{ backgroundColor: '#2d0a4e', color: 'white' }} data-aos-duration="1000">
          <div className="container py-5">
            <div className="mb-5">
              <h2 className="display-5 fw-bold mb-3">We take your security seriously</h2>
              <p className="opacity-75">
                Leveraging technology to keep you safe. We are committed to your account protection.
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 h-100"
                  style={{ backgroundColor: '#401469', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px', backgroundColor: '#fbbf24' }}>
                    <img
                      src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66851f704ce4f83a293bd196_Layer_10.svg"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      alt="Security"
                    />
                  </div>
                  <h5 className="fw-bold">World class security</h5>
                  <p className="small opacity-75">
                    Stay connected with your loved ones through fast transfers in over 15 currencies.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 h-100"
                  style={{ backgroundColor: '#401469', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px', backgroundColor: '#f59e0b' }}>
                    <img
                      src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66851f6fcfe374a45402bc36_Layer_12.svg"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      alt="Support"
                    />
                  </div>
                  <h5 className="fw-bold">Dedicated support</h5>
                  <p className="small opacity-75">
                    Round the clock support is available to answer your questions whenever you need it.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 h-100"
                  style={{ backgroundColor: '#401469', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="mb-4 rounded-4 overflow-hidden" style={{ height: '250px', backgroundColor: '#fcd34d' }}>
                    <img
                      src="https://cdn.prod.website-files.com/6591aa504d6df02a5fe93341/66851f6f6225e9a7f7b7829e_Layer_11.svg"
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      alt="Alerts"
                    />
                  </div>
                  <h5 className="fw-bold">Timely notifications</h5>
                  <p className="small opacity-75">
                    Whether you are logging in or making transfers, we will always notify you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <section className="py-5" style={{ backgroundColor: '#1a1919', color: 'white' }}>
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-5 mb-5 mb-lg-0">
                <h2 className="display-5 fw-bold mb-4">
                  Our users love <br />
                  <span style={{ color: '#10b981' }}>the SendNaw way.</span>
                </h2>
                <div className="d-flex gap-4">
                  <div>
                    <h3 className="fw-bold mb-0">4.8/5</h3>
                    <p className="small opacity-50">App Store</p>
                  </div>
                  <div className="border-start border-secondary ps-4">
                    <h3 className="fw-bold mb-0">4.9/5</h3>
                    <p className="small opacity-50">Play Store</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div
                  className="p-5 rounded-5"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <i className="bi bi-quote fs-1 text-success mb-3"></i>
                  <p className="fs-4 italic mb-4">
                    "SendNaw has completely changed how I send money to my family in Ghana. The rates
                    are unbeatable and the 'SendNaw Tag' makes it feel like sending a text message.
                    Truly impressive UI!"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-purple rounded-circle" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                      <img
                        src="/images/testi-money.jpeg"
                        alt="User"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Samson chukwuebuka</h6>
                      <p className="small opacity-50 mb-0">Verified User</p>
                      <div className="d-flex gap-1">
                        <i className="bi bi-star-fill" style={{ color: '#ffc107' }}></i>
                        <i className="bi bi-star-fill" style={{ color: '#ffc107' }}></i>
                        <i className="bi bi-star-fill" style={{ color: '#ffc107' }}></i>
                        <i className="bi bi-star-fill" style={{ color: '#ffc107' }}></i>
                        <i className="bi bi-star-fill" style={{ color: '#ffc107' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App display section */}
        <section className="py-5" data-aos="zoom-in-up" data-aos-duration="800">
          <div className="container">
            <div
              className="row rounded-4 overflow-hidden"
              style={{
                background:
                  "linear-gradient(rgba(75,0,130,0.85), rgba(75,0,130,0.85)), url('/images/sendnaw app img.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="col-lg-6 p-5 text-white">
                <h1 className="fw-bold display-5 mb-4">Build credit every time you send money abroad</h1>
                <div className="d-flex align-items-center gap-4 mt-4">
                  <div className="bg-white p-3 rounded-3">
                    <img src="/images/sendnawqr code.png" width="100" alt="SendNaw QR" />
                  </div>
                  <div>
                    <p className="mb-2">
                      Scan to download the SendNaw app.<br />
                      Available on App Store and Play Store
                    </p>
                    <div className="d-flex gap-3">
                      <i className="bi bi-apple fs-4"></i>
                      <i className="bi bi-google-play fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </section>
      </div>
        <Footer />
    </main>
  );
};

export default InstantTransfers;