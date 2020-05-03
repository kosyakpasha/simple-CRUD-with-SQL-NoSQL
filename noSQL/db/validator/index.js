class Validator {
  validateEmail = function(val) {
    return val.match(/(\))?(-)?([0-9\-+ (])\w+/, "i");
  };
}

module.exports = new Validator();
