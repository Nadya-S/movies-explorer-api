const Movie = require('../models/movie');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../errors/Errors');
const {
  notFoundMovieMessage,
  badRequestMessage,
  forbiddenMessage,
  filmDeleted,
} = require('../constants/messages');

// GET /movies
module.exports.findAllMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

// POST /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
        return;
      }
      next(err);
    });
};

// DELETE /movies/_id
module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(notFoundMovieMessage))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      }
      return Movie.findByIdAndRemove(req.params._id);
    })
    .then(() => res.send({ message: filmDeleted }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
        return;
      }
      next(err);
    });
};
