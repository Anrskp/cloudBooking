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
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  }
});

const Booking = module.exports = mongoose.model('Booking', bookingSchema);

// Methods

// Add new user
module.exports.addBooking = function(newBooking, callback) {
  newBooking.save(callback);
}

// Get booking by ID
module.exports.getBookingById = (id, callback) => {
  Booking.findById(id, callback);
}

// Get bookings by userID
module.exports.getBookingByUserID = (userID, callback) => {
  const query = {userID: userID};
  Booking.find(query, callback);
}

// Delete a booking by ID
module.exports.deleteBookingsByID = (id, callback) =>  {
  const query = {id: id};
  Booking.deleteOne(query, callback);
}
