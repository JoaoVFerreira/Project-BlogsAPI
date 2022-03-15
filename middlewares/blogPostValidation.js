const schemaBlogPost = require('../schemas/blogPostSchema');

async function blogPostValidation(req, _res, next) {
  const { error } = schemaBlogPost.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
}

module.exports = {
  blogPostValidation,
};