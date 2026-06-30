import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1d2939', lineHeight: '1.6' }}>

      <nav className="navbar sticky-top border-bottom bg-white py-3">
        <div className="container">
          <Link to="/" className="text-decoration-none text-dark d-flex align-items-center fw-bold">
            <i className="bi bi-chevron-left me-2"></i> Back
          </Link>
        </div>
      </nav>

      <header className="py-5 mt-4">
        <div className="container text-center">
          <div className="badge rounded-pill px-3 py-2 mb-3"
            style={{ background: '#f4ebff', color: '#6f42c1', fontWeight: '600' }}>
            VERSION 2.1
          </div>
          <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '-3px' }}>Privacy Policy</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            We believe data privacy is a fundamental human right. This policy outlines how we protect yours.
          </p>
        </div>
      </header>

      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block">
            <div style={{ position: 'sticky', top: '100px', borderLeft: '2px solid #f2f4f7', paddingLeft: '20px' }}>
              <p className="small fw-bold text-uppercase text-muted mb-3" style={{ letterSpacing: '1px' }}>On this page</p>
              {['collect', 'use', 'security', 'sharing', 'contact'].map((id, i) => (
                <a key={id} href={`#${id}`} className="d-block text-decoration-none text-muted mb-3 small"
                  style={{ transition: '0.2s' }}>
                  {i + 1}. {['Data Collection', 'Purpose of Processing', 'Protection Systems', 'Third-Party Access', 'Inquiries'][i]}
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

              <section id="collect" className="mb-5">
                <h2 className="fw-bold mb-4" style={{ letterSpacing: '-1px', fontSize: '1.75rem' }}>1. Information We Collect</h2>
                <p className="text-muted">At SendNaw, we collect information that is strictly necessary to provide our financial services. This includes:</p>
                <ul className="text-muted mb-4">
                  <li><strong>Identity Data:</strong> Full name, Date of Birth, and Government ID (BVN/NIN).</li>
                  <li><strong>Contact Data:</strong> Verified email address and mobile phone number.</li>
                  <li><strong>Transaction Data:</strong> Details about payments to and from your SendNaw accounts.</li>
                </ul>
              </section>

              <section id="use" className="mb-5">
                <h2 className="fw-bold mb-4" style={{ letterSpacing: '-1px', fontSize: '1.75rem' }}>2. How We Use Your Information</h2>
                <p className="text-muted">We process your data primarily to satisfy our legal obligations and provide features. Specifically, we use it for identity verification (KYC), fraud detection, and transaction processing.</p>
              </section>

              <section id="security" className="mb-5">
                <h2 className="fw-bold mb-4" style={{ letterSpacing: '-1px', fontSize: '1.75rem' }}>3. Data Security & Storage</h2>
                <p className="text-muted">Your data is encrypted using 256-bit AES encryption before being stored in our secure servers. We conduct regular penetration testing to ensure our systems remain secure.</p>
              </section>

              <section id="sharing" className="mb-5">
                <h2 className="fw-bold mb-4" style={{ letterSpacing: '-1px', fontSize: '1.75rem' }}>4. Sharing Your Information</h2>
                <p className="text-muted">We do not share your data with advertisers. We only share data with licensed financial partners (like the NDIC or payment processors) to facilitate your transactions.</p>
              </section>

              <div id="contact" className="p-4 rounded-4 mt-5" style={{ background: '#f9fafb', border: '1px solid #eaecf0' }}>
                <div className="row align-items-center">
                  <div className="col-md-7">
                    <h4 className="fw-bold">Questions about your privacy?</h4>
                    <p className="small text-muted mb-0">Our Data Protection Officer is ready to assist you.</p>
                  </div>
                  <div className="col-md-5 text-md-end mt-3 mt-md-0">
                    <a href="mailto:privacy@sendnaw.com" className="btn btn-dark rounded-pill px-4 py-2">
                      Email Privacy Team
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-muted border-top">
        <p style={{ fontSize: '0.8rem' }}>SendNaw is a registered trademark. &copy; 2025 All Rights Reserved.</p>
      </footer>

    </div>
  )
}

export default PrivacyPolicy