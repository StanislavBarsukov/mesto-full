const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('./validateURL');

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(validateURL),
  }),
});

const userIdJoi = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(validateURL),
  }),
});

const createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(validateURL),
  }),
});

const cardIdJoi = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
});

module.exports = {
  signIn, signUp, userIdJoi, updateUserJoi, updateAvatarJoi, createCardJoi, cardIdJoi,
};
