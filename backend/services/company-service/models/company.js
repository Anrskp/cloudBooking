const mongoose = require('mongoose');


// Entities Schema
const entitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Booking Schema
const companySchema = mongoose.Schema({
  tag: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  entities: [entitySchema]
});

const Company = module.exports = mongoose.model('Company', companySchema);
