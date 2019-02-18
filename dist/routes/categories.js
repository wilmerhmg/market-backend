"use strict";

module.exports = function (app) {
  var baseApi = app.config.init.baseApi;
  var Categories = app.config.db.models.Categories;
  var Controller = app.controllers.categories;
  app.get("".concat(baseApi, "categories"), function (req, res) {
    Categories.findAll({
      attributes: ['id_category', 'description', 'parent_id'],
      order: [['parent_id', 'ASC'], ['description', 'ASC']],
      raw: true //Don't create DAO model

    }).then(Controller.bunch).then(function (BunchCategories) {
      res.json(BunchCategories);
    }).catch(function (error) {
      res.json([]);
    });
  });
};