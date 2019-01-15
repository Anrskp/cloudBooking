const fetch = require('node-fetch');
const endpoint = 'http://auth-service:3000';
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// Get colleagues
async function getUsersByCompanyID(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })

  let companyID = req.params.id;
  const response = await fetch('http://auth-service:3000/user/' + companyID);
  const json = await response.json();
  return res.json(json);
}

// Register a new user
async function registerUser(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(!token) {
    return res.json({success: false, msg: 'no auth token'})
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) {
      return res.json({success: false, msg: 'invalid auth token'})
    }
  })


  const response = await fetch('http://auth-service:3000/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();
  return res.json(json);
}

// Authenticate a user
async function authenticateUser(req, res) {

  const response = await fetch('http://auth-service:3000/authenticate', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();
  return res.json(json);
}

// Edit user details
function editUser() {

}

// Delete a user
async function deleteUser(req, res) {
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

  const response = await fetch('http://auth-service:3000/user/' + userID, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  });

  const json = await response.json();
  return res.json(json);
}

// exports api functions
module.exports = {
  getUsersByCompanyID,
  registerUser,
  authenticateUser,
  editUser,
  deleteUser
};
