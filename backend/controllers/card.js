const { Card } = require('../models/card');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../error/errors');

exports.getCardAll = async (req, res, next) => {
  try {
    const card = await Card.find({});
    res.status(200).send({
      card,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({
      card,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные.'));
      return;
    }
    next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById({ _id: cardId });
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
      return;
    }
    if (req.user._id !== String(card.owner)) {
      next(new ForbiddenError('Нельзя удалить чужую картинку.'));
      return;
    }
    await Card.findByIdAndRemove({ _id: cardId });

    res.status(200).send({
      card,
    });
  } catch (error) {
    next(error);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
      return;
    }
    res.status(200).send({
      card,
    });
  } catch (error) {
    next(error);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
      return;
    }
    res.status(200).send({
      card,
    });
  } catch (error) {
    next(error);
  }
};
