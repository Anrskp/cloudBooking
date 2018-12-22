module.exports = function(app) {
  let bookingCtrl = require('../controller/booking-controller');

  app.route('/booking')
    .post(bookingCtrl.createBooking);

  app.route('/booking/:id')
    .get(bookingCtrl.getBookings)
    .put(bookingCtrl.updateBooking)
    .delete(bookingCtrl.deleteBooking);

  app.route('/booking/entity/:id')
    .get(bookingCtrl.getEntityBookings);

  app.route('/booking/entityAvailability/:id/:start/:end')
    .get(bookingCtrl.checkEntityAvailability);

  app.route('/booking/userAvailability/:id/:start/:end')
    .get(bookingCtrl.checkAvailability);

};
