'use strict';

const User = require('../models/user');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const app = require('../app');

describe('Unit testing the user model', () => {

  // Mock user
  var testUser = new User({
    companyID: "1",
    name: "mockUser",
    password: "password",
    email: "a@valid.email"
  });

  let hashedPassword = "";
  let userID = "";

  // Create new user
  it('Should add a new user with a hashed password to DB', (done) => {
    User.addUser(testUser, (err, user) => {
      if (err) done(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.name, "mockUser");
        expect(user.password).to.not.equal("password");
      }
      done();
    });
  });

  // Find user
  it('Should find a user with username "mockUser" from DB', (done) => {
    User.getUserByEmail(testUser.email, (err, user) => {
      if (err) console.log(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.name, testUser.name);
        assert.equal(user.email, testUser.email);

        hashedPassword = user.password;
        userID = user._id;
      }
      done();
    })
  });

  // Compare password
  it('Should compare passwords and return true', (done) => {
    User.comparePassword("password", hashedPassword, (err, isMatch) => {
      if (err) console.log(err);
      else {
        assert.equal(isMatch, true);
      }
      done();
    })
  });

  it('Should compare passwords and return false', (done) => {
    User.comparePassword("invalidPassword", hashedPassword, (err, isMatch) => {
      if (err) console.log(err);
      else {
        assert.equal(isMatch, false);
      }
      done();
    })
  });

  it('Should get all users from company id 1', (done) => {
    User.getUsersByCompanyID(testUser.companyID, (err, response) => {
      if (err) done(err);
      else {
        let amountFound = response.length
        expect(amountFound).to.be.at.least(1);
      }
      done();
    })
  })

  // Delete user by ID
  it('Should delete "mockUser" by ID', (done) => {
    User.deleteUserByID(userID, (err, response) => {
      if (err) done(err);
      else {
        let amountDeleted = response.n
        expect(amountDeleted).to.be.at.least(1);
      }
      done();
    });
  });

});
