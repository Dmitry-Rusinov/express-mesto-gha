import { Router } from 'express';
import userRoutes from './users.js';
import cardRoutes from './cards.js';
import adminsRouter from './adimns.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.use('/', adminsRouter);

router.use(auth);

router.use('/', userRoutes);
router.use('/', cardRoutes);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

export default router;
