const express = require('express');
const {
  getCardAll, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { createCardJoi, cardIdJoi } = require('../middlewares/validationJoi');

const card = express.Router();

card.get('/', getCardAll);
card.post('/', createCardJoi, createCard);
card.delete('/:cardId', cardIdJoi, deleteCard);
card.put('/:cardId/likes', cardIdJoi, likeCard);
card.delete('/:cardId/likes', cardIdJoi, dislikeCard);

module.exports = { card };
