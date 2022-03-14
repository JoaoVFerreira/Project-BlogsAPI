require('dotenv').config();

const jwtConfig = { expiresIn: '30m', algorithm: 'HS256' };
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { User: user } = require('../models');

async function loginAuth(req, res, next) {
  try {
    const { email } = req.body;
    
    const verifyUser = await user.findOne({ where: { email } });

    if (!verifyUser) return res.status(400).json({ message: 'Invalid fields' });

    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = loginAuth;