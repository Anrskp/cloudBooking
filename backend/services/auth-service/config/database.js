const Sequelize = require('sequelize');

module.exports = {

  connection : new Sequelize('Users', 'root', 'password', {
  host: '192.168.99.100',
  dialect: 'mysql',
  port: 3308,
  })


}
