import { Router } from 'express';
import { createUser, login } from '../controllers/users.js';

const adminsRouter = Router();

adminsRouter.post('/signin', login);
adminsRouter.post('/signup', createUser);

export default adminsRouter;
