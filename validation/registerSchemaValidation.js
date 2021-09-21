const Joi = require('@hapi/joi');
const { createErrorResponse } = require('../helper/errorhandler');

//register schema validation
var userSchema = Joi.object().keys({
  name: Joi.string().label('name is required').required(),
  email: Joi.string().label('email is required').required(),
  mobile: Joi.number().label('10 Digit mobile no is required').required(),
  password: Joi.string().label('password is required').required(),
  createdDate: Joi.date().iso(),
}).options({ abortEarly: false });

module.exports = {

  validateRegisterSchema: async (req, res, next) => {
    const result = Joi.validate(req.body, userSchema);
    if (result.error) {
      var error = {};
      var message = '';
      for (var i = 0; i < result.error.details.length; i++) {
        const key = result.error.details[i]['context'].key;
        error[`${key}`] = result.error.details[i]['context'].label;
        message = "please required below field"
      }
      return createErrorResponse(req, res, message, error, 422);
    } else {
      next()
    }
  }
}