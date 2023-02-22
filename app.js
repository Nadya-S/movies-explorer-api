require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { MONGO_URL } = require('./config');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const err = require('./middlewares/err');

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(errorLogger);
app.use(errors());
app.use(err);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});
