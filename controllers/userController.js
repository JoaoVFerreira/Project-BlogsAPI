require('dotenv').config();

const jwtConfig = { expiresIn: '30m', algorithm: 'HS256' };
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { User: user } = require('../models');

async function createUser(req, res, next) {
  try {
    const { email } = req.body;
    
    const verifyUser = await user.findOne({ where: { email } });

    if (verifyUser) return res.status(409).json({ message: 'User already registered' });

    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);

    await user.create(req.body);

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { createUser };