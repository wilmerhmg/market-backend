"use strict";

module.exports = function (sequelize, DataType) {
  var Stock = sequelize.define('Stock', {
    sku: {
      type: DataType.STRING(17),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [1, 17]
        }
      }
    }
  });

  Stock.associate = function (models) {};

  return Stock;
};