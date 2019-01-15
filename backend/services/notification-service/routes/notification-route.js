module.exports = function(app) {
  let notificationCtrl = require('../controller/notification-controller');

  app.route('/sendNotifications')
    .post(notificationCtrl.sendNotifications)

};
