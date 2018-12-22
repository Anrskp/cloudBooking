module.exports = function(app) {
  let companyCtrl = require('../controller/company-controller');

  app.route('/company')
    .post(companyCtrl.createCompany);


  app.route('/company/entities/:id')
    .get(companyCtrl.getCompanyEntitiesById);

  app.route('/companytag/:id')
    .get(companyCtrl.getCompanyByTag);

  app.route('/company/:id')
    .get(companyCtrl.getCompanyById)
    .put(companyCtrl.editCompanyById)
    .delete(companyCtrl.deleteCompanyById);

};
