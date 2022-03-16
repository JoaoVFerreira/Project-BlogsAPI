const express = require('express');

const router = express.Router();

const { jwtValidation } = require('../middlewares/validateJWT');

const validateCategories = require('../middlewares/categoriesIdsValidations');

const { blogPostValidation } = require('../middlewares/blogPostValidation');

const { editPostValidation } = require('../middlewares/editPostValidation');

const { 
createPost, 
getAllPosts, 
getOnePost, 
updatePost,
removePost,
} = require('../controllers/postController');

router.post('/', jwtValidation, blogPostValidation, validateCategories, createPost);
router.get('/', jwtValidation, getAllPosts);
router.get('/:id', jwtValidation, getOnePost);
router.put('/:id', jwtValidation, editPostValidation, updatePost);
router.delete('/:id', jwtValidation, removePost);

module.exports = router;