const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// Register a new user.
router.post('/register', (req, res, next) => {

  let newUser = new User({
    companyID: req.body.companyID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // is email already in use.
  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) throw err
    if (user != null) {
      res.json({
        success: false,
        msg: 'email already in use'
      })
    } else {
      // add user to db
      User.addUser(newUser, (err, user) => {
        if (err) res.json({
          success: false,
          msg: 'failed to register user'
        })
        else res.json({
          success: true,
          msg: 'user registered successfully'
        })
      })
    }
  })
});


// Authenticate a user
router.post('/authenticate', (req, res, next) => {

  const password = req.body.password;
  const email = req.body.email;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          data: user
        }, config.secret, {
          expiresIn: 7200 // 2 hours
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    });
  });
});

router.post('/getEmployees', (req, res, next) => {

  const companyID = req.body.companyID;

  User.getUsersByCompanyID(companyID, (err, response) => {
    if (err) res.json({success: false, msg: "failed to get users"});
    else res.json({success: true, response});
  })
})

module.exports.router = router;
