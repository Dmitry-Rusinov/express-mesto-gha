import express, {json} from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import 'dotenv/config';

const { PORT, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '6511f9a2c91cb2cd97925962',
  };

  next();
});

app.use('/', router);

app.use('*', (req, res, next) => {
  next(new Error('Страница не существует'))
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
