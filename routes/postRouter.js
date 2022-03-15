const express = require('express');

const router = express.Router();

const { jwtValidation } = require('../middlewares/validateJWT');

const validateCategories = require('../middlewares/categoriesIdsValidations');

const { blogPostValidation } = require('../middlewares/blogPostValidation');

const { createPost, getAllPosts } = require('../controllers/postController');

router.post('/', jwtValidation, blogPostValidation, validateCategories, createPost);
router.get('/', jwtValidation, getAllPosts);

module.exports = router;