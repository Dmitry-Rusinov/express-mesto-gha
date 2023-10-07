import { Router } from 'express';
import {
  getUsers, getUserById, updateUserAvatar, updateUserProfile, getInfoByCurrentUser,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getInfoByCurrentUser);
userRoutes.get('/users/:userId', getUserById);
userRoutes.patch('/users/me', updateUserProfile);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

export default userRoutes;
