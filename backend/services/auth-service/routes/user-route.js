module.exports = function(app) {
  let userCtrl = require('../controller/user-controller');

  app.route('/register')
    .post(userCtrl.registerUser);

  app.route('/authenticate')
    .post(userCtrl.authenticateUser);

  app.route('/user/:id')
    .get(userCtrl.getUsersByCompanyID)
    .put(userCtrl.editUser)
    .delete(userCtrl.deleteUser);
};
