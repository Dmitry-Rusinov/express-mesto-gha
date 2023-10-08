import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authorization = req.cookies.someCookieKey;
  if (!authorization) {
    next(new Unauthorized('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'));
  }

  req.user = payload;

  next();
};

export default auth;
