"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;

module.exports = function (app) {
  if (db) return db;
  var config = app.config.init;
  var sequelize = new _sequelize.default(config.database, config.username, config.password, config.params);
  db = {
    sequelize: sequelize,
    Sequelize: _sequelize.default,
    models: {}
  };

  var dir = _path.default.join(__dirname, '../models');
  /*Loading defined models*/


  _fs.default.readdirSync(dir).forEach(function (filename) {
    var modelDir = _path.default.join(dir, filename);

    var model = sequelize.import(modelDir);
    db.models[model.name] = model;
  });
  /*Executing association between models*/


  Object.keys(db.models).forEach(function (key) {
    db.models[key].associate(db.models);
  });
  return db;
};