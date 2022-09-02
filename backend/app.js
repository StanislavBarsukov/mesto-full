require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { routes } = require('./routes/index');
const { errorHandler } = require('./error/errorHandler');
const { NotFoundError } = require('./error/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const mongoDb = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.connect(mongoDb)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connected');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(routes);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
