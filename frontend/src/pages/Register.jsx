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

  // const verifyOtp = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/verify-otp",
  //       {
  //         email: profile.email,
  //         otp,
  //       }
  //     );
  //     localStorage.setItem("token", res.data.token);
  //     setOtpVerified(true);
  //     setMessage("OTP verified successfully");
  //     setMessageType("success");
  //   } catch (err) {
  //     setMessage(err.response?.data?.message || "Error verifying OTP");
  //     setMessageType("error");
  //   }
  // };

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
          headers: { Authorization: Bearer ${token} },
        }
      );
      setMessage("Registered Successfully!");
      setMessageType("success");
      setTimeout(() => navigate("/home"), 1200); // redirect after small delay
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error submitting expectations"
      );
      setMessageType("error");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: url(${Background}),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "1rem",
              border: "2px solid white",
            }}
          />
          <h1
            style={{
              fontWeight: "bolder",
              color: "#fff",
              WebkitTextStroke: "1px black",
              fontSize: "3.5rem",
            }}
          >
            Welcome to Our Platform
          </h1>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "black",
              WebkitTextStroke: "0.5px white",
            }}
          >
            The most trusted matrimony service for universities – find your
            perfect match today!
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4"
        style={{
          maxWidth: "600px",
          width: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(100px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {step === 1 && (
          <div>
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
                  maxLength={6} // assuming 6-digit OTP
                />
              </div>
            )}

            {/* {otpSent && !otpVerified && (
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </div>
            )} */}

            {!otpSent && (
              <button className="btn btn-primary" onClick={sendOtp}>
                Generate OTP
              </button>
            )}

            {otpVerified && (
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  setStep(2);
                  setMessage("");
                }}
              >
                Next
              </button>
            )}

            {/* inline message */}
            {message && (
              <p
                className={
                  messageType === "error"
                    ? "text-danger mt-2"
                    : "text-success mt-2"
                }
              >
                {message}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4">Expectation</h3>

            <div className="mb-3">
              <label className="form-label">Education</label>
              <input
                type="text"
                className="form-control"
                name="education"
                value={expectation.education}
                onChange={handleExpectationChange}
                placeholder="enter your expected education"
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
                placeholder="enter your expected occupation"
              />
            </div>

            <div className="mb-3 flex-row">
              <label className="form-label">Salary</label>
              <input
                type="number"
                className="form-control mb-2"
                name="salary_min"
                value={expectation.salary_min}
                placeholder="Min"
                onChange={handleExpectationChange}
              />
              <input
                type="number"
                className="form-control"
                name="salary_max"
                value={expectation.salary_max}
                placeholder="Max"
                onChange={handleExpectationChange}
              />
            </div>
            <button className="btn btn-success" onClick={submitExpectations}>
              Finish Registration
            </button>

            {/* inline message */}
            {message && (
              <p
                className={
                  messageType === "error"
                    ? "text-danger mt-2"
                    : "text-success mt-2"
                }
              >
                {message}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Register;