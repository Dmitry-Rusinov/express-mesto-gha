/* eslint-disable import/extensions */
import Card from '../models/Card.js';

const createCard = ((req, res) => {
  const { name, link } = req.body;
  Card.create({name, link, owner: req.user._id})
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные при создании карточки, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
});

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}`}));
});

const deleteCard = ((req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Карточка с указанным id не найдена, ${err}`}));
});

const setLikeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('NotFound');
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Передан несуществующий id карточки,, ${err}`});
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные для постановки/снятии лайка, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
});

const dislikeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('NotFound');
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Передан несуществующий id карточки,, ${err}`});
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные для постановки/снятии лайка, ${err}` });
      }
      return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
    });
});

export { createCard, getCards, deleteCard, setLikeCard, dislikeCard };
