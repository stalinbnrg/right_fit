import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "../assets/Register-Background.png";
import Logo from "../assets/logo.png";

const Register = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    full_name: "",
    gender: "Male",
    dob: "",
    phone_number: "",
    email: "",
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [expectation, setExpectation] = useState({
    occupation: "",
    education: "",
    salary_min: "",
    salary_max: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleExpectationChange = (e) => {
    setExpectation({ ...expectation, [e.target.name]: e.target.value });
  };

  // Send OTP
  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: profile.email,
        full_name: profile.full_name,
        dob: profile.dob,
        gender: profile.gender,
        phone_number: profile.phone_number,
      });
      setOtpSent(true);
      setMessage("OTP sent to your email");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
      setMessageType("error");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: profile.email,
          otp,
        }
      );
      localStorage.setItem("token", res.data.token);
      setOtpVerified(true);
      setMessage("OTP verified successfully");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP");
      setMessageType("error");
    }
  };

  const submitExpectations = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/expectation",
        {
          preferred_occupation: expectation.occupation,
          preferred_education: expectation.education,
          preferred_salary_min: expectation.salary_min,
          preferred_salary_max: expectation.salary_max,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Registered Successfully!");
      setMessageType("success");

      // Save to localStorage for profile page
      Object.keys(profile).forEach((key) =>
        localStorage.setItem(key, profile[key])
      );

      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting expectations");
      setMessageType("error");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="row w-100 d-flex align-items-center">
        {/* Left Section */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img
            src={Logo}
            alt="Logo"
            className="rounded-circle mb-3"
            style={{
              width: "120px",
              height: "120px",
              border: "3px solid white",
              objectFit: "cover",
            }}
          />
          <h1 className="fw-bold text-white display-5 text-shadow">
            Welcome to Our Platform
          </h1>
          <p className="fw-semibold text-dark bg-light bg-opacity-50 rounded p-2 mt-3 d-inline-block">
            The most trusted matrimony service for universities – find your
            perfect match today!
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="col-lg-6 d-flex justify-content-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card shadow-lg p-4 w-100"
            style={{
              maxWidth: "500px",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "12px",
            }}
          >
            {step === 1 && (
              <div>
                <h3 className="mb-4 text-center fw-bold">Profile Details</h3>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleProfileChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={profile.gender}
                      onChange={handleProfileChange}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={profile.dob}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone_number"
                      value={profile.phone_number}
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {otpSent && !otpVerified && (
                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}

                {!otpSent && (
                  <button className="btn btn-primary w-100" onClick={sendOtp}>
                    Generate OTP
                  </button>
                )}

                {otpVerified && (
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => {
                      setStep(2);
                      setMessage("");
                    }}
                  >
                    Next
                  </button>
                )}

                {message && (
                  <p
                    className={`mt-2 text-center fw-semibold ${
                      messageType === "error" ? "text-danger" : "text-success"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-4 text-center fw-bold">Expectation</h3>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Education</label>
                    <input
                      type="text"
                      className="form-control"
                      name="education"
                      value={expectation.education}
                      onChange={handleExpectationChange}
                      placeholder="Enter expected education"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="occupation"
                      value={expectation.occupation}
                      onChange={handleExpectationChange}
                      placeholder="Enter expected occupation"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Salary Min</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary_min"
                      value={expectation.salary_min}
                      onChange={handleExpectationChange}
                      placeholder="Min"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Salary Max</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary_max"
                      value={expectation.salary_max}
                      onChange={handleExpectationChange}
                      placeholder="Max"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-success w-100"
                  onClick={submitExpectations}
                >
                  Finish Registration
                </button>

                {message && (
                  <p
                    className={`mt-2 text-center fw-semibold ${
                      messageType === "error" ? "text-danger" : "text-success"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
