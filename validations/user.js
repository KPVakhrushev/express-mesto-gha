const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');

const keys = {
  email: Joi.string().email(),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri(),
  password: Joi.string().min(8),
};

module.exports = {
  ...keys,
  getCelebrate: () => celebrate({
    [Segments.BODY]: Joi.object().keys(keys),
  }),
  errors,
};
