const Joi = require('joi');

const schemaUserBody = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'any.required': '400|"displayName" is required',
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().required().empty().email()
  .messages({
    'any.required': '400|"email" is required',
    'string.empty': '400|"email" is not allowed to be empty',
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().length(6).required()
  .messages({
    'any.required': '400|"password" is required',
    'string.length': '400|"password" length must be 6 characters long',
  }),
  image: Joi.string(),
});

module.exports = schemaUserBody;