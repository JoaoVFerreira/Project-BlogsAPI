const express = require('express');

const router = express.Router();

const { userBodyValidations } = require('../middlewares/userBodyValidation');
// const { jwtValidation } = require('../middlewares/validateJWT');
const { createUser } = require('../controllers/userController');

router.post('/', userBodyValidations, createUser);

module.exports = router;