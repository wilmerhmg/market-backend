"use strict";

var _init = require("../config/init.data");

module.exports = function (sequelize, DataType) {
  var Categories = sequelize.define('Categories', {
    id_category: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataType.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [1, 128]
        }
      }
    },
    parent_id: {
      type: DataType.INTEGER
    }
  }, {
    tableName: 'categories',
    hooks: {
      // executed "after" `Model.sync(...)`
      afterSync: function afterSync(options) {
        // this = Model
        this.bulkCreate(_init.categories);
      }
    }
  });
  /*Create foreign keys and associations between models*/

  Categories.associate = function (models) {
    /*A category has many post*/
    Categories.hasMany(models.Articles, {
      foreignKey: 'category_id',
      foreignKeyConstraint: true
    });
  };

  return Categories;
};