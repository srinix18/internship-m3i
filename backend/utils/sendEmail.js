const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendConfirmationEmail({ to, name }) {
  const mailOptions = {
    from: `"AI Realty" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Thanks for registering with AI Realty!',
    html: `
      <h2>Thank you, ${name}!</h2>
      <p>Your request has been received. We'll contact you soon with the best property matches.</p>
      <br>
      <small>This is an automated email, please do not reply.</small>
    `
  };

  return transporter.sendMail(mailOptions); // Returns a promise
}

module.exports = { sendConfirmationEmail };
