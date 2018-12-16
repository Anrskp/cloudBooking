module.exports = function(app) {
  let userCtrl = require('../controller/user-controller');

  app.route('/authenticate')
    .post(userCtrl.authenticateUser);
};
