const mongoose = require('mongoose');
const Booking = require('../models/booking');

// add new bookin
function createBooking(req, res) {

  // check parameters
  req.checkBody('userID').notEmpty();
  req.checkBody('title').notEmpty();
  req.checkBody('start').notEmpty();
  req.checkBody('end').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.status('505');
    return res.json({
      success: false,
      errors
    });
  }

  let newBooking = new Booking({
    userID: req.body.userID,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    invites: req.body.invites
  });

  newBooking.save((err, booking) => {
    if (err) {
      res.status('505');
      return res.json({
        success: false,
        msg: 'failed to add new booking'
      });
    }

    res.status('200');
    return res.json({
      success: true,
      msg: 'booking added successfully'
    });
  });
}

// get bookings by user ID
function getBookings(req, res) {

  // get bookings invited to
  let userID = req.params.id;

  let allBookings = [];

  const inviteQuery = {
    invites: userID
  };

  Booking.find(inviteQuery, (err, bookings) => {
    if (err) return console.log(err);
    if (bookings.length) {
      allBookings.push(bookings);
    }
  })

  // get bookings created
  const query = {
    userID: userID
  };

  Booking.find(query, (err, bookings) => {
    if (err) {
      res.status('505');
      return res.json({
        success: false,
        msg: 'failed to retrieve bookings'
      });
    }

    if (!bookings.length) {
      res.status('505');
      return res.json({
        success: false,
        msg: "Could not find any bookings for userID " + userID
      })
    }

    allBookings.push(bookings);

    res.status('505');
    return res.json({
      success: true,
      allBookings
    });
  });
}

// update booking by bookingID
function editBooking(req, res) {

  // check parameters
  req.checkBody('userID').notEmpty();
  req.checkBody('title').notEmpty();
  req.checkBody('start').notEmpty();
  req.checkBody('end').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.status('505');
    return res.json({
      success: false,
      errors
    });
  }

  let bookingID = req.params.id;

  const query = {
    _id: bookingID
  }

  Booking.updateOne(query, req.body, {
    new: true
  }, (err, booking) => {
    if (err) {
      res.status('505')
      return res.json({
        success: false,
        msg: 'failed to update booking with id \'' + bookingID + '\''
      });
    }

    res.status('505');
    return res.json({
      success: true,
      msg: 'updated record with id  \'' + bookingID + '\' successfully'
    });
  });
};

// delete booking by bookingID
function deleteBooking(req, res) {
  let bookingID = req.params.id;
  const query = {
    _id: bookingID
  }

  Booking.remove(query, (err, result) => {
    if (err) {
      res.status('505');
      return res.json({
        success: false,
        msg: 'failed to delete booking with id \'' + bookingID + '\''
      });
    }

    res.status('505');
    return res.json({
      success: true,
      msg: 'deleted record with id \'' + bookingID + '\''
    });
  })
}

// exports api functions
module.exports = {
  getBookings,
  createBooking,
  editBooking,
  deleteBooking
};
