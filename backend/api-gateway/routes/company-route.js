module.exports = function(app) {
  let companyCtrl = require('../controller/company-controller');

  // create company, edit company, delete company

  app.route('/company/entities/:id')
    .get(companyCtrl.getCompanyEntities)
    .put(companyCtrl.createNewEntity);

  app.route('/company/:companyID/:entityID')
    .delete(companyCtrl.deleteEntity);

};
