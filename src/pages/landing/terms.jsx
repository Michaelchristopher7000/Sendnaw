import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#fcfcfd', color: '#101828' }}>

      <nav className="navbar sticky-top border-bottom py-2" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="container">
          <Link to="/" className="btn btn-link text-decoration-none text-dark fw-bold d-inline-flex align-items-center p-0">
            <i className="bi bi-arrow-left me-2"></i> Back
          </Link>
        </div>
      </nav>

      <header style={{ padding: '80px 0', background: 'white', borderBottom: '1px solid #eaecf0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="badge rounded-pill px-3 py-2 mb-3" style={{ background: '#f4ebff', color: '#6f42c1' }}>
                LEGAL FRAMEWORK v2.0
              </div>
              <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '-3px' }}>Terms & Conditions</h1>
              <p className="lead text-muted mb-4">
                These terms govern your use of the SendNaw platform. By using our services, you agree to these rules.
              </p>
              <div className="d-flex align-items-center gap-4 text-muted small">
                <span><i className="bi bi-clock me-1"></i> Read time: 8 mins</span>
                <span><i className="bi bi-calendar-check me-1"></i> Effective: Dec 25, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5 mt-4">
        <div className="row g-5">
          <aside className="col-lg-3 d-none d-lg-block">
            <div style={{ position: 'sticky', top: '100px' }}>
              <h6 className="text-uppercase fw-bold small text-muted mb-4">Sections</h6>
              {[
                ['#acceptance', '1. Acceptance of Terms'],
                ['#eligibility', '2. Eligibility'],
                ['#account', '3. Account Responsibility'],
                ['#services', '4. Transactions & Fees'],
                ['#prohibited', '5. Prohibited Use']
              ].map(([href, label]) => (
                <a key={href} href={href} className="d-block py-2 text-decoration-none text-muted small fw-medium">{label}</a>
              ))}
            </div>
          </aside>

          <div className="col-lg-9">

            {[
              {
                id: 'acceptance',
                icon: 'bi-check-all',
                title: '1. Acceptance of Terms',
                short: 'By opening the SendNaw app, you are agreeing to play by our rules.',
                text: 'By using SendNaw, you agree to comply with these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not agree, please do not use our services.'
              },
              {
                id: 'eligibility',
                icon: 'bi-person-badge',
                title: '2. Eligibility',
                short: 'You must be 18+ and legally allowed to hold a bank account.',
                text: 'You must be at least 18 years old to use SendNaw. By registering, you confirm that you are legally capable of entering into binding agreements and have not been previously suspended from our platform.'
              },
              {
                id: 'account',
                icon: 'bi-shield-lock',
                title: '3. Account Responsibilities',
                short: 'Keep your PIN safe. If you give someone your phone, you are responsible for what they do.',
                text: 'Users are responsible for maintaining the confidentiality of account login credentials. Any activity under your account is your responsibility. Notify us immediately if you suspect unauthorized access.'
              },
              {
                id: 'services',
                icon: 'bi-cash-stack',
                title: '4. Services & Transactions',
                short: 'We process your money, but you must check the details before clicking Send.',
                text: 'SendNaw provides digital banking and savings services. All transactions are subject to verification and applicable fees. Users are responsible for reviewing transaction details before confirmation.'
              },
              {
                id: 'prohibited',
                icon: 'bi-slash-circle',
                title: '5. Prohibited Activities',
                short: null,
                text: 'To keep SendNaw safe for everyone, you may not use the platform for money laundering or terrorist financing, purchasing illegal goods or services, or attempting to hack or bypass our security protocols.'
              }
            ].map((section) => (
              <section key={section.id} id={section.id} className="mb-5">
                <h2 className="fw-bold mb-4 d-flex align-items-center" style={{ fontSize: '1.75rem', letterSpacing: '-1px' }}>
                  <i className={`bi ${section.icon} me-3 text-primary`} style={{ color: '#6f42c1 !important' }}></i>
                  {section.title}
                </h2>
                {section.short && (
                  <div className="p-4 mb-4 rounded-3"
                    style={{ background: '#f9fafb', borderLeft: '4px solid #6f42c1', fontSize: '0.95rem' }}>
                    <strong>The Short Version:</strong> {section.short}
                  </div>
                )}
                <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>{section.text}</p>
              </section>
            ))}

            <div className="p-5 rounded-5 shadow-sm mt-5" style={{ background: '#101828', color: 'white' }}>
              <h4 className="fw-bold mb-3 text-white">Need a PDF copy?</h4>
              <p className="text-secondary small mb-4">Download the full Terms & Conditions for your personal records.</p>
              <button className="btn rounded-pill px-4 py-2 text-white"
                style={{ background: '#6f42c1', border: 'none' }}>
                <i className="bi bi-download me-2"></i> Download Document
              </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="py-5 bg-white border-top mt-5">
        <div className="container text-center">
          <p className="fw-bold text-dark mb-1">SendNaw Global Finance</p>
          <p className="text-muted small">Licensed by the Central Bank of Nigeria as a Payment Service Provider.</p>
        </div>
      </footer>

    </div>
  )
}

export default TermsAndConditions