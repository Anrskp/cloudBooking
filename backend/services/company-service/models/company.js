const mongoose = require('mongoose');

// add entities

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
  }
});

const Company = module.exports = mongoose.model('Company', companySchema);

/*
// Methods

// Add new company
module.exports.addCompany = function(newCompany, callback) {
  newCompany.save(callback);
}

// Get company by ID
module.exports.getCompanyById = (id, callback) => {
  Company.findById(id, callback);
}

// Get company by route-tag
module.exports.getCompanyByTag = (tag, callback) => {
  const query = {tag: tag};
  Company.find(query, callback);
}

// Delete a company by ID
module.exports.deleteCompanyByID = (id, callback) =>  {
  const query = {id: id};
  Company.deleteOne(query, callback);
}
*/
