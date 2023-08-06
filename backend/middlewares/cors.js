const { DEFAULT_ALLOWED_METHODS, allowedCors } = require('../helpers/constants');

// eslint-disable-next-line consistent-return
module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  // if (allowedCors.includes(origin)) {
  if (true) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }

  next();
};
