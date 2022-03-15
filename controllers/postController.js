const { BlogPost, PostsCategory } = require('../models');

async function createPost(req, res, next) {
  try {
    const bodyPost = { 
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    };
    
    const newPost = await BlogPost.create(bodyPost);

    await Promise.all(req.body.categoryIds.map(async (category) => {
      await PostsCategory.create({ postId: newPost.id, categoryId: category });
    }));

    return res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPost,
};