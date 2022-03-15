const schemaEditPost = require('../schemas/editBlogPostSchema');

const { BlogPost } = require('../models');

const editPostValidation = async (req, res, next) => {
  if (req.body.categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  const post = await BlogPost.findOne({ where: { id: req.params.id } });

  if (+post.userId !== +req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { error } = schemaEditPost.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    const handleError = { status: Number(status), message };
    return next(handleError);
  }
  return next();
};

module.exports = {
  editPostValidation,
};