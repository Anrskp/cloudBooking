'use strict';

const Booking = require('../models/booking');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const app = require('../app');

describe('Unit testing the booking model', () => {

  // Mock booking
  var mockBooking = new Booking({
    userID: "1",
    title: "mock booking",
    start: "2018-12-05T16:00:00",
    end: "2018-12-05T17:00:00"
  });

  let bookingID = "";

  // Create new booking
  it('Should create a new booking and save it to DB', (done) => {
    Booking.addBooking(mockBooking, (err, booking) => {
      if (err) done(err);
      else bookingID = booking._id;
      console.log(bookingID);
    })
    done();
  });

  // Find bookings by userID
  it('Should find a booking with userID from DB', (done) => {
    Booking.getBookingByUserID(1, (err, bookings) => {
      if (err) done(err);
    })
    done();
  });

  // Delete booking
  it('Should delete a booking from ID', (done) => {
    Booking.deleteBookingsByID(bookingID, (err, res) => {
      if (err) done(err)
      else {
        let amountDeleted = res.n;
        expect(amountDeleted).to.be(1);
      }
    })
    done();
  });

});
