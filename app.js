import express, {json} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const { PORT, MONGO_URL } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());
app.use(helmet());
app.use(cookieParser());

app.use('/', router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
