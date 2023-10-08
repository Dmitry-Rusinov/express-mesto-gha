import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUserById, updateUserAvatar, updateUserProfile, getInfoByCurrentUser,
} from '../controllers/users.js';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/me', getInfoByCurrentUser);

userRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);

userRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

userRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}?\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/)
  }),
}), updateUserAvatar);

export default userRoutes;
