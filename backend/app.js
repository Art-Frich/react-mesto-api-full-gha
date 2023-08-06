const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const {
  handleAppError, handleStartServerConsole, sendError,
} = require('./helpers/utils');
const { mongooseOptions } = require('./helpers/constants');
const routes = require('./routes/index');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

try {
  const app = express();
  mongoose.connect(MONGO_URI, mongooseOptions).catch(handleAppError);

  app.use(requestLogger);
  app.use(cors);

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());

  // crash-test
  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.use(routes);

  app.use(errorLogger);
  app.use(errors()); // celebrate errors handle
  app.use(sendError); // send others error

  app.listen(PORT, handleStartServerConsole(PORT));
} catch (err) {
  handleAppError(err);
}
