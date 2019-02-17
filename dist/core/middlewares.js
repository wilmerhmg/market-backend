"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  console.log('Middleware load...'); // Settings

  app.set('port', process.env.MRKP_BACK_PORT || 14002);
  app.set('json spaces', 4); // middlewares

  app.use(_express.default.json());
  app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'CondorLabs');
    next();
  });
};