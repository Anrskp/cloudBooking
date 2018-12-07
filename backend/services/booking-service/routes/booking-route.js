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
    if (err) res.json({
      success: false,
      msg: 'failed to create booking'
    });
    else res.json({
      success: true,
      msg: 'booking added successfully'
    })
  })

});

// Get bookings by userID
router.post('/getBookings', (req, res, next) => {
  let userID = req.body.userID

  Booking.getBookingByUserID(userID, (err, bookings) => {
    if (err) res.json({
      success: false,
      msg: 'failed to get bookings'
    });
    else res.json({
      success: true,
      bookings
    });
  })
});

// check if user is avaible at that time
router.post('/isUserAvaiable', (req, res, next) => {

  let userID = req.body.userID;
  let start = req.body.start;
  let end = req.body.end;
  let isFree = false;

  if (!userID || !start || !end) {
    res.json({
      success: false,
      msg: 'missing parameters'
    })
  }

  Booking.getBookingByUserID(userID, (err, bookings) => {
    if (err) done(err);
    else {
      
      bookings.forEach((e) => {
        // Dates in db
        console.log(e.start + " - " + e.end)
        if (!(end < e.start) && (start > e.end)) {
          isFree = true;
        }
      })
    }
    res.json({
      success: true,
      available: isFree
    });
  })
})


// Delete a booking by ID
router.post('/deleteBooking', (req, res, next) => {
  let bookingID = req.body.bookingID;
  Booking.deleteBookingsByID(bookingID);
});

module.exports.router = router;
