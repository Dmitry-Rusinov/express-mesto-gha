import Card from '../models/card.js';
import Forbidden from '../errors/Forbidden.js';
import NotFound from '../errors/NotFound.js';

const createCard = ((req, res, next) => {
  const { name, link } = req.body;
  Card.create({name, link, owner: req.user._id})
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
});

const getCards = ((req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
});

const deleteCard = ((req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным id не найдена'));
      }
      if (card.owner.valueOf() !== req.user._id) {
        return next(new Forbidden('Нет прав для удаления чужой карточки'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((item) => res.status(200).send(item))
        .catch(next);
    })
    .catch(next);
});

const setLikeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным id не найдена'));
      }
      return res.status(201).send(card);
    })
    .catch(next);
});

const dislikeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным id не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch(next);
});

export {
  createCard, getCards, deleteCard, setLikeCard, dislikeCard,
};
