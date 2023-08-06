const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const {
  NOT_USERS_TEXT, SUCCES_CREATE_STATUS, newCookieOptions,
  MONGO_CONFLICT_STATUS, oldCookieOptions, LOGOUT_SUCC,
} = require('../helpers/constants');
const { tokenCreate, checkHandleSend, handleError } = require('../helpers/utils');
const UserAlreadyExist = require('../castomErrors/UserAlreadyExist');
const UncorrectDataError = require('../castomErrors/UncorrectDataError');
const NotFoundUserError = require('../castomErrors/NotFoundErrors/NotFoundUserError');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send({ data: users.length ? users : NOT_USERS_TEXT }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  checkHandleSend(User.findById(req.params.userId), res, next, NotFoundUserError);
};

module.exports.getMe = (req, res, next) => {
  checkHandleSend(User.findById(req.user._id), res, next, UncorrectDataError);
};

module.exports.profileUpd = (req, res, next) => {
  const { name, about } = req.body;
  checkHandleSend(User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ), res, next, NotFoundUserError, handleError);
};

module.exports.avatarUpd = (req, res, next) => {
  const { avatar } = req.body;
  checkHandleSend(User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ), res, next, NotFoundUserError, handleError);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(SUCCES_CREATE_STATUS).send({
        data: {
          _id: newUser._id, name, about, avatar, email,
        },
      });
    })
    .catch((err) => {
      if (err.code === MONGO_CONFLICT_STATUS) next(new UserAlreadyExist());
      else handleError(err, req, res, next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = tokenCreate(user._id);
      res.cookie('jwt', token, newCookieOptions);
      res.send({ _id: user._id });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    const token = tokenCreate(req.user._id, 0);
    res.cookie('jwt', token, oldCookieOptions);
    res.send({ data: LOGOUT_SUCC });
  } catch (err) {
    next(err);
  }
};
