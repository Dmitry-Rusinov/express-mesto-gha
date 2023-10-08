import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        return next(new Unauthorized('Неправильные логин или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.cookie('someCookieKey', token, { httpOnly: true, sameSite: true, maxAge: 3600000 * 24 * 7 });
      res.status(200).send({ email: user.email});
    })
    .catch(next);
};

const getInfoByCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Ошибка валидации полей'));
      }
      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь с указанным id не найден'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан не валидный id'));
      }
      return next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Ошибка валидации полей'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Ошибка валидации полей'));
      }
      return next(err);
    });
};

export {
  getUsers, createUser, getUserById, updateUserAvatar,
  updateUserProfile, login, getInfoByCurrentUser,
};
