const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const bookingRoute = require('./routes/booking-route');
const passport = require('passport');
var expressValidator = require('express-validator');

// Declare express variable
const app = express();

// CORS Middleware
app.use(cors());

app.use(expressValidator());

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Promise libary
mongoose.Promise = require('bluebird');

// Connect To Database
mongoose.connect(config.database, {
   useNewUrlParser: true
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database)
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error : ' + err);
});

// Routes
//app.use('/booking', bookingRoute.router);
bookingRoute(app);

// Set port number
const port = process.env.PORT || 3001;

// Start server
app.listen(port, () => {
  console.log('Server startet on port ' + port);
});
