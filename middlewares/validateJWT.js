require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) res.status(401).json({ message: 'Expired or invalid token' });
    });
    
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  jwtValidation,
};