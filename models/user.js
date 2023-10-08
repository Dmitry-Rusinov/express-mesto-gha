import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Unauthorized from '../errors/Unauthorized.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина не должна превышать 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина не должна превышать 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле email является обязательным'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    select: false,
  },
}, { timestamps: true, versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные логин или пароль');
          }
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
