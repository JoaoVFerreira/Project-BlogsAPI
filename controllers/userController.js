const userModel = require('../models/user');

async function createUser(req, res, next) {
  try {
    await userModel.create(req.body);
    return res.status(201).json({ message: '' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  createUser,
};