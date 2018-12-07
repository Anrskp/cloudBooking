const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = mongoose.Schema({
  companyID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', userSchema);

// Methods

// Add new user
module.exports.addUser = function(newUser, callback) {

  // Hashing should be in route
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

// Get user by ID
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

// Get user by username
module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username};
  User.findOne(query, callback);
}

// Get user by email
module.exports.getUserByEmail = (email, callback) => {
  const query = {email: email};
  User.findOne(query, callback);
}

// Delete user
module.exports.deleteUserByUsername = (username, callback) =>  {
  const query = {username: username};
  User.deleteOne(query, callback);
}

// Delete user by id
module.exports.deleteUserByID = (userID, callback) =>  {
  const query = {_id: userID};
  User.deleteOne(query, callback);
}


// Get users from company
module.exports.getUsersByCompanyID = (companyID, callback) => {
  const query = {companyID: companyID};
  User.find(query, callback);
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err
    callback(null, isMatch);
  });
};
