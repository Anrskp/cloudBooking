'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));

describe('testing booking service', function() {

  let start = new Date()
  let end = new Date()
  start.setHours(start.getHours() + 25);
  end.setHours(end.getHours() + 49);

  let mockBooking = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  let bookingID = "";

  // Create a new booking
  it('Should add a new company to the database', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() + 10)
  end.setHours(end.getHours() + 40)

  let mockBooking2 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  it('conflict 1 - current end between start and end of a booking', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking2)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() + 30)
  end.setHours(end.getHours() + 70)

  let mockBooking3 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  it('conflict 2 - current start between start and end of a booking', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking3)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() + 30)
  end.setHours(end.getHours() + 40)

  let mockBooking4 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  it('conflict 3 - current start and end is both between start and end of a booking', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking4)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() + 10)
  end.setHours(end.getHours() + 70)

  let mockBooking5 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  it('conflict 4 - current start and end overlap timespan of a booking', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking5)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
      });
  });

  it('Get user bookings', () => {
    return chai.request(app)
      .get('/booking/' + mockBooking.userID)
      .then(function(res) {

        bookingID = res.body.allBookings[0]._id;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });

  let mockBooking6 = {
    title: "Mock Booking",
    message: "This is a simple mock booking",
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  it('Should fail to register booking with invalid values', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking6)
      .then(function(res) {

        let error = res.body.errors[0]

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
        assert.equal(error.location, 'body');
        assert.equal(error.param, 'userID');
        assert.equal(error.msg, 'Invalid value');
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() - 10)
  end.setHours(end.getHours() - 40)

  let mockBooking7 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  // Create a new booking
  it('Should return false with dates in the past', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking7)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
        assert.equal(res.body.msg, 'Invalid dates');
      });
  });

  start = new Date();
  end = new Date();
  start.setHours(start.getHours() + 80)
  end.setHours(end.getHours() + 40)

  let mockBooking8 = {
    userID: "99",
    title: "Mock Booking",
    message: "This is a simple mock booking",
    start: start.toISOString(),
    end: end.toISOString(),
    invites: ["66"],
    entityID: "11",
    notification: false
  }

  // Create a new booking
  it('Should return false because end date > start date', () => {
    return chai.request(app)
      .post('/booking')
      .send(mockBooking8)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
        assert.equal(res.body.msg, 'Invalid dates');
      });
  });

  it('Should delete mock booking', () => {
    return chai.request(app)
      .delete('/booking/' + bookingID)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });


})
