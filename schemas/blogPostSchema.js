const Joi = require('joi');

const schemaBlogPost = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '400|"title" is required',
  }),
  content: Joi.string().required().messages({
    'any.required': '400|"content" is required',
  }),
  categoryIds: Joi.array().required()
  .messages({
    'any.required': '400|"categoryIds" is required',
  }),
});

module.exports = schemaBlogPost;