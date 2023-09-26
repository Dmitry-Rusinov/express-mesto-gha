/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express, {json} from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import router from './routes/index.js';
import 'dotenv/config';

const { PORT, MONGO_URL } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.use('/', router);

app.use((req, res, next) => {
  req.user = {
    _id: '6511f9a2c91cb2cd97925962',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
