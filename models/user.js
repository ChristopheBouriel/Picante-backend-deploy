const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const emailValidator = require('../middleware/emailValidator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: emailValidator.emailValidator },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator,{ message: 'Error, expected email to be unique.' });

module.exports = mongoose.model('User', userSchema);