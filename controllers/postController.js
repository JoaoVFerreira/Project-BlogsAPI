const { BlogPost, PostsCategory, User, Category } = require('../models');

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

async function getAllPosts(_req, res, next) {
  try {
    const posts = await BlogPost.findAll({
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
};