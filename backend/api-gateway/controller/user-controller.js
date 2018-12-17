const fetch = require('node-fetch');
const endpoint = 'http://auth-service:3000';

// Get colleagues
async function getUsersByCompanyID() {

}

// Register a new user
async function registerUser(req, res) {

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

// exports api functions
module.exports = {
  getUsersByCompanyID,
  registerUser,
  authenticateUser,
  editUser
};
