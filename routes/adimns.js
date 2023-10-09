import { Router } from 'express';
import {
  loginValidation,
  createUserValidation,
} from '../middlewares/requestValidation.js';
import { createUser, login } from '../controllers/users.js';

const adminsRouter = Router();

adminsRouter.post('/signin', loginValidation, login);
adminsRouter.post('/signup', createUserValidation, createUser);

export default adminsRouter;
