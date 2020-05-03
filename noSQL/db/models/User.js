var mongoose = require('mongoose');
var validator = require('validator');
var mongoosePaginate = require('mongoose-paginate-v2');

var customValidator = require('./../validator');

var userSchema =  new mongoose.Schema({
  firstName: {
    type: String,
    required: 'FirstName address is required',
  },
  lastName: {
    type: String,
    required: 'LastName address is required',
  },
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  email: {
    type: String,
    required: 'Email address is required',
    validate: [ validator.isEmail, 'Please fill a valid email address' ]
  },
  phoneNumber: {
    type: String,
    required: 'PhoneNumber address is required',
    validate: [ customValidator.validateEmail, 'Please fill a valid phone number' ]
  },
});

userSchema.plugin(mongoosePaginate);
// userSchema.virtual('id').get(function(){
//   return this._id.toHexString();
// });
// userSchema.set('toJSON', {
//   virtuals: true
// });

module.exports = mongoose.model('User', userSchema);
