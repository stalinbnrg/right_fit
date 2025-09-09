const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify().then(()=>{
    console.log("Mail server is ready to take messages");
}).catch(err=>{
    console.warn("Error with mail server configuration:", err.message);
});

/**
 * send otp email
 * @param {string} to
 * @param {string|number} otp
 */

async function sendOtpEmail(to, otp) {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to,
        subject: "Your RightFit OTP Code",
        text: `Your OTP code is: ${otp}. It expires in ${process.env.OTP_EXPIRES_SECONDS || 300} seconds.`,
        html: `<p>Your OTP for <b>RightFit</b> is: <b>${otp}</b></p><p>It expires in ${process.env.OTP_EXPIRES_SECONDS || 300} seconds.</p>`
    };
    return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };