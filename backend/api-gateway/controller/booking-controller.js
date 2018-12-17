const fetch = require('node-fetch');
const endpoint = "http://booking-service:3001";

//  Add new booking
async function createBooking(req, res) {
  const response = await fetch('http://booking-service:3001/booking', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();
  return res.json(json);
}

// Get bookings by user ID
async function getBookings(req, res) {
  let userID = req.params.id;
  const response = await fetch('http://booking-service:3001/booking/' + userID);
  const json = await response.json();
  return res.json(json);
}

// Update a booking by booking ID
function updateBooking() {

}

// delete a booking by booking ID
function deleteBooking() {

}

// Check availability
function checkAvailability() {

}

// exports api functions
module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  checkAvailability
};
