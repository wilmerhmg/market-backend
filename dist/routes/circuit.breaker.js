"use strict";

module.exports = function (app) {
  var baseApi = app.config.init.baseApi;
  app.get("".concat(baseApi, "circuit/health"), function (req, res) {
    res.status(200).send("OK!");
  });
};