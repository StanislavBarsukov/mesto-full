const express = require('express');
const {
  getUserAll, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/user');

const { userIdJoi, updateUserJoi, updateAvatarJoi } = require('../middlewares/validationJoi');

const user = express.Router();

user.get('/', getUserAll);
user.get('/me', getCurrentUser);
user.get('/:userId', userIdJoi, getUserById);
user.patch('/me', updateUserJoi, updateUser);
user.patch('/me/avatar', updateAvatarJoi, updateAvatar);

module.exports = { user };
