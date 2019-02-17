"use strict";

module.exports = function (app) {
  app.get("".concat(app.config.init.baseApi, "circuit/health"), function (req, res) {
    res.status(200).send("OK!");
  });
};