'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username,
    year: this.year,
    make: this.make,
    model: this.model,
    id: this._id
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 5);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};