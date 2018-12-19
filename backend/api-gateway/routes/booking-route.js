module.exports = function(app) {
  let bookingCtrl = require('../controller/booking-controller');

  app.route('/booking')
    .post(bookingCtrl.createBooking);

  app.route('/booking/:id')
    .get(bookingCtrl.getBookings);


  app.route('/booking/userAvailabilty/:id/:start/:end')
    .get(bookingCtrl.checkAvailability);

};
