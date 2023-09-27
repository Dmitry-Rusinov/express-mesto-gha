import { Router } from 'express';
import {
  getUsers, createUser, getUserById, updateUserAvatar, updateUserProfile,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:userId', getUserById);
userRoutes.post('/users', createUser);
userRoutes.patch('/users/me', updateUserProfile);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

export default userRoutes;
