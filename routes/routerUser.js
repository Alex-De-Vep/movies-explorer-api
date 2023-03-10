const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUser,
} = require('../controllers/users');

routerUser.get('/users/me', getUser);

routerUser.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateUser);

module.exports = routerUser;
