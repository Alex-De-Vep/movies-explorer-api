const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/badRequest');
const NotFoundError = require('../utils/errors/notFound');
const ForbiddenError = require('../utils/errors/forbidden');

const createMovie = (req, res, next) => {
  const {
    name, country, director, duration, year,
    description, image, trailerLink, nameRU, nameEN, thumbnail,
  } = req.body;

  Movie.create({
    name,
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
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        console.log(err);
        return;
      }

      next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 })
    .then((data) => res.send(data))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить карточку');
      }

      return Movie.deleteOne(movie).then(() => res.send({ movie }));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
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
