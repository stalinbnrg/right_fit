const { body, validationResult } = require("express-validator");
const { setOtp, getOtp, deleteOtp } = require("../utils/otpStore");
const { sendOtpEmail } = require("../services/mailService");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { UserProfile } = require("../models");
const calculateAge = require("../utils/calculateAge");
const jwt = require("jsonwebtoken");

const OTP_TTL = Number(process.env.OTP_EXPIRES_SECONDS) || 300;

// Post /api/auth/send-otp
exports.sendOtp = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("full_name").optional().isString(),
  body("dob").optional().isISO8601(),
  body("gender").optional().isIn(["Male", "Female", "Other"]),
  body("phone_number").optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, full_name, dob, gender, phone_number } = req.body;

    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(email, otp, OTP_TTL, "auth", {
        info: { full_name, dob, gender, phone_number },
      });

      await sendOtpEmail(email, otp);

      return res.json({ message: "OTP sent to email" });
    } catch (err) {
      console.error("Error in sendOtp:", err);
      return res.status(500).json({ message: "OTP sent failed" });
    }
  },
];

// Post /api/auth/verify-otp
exports.verifyOtp = [
  body("email").isEmail(),
  body("otp").isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, otp } = req.body;
    try {
      const entry = getOtp(email);
      if (!entry)
        return res
          .status(400)
          .json({ message: "No OTP request found or OTP expired" });

      if (entry.otp !== String(otp))
        return res.status(400).json({ message: "Invalid OTP" });

      // Otp valid, create user profile
      let user = await UserProfile.findOne({ where: { email } });

      if (!user) {
        const info = entry.info || entry.data || {};
        const age = info.dob ? calculateAge(info.dob) : null;
        user = await UserProfile.create({
          full_name: info.full_name || "New User",
          email,
          phone_number: info.phone_number || null,
          gender: info.gender || "Other",
          dob: info.dob || new Date("2000-01-01"),
          age,
        });
      } else {
        const info = entry.basicInfo || {};
        const updateData = {};
        if (info.full_name) updateData.full_name = info.full_name;
        if (info.phone_number) updateData.phone_number = info.phone_number;
        if (info.gender) updateData.gender = info.gender;
        if (info.dob) {
          updateData.dob = info.dob;
          updateData.age = calculateAge(info.dob);
        }
        if (Object.keys(updateData).length) {
          await user.update(updateData);
        }
      }
      deleteOtp(email);

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      return res.json({
        message: "OTP verified successfully",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          gender: user.gender,
        },
      });
    } catch (err) {
      console.error("Error in verifyOtp:", err);
      return res.status(500).json({ message: "OTP verification failed" });
    }
  },
];
