const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {
  BadRequestError, UnauthorizedError, NotFoundError, ConflictError,
} = require('../error/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUserAll = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).send({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const hash = await bcryptJs.hash(password, 10);
    let user = await User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    });
    user = user.toObject();
    delete user.password;
    res.status(201).send({
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные.'));
      return;
    }
    if (error.code === 11000) {
      next(new ConflictError('Пользователь с таким e-mail уже зарегестрирован'));
      return;
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные.'));
      return;
    }
    next(error);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные.'));
      return;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError('Указанные e-mail и пароль не верны'));
      return;
    }
    const passwordCheck = await bcryptJs.compare(password, user.password);
    if (!passwordCheck) {
      next(new UnauthorizedError('Указанные e-mail и пароль не верны'));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
      { expiresIn: '7d' },
    );
    res.status(200).send({
      token,
    });
  } catch (error) {
    next(error);
  }
};
