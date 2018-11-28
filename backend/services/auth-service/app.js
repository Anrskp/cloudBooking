const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const config = require('./config/database');

// Declare express variable
const app = express();

// CORS Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

// Set port number
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log('Server startet on port ' + port);
});


// Test database connection.
config.connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
