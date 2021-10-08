const nodemailer = require('nodemailer');

const fromEmail = 'marklarson567@gmail.com'
// setting up nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: 'VgtNhu567'
  }
});

const mailOptions = {
    from: fromEmail,
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

module.exports = {
    transporter,
    mailOptions,
    emailErrorCatcher
}