const Joi = require('joi');

const schemaUserBody = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'any.required': '400|"name" is required',
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().required().email({
    tlds: { deny: ['gmail', '@gmail.com', '@gmail'] } })
  .messages({
    'any.required': '400|"email" is required',
    'string.min': '400|"email" must be a valid email',
  }),
  password: Joi.number().min(6).integer().required()
  .messages({
    'any.required': '400|"password" is required',
    'number.min': '400|"password" length must be 6 characters long',
  }),
});

module.exports = schemaUserBody;