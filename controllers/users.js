/* eslint-disable import/extensions */
import User from '../models/user.js';

const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}`}));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}` }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}` }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}` }));
};

export { getUsers, createUser, getUserById, updateUserAvatar, updateUserProfile };
