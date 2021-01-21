const validate = require('mongoose-validator')

exports.emailValidator = [
    validate({
      validator: 'isEmail',
      message: 'Invalid email address',
    }),
  ];