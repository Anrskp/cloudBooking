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

// Get user bookings by user ID
async function getBookings(req, res) {
  let userID = req.params.id;
  const response = await fetch('http://booking-service:3001/booking/' + userID);
  const json = await response.json();
  return res.json(json);
}

// Get entity bookings by entity ID
async function getEntityBookings(req, res) {
  let entityID = req.params.id;

  const response = await fetch('http://booking-service:3001/booking/entity/' + entityID);
  const json = await response.json();
  return res.json(json);
}

// Update a booking by booking ID
async function updateBooking(req, res) {
  let bookingID = req.params.id;

  const response = await fetch('http://booking-service:3001/booking' + bookingID, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify
  });

  const json = await response.json();
  return res.json(json);
}

// Delete a booking by booking ID
async function deleteBooking(req, res) {
  const response = await fetch('http://booking-service:3001/booking'+ '/' + bookingID, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  });

  const json = await response.json();
  return res.json(json);
}

// Check user availability
async function checkAvailability(req, res) {
  let start = req.params.start;
  let end = req.params.end;
  let userID = req.params.id;

  const response = await fetch('http://booking-service:3001/booking/userAvailabilty/' + userID + '/' + start + '/' + end);
  const json = await response.json();
  return res.json(json);
}

// Check entity availability
async function checkEntityAvailability(req, res) {
  let start = req.params.start;
  let end = req.params.end;
  let entityID = req.params.id

  const response = await fetch('http://booking-service:3001/booking/entityAvailabilty/' + entityID + '/' + start + '/' + end);
  const json = await response.json();
  return res.json(json);
}

// exports api functions
module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  checkAvailability,
  checkEntityAvailability,
  getEntityBookings
};
