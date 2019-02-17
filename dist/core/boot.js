"use strict";

module.exports = function (app) {
  app.config.db.sequelize.sync().done(function () {
    app.listen(app.get('port'), function () {
      console.log('Server on port', app.get('port'));
    });
  });
};