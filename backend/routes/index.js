const express = require('express');
const { user } = require('./user');
const { card } = require('./card');
const { auth } = require('../middlewares/auth');
const { signIn, signUp } = require('../middlewares/validationJoi');
const { login, createUser } = require('../controllers/user');

const routes = express.Router();

routes.post('/signin', signIn, login);
routes.post('/signup', signUp, createUser);

routes.use('/users', auth, user);
routes.use('/cards', auth, card);

module.exports = { routes };
