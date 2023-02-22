const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
module.exports.regExeLink = /^(http|https)\:\/\/(www\.)?[a-z0-9\-]*\.[a-z]*[a-zA-Z0-9\-\/]*[a-z0-9\.*\/\-\_\~\:\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*\#?$/;

module.exports.idValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(this.regExeLink),
    trailerLink: Joi.string().required().pattern(this.regExeLink),
    thumbnail: Joi.string().required().pattern(this.regExeLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});
