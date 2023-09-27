import User from '../models/user.js';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
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
  getUsers, createUser, getUserById, updateUserAvatar, updateUserProfile,
};
