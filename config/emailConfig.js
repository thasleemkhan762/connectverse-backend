// Load environment variables from a .env file into process.env
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

// Configure the email transporter using Nodemailer with Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email address from environment variables
    pass: process.env.EMAIL_PASS, // Email password from environment variables
  },
});

// Function to send OTP via email
const sendOTP = async (email, otp) => {
  // Create a new email transporter for sending the OTP
  const otpmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email address from environment variables
      pass: process.env.EMAIL_PASS, // Email password from environment variables
    },
  });

  // Define the email options (recipient, subject, and body)
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender email address from environment variables
    to: email,                    // Recipient email address
    subject: "OTP Verification",  // Email subject line
    text: `Your OTP for verification is: ${otp}`, // Email body containing the OTP
  };

  try {
    // Send the email with the OTP
    await otpmail.sendMail(mailOptions);
    console.log("OTP email sent successfully");
    console.log(mailOptions);
  } catch (error) {
    // Handle any errors that occur during email sending
    console.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }
};

module.exports = { transporter, sendOTP };
