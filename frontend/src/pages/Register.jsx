import React, { useState, useEffect } from "react";
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

  // Auto verify OTP when length is 6
  useEffect(() => {
    const autoVerify = async () => {
      if (otp.length === 6 && otpSent && !otpVerified) {
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
      }
    };
    autoVerify();
  }, [otp, otpSent, otpVerified, profile.email]);

  // Submit expectations
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
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error submitting expectations"
      );
      setMessageType("error");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center p-3"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div className="row w-100 align-items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0"
        >
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid rounded-circle border border-3 border-white shadow-lg mb-4"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h1
            className="fw-bold display-5"
            style={{
              color: "#fff",
              WebkitTextStroke: "1px black",
            }}
          >
            Welcome to Our Platform
          </h1>
          <p
            className="lead fw-semibold"
            style={{
              color: "black",
              WebkitTextStroke: "0.5px white",
            }}
          >
            The most trusted matrimony service for universities – find your
            perfect match today!
          </p>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="col-12 col-lg-6 d-flex justify-content-center"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="card p-4 shadow-lg"
            style={{
              maxWidth: "500px",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(15px)",
              borderRadius: "15px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="mb-4 text-center fw-bold">Profile Details</h3>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    placeholder="Enter your name"
                    value={profile.full_name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={profile.dob}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    placeholder="Enter your phone number"
                    value={profile.phone_number}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>

                {otpSent && !otpVerified && (
                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                )}

                {!otpSent && (
                  <button className="btn btn-primary w-100" onClick={sendOtp}>
                    Generate OTP
                  </button>
                )}

                {otpVerified && (
                  <button
                    className="btn btn-success w-100 mt-3"
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
                    className={`mt-2 text-center ${
                      messageType === "error" ? "text-danger" : "text-success"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="mb-4 text-center fw-bold">Expectation</h3>

                <div className="mb-3">
                  <label className="form-label">Education</label>
                  <input
                    type="text"
                    className="form-control"
                    name="education"
                    value={expectation.education}
                    onChange={handleExpectationChange}
                    placeholder="Expected education"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="occupation"
                    value={expectation.occupation}
                    onChange={handleExpectationChange}
                    placeholder="Expected occupation"
                  />
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Min Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary_min"
                      value={expectation.salary_min}
                      placeholder="Min"
                      onChange={handleExpectationChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Max Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary_max"
                      value={expectation.salary_max}
                      placeholder="Max"
                      onChange={handleExpectationChange}
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
                    className={`mt-2 text-center ${
                      messageType === "error" ? "text-danger" : "text-success"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
