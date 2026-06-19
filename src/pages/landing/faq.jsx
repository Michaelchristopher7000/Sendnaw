import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const FAQ = () => {
  return (
    <>
      <Navbar />

      <section
        className="py-5"
        style={{
          backgroundColor: '#6f42c1',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          paddingTop: '90px'
        }}
      >
        <div className="container py-5">

          <div className="mb-5 text-white">
            <h2 className="fw-bold display-6 mb-3">
              More Questions? We've Got Answers  <i class="bi bi-lightbulb-fill text-warning fs-4 shadow-sm glow-icon"></i>
            </h2>
            <p className="opacity-75">
              Find out more about how SendNaw makes your financial life easier.
            </p>
            <p className="text-white col-lg-4 fs-4">
              We offer you the flexibility to receive and send money using cash
              transfers, ajo, loan, fundraising and store.
            </p>
          </div>

          <div className="mb-5">
            <h2 className="text-white fw-bold display-6 mb-3">
              Common Questions Asked <i class="bi bi-question text-danger fw-bold" style={{fontSize: 60}}></i>
            </h2>
            <input
              type="text"
              className="form-control form-control-lg border-0 ps-4 py-3 text-white shadow-none"
              placeholder="Search for anything"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
              }}
            />
          </div>

          <div className="accordion accordion-flush" id="sendNawFaq">

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  What is SendNaw?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  SendNaw is a secure peer-to-peer payment platform designed for instant transfers.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How do I send money anonymously?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  By using your SendNaw Tag, you can receive payments without
                  revealing your real name or phone number.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqLoan"
                >
                  How do I apply for a SendNaw Loan?
                </button>
              </h2>
              <div id="faqLoan" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  Navigate to the Finance tab and select Loans. Based on your
                  transaction history and credit score within the app, you can
                  access instant collateral-free loans.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqAjo"
                >
                  What is SendNaw Ajo and how does it work?
                </button>
              </h2>
              <div id="faqAjo" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  Ajo is our automated thrift savings feature. You can join a
                  circle with friends or save solo to reach financial goals
                  faster with competitive interest rates.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqBVN"
                >
                  Is my BVN safe with SendNaw?
                </button>
              </h2>
              <div id="faqBVN" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  Absolutely. We use your BVN solely for identity verification
                  via the NIBSS portal. We do not have access to your bank
                  accounts or sensitive balance information.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqFund"
                >
                  How can I start a fundraising campaign?
                </button>
              </h2>
              <div id="faqFund" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  Click on Fundraising in your dashboard, set your target amount,
                  and generate a unique payment link to share with donors via
                  social media or WhatsApp.
                </div>
              </div>
            </div>

            <div className="accordion-item bg-transparent border-bottom border-white border-opacity-10">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-transparent text-white shadow-none py-4 px-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faqCard"
                >
                  Can I use my Virtual Card for international payments?
                </button>
              </h2>
              <div id="faqCard" className="accordion-collapse collapse" data-bs-parent="#sendNawFaq">
                <div className="accordion-body text-white opacity-75 px-0 pb-4">
                  Yes. Our USD Virtual Cards are accepted globally. You can pay
                  for Netflix, Amazon, Apple Music, and Facebook Ads without
                  any dollar limits.
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-5">
            <p className="text-white mb-4">Still Need Help? 👀</p>
            <p className="text-white opacity-75 mb-4">
              Our team is online and ready to assist you via chat or email.
            </p>
            <Link
              to="/contact"
              className="btn btn-lg rounded-pill fw-bold px-5 py-3 border-0 text-white"
              style={{ backgroundColor: '#00c896' }}
            >
              CONTACT SUPPORT
            </Link>
          </div>

        </div>
      </section>
 
      <Footer />
    </>
  )
}

export default FAQ