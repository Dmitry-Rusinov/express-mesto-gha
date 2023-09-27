import { Router } from 'express';
import {
  createCard, getCards, deleteCard, setLikeCard, dislikeCard,
} from '../controllers/cards.js';

const cardRoutes = Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:cardId', deleteCard);
cardRoutes.put('/cards/:cardId/likes', setLikeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCard);

export default cardRoutes;
