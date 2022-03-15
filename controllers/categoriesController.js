const { Category: category } = require('../models');

async function createCategory(req, res, next) {
  const { name } = req.body;

  try {
    if (!name) return res.status(400).json({ message: '"name" is required' });

    const newCategory = await category.create(req.body);
    
    return res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await category.findAll();

    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  createCategory,
  getCategories,
};