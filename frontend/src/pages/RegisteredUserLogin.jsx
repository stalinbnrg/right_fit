import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../assets/Register-Background.png";
import Logo from "../assets/logo.png";

function RegisteredUserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // send OTP
  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      setMessageType("error");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setOtpSent(true);
      setMessage("OTP sent to your email");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
      setMessageType("error");
    }
  };

  // auto verify OTP
  useEffect(() => {
    const verify = async () => {
      if (otp.length === 6 && otpSent && !otpVerified) {
        try {
          const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
            email,
            otp,
          });
          localStorage.setItem("token", res.data.token);
          setOtpVerified(true);
          setMessage("OTP verified successfully");
          setMessageType("success");

          setTimeout(() => navigate("/home"), 1000);
        } catch (err) {
          setMessage(err.response?.data?.message || "Invalid OTP");
          setMessageType("error");
        }
      }
    };
    verify();
  }, [otp, otpSent, otpVerified, email, navigate]);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left side content */}
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
              fontSize: "3rem",
            }}
          >
            Welcome Back!
          </h1>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "black",
              WebkitTextStroke: "0.5px white",
            }}
          >
            Login with your registered email and verify OTP to continue.
          </p>
        </div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="card p-4"
        style={{
          maxWidth: "450px",
          width: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">User Login</h3>

        {/* Email input */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* OTP input */}
        {otpSent && !otpVerified && (
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />
          </div>
        )}

        {/* Buttons */}
        {!otpSent && (
          <button className="btn btn-primary w-100" onClick={sendOtp}>
            Generate OTP
          </button>
        )}

        {otpVerified && (
          <button
            className="btn btn-success w-100"
            onClick={() => navigate("/home")}
          >
            Continue
          </button>
        )}

        {/* Inline message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-3 text-center ${
              messageType === "error" ? "text-danger" : "text-success"
            }`}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default RegisteredUserLogin;
