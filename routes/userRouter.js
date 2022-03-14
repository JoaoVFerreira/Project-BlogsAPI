const express = require('express');

const router = express.Router();

const { userBodyValidations } = require('../middlewares/userBodyValidation');
 const { jwtValidation } = require('../middlewares/validateJWT');
const { createUser, getUsers } = require('../controllers/userController');

router.post('/', userBodyValidations, createUser);
router.get('/', jwtValidation, getUsers);

module.exports = router;