const fetch = require('node-fetch');

// Get colleagues
function getUsersByCompanyID() {

}

// Register a new user
function registerUser() {

  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body);
  });

  const json = await response.json();
  return res.json(json);

}

// Authenticate a user
async function authenticateUser(req, res) {

  const response = await fetch('http://localhost:3000/authenticate', {
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
