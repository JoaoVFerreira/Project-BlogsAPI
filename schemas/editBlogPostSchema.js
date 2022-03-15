const Joi = require('joi');

const schemaEditPost = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '400|"title" is required',
  }),
  content: Joi.string().required().messages({
    'any.required': '400|"content" is required',
  }),
});

module.exports = schemaEditPost;