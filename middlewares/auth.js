import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authorization = req.cookies.someCookieKey;
  const token = authorization.replace('Bearer ', '');
  if (!authorization) {
    throw new Error('NoAutanticate');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.message === 'NoAutanticate') {
      return res.status(401).send({ message: `Неправильные почта или пароль, ${err}` });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: `С токеном что-то не так, ${err}` });
    }
    return res.status(500).send({ message: `Произошла ошибка на стороне сервера, ${err}` });
  }

  req.user = payload;

  next();
};

export default auth;
