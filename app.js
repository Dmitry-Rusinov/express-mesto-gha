import express, {json} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());
app.use(helmet());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
