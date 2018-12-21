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
    res.status('200');
    return res.json({
      success: false,
      errors
    });
  }

  let newBooking = new Booking({
    userID: req.body.userID,
    title: req.body.title,
    message: req.body.message,
    start: req.body.start,
    end: req.body.end,
    invites: req.body.invites,
    entityID: req.body.entityID
  });

  newBooking.save((err, booking) => {
    if (err) {
      res.status('200');
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
    if (err) throw (err);
    if (bookings.length) {
      allBookings = allBookings.concat(bookings);
    }
  })

  // get bookings created
  const query = {
    userID: userID
  };

  Booking.find(query, (err, bookings) => {
    if (err) {
      res.status('200');
      return res.json({
        success: false,
        msg: 'failed to retrieve bookings'
      });
    }

    if (!bookings.length) {
      res.status('200');
      return res.json({
        success: false,
        msg: "Could not find any bookings for userID " + userID
      })
    }

    allBookings = allBookings.concat(bookings);

    res.status('200');
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
    res.status('200');
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
      res.status('200')
      return res.json({
        success: false,
        msg: 'failed to update booking with id \'' + bookingID + '\''
      });
    }

    res.status('200');
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
      res.status('200');
      return res.json({
        success: false,
        msg: 'failed to delete booking with id \'' + bookingID + '\''
      });
    }

    res.status('200');
    return res.json({
      success: true,
      msg: 'deleted record with id \'' + bookingID + '\''
    });
  })
}

async function checkUserAvailability(req, res) {

  let start = req.params.start;
  let end = req.params.end;
  let userID = req.params.id;

  Booking.find({
      $and: [
          { $or: [{userID: userID}, {invites: userID}] },
          { $and: [{start: {$lt: end}}, {end: {$gt: start}}] }
      ]
  }, function (err, results) {
      if(err) {
        return res.json({success: false, msg: 'Failed to check bookings for id ' + userID})
      }

      if(results.length) {
        return res.json({success: true, available: false})
      }

      return res.json({success: true, available: true});
  });

};

/*
  Booking.find({
    $and: [{ $or: [{userID: userID}, {invites: userID}]},
    {$or: [{ start: { $lte: end }}, {end: { $gte: start }},
    ]]}}, function(err, data) {
    if (err) {
      return res.json({
        success: false,
        msg: 'failed to get bookings'
      })
    }

    if (data.length) {
      console.log(data);
      return res.json({
        success: true,
        available: false
      })
    }

    return res.json({
      success: true,
      available: true
    })
  })
*/


  /*
  let isAvaiable = true;
  let allBookings = [];

  console.log("params : id: " + userID + " start: " + start + " end: " + end)

  let promise = new Promise((resolve, reject) => {


    // get bookings invited to.
    const inviteQuery = {
      invites: userID
    };

    Booking.find(inviteQuery, (err, bookings) => {
      if (err) throw (err);
      if (bookings.length) {
        allBookings = allBookings.concat(bookings);
      }
    });

    // get bookings created.
    const query = {
      userID: userID
    };

    Booking.find(query, (err, bookings) => {
      if (err) {
        res.status('200');
        return res.json({
          success: false,
          msg: ''
        });
      }

      if (!bookings.length) {
        res.status('200');
        return res.json({
          success: false,
          msg: 'empty'
        })
      }
      allBookings = allBookings.concat(bookings);
      resolve(allBookings);
    })
  }).then((allBookings) => {

    for (let i = 0; i < allBookings.length; i++) {

      let currentBooking = allBookings[i];

      if (!(end < currentBooking.end && start < currentBooking.start || end > currentBooking.end && start > currentBooking.start)) {
        isAvaiable = false;
        break;
      }
    }

    return res.json({
      success: true,
      available: isAvaiable
    })

  })
  */


function getEntityBookings(req, res) {

  let entityID = req.params.id

  const query = {
    entityID: entityID
  }

  Booking.find(query, (err, bookings) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'Could not get bookings for entityID ' + entityID
      });
    }
    if (!bookings.length) {
      return res.json({
        success: false,
        msg: 'No bookings for entityID ' + entityID
      });
    }

    return res.json({
      success: true,
      bookings
    })
  })
}

function checkEntityAvailability(req, res) {

  let entityID = req.params.id;
  let start = req.params.start;
  let end = req.params.end;
  let isAvaiable = true;

  const query = {
    entityID: entityID
  }

  Booking.find({
    $and: [
        { {entityID: entityID} },
        { $and: [{start: {$lt: end}}, {end: {$gt: start}}] }
    ]
  }, function(err, data) {
    if (err) throw err

    if (data.length) {
      return res.json({
        success: true,
        isAvailable: false
      })
    }

    return res.json({
      success: true,
      isAvailable: true
    })

  });
}

// exports api functions
module.exports = {
  getBookings,
  getEntityBookings,
  createBooking,
  editBooking,
  deleteBooking,
  checkUserAvailability,
  checkEntityAvailability
};
