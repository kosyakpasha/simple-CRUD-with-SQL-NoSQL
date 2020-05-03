var expressValidator = require('express-validator');

var userErrors = {
  checksArr: [
    expressValidator.check('firstName', 'First Name is required').notEmpty(),
    expressValidator.check('lastName', 'Last Name is required').notEmpty(),
    expressValidator.check('email', 'Email address is required').notEmpty(),
    expressValidator.check('email', 'Please fill a valid email address').normalizeEmail().isEmail(),
    expressValidator.check('phoneNumber', 'Phone Number is required').notEmpty(),
    expressValidator.check('phoneNumber', 'Please fill a valid phone number').matches(/(\))?(-)?([0-9\-+ (])\w+/, "i"),
  ],
  errorTemplate(errorObj) {
    return {
      message: 'User validation failed',
      name: 'ValidationError',
      errors: {
        fieldName: {
          properties: {
            type: 'required',
            message: errorObj.msg,
            path: errorObj.param,
            value: '',
          },
          message: errorObj.msg,
          name: 'ValidationError',
          kind: 'required',
          path: errorObj.param,
          value: '',
        }
      }
    };
  },
};

module.exports = userErrors;
