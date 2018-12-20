const mongoose = require('mongoose');
const Company = require('../models/company');

function getCompanyById() {

  /* TODO */

}

function getCompanyByTag() {

  /* TODO */

}

function getCompanyEntitiesById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.find(query).select('entities').exec(function (err, entities) {
    if (err) return res.json({success: false, msg: 'invalid id'})

    if(!entities.length) {
      return res.json({success: false, msg: 'empty'});
    }

    return res.json({entities: entities});
  })

}

function createCompany(req, res) {

  // check parameters
  req.checkBody('tag').notEmpty();
  req.checkBody('name').notEmpty();
  req.checkBody('address').notEmpty();
  req.checkBody('phone').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.status('200');
    return res.json({
      success: false,
      errors
    });
  }

  let newCompany = new Company({
    tag: req.body.tag,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    entities: req.body.entities
  });

  newCompany.save((err, booking) => {
    if (err) {
      console.log(err);

      res.status('200');
      return res.json({
        success: false,
        msg: 'failed to add new company'
      });
    }

    res.status('200');
    return res.json({
      success: true,
      msg: 'company added successfully'
    });
  });
}

function editCompanyById() {

  /* TODO */

}

function deleteCompanyById() {

  /* TODO */

}

// exports api functions
module.exports = {
  getCompanyById,
  getCompanyByTag,
  getCompanyEntitiesById,
  createCompany,
  editCompanyById,
  deleteCompanyById
};
