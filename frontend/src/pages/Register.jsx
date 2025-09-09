// src/pages/Register.jsx
import React, { useState } from "react";
import bgImage from "../assets/Login.png";

const Register = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    age: "",
    email: "",
  });
  const [isHuman, setIsHuman] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      setEmailSubmitted(true);
      alert("OTP sent to your email (simulation)!");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      alert("OTP Verified! Form submitted successfully.");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center position-relative"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      ></div>

      {/* Content */}
      <div className="container position-relative py-4">
        {/* Header */}
        <div className="text-center mb-4 text-white">
          <h1 className="fw-bold text-warning">RIGHT FIT</h1>
          <p className="fs-5 fs-md-4 text-light">Matrimony App</p>
        </div>

        {/* Card Form */}
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card p-4 shadow-lg border-0"
              style={{
                backgroundColor: "rgba(255, 255, 224, 0.95)",
                borderRadius: "1rem",
              }}
            >
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isHuman}
                      onChange={() => setIsHuman(!isHuman)}
                      id="robotCheck"
                    />
                    <label className="form-check-label" htmlFor="robotCheck">
                      I am not a robot
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold"
                    disabled={!isHuman}
                  >
                    Submit Email
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold"
                  >
                    Verify OTP
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
