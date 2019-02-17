"use strict";

var _consign = _interopRequireDefault(require("consign"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
(0, _consign.default)({
  cwd: __dirname
}).include('config/init.js').then('config/db.js').then('core/middlewares.js').then('routes').then('core/boot.js').into(app);