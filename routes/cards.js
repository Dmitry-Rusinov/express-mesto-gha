import { Router } from 'express';
import {
  createCardValidation,
  deleteCardValidation,
  setLikeCardValidation,
  dislikeCardValidation,
} from '../middlewares/requestValidation.js';
import {
  createCard, getCards, deleteCard, setLikeCard, dislikeCard,
} from '../controllers/cards.js';

const cardRoutes = Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCardValidation, createCard);
cardRoutes.delete('/cards/:cardId', deleteCardValidation, deleteCard);
cardRoutes.put('/cards/:cardId/likes', setLikeCardValidation, setLikeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCardValidation, dislikeCard);

export default cardRoutes;
