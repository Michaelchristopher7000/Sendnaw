import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="py-5 bg-light" style={{ paddingTop: '90px' }}>
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm text-center p-5"
                style={{ backgroundColor: '#8c61db' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-white mx-auto mb-4"
                  style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-chat-square-text fs-2 text-success"></i>
                </div>
                <h3 className="fw-bold mb-3 text-light">In-App Customer Service</h3>
                <p className="lh-base text-light">
                  24/7 self-service like transfer disputes or card disputes with
                  real-time updates and chat with a live Customer Service Agent.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm text-center p-5"
                style={{ backgroundColor: '#8c61db' }}>
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-white mx-auto mb-4"
                  style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-phone-vibrate fs-2 text-success"></i>
                </div>
                <h3 className="fw-bold mb-4 text-light">Mobile</h3>
                <div className="d-flex flex-column align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-credit-card-2-back text-success fs-4"></i>
                    <span className="fw-bold text-light">0700 888 8328 / 0201 8888328</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-telephone text-success fs-4"></i>
                    <span className="fw-bold text-light">0700 8888 329 / 0201 8888329</span>
                  </div>
                  <a
                    href="https://wa.me/2349076602239?text=Hello%20SendNaw%20team%21"
                    className="btn btn-success rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-whatsapp"></i>
                    <span>Chat with us on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100 border-0 rounded-4 shadow-sm text-center p-5"
                style={{ backgroundColor: '#8c61db' }}>
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <i className="bi bi-instagram fs-3 text-danger"></i>
                  <i className="bi bi-twitter-x fs-3 text-dark"></i>
                  <i className="bi bi-facebook fs-3 text-primary"></i>
                </div>
                <h3 className="fw-bold mb-4 text-light">Social Media</h3>
                <div className="d-flex flex-column gap-2">
                  <a href="#" className="d-flex align-items-center gap-2 text-decoration-none text-light fw-bold">
                    <i className="bi bi-instagram fs-4 text-danger"></i> Instagram
                  </a>
                  <a href="#" className="d-flex align-items-center gap-2 text-decoration-none text-light fw-bold">
                    <i className="bi bi-twitter-x fs-4"></i> Twitter
                  </a>
                  <a href="#" className="d-flex align-items-center gap-2 text-decoration-none text-light fw-bold">
                    <i className="bi bi-facebook fs-4 text-primary"></i> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <><section className="py-5 bg-light">
          <div className="container py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <img
                  src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80"
                  className="img-fluid rounded-4 shadow-lg"
                  alt="Support" />
              </div>
              <div className="col-lg-6">
                <h2 className="fw-bold mb-4" style={{ color: '#6f42c1' }}>Need a quick answer?</h2>
                <p className="lead mb-4">The SendNaw Help Desk has:</p>
                <ul className="list-unstyled mb-5">
                  <li className="mb-3">
                    <i className="bi bi-check2 text-primary me-2 fw-bold"></i>
                    Detailed guides and instructions
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2 text-primary me-2 fw-bold"></i>
                    How-to videos
                  </li>
                  <li className="mb-3">
                    <i className="bi bi-check2 text-primary me-2 fw-bold"></i>
                    Answers to the most common questions
                  </li>
                </ul>
                <Link to="/faq" className="text-decoration-none fw-bold text-success">
                  <i className="bi bi-arrow-right-circle me-2"></i> Search the Help Desk
                </Link>
              </div>
            </div>
          </div>
        </section><Footer /></>
    </>
  )
}

export default Contact