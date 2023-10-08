import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, getCards, deleteCard, setLikeCard, dislikeCard,
} from '../controllers/cards.js';

const cardRoutes = Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/)
  }),
}), createCard);
cardRoutes.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);
cardRoutes.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), setLikeCard);
cardRoutes.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

export default cardRoutes;
