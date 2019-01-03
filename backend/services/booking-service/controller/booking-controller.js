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

  let users = req.body.invites;
  let start = req.body.start;
  let end = req.body.end;


  users.push(req.body.userID);


  if (start < new Date().toISOString() || end < start) {
    return res.json({
      success: false,
      msg: "Invalid dates"
    })
  }

  // check availability
  checkAll(users, start, end).then(result => {
    if (result.length) {
      return res.json({
        success: false,
        conflicts: result
      })
    } else {

      let newBooking = new Booking({
        userID: req.body.userID,
        title: req.body.title,
        message: req.body.message,
        start: req.body.start,
        end: req.body.end,
        invites: req.body.invites,
        entityID: req.body.entityID,
        notification: req.body.notification
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
  })

}

// get bookings by user ID
function getBookings(req, res) {

  // get bookings invited to
  let userID = req.params.id;

  Booking.find({
    $or: [{
      userID: userID
    }, {
      invites: userID
    }]
  }, function(err, allBookings) {
    if (err) {
      return res.json({
        success: false,
        msg: 'Failed to get bookings for user with id ' + userID
      })
    }

    if (!allBookings.length) {
      return res.json({
        success: true,
        msg: 'No bookings for user with id ' + userID
      })
    }

    return res.json({
      success: true,
      allBookings
    })
  })
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
    res.status('400');
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

    res.status('201');
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

  Booking.deleteOne(query, (err, result) => {
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

function checkUserAvailability(req, res) {

  let start = req.params.start;
  let end = req.params.end;
  let userID = req.params.id;

  Booking.find({
    $and: [{
        $or: [{
          userID: userID
        }, {
          invites: userID
        }]
      },
      {
        $and: [{
          start: {
            $lt: end
          }
        }, {
          end: {
            $gt: start
          }
        }]
      }
    ]
  }, function(err, results) {
    if (err) {
      return res.json({
        success: false,
        msg: 'Failed to check bookings for id ' + userID
      })
    }

    if (results.length) {
      return res.json({
        success: true,
        available: false
      })
    }

    return res.json({
      success: true,
      available: true
    });
  });

};

function getEntityBookings(req, res) {

  let entityID = req.params.id

  const query = {
    entityID: entityID
  }

  Booking.find(query, (err, bookings) => {

    // Error
    if (err) {
      res.status('500')
      return res.json({
        success: false,
        msg: 'Could not get bookings for entityID ' + entityID
      });
    }

    // No content
    if (!bookings.length) {
      res.status('404')
      return res.json({
        success: false,
        msg: 'No bookings for entityID ' + entityID
      });
    }

    // Success
    res.status('200')
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
    $and: [{
        entityID: entityID
      },
      {
        $and: [{
          start: {
            $lt: end
          }
        }, {
          end: {
            $gt: start
          }
        }]
      }
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



function checkOverallAvailability(req, res) {

  let start = req.body.start
  let end = req.body.end
  let users = req.body.users
  let entity = req.body.entity

  checkAll(users, start, end).then(result => {
    if (result.length) {
      return res.json({
        success: false,
        conflicts: result
      })
    } else {
      return res.json({
        success: true,
        msg: "booking is created!"
      })
    }
  })

}


async function checkAll(users, start, end) {

  let conflicts = [];

  // try catch here
  for (const x of users) {
    await Booking.find({
      $and: [{
          $or: [{
            userID: x
          }, {
            invites: x
          }]
        },
        {
          $and: [{
            start: {
              $lt: end
            }
          }, {
            end: {
              $gt: start
            }
          }]
        }
      ]
    }, function(err, results) {
      if (results.length) {
        conflicts.push(x);
      }
    })
  }

  return conflicts;
}

// exports api functions
module.exports = {
  getBookings,
  getEntityBookings,
  createBooking,
  editBooking,
  deleteBooking,
  checkUserAvailability,
  checkEntityAvailability,
  checkOverallAvailability
};
