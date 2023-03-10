const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { regexp } = require('../utils/utils');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    image: Joi.string().required().regex(regexp),
    thumbnail: Joi.string().required().regex(regexp),
    trailerLink: Joi.string().required().regex(regexp),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

routerMovie.delete('/movies/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = routerMovie;
