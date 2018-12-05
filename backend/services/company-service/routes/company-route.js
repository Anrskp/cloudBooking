const express = require('express');
const router = express.Router();
const Company = require('../models/company');

// Create a new company
router.post('/newCompany', (req, res, next) => {

    let newCompany = new Company({
      tag: req.body.tag,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    });

    Company.addCompany(newCompany, (err, company) => {
      if (err) res.json({success: false, msg: 'failed to create company'});
      else res.json({success: true, msg: 'company added successfully'})
    })

});

// Get company by ID
router.post('/getCompanyById', (req, res, next) => {
  let companyID = req.body.companyID;

  Company.getCompanyById(companyID, (err, company) => {
    if (err) res.json({success: false, msg: 'failed to get company'});
    else res.json({success: true, company});
  })
});

// Get company by tag
router.post('/getCompanyByTag', (req, res, next) => {
  let companyTag = req.body.tag;

  Company.getCompanyByTag(companyTag, (err, company) => {
    if (err) res.json({success: false, msg: 'failed to get company'});
    else res.json({success: true, company})
  })
})

// Delete a company by ID
router.post('/deleteCompanyByID', (req, res, next) => {
  let companyID = req.body.companyID;

  Company.deleteCompanyByID(companyID, (err, company) => {
    if (err) res.json({success: false, msg: 'failed to delete company'})
    else res.json({success: true})
  });
});

module.exports.router = router;
