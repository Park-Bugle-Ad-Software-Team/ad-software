const nodemailer = require('nodemailer');

// setting up nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const mailOptions = {
    from: process.env.EMAIL,
    subject: 'Sending Email using Node.js',
    text: 'http://localhost:3000/#/set-password/' // the /set-password needs to stay the same
    // html: <h1>some html</h1>
}

const emailErrorCatcher = function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
}

function sendEmail(recipient, inviteToken) {
  mailOptions.to = recipient;
  mailOptions.text += inviteToken
  transporter.sendMail(mailOptions, emailErrorCatcher)
}

module.exports = sendEmail;