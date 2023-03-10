const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerMovie = require('./routerMovies');
const routerUser = require('./routerUser');
const NotFoundError = require('../utils/errors/notFound');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

}), login);

router.use(auth);

// router.post('/logout', celebrate({
//     body: Joi.object().keys({
//         email: Joi.string().required().email(),
//         password: Joi.string().required(),
//     }),
//
// }), logout);

router.use('/', routerUser);
router.use('/', routerMovie);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
