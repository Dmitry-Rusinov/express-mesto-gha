/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { Router } from 'express';
import { createCard, getCards, deleteCard } from '../controllers/cards.js';

const cardRoutes = Router();

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:cardId', deleteCard);

export default cardRoutes;
