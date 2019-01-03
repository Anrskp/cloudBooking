  const mongoose = require('mongoose');
  const User = require('../models/user');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const config = require('../config/database');

  // Create new user
  function registerUser(req, res) {

    // check parameters
    req.checkBody('companyID').notEmpty();
    req.checkBody('name').notEmpty();
    req.checkBody('email').notEmpty();
    req.checkBody('password').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      res.status('400');
      return res.json({
        success: false,
        errors
      });
    }

    let newUser = new User({
      companyID: req.body.companyID,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // check if email already exist
    const query = {
      email: newUser.email
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
          msg: 'The email is already in use'
        });
      }

      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash;

          // add user
          newUser.save((err, user) => {
            if (err) {
              res.status('500');
              return res.json({
                success: false,
                msg: 'failed to add new user'
              });
            }

            res.status('201');
            return res.json({
              success: true,
              msg: 'user added successfully'
            });
          })
        })
      })
    })
  }

  // Authenticate user
  function authenticateUser(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    // check parameters
    req.checkBody('email').notEmpty();
    req.checkBody('password').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      res.status('400');
      return res.json({
        success: false,
        errors
      });
    }

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
        res.status('204')
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

  // find with out password /* TODO */

  function getUsersByCompanyID(req, res) {

    let companyID = req.params.id;

    query = {
      companyID: companyID
    }

    User.find(query, '-password', (err, users) => {
      if (err) throw err

      if (!users.length) {
        res.status('204')
        return res.json({
          success: false,
          msg: 'empty'
        })
      }
      res.status('200')
      return res.json({
        success: true,
        users
      })
    })

  }

  // Update user
  function editUser(req, res) {

    /* TODO */

  }

  // Delete user
  function deleteUser(req, res) {

    let userID = req.params.id;

    query = {
      _id: userID
    }

    User.deleteOne(query, (err, result) => {
      if (err) throw err

      if (result.n == 0) {
        res.status('204')
        return res.json({
          success: false,
          msg: 'user with id' + userID + 'not found'
        })
      }
      res.status('200')
      return res.json({
        success: true,
        msg: 'deleted user with id ' + userID + 'successfully'
      })
    })

  }


  // exports api functions
  module.exports = {
    registerUser,
    authenticateUser,
    getUsersByCompanyID,
    editUser,
    deleteUser
  };
