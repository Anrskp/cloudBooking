const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const notifiRoute = require('./routes/notification-route');

// Declare express variable
const app = express();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Routes
notifiRoute(app);

// Set port number
const port = process.env.PORT || 3003;

// Start server
app.listen(port, () => {
  //console.log('Server startet on port ' + port);
});
