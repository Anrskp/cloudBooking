'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));

describe('testing company service', function() {

  // Id storage
  let mockCompanyID = "";

  // Mock company
  let testCompany = {
    tag: "MC",
    name: "Mock Company",
    address: "Mocklane 31, Copenhagen 2200",
    phone: "+4599999999",
    entities: [{
      name: "A1"
    }, {
      name: "A2"
    }, {
      name: "A3"
    }]
  };

  // Add a new company
  it('Should add a new company to the database', () => {
    return chai.request(app)
      .post('/company')
      .send(testCompany)
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.success, true);
      });
  });

  // Mock company with missing values
  let testCompanyError = {
    address: "Mocklane 31, Copenhagen 2200",
    phone: "+4599999999",
    entities: [{
      name: "A1"
    }, {
      name: "A2"
    }, {
      name: "A3"
    }]
  };


  // Add a new company
  it('Should return with error message - "invalid value" ', () => {
    return chai.request(app)
      .post('/company')
      .send(testCompanyError)
      .then(function(res) {
        //expect(res).to.have.status(200); expect error code for invalid request

        expect(res).to.be.json;
        assert.equal(res.body.success, false);

        assert.equal(res.body.errors[0].location, "body")
        assert.equal(res.body.errors[0].param, "tag")
        assert.equal(res.body.errors[0].msg, "Invalid value")
      });
  });

  // find company
  it('Should find the mock company created by TAG', () => {
    return chai.request(app)
      .get('/companytag/MC')
      .then(function(res) {
        mockCompanyID = res.body.company._id;
        //expect(res).to.have.status(200); expect error code for invalid request
        expect(res).to.be.json;
        assert.equal(res.body.company.name, "Mock Company")
        assert.equal(res.body.success, true);
      });
  });

  // get entities
  it('Should get entities from mock company', () => {
    return chai.request(app)
      .get('/company/entities/' + mockCompanyID)
      .then(function(res) {
        //expect(res).to.have.status(200); expect error code for invalid request
        assert.equal(res.body.success, true)
        assert.equal(res.body.result[0].entities.length, 3)
        expect(res.body.result[0]).to.have.property('entities')

      });
  });

  // update
  let testCompanyUpdate = {
    tag: "MC",
    name: "Mock Company",
    address: "Mocklane 31, Copenhagen 2200",
    phone: "+4511111111",
    entities: [{
      name: "A1"
    }, {
      name: "A2"
    }, {
      name: "A3"
    }]
  };

  // update
  it('Should delete MockCompany by ID', () => {
    return chai.request(app)
      .put('/company/' + mockCompanyID)
      .send(testCompanyUpdate)
      .then(function(res) {

        //expect(res).to.have.status(200); expect error code for invalid request
        assert.equal(res.body.success, true)
      });
  });

  // Remove a company by ID
  it('Should delete MockCompany by ID', () => {
    return chai.request(app)
      .delete('/company/' + mockCompanyID)
      .then(function(res) {
        //expect(res).to.have.status(200); expect error code for invalid request
        assert.equal(res.body.success, true)
      });
  });


})
