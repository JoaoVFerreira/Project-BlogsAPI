require('dotenv').config();

const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    const { email } = req.body;
    
    const user = await User.findOne({ where: { email } });

    if (user) return res.status(409).json({ message: 'User already registered' });
     
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  jwtValidation,
};