const express = require('express');

const router = express.Router();

const loginAuth = require('../controllers/loginController');

const { loginAuthValidation } = require('../middlewares/loginAuthValidations');

router.post('/', loginAuthValidation, loginAuth);

module.exports = router;