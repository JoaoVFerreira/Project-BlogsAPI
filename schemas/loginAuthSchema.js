const Joi = require('joi');

const schemaLoginAuth = Joi.object({
  email: Joi.string().required().empty().email()
  .messages({
    'any.required': '400|"email" is required',
    'string.empty': '400|"email" is not allowed to be empty',
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(6).required()
  .empty()
  .messages({
    'any.required': '400|"password" is required',
    'string.empty': '400|"password" is not allowed to be empty',
    'string.min': '400|"password" length must be 6 characters long',
  }),
});

module.exports = schemaLoginAuth;