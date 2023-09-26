/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import { Router } from 'express';
import userRoutes from './users.js';
import cardRoutes from './cards.js';

const router = Router();

router.use('/', userRoutes);
router.use('/', cardRoutes);

export default router;
