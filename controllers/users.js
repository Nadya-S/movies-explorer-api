const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/Errors');
const { notFoundUserMessage, badRequestMessage, conflictMessage } = require('../constants/messages');

// GET /users/me
module.exports.findMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(notFoundUserMessage))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// PATCH /users/me
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(notFoundUserMessage))
    .then((user) => {
      res.send(user);
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
