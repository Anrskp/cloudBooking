var nodemailer = require('nodemailer');



function sendNotifications(req, res) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emailmicroservicetest@gmail.com',
      pass: 'atT3vje7tYbi'
    }
  });

  console.log(req.body.emails);

  let message = "Hi there - you have been invited to join an event that starts at: " + req.body.start + " and ends at: " + req.body.end + " -  message: " + req.body.message

  var mailOptions = {
    from: 'emailmicroservicetest@gmail.com',
    to: req.body.emails,
    subject: req.body.title,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.json({
        success: false
      })
    } else {
      return res.json({
        hello: true
      })
    }
  });



}

// exports api functions
module.exports = {
  sendNotifications
};
