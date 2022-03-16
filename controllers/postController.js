const { Op } = require('sequelize');

const blogPostsQuery = require('../services/blogPostQuery');

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

async function getOnePost(req, res, next) {
  try {
    const { id } = req.params;
    const post = await BlogPost.findOne({
      where: { id },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const updateContent = { title: req.body.title, content: req.body.content };
    await BlogPost.update(
      updateContent, { where: { userId: req.params.id } },
    );

    const getPostModified = await BlogPost.findOne({
      where: { id: req.params.id },
      attributes: ['title', 'content', 'userId'],
      include: { model: Category, as: 'categories', through: { attributes: [] } },
    });

    return res.status(200).json(getPostModified);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function removePost(req, res, next) {
  try {
    const post = await BlogPost.findOne({ where: { id: req.params.id } });

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    if (+post.userId !== +req.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await BlogPost.destroy({
      where: { id: req.params.id },
    });

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function filterPost(req, res, next) {
  try {
    if (!req.query.q) {
      const posts = await blogPostsQuery();
      return res.status(200).json(posts);
    }

    const filteredPost = await BlogPost.findAll({
      where: { [Op.or]: [{ title: { [Op.like]: req.query.q } },
        { content: { [Op.like]: req.query.q } }],
      },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });

    if (!filteredPost) return res.status(200).json([]);

    return res.status(200).json(filteredPost);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  removePost,
  filterPost,
};