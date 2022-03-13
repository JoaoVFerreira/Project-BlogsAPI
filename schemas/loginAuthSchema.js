const Joi = require('joi');

const schemaLoginAuth = Joi.object({
  email: Joi.string().required().empty().email({
    tlds: { deny: ['gmail', '@gmail.com', '@gmail'] } })
  .messages({
    'any.required': '400|"email" is required',
    'any.empty': '400|"email" is not allowed to be empty',
    'string.min': '400|"email" must be a valid email',
  }),
  password: Joi.number().min(6).integer().required()
  .empty()
  .messages({
    'any.required': '400|"password" is required',
    'any.empty': '400|"password" is not allowed to be empty',
    'number.min': '400|"password" length must be 6 characters long',
  }),
});

module.exports = schemaLoginAuth;