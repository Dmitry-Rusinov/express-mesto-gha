import { Router } from 'express';
import userRoutes from './users.js';
import cardRoutes from './cards.js';
import adminsRouter from './adimns.js';
import auth from '../middlewares/auth.js';
import NotFound from '../errors/NotFound.js';

const router = Router();

router.use('/', adminsRouter);

router.use(auth);

router.use('/', userRoutes);
router.use('/', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

export default router;
