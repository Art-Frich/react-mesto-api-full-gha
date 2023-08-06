const fullerConsoleLine = '###################################################### -_- #####################################################';
const LOGOUT_SUCC = 'Logout successfull';

const NOT_ROUTE_TEXT = 'Пожалуйста ознакомьтесь с API сервера для обращения к корректным роутам. https://github.com/Art-Frich/express-mesto-gha';
const NOT_USER_TEXT = 'Пользователь не найден';
const NOT_CARD_TEXT = 'Не удалось найти карточку';
const NOT_CARDS_TEXT = 'Пока нет ни одной созданной карточки';
const NOT_USERS_TEXT = 'Пока нет ни одного зарегистрированного пользователя';
const NOT_AUTH_TEXT = 'Необходима авторизация';
const UNCORRECT_DATA_TEXT = 'Переданные данные некорректны. ';
const UNCORRECT_AUTH_TEXT = 'Неправильная почта или пароль.';
const ALIEN_CARD_TEXT = 'Вы не можете удалять чужие карточки';
const USER_EXIST_TEXT = 'Пользователь с таким email уже зарегистрирован';
const EXPECTED_URL_TEXT = 'Некорректный URL. Ожидаемый формат: http://... или https://... ';
const EXPECTED_EMAIL_TEXT = 'Некорректный email. Пример: primer@gmail.com';

const NOT_FOUND_STATUS = 404;
const ERROR_DEFAULT_STATUS = 500;
const UNCORRECT_DATA_STATUS = 400;
const SUCCES_CREATE_STATUS = 201;
const UNCORRECT_AUTH_STATUS = 401;
const ALIEN_CARD_STATUS = 403;
const USER_EXIST_STATUS = 409;
const MONGO_CONFLICT_STATUS = 11000;

const minLen = 2;
const maxLen = 30;

// eslint-disable-next-line no-useless-escape
const regExpUrl = /^(http|https):\/\/[\w\-._~:/?#[\]@!\$&'()\*\+,;=]+\.[a-z\/]{2,}#*$/;
const regExpEmail = /[\w]+@[\w]+\.[a-z]{2,}/;
const regExpObjectId = /^[\w]{24}$/;

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
const allowedCors = [
  'http://localhost:3000',
  'https://riki-tiki-v-damki.nomoreparties.co',
  'http://riki-tiki-v-damki.nomoreparties.co',
];

const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};
const newCookieOptions = {
  maxAge: 1000 * 3600 * 24 * 7,
  httpOnly: true,
};// 7 day
const oldCookieOptions = {
  maxAge: 0,
  httpOnly: true,
};// 7 day

module.exports = {
  NOT_FOUND_STATUS,
  ERROR_DEFAULT_STATUS,
  SUCCES_CREATE_STATUS,
  UNCORRECT_DATA_STATUS,
  UNCORRECT_AUTH_STATUS,
  MONGO_CONFLICT_STATUS,
  USER_EXIST_STATUS,
  ALIEN_CARD_STATUS,

  NOT_CARDS_TEXT,
  NOT_AUTH_TEXT,
  ALIEN_CARD_TEXT,
  USER_EXIST_TEXT,
  EXPECTED_URL_TEXT,
  EXPECTED_EMAIL_TEXT,
  UNCORRECT_DATA_TEXT,
  UNCORRECT_AUTH_TEXT,
  NOT_ROUTE_TEXT,
  NOT_USER_TEXT,
  NOT_CARD_TEXT,
  NOT_USERS_TEXT,

  minLen,
  maxLen,

  regExpUrl,
  regExpEmail,
  regExpObjectId,

  mongooseOptions,
  newCookieOptions,
  oldCookieOptions,

  fullerConsoleLine,
  LOGOUT_SUCC,

  DEFAULT_ALLOWED_METHODS,
  allowedCors,
};
