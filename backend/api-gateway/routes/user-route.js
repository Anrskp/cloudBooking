module.exports = function(app) {
  let userCtrl = require('../controller/user-controller');

  app.route('/user/authenticate')
    .post(userCtrl.authenticateUser);

  app.route('/user/:id')
    .get(userCtrl.getUsersByCompanyID);
};
