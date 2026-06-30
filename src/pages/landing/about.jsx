import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

const About = () => {
  return (
    <>
      <Navbar />

      <section
        className="py-5 text-white"
        style={{
          backgroundColor: '#7F56D9',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          paddingTop: '90px'
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-5">
              <h2 className="display-5 fw-bold mb-3">Get to Know Us</h2>
              <p className="lead mb-5 opacity-75" style={{ fontSize: '1.1rem' }}>
                We offer you the flexibility to receive and send money using instant cash transfers.
              </p>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '24px', height: '24px' }}>
                    <i className="bi bi-caret-down-fill text-white" style={{ fontSize: '12px' }}></i>
                  </div>
                  <span className="fw-bold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    Chop life crew (Jaiye x2)
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '24px', height: '24px' }}>
                    <div className="bg-white rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                  </div>
                  <span className="fw-bold small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    ...and an inspiring team
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="text-center">
                <div className="d-flex justify-content-center gap-4 mb-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    className="rounded-circle bg-warning" width="100" height="100" alt="Avatar" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
                    className="rounded-circle bg-info" width="110" height="110"
                    style={{ marginTop: '-30px' }} alt="Avatar" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight"
                    className="rounded-circle bg-danger" width="100" height="100" alt="Avatar" />
                </div>
                <div className="d-flex justify-content-center gap-4">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sola"
                    className="rounded-circle bg-light" width="120" height="120" alt="Avatar" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
                    className="rounded-circle bg-primary" width="100" height="100"
                    style={{ marginTop: '20px' }} alt="Avatar" />
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                    className="rounded-circle bg-success" width="100" height="100" alt="Avatar" />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <div className="p-4 p-md-5 text-center shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '30px'
                }}>
                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                  <p className="mb-4 lh-lg fw-medium">
                    Our plan was to create a product that people would love and enjoy using.
                    With the SendNaw app we not only accomplished that but we also made a safe,
                    relatable, simple and beautiful app that helps solve the problem of slow
                    payments and high transaction cost.
                  </p>
                  <p className="mb-4 lh-lg fw-medium">
                    Our mission is to meet and exceed the expectations of our customers by
                    providing the easiest, fastest and most effective ways to send, receive
                    and pay for stuff through peer to peer (P2P) transfers.
                  </p>
                  <p className="mb-0 fw-bold text-warning opacity-75">
                    We have amazing features like Ajo, Loan, and more exciting things coming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: '#7F56D9' }}>
        <div className="container py-5">
          <div className="text-center mb-5 text-white">
            <h2 className="fw-bold">Our Values</h2>
            <p className="opacity-75">At Revanlabs, we strive for excellence and some of our core values include:</p>
          </div>
          <div className="row g-4">
            {[
              {
                title: 'Reliability and Consistency',
                text: 'We are dependable and reliable, we believe in building and managing strong relationships and understand that trust is built through consistency.'
              },
              {
                title: 'Commitment',
                text: 'We are dedicated to our customers and getting the job done. Our team is committed to the success of the business, our mission and vision statement and to each other.'
              },
              {
                title: 'Transparency',
                text: 'We are authentic, open and honest and we constantly strive to clearly communicate our services with our customers and also within the team.'
              },
              {
                title: 'Creativity and Innovation',
                text: 'We like to constantly challenge the conventional way of doing things by finding fun and more effective ways of doing them.'
              }
            ].map((value, index) => (
              <div className="col-lg-6" key={index}>
                <div className="p-4 rounded-4 border border-white border-opacity-25 h-100 shadow-sm bg-white bg-opacity-10 text-white">
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <span className="me-2 small">✦</span> {value.title}
                  </h5>
                  <p className="opacity-75 small lh-lg mb-0">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5 pt-4">
            <h3 className="h4 fw-bold text-white px-md-5 mx-auto" style={{ maxWidth: '900px' }}>
              At Revanlabs, our vision is to be the best Peer to Peer (P2P) service in Africa
              by creating a large community of people sending and receiving money instantly.
            </h3>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About