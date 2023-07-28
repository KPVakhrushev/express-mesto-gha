const router = require('express').Router(); // создали роутер
const { createCard, getCard, getCards, dislikeCard, likeCard} = require('../controllers/cards');
router.get('/cards/:cardId', getCard);
router.get('/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;