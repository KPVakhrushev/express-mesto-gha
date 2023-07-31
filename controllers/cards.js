const Card = require('../models/card');
const ErrorNotfound = require('../errors/ErrorNotfound');
const httpCodes = require('../utils/constants');

const sendCardOrError = (card, res, next) => {
  if (card) res.send(card);
  else next(new ErrorNotfound('Card not found'));
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpCodes.created).send(card))
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => sendCardOrError(card, res, next))
    .catch(next);
};
