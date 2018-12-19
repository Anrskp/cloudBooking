module.exports = function(app) {
  let companyCtrl = require('../controller/company-controller');


  app.route('/company')
    .post(companyCtrl.createCompany);

  /*

  app.route('/company/:id')
    .get(bookingCtrl.getBookings)
    .put(bookingCtrl.editBooking)
    .delete(bookingCtrl.deleteBooking);

  */
  
};
