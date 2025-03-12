const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  const message = `
    <h1>Email Verification</h1>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}" style="
      padding: 10px 20px;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin: 20px 0;
    ">Verify Email</a>
    <p>If the button doesn't work, you can also click this link:</p>
    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    <p>This link will expire in 24 hours.</p>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Verify your email address',
    html: message
  });
};

module.exports = { sendEmail, sendVerificationEmail }; 