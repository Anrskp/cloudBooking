const fetch = require('node-fetch');
const endpoint = "http://booking-service:3001";
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//  Add new booking
async function createBooking(req, res) {

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })

  const response = await fetch('http://booking-service:3001/booking', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();

  if (req.body.notification && json.success) {

    let users = req.body.invites;
    let emails = users.map(user => user.email).join(",");

    emailInfo = {
      title: req.body.title,
      emails: emails,
      start: req.body.start,
      end: req.body.end,
      message: req.body.message
    }

    const response = await fetch('http://notification-service:3003/sendNotifications', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(emailInfo)
    });

  }

  return res.json(json);
}

// Get user bookings by user ID
async function getBookings(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })

  let userID = req.params.id;
  const response = await fetch('http://booking-service:3001/booking/' + userID);
  const json = await response.json();
  return res.json(json);
}

// Get entity bookings by entity ID
async function getEntityBookings(req, res) {

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })

  let entityID = req.params.id;

  const response = await fetch('http://booking-service:3001/booking/entity/' + entityID);
  const json = await response.json();
  return res.json(json);
}

// Update a booking by booking ID
async function updateBooking(req, res) {
  let bookingID = req.params.id;

  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })
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
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })
  let bookingID = req.params.id;
  const response = await fetch('http://booking-service:3001/booking/' + bookingID, {
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
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })
  let start = req.params.start;
  let end = req.params.end;
  let userID = req.params.id;

  const response = await fetch('http://booking-service:3001/booking/userAvailabilty/' + userID + '/' + start + '/' + end);
  const json = await response.json();
  return res.json(json);
}

// Check entity availability
async function checkEntityAvailability(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })
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
