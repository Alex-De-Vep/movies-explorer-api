const mongoose = require('mongoose');
const { regexp } = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regexp.test(value);
      },
      message: 'Не валидные данные',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regexp.test(value);
      },
      message: 'Не валидные данные',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regexp.test(value);
      },
      message: 'Не валидные данные',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
