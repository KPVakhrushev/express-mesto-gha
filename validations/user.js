const {
  Joi, celebrate, Segments, errors,
} = require('celebrate');

const updateKeys = {
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri(),
};
const authKeys = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
};
const allKeys = {
  ...authKeys,
  ...updateKeys,
};

module.exports = {
  ...allKeys,
  fullCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(allKeys),
  }),
  updateCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(updateKeys),
  }),
  authCheck: () => celebrate({
    [Segments.BODY]: Joi.object().keys(updateKeys),
  }),
  errors,
};
