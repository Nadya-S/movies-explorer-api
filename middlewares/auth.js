const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/Errors');
const { unauthorized } = require('../constants/messages');

const { JWT_SECRET_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(unauthorized));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(unauthorized));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
