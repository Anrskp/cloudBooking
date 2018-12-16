const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Create new user
function registerUser(req, res) {

  let newUser = new User({
    companyID: req.body.companyID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // check if email is taken
  const query = {
    email: email
  };

  User.findOne(query, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'failed to register user'
      });
    }

    if (user) {
      return res.json({
        success: false,
        msg: 'Email already in use'
      });

  // hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash;

      // add user
      newUser.save((err, user) => {
        if (err) {
          res.status('505');
          return res.json({
            success: false,
            msg: 'failed to add new user'
          });
        }

        res.status('505');
        return res.json({
          success: true,
          msg: 'user added successfully'
        });
      })
    })
  })
}

// Authenticate user
function authenticateUser(req, res) {

  const password = req.body.password;
  const email = req.body.email;

  const query = {
    email: email
  };

  User.findOne(query, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'failed to authenticate user'
      });
    }

    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, config.secret, {
          expiresIn: 7200 // 2 hours
        });

        return res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            companyID: user.companyID,
            email: user.email,
            name: user.name
          }
        });

      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }

    });
  })
}

// Get users by companyID
function getUsersByCompanyID(req, res) {

}

// Update user
function editUser(req, res) {

}

// Delete user
function deleteUser(req, res) {

}


// exports api functions
module.exports = {
  registerUser,
  authenticateUser,
  getUsersByCompanyID,
  editUser,
  deleteUser
};
