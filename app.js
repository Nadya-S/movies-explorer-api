require('dotenv').config();
const express = require('express');

const { PORT = 3000, NODE_ENV, MONGO_DB } = process.env;
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
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

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});
