const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { conflictMessage, badRequestMessage } = require('../constants/messages');

const { JWT_SECRET_KEY } = require('../config');
const { BadRequestError, ConflictError } = require('../errors/Errors');

// POST /signup регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userData = {
        name: user.name,
        _id: user._id,
        email: user.email,
      };
      res.send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictMessage));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
        return;
      }
      next(err);
    });
};

// POST /signin вход
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET_KEY,
        { expiresIn: '7d' },
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
