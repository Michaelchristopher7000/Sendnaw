import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const HowItWorks = () => {
  return (
    <>
      <Navbar />

      <header className="py-5 bg-white border-bottom" style={{ paddingTop: '90px' }}>
        <div className="container text-center py-4">
          <h1 className="display-5 fw-bold text-dark">
            How <span style={{ color: '#7c3aed' }}>SendNaw</span> Works
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '700px' }}>
            The simplest way to manage your money. Follow these four steps to
            take control of your financial freedom.
          </p>
        </div>
      </header>

      <main className="container py-5">
        <div className="row g-4">
          {[
            { step: 1, title: 'Create Account', text: 'Sign up with your phone or email. Quick, easy, and secure setup.' },
            { step: 2, title: 'Add Funds', text: 'Link your bank or card to deposit money into your secure wallet.' },
            { step: 3, title: 'Send & Pay', text: 'Instantly transfer cash to anyone or pay your monthly bills.' },
            { step: 4, title: 'Get Rewards', text: 'Earn cashback and points every time you use the SendNaw app.' }
          ].map((item) => (
            <div className="col-sm-6 col-lg-3" key={item.step}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 text-center">
                <div className="card-body">
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-4 text-white rounded-circle shadow"
                    style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#7c3aed' }}
                  >
                    {item.step}
                  </div>
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text text-muted small">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <section className="container my-5">
        <div className="p-5 text-center text-white rounded-5 shadow-lg" style={{ backgroundColor: '#7c3aed' }}>
          <h2 className="fw-bold">Ready to Get Started?</h2>
          <p className="mb-4 opacity-75">Join thousands of users who trust SendNaw for their daily payments.</p>
          <Link to="/signup" className="btn btn-light btn-lg px-5 fw-bold rounded-pill shadow-sm">
            Sign Up Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default HowItWorks