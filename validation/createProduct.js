const Joi = require('@hapi/joi');
const { createErrorResponse } = require('../helper/errorhandler');

//product schema validation
var productSchema = Joi.object().keys({
  productType: Joi.string().label('productType is required').required(),
  productName: Joi.string().label('productName is required').required(),
  expiryDate: Joi.date().iso().label('expiryDate is required').required(),
  price: Joi.number().label('price is required').required(),
}).options({ abortEarly: false });

module.exports = {

  validateProductSchema: async (req, res, next) => {
    const result = Joi.validate(req.body, productSchema);
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