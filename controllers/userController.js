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

async function getUsers(_req, res, next) {
  try {
    const allUsers = await user.findAll();

    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getUserById(req, res, next) {
  const { id } = req.params;
  try {
    const singleUser = await user.findOne({ where: { id } });

    if (!singleUser) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(singleUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { createUser, getUsers, getUserById };