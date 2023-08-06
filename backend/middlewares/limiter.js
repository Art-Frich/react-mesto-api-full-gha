const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 1000 * 60 * 10, // 10 minutes
  max: 100, // limit each IP to request
  message: 'Too many requests created from this IP, please try again after an 10 minutes',
  statusCode: 400,
  standardHeaders: true,
  legacyHeaders: false,
});
