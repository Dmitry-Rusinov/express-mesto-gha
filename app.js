import express, {json} from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import router from './routes/index.js';
import 'dotenv/config';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '6511f9a2c91cb2cd97925962',
  };

  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
