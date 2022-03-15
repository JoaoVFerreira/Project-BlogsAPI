const express = require('express');

const router = express.Router();

const { jwtValidation } = require('../middlewares/validateJWT');
const { createCategory } = require('../controllers/categoriesController');

router.post('/', jwtValidation, createCategory);

module.exports = router;