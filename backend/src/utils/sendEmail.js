const nodemailer = require("nodemailer");

const sendEmail = async (to, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,  
    to,
    subject: "Password Reset",
    text,
  });
};

module.exports = sendEmail;
