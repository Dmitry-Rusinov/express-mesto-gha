import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина не должна превышать 30 символов'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина не должна превышать 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Добавьте ссылку на изображение'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
}, { timestamps: true, versionKey: false });

export default mongoose.model('user', userSchema);
