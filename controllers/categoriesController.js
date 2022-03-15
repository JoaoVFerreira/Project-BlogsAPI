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

module.exports = {
  createCategory,
};