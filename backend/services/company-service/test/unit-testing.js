'use strict';

const Company = require('../models/company');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const app = require('../app');

describe('Unit testing the company model', () => {

  // Mock booking
  var mockCompany = new Company({
    tag: "mockcomp",
    name: "mock company",
    address: "yellow brick road 69",
    phone: "+4569696969"
  });

  let companyID = "";


  // Create new company
  it('Should create a new booking and save it to DB', (done) => {
    Company.addCompany(mockCompany, (err, company) => {
      if (err) done(err);
      else companyID = company._id;
    })
    done();
  });

  // Find company by tag
  it('Should find a booking with userID from DB', (done) => {
    Company.getCompanyByTag(mockCompany.tag, (err, company) => {
      if (err) done(err)
      else console.log(company);
    })
    done();
  });


  // Delete a company
  it('Should delete a booking from ID', (done) => {
    Company.deleteCompanyByID(companyID, (err, res) => {
      if (err) done(err)
    })
    done();
  });

});
