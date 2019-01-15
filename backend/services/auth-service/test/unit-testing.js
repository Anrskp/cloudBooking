'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));

describe('testing authentication service', function() {

  let mockuser = {
    companyID: "123",
    name: "Mock User",
    email: "mock@user.com",
    password: "123456"
  }

  let mockuserID = "";

  // Add a new user with missing value
  it('Should fail to add user with missing values (companyID)', () => {
    return chai.request(app)
      .post('/register')
      .send({name: mockuser.name, email: mockuser.email, password: mockuser.password})
      .then(function(res) {

        expect(res).to.have.status(400);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
        assert.equal(res.body.errors[0].location, 'body');
        assert.equal(res.body.errors[0].param, 'companyID');
        assert.equal(res.body.errors[0].msg, 'Invalid value');
      });
  });

  // Add a new user
  it('Should add a new user to the database', () => {
    return chai.request(app)
      .post('/register')
      .send(mockuser)
      .then(function(res) {

        expect(res).to.have.status(201);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });

  let mockuserLogin = {
    email: mockuser.email,
    password: mockuser.password
  }

  // Authenticate user
  it('Should authenticate mock user and return token and user', () => {
    return chai.request(app)
      .post('/authenticate')
      .send(mockuserLogin)
      .then(function(res) {

        mockuserID = res.body.user.id;

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user).to.not.equal(null);
        expect(res.body.token).to.not.equal(null);
        assert.equal(res.body.success, true);
      });
  });

  // Add user where email is already in use
  it('Should fail to register user with email already in use', () => {
    return chai.request(app)
      .post('/register')
      .send(mockuser)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, false);
        assert.equal(res.body.msg, 'The email is already in use')
      });
  });

  // Find user(s) by companyID
  it('Should find mockuser by companyID', () => {
    return chai.request(app)
      .get('/user/' + mockuser.companyID)
      .then(function(res) {

        let userFound = res.body.users[0]

        expect(userFound).to.have.property('_id');
        expect(userFound).to.have.property('companyID');
        expect(userFound).to.have.property('name');
        expect(userFound).to.have.property('email');

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });

  // delete user
  it('Should delete mock user', () => {
    return chai.request(app)
      .delete('/user/' + mockuserID)
      .send(mockuser)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
        });
  });

})
