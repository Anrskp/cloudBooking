const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create new booking
router.post('/newBooking', (req, res, next) => {

    let newBooking = new Booking({
      userID: req.body.userID,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end
    });

    Booking.addBooking(newBooking, (err, booking) => {
      if (err) res.json({success: false, msg: 'failed to create booking'});
      else res.json({success: true, msg: 'booking added successfully'})
    })

});

// Get bookings by userID
router.post('/getBookings', (req, res, next) => {
  let userID = req.body.userID

  Booking.getBookingByUserID(userID, (err, bookings) => {
    if (err) res.json({success: false, msg: 'failed to get bookings'});
    else res.json({success: true, bookings});
  })
});

// Delete a booking by ID
router.post('/deleteBooking', (req, res, next) => {
  let bookingID = req.body.bookingID;
  Booking.deleteBookingsByID(bookingID);
});

module.exports.router = router;
