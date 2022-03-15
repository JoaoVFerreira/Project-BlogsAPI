const express = require('express');

const router = express.Router();

const { jwtValidation } = require('../middlewares/validateJWT');
const { createCategory, getCategories } = require('../controllers/categoriesController');

router.post('/', jwtValidation, createCategory);
router.get('/', jwtValidation, getCategories);

module.exports = router;