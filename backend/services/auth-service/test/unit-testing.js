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

  // Create new user
  it('Should add a new user with a hashed password to DB', (done) => {
    User.addUser(testUser, (err, user) => {
      if (err) done(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.username, "mockUser");
        expect(user.password).to.not.equal("password");
      }
      done();
    });
  });

  // Find user
  it('Should find a user with username "mockUser" from DB', (done) => {
    User.getUserByUsername(testUser.username, (err, user) => {
      if (err) console.log(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.username, testUser.username);
        assert.equal(user.email, testUser.email);
        hashedPassword = user.password;
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

  // Delete user
  it('Should delete a user with username "mockUser"', (done) => {
    User.deleteUserByUsername('mockUser', (err, response) => {
      if (err) console.log(err);
      else {
        let amountDeleted = response.n
        expect(amountDeleted).to.be.at.least(1);
      }
      done();
    });
  });

});
