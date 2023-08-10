const router = require('express').Router();
const {
  createCard, getCard, getCards, dislikeCard, likeCard, deleteCard,
} = require('../controllers/cards');

const validation = require('../validations/card');
const valiadtionId = require('../validations/objectId');

const midlewares = [validation.getCelebrate(), validation.errors()];
const midlewaresId = [valiadtionId.getCelebrate('cardId'), validation.errors()];

router.route('/')
  .get(getCards)
  .post(...midlewares, createCard);

router.route('/:cardId')
  .get(getCard)
  .delete(...midlewaresId, deleteCard);

router.route('/:cardId/likes')
  .put(likeCard)
  .delete(...midlewaresId, dislikeCard);

module.exports = router;
