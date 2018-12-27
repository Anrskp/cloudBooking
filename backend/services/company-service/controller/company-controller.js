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

function getCompanyByTag(req, res) {

  let tag = req.params.id;

  const query = {
    tag: tag
  }

  Company.findOne(query, (err, company) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'Failed to get company info for tag: ' + tag
      })
    }

    if (!company) {
      return res.json({
        success: false,
        msg: 'No company with tag: ' + tag
      })
    }

    return res.json({
      success: true,
      company
    })
  })

}

function getCompanyEntitiesById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.find(query).select('entities -_id').exec(function(err, result) {
    if (err) return res.json({
      success: false,
      msg: 'Invalid id'
    })

    if (!result.length) {
      return res.json({
        success: false,
        msg: 'No entities for company with id ' + companyID
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
        msg: 'Failed to add new company'
      });
    }

    res.status('200');
    return res.json({
      success: true,
      msg: 'Company added successfully'
    });
  });
}

// Edit company info by ID
function editCompanyById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.updateOne(query, req.body, {
    new: true
  }, (err, company) => {
    if (err) {
      res.status('200')
      return res.json({
        success: false,
        msg: 'Failed to update company with id \'' + companyID + '\''
      });
    }

    res.status('200');
    return res.json({
      success: true,
      msg: 'Updated company with id  \'' + companyID + '\' successfully'
    });
  });

}

// Delete a company by ID
function deleteCompanyById(req, res) {

  let companyID = req.params.id;

  const query = {
    _id: companyID
  }

  Company.deleteOne(query, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        msg: 'Failed to remove company with id ' + companyID
      });
    }

    return res.json({
      success: true,
      msg: 'Company deleted successfully'
    })
  })

}

function createNewEntity(req, res) {

  let companyID = req.params.id;
  let entity = req.body.entity

  const query = {
    _id: companyID
  }

  Company.updateOne(query, {$push: {entities: {name: entity} }}, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        msg: "Couldent update entities for company id " + companyID
      })
    }


    if(result.n == 0) {
      return res.json({
        success: false,
        msg: "Couldent find company with id: " + companyID
      })
    }

    return res.json({
      success: true,
      msg: "added new entity"
    })
  })

}

// exports api functions
module.exports = {
  getCompanyById,
  getCompanyByTag,
  getCompanyEntitiesById,
  createCompany,
  editCompanyById,
  deleteCompanyById,
  createNewEntity
};
