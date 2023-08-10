const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');
const validation = require('../validations/user');
const valiadtionId = require('../validations/objectId');

const midlewares = [validation.getCelebrate(), validation.errors()];
const midlewaresId = [valiadtionId.getCelebrate('cardId'), validation.errors()];

router.route('/')
  .get(getUsers)
  .patch(...midlewares, createUser);

router.route('/me')
  .get(getUser)
  .patch(...midlewares, updateUser);

router.get('/:userId', ...midlewaresId, getUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
