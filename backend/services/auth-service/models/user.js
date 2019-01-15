const mongoose = require('mongoose');

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
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = module.exports = mongoose.model('User', userSchema);
