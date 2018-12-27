const mongoose = require('mongoose');

// Booking Schema
const bookingSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  invites: [{
    type: String
  }],
  entityID: {
    type: String
  },
  notification: {
    type: Boolean,
    default: false
  }
});

const Booking = module.exports = mongoose.model('Booking', bookingSchema);
