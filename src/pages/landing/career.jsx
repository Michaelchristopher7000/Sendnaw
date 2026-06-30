import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Career = () => {
  return (
    <>
      <Navbar />

      <section
        className="position-relative py-5 text-white overflow-hidden"
        style={{
          minHeight: "500px",
          paddingTop: "90px",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="https://v1.pinimg.com/videos/720p/8c/31/2f/8c312f302a1bc2488741baf6d68b3b6f.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.6)",
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div
          className="container position-relative py-5 text-center"
          style={{ zIndex: 2 }}
        >
          <h2
            className="display-1 fw-bold mb-4"
            style={{ fontFamily: "serif" }}
          >
            Come join us
          </h2>

          <div className="d-flex align-items-center justify-content-center gap-3 mb-5">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#f8bbd0",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-play-fill text-dark fs-2"></i>
            </div>

            <a
              href="#"
              className="text-decoration-none fw-bold fs-5"
              style={{ color: "#f8bbd0" }}
            >
              Watch our story
            </a>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light text-dark">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2
              className="display-4 fw-bold mb-3"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Find where you fit
            </h2>
            <p className="opacity-75 mx-auto" style={{ maxWidth: "650px" }}>
              SendNaw is made up of diverse teams all working to create endless
              opportunities for the millions of people and businesses using our
              products.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                title: "Engineering",
                text: "Build and improve SendNaw's platform with robust solutions and smart architecture to connect lines of code with impacts.",
              },
              {
                title: "Design",
                text: "Our design team is made up of product designers and content designers creating functional, interactive experiences.",
              },
              {
                title: "Marketing",
                text: "Consider yourself a true storyteller? Join the team pushing the boundaries of creativity around the world.",
              },
              {
                title: "Product",
                text: "Curious about taking ideas to the next level? Join the team attracting excellent executors.",
              },
              {
                title: "Customer Experience",
                text: "Ensure users get the most out of SendNaw, providing guidance every step of the way.",
              },
              {
                title: "People and Culture",
                text: "Join our global People team to learn the skillset required to assemble and retain the world's best talent.",
              },
            ].map((dept, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="card h-100 rounded-4 border-0 p-4 text-white"
                  style={{ backgroundColor: "#6f42c1" }}
                >
                  <h5 className="fw-bold mb-3">{dept.title}</h5>
                  <p className="small opacity-100">{dept.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2
              className="fw-bold text-dark mb-5"
              style={{
                fontSize: "2.5rem",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Besides a competitive salary, we also provide you with the support
              needed to do your best work and make your life easier.
            </h2>
          </div>
          <div
            className="card border-0 rounded-5 p-5 mx-auto shadow-lg"
            style={{ backgroundColor: "#6f42c1", maxWidth: "1000px" }}
          >
            <div className="row g-5 text-center">
              {[
                {
                  icon: "bi-heart-pulse-fill text-danger",
                  title: "Health Insurance",
                  text: "Comprehensive medical coverage for you and your dependents.",
                },
                {
                  icon: "bi-shield-lock-fill text-primary",
                  title: "Life Insurance",
                  text: "All team members get comprehensive life insurance coverage.",
                },
                {
                  icon: "bi-wifi text-warning",
                  title: "Internet Allowance",
                  text: "Monthly data allowance to keep you connected wherever you work.",
                },
                {
                  icon: "bi-piggy-bank-fill text-success",
                  title: "Employee Pension",
                  text: "We provide an industry-standard pension plan for your future security.",
                },
                {
                  icon: "bi-calendar-check text-info",
                  title: "Paid Annual Leave",
                  text: "All team members get 20 days of paid annual leave.",
                },
              ].map((benefit, index) => (
                <div className="col-md-4" key={index}>
                  <div
                    className="mb-3 d-inline-flex align-items-center justify-content-center p-3 rounded-circle bg-white shadow-sm"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className={`bi ${benefit.icon} fs-3`}></i>
                  </div>
                  <h6 className="fw-bold text-light mt-2">{benefit.title}</h6>
                  <p className="small text-light">{benefit.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-3 text-center">
              <button className="btn btn-success rounded-pill px-4 py-2 fw-bold">
                View Open Roles
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white py-5 overflow-hidden bg-light">
        <div
          className="container py-5 rounded-4 shadow-lg"
          style={{ backgroundColor: "#5a2ea6" }}
        >
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Where we are</h2>
            <p className="mx-auto mb-0 col-lg-6">
              Hundreds of wavers work across different countries, with our
              headquarters in Lagos and local offices everywhere in between.
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <span className="display-1 fw-bold text-white">Lagos</span>
              <p className="fw-bold text-white mt-3 mb-4">
                Headquarters, Nigeria
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRvPKDEePZTwlpBj68wYjHIAI80J06s-rcaK5rnGDRh4PxKM620Vp7JR76g5b_rgvH64vBZCLDHLLPrvMHWHaC95PA&s=19"
                alt="Lagos Nigeria Office"
                className="img-fluid rounded-4 shadow-sm border border-3 border-white"
                style={{ minWidth: "250px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div
            className="p-5 rounded-5 text-white shadow-lg"
            style={{ backgroundColor: "#6f42c1" }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="display-4 fw-bold mb-4">
                  Ready to join the wave?
                </h2>
                <p className="lead opacity-75 mb-5">
                  Join us and contribute to the effort of simplifying payments
                  for millions of businesses across the globe.
                </p>
                <div className="d-flex align-items-center gap-4">
                  <a
                    href="#"
                    className="btn btn-success btn-lg rounded-3 px-4 fw-bold"
                  >
                    View openings
                  </a>
                  <a
                    href="#"
                    className="text-white text-decoration-none fw-bold"
                  >
                    Graduates <i className="bi bi-chevron-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Career;
