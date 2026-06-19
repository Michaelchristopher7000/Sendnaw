import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="pt-5 pb-4 bg-dark">
      <div className="container text-white">
        <div className="row g-5 mb-5">

          {/* Brand Column */}
          <div className="col-lg-4">
            <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
              <img src="/images/SendNaw_logo_main-removebg-preview.png" alt="SendNaw" height="45" />
            </Link>
            <p className="small pe-lg-5 text-white-50 pt-5">
              SendNaw is a modern financial platform providing seamless banking,
              payments, and lifestyle services for the digital age.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-white opacity-50 text-decoration-none">
                <i className="bi bi-twitter-x fs-4"></i>
              </a>
              <a
                href="https://www.instagram.com/joinsendnaw"
                className="text-white opacity-50 text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-white opacity-50 text-decoration-none">
                <i className="bi bi-facebook fs-4"></i>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>
              Products
            </h6>
            <ul className="list-unstyled d-grid gap-3">
              <li><a href="#" className="text-white-50 small text-decoration-none">Personal Account</a></li>
              <li><Link to="/virtual-card" className="text-white-50 small text-decoration-none">SendNaw Cards</Link></li>
              <li><a href="#" className="text-white-50 small text-decoration-none">Bill Payments</a></li>
              <li><Link to="/savings" className="text-white-50 small text-decoration-none">Savings</Link></li>
              <li><Link to="/savings" className="text-white-50 small text-decoration-none">Loan</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>
              Company
            </h6>
            <ul className="list-unstyled d-grid gap-3">
              <li><Link to="/about" className="text-white-50 small text-decoration-none">About Us</Link></li>
              <li><Link to="/career" className="text-white-50 small text-decoration-none">Careers</Link></li>
              <li><Link to="/contact" className="text-white-50 small text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>

          {/* Regulatory Column */}
          <div className="col-md-6 col-lg-4">
            <h6 className="fw-bold mb-4 text-uppercase small" style={{ letterSpacing: '1px' }}>
              Regulatory Information
            </h6>
            <p className="text-white-50 small mb-4 lh-lg">
              SendNaw is a financial technology company, not a bank. Banking
              services are provided by our licensed partner banks. All deposits
              are insured by the NDIC.
            </p>
            <div className="p-3 rounded-3 bg-white bg-opacity-10">
              <p className="small text-white mb-0 fw-bold">Verified Provider</p>
              <p className="text-white-50 mb-0" style={{ fontSize: '11px' }}>
                CBN Licensed | NDIC Insured
              </p>
            </div>
          </div>

        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 small mb-0">
              &copy; 2025 SendNaw Technologies Limited. RC: 1234567
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/privacy-policy" className="text-white-50 small text-decoration-none">
                Privacy
              </Link>
              <Link to="/terms" className="text-white-50 small text-decoration-none">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer