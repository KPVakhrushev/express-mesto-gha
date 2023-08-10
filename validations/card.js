const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');

const keys = {
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().uri(),
};

module.exports = {
  ...keys,
  check: () => celebrate({
    [Segments.BODY]: Joi.object().keys(keys),
  }),
  errors,
};
