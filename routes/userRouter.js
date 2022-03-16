const express = require('express');

const router = express.Router();

const { userBodyValidations } = require('../middlewares/userBodyValidation');
const { jwtValidation } = require('../middlewares/validateJWT');
const { createUser, getUsers, getUserById, removeUser } = require('../controllers/userController');

router.post('/', userBodyValidations, createUser);
router.get('/', jwtValidation, getUsers);
router.get('/:id', jwtValidation, getUserById);
router.delete('/me', jwtValidation, removeUser);

module.exports = router;