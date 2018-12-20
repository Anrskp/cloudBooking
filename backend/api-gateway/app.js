const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const passport = require('passport');
const expressValidator = require('express-validator');
const userRoute = require('./routes/user-route');
const bookingRoute = require('./routes/booking-route');
const companyRoute = require('./routes/company-route');

// Declare express variable
const app = express();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Express validator Middleware
app.use(expressValidator());

// Passport Middleware
/*
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
*/

// Routes
userRoute(app);
bookingRoute(app);
companyRoute(app);

// Set port number
const port = process.env.PORT || 4000;

// Start server
app.listen(port, () => {
  console.log('Server startet on port ' + port);
});
