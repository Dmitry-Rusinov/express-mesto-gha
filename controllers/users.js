import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const login = (req, res) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('someCookieKey', token, { httpOnly: true, sameSite: true, maxAge: 3600000 * 24 * 7 }).end();
      res.status(200).send({ email: user.email});
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getInfoByCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('NotFound');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(400).send({ message: `Пользователь не найден, ${err}` });
      }
      res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` }));
};

const createUser = (req, res) => {
  const {
    email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: `Такой пользователь уже существует, ${err}` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации полей, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Пользователь с указанным id не найден, ${err}`});
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Передан не валидный id, ${err}`});
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}`});
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Пользователь с указанным id не найден, ${err}`});
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации полей, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Пользователь с указанным id не найден, ${err}`});
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации полей, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
};

export {
  getUsers, createUser, getUserById, updateUserAvatar,
  updateUserProfile, login, getInfoByCurrentUser,
};
