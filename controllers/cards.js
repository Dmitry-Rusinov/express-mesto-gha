/* eslint-disable import/extensions */
import Card from '../models/card.js';

const createCard = ((req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({name, link})
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}`}));
});

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}`}));
});

const deleteCard = ((req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка, ${err}`}));
});

export { createCard, getCards, deleteCard };
