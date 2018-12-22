module.exports = function(app) {
  let bookingCtrl = require('../controller/booking-controller');

  app.route('/booking')
    .post(bookingCtrl.createBooking);

  app.route('/booking/userAvailabilty/:id/:start/:end')
    .get(bookingCtrl.checkUserAvailability);

  app.route('/booking/entityAvalability/:id/:start/:end')
    .get(bookingCtrl.checkEntityAvailability)

  app.route('/booking/entity/:id')
    .get(bookingCtrl.getEntityBookings);

  app.route('/booking/:id')
    .get(bookingCtrl.getBookings)
    .put(bookingCtrl.editBooking)
    .delete(bookingCtrl.deleteBooking);

  app.route('/booking/checkall')
    .post(bookingCtrl.checkOverallAvailability);

};
