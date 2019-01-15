var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emailmicroservicetest@gmail.com',
    pass: 'atT3vje7tYbi'
  }
});


function sendNotifications(req, res) {

  console.log(req.body);

//  let recivers = req.body.emails.join(",");

  return res.json({hello: 'hello'})

  var mailOptions = {
    from: 'emailmicroservicetest@gmail.com',
    to: req.body,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

// exports api functions
module.exports = {
  sendNotifications
};
