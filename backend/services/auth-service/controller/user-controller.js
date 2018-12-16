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
/*
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err
    callback(null, isMatch);
  });
};
*/

/*
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
          companyID: user.companyID,
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
*/

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

/*
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
    else if(response.length == 0) res.json({success: false, msg: 'no employees with that companyID'});
    else res.json({success: true, response});
  });
})

module.exports.router = router;
*/
