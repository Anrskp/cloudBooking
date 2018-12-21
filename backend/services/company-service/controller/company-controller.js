const mongoose = require('mongoose');
const Company = require('../models/company');

function getCompanyById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.find(query, (err, company) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'Failed to get company info for id ' + companyID
      })
    }

    if (!company) {
      return res.json({
        success: false,
        msg: 'No company with id ' + companyID
      })
    }

    return res.json({
      success: true,
      company
    })
  })
}

function getCompanyByTag() {

  /* TODO */

}

function getCompanyEntitiesById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.find(query).select('entities -_id').exec(function(err, result) {
    if (err) return res.json({
      success: false,
      msg: 'invalid id'
    })

    if (!result.length) {
      return res.json({
        success: false,
        msg: 'empty'
      });
    }

    return res.json({
      success: true,
      result
    });
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
