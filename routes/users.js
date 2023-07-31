const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users', createUser);
module.exports = router;
