"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function (app) {
  var _this = this;

  var Op = app.config.db.sequelize.Op;
  var Se = app.config.db.sequelize;
  /**
   * Return total found rows from select
   * @param records
   * @return Object*/

  this.getFoundRows = function (records) {
    return Se.query("SELECT FOUND_ROWS() AS FoundRows", {
      type: Se.QueryTypes.SELECT
    }).then(function (Found) {
      return {
        total: Found[0].FoundRows,
        rows: records
      };
    });
  };
  /**
   * Building Having for Computed columns in select.
   *
   * @param req
   * @return Object
   * */


  this.buildHaving = function (req) {
    var having = {};
    var search = req.query.search;
    if (search) having = Object.assign(having, {
      score: _defineProperty({}, Op.gt, 0)
    });
    return having;
  };
  /**
   * Building pagination.
   *
   * @param req
   * @return {Object<limit,offset>}
   * */


  this.buildPagination = function (req) {
    var limit = parseInt(req.query.limit) || 20;
    var offset = parseInt(req.query.offset) || 0;
    return {
      limit: limit,
      offset: offset
    };
  };
  /**
   * Building all filters.
   *
   * @param req
   * @return {Object}
   * */


  this.buildFilters = function (req) {
    var filter = {};
    filter = Object.assign(filter, _this.__FilterByPrice(req));
    filter = Object.assign(filter, _this.__FilterByCategory(req));
    return filter;
  };
  /**
   * Filter by price [between or (gte and lte)].
   *
   * @param req
   * @return {Object}
   * */


  this.__FilterByPrice = function (req) {
    var price_min = parseFloat(req.query.price_min) || 0;
    var price_max = parseFloat(req.query.price_max) || 0;
    var ByPrice = {};

    if (price_min && price_max) {
      ByPrice = Object.assign(ByPrice, {
        price: _defineProperty({}, Op.between, [price_min, price_max])
      });
    } else if (price_min) {
      ByPrice = Object.assign(ByPrice, {
        price: _defineProperty({}, Op.gte, price_min)
      });
    } else if (price_max) {
      ByPrice = Object.assign(ByPrice, {
        price: _defineProperty({}, Op.lte, price_max)
      });
    }

    return ByPrice;
  };
  /**
   * Filter by category [eq].
   *
   * @param req
   * @return {Object}
   * */


  this.__FilterByCategory = function (req) {
    var category = parseInt(req.query.category) || null;
    var ByCategory = {};
    if (category) ByCategory = Object.assign(ByCategory, {
      category_id: _defineProperty({}, Op.eq, category)
    });
    return ByCategory;
  };

  return this;
};