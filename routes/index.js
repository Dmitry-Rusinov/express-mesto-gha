import { Router } from 'express';
import userRoutes from './users.js';
import cardRoutes from './cards.js';

const router = Router();

router.use('/', userRoutes);
router.use('/', cardRoutes);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

export default router;
