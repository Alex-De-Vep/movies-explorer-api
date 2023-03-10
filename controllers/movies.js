const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/badRequest');
const NotFoundError = require('../utils/errors/notFound');
const ForbiddenError = require('../utils/errors/forbidden');

const createMovie = (req, res, next) => {
  const {
    nameRU, nameEN, country, director, duration, year,
    description, image, trailerLink, thumbnail, movieId,
  } = req.body;

  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((data) => res.send(data))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить фильм');
      }

      return Movie.deleteOne(movie).then(() => res.send({ movie }));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый фильм не найден'));
        return;
      }

      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
