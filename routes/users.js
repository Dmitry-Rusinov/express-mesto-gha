import { Router } from 'express';
import {
  getUserByIdValidation,
  updateUserAvatarValidation,
  updateUserProfileValidation,
} from '../middlewares/requestValidation.js';
import {
  getUsers, getUserById, updateUserAvatar, updateUserProfile, getInfoByCurrentUser,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getInfoByCurrentUser);

userRoutes.get('/users/:userId', getUserByIdValidation, getUserById);

userRoutes.patch('/users/me', updateUserProfileValidation, updateUserProfile);

userRoutes.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);

export default userRoutes;
