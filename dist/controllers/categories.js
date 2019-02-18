"use strict";

module.exports = function (app) {
  /**
   * @return {array<Object>}
   * @param categories
   * */
  this.bunch = function (categories) {
    var GroupByParentID = function GroupByParentID(i) {
      return !i.parent_id;
    };

    var GroupCategories = categories.filter(GroupByParentID);
    return GroupCategories.map(function (i) {
      i.childs = categories.filter(function (e) {
        return e.parent_id === i.id_category;
      });
      return i;
    });
  };

  return this;
};
/*
* The arrow function don't replace at classic functions 😉
* */