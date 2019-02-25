"use strict";

module.exports = function (app) {
  var baseApi = app.config.init.baseApi;
  var sequelize = app.config.db.sequelize;
  var Op = app.config.db.sequelize.Op;
  var Categories = app.config.db.models.Categories;
  var Articles = app.config.db.models.Articles;
  var Pictures = app.config.db.models.Pictures;
  var Controller = app.controllers.articles;
  app.get("".concat(baseApi, "articles/find"), function (req, res) {
    var paginator = Controller.buildPagination(req);
    var search = req.query.search || null;
    var filter = Controller.buildFilters(req);
    var having = Controller.buildHaving(req);
    Articles.findAll({
      attributes: [sequelize.literal('SQL_CALC_FOUND_ROWS id_post AS id_post'), 'sku', 'title', 'price', 'stock', 'preview', 'Articles.createdAt', [sequelize.literal("MATCH (title,Articles.description,sku) AGAINST ( ".concat(sequelize.escape(search), " IN BOOLEAN MODE)")), 'score']],
      include: [{
        model: Categories,
        required: true,
        attributes: ['description']
      }],
      limit: paginator.limit,
      offset: paginator.offset,
      where: filter,
      having: having,
      order: [[sequelize.literal('score'), 'DESC'], ['title', 'ASC']],
      raw: true //Don't create DAO model

    }).then(Controller.getFoundRows).then(function (response) {
      res.json(response);
    }).catch(function (error) {
      res.json([error.message]);
    });
  });
  app.get("".concat(baseApi, "articles/:id"), function (req, res) {
    Articles.findOne({
      where: {
        id_post: req.params.id
      },
      include: [{
        model: Pictures,
        required: false,
        attributes: ['url', 'thumbnail']
      }, {
        model: Categories,
        required: true,
        attributes: ['id_category', 'description']
      }]
    }).then(function (article) {
      !article ? res.status(404).json(null) : res.json(article);
    }).catch(function (error) {
      res.status(404).json(error);
    });
  });
};