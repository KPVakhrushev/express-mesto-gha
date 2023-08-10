const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');
const validation = require('../validations/user');
const valiadtionId = require('../validations/objectId');

const fullCheck = [validation.fullCheck(), validation.errors()];
const updateCheck = [validation.updateCheck(), validation.errors()];
const idCheck = [valiadtionId.check('userId'), validation.errors()];

router.route('/')
  .get(getUsers)
  .patch(fullCheck, createUser);

router.route('/me')
  .get(getUser)
  .patch(updateCheck, updateUser);

router.get('/:userId', idCheck, getUser);
router.patch('/me/avatar', updateCheck, updateAvatar);

module.exports = router;
