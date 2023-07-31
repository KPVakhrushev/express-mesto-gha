const User = require('../models/user');
const ErrorNotfound = require('../errors/ErrorNotfound');
const { httpCodes } = require('../utils/constants');

const sendUserOrError = (user, res, next) => {
  if (user) res.send(user);
  else next(new ErrorNotfound('User not found'));
};
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(httpCodes.created).send(user))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true, runValidators: true })
    .then((user) => sendUserOrError(user, res, next))
    .catch(next);
};
