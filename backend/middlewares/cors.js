const { DEFAULT_ALLOWED_METHODS, allowedCors } = require('../helpers/constants');

// eslint-disable-next-line consistent-return
module.exports.cors = (req, res, next) => {
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  const { method } = req;

  // if (allowedCors.includes(origin)) {
  if (true) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
