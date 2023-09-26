/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const { PORT = 3000, SERVER_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(SERVER_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
