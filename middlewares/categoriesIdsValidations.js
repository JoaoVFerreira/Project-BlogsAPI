const { Category } = require('../models');

async function validateCategories(req, res, next) {
  try {
    const categories = Promise.all(req.body.categoryIds
      .map((category) => Category.findByPk(category)));
    
    if ((await categories).includes(null)) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = validateCategories;