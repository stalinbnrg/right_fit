import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bgImage from "../assets/collage.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      <section
        className="d-flex align-items-center text-white w-100"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        ></div>

        <div className="container position-relative py-5">
          <div className="row g-4 align-items-center justify-content-center">
            {/* Logo & Main Text */}
            <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
              <img
                src={logo}
                alt="Matrimony Logo"
                className="rounded-circle border border-3 border-light shadow mb-4 img-fluid"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h1 className="fw-bold display-6 display-lg-4 mb-3">
                RightFit Matrimony
              </h1>
              <p className="lead fs-6 fs-lg-5 mb-3">
                The most trusted matrimony service for universities – find your
                perfect match today!
              </p>
              <button className="btn btn-outline-light mt-2 px-4 py-2 w-100 w-md-auto">
                University Matrimony
              </button>
            </div>

            {/* Registration/Login Card */}
            <div className="col-12 col-lg-5 text-center bg-dark bg-opacity-50 rounded-3 p-4">
              <h4 className="fw-semibold mb-3 fs-5 fs-lg-4">New User?</h4>
              <button
                className="btn btn-lg btn-warning w-100 mb-3"
                onClick={() => navigate("/register")}
              >
                Create Profile
              </button>
              <div className="d-flex align-items-center justify-content-center my-3">
                <hr className="flex-grow-1 mx-2 text-light" />
                <span className="text-light">or</span>
                <hr className="flex-grow-1 mx-2 text-light" />
              </div>
              <p className="text-light mb-2">Already registered?</p>
              <button
                className="btn btn-lg btn-outline-warning w-100"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience/Stats Section */}
      <section className="container py-5">
        <div className="row text-center g-4">
          <div className="col-12 col-md-4 mb-0">
            <h4 className="text-warning fs-5 fs-md-4">10+ Years Experience</h4>
            <p className="text-muted">
              Helping Tamils find their life partners since 2015.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-0">
            <h4 className="text-warning fs-5 fs-md-4">1M+ Profiles</h4>
            <p className="text-muted">
              A growing community of verified and trusted members.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-0">
            <h4 className="text-warning fs-5 fs-md-4">24/7 Support</h4>
            <p className="text-muted">
              Dedicated team to help you every step of the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
