"use strict";

var _init = require("../config/init.data");

module.exports = function (sequelize, DataType) {
  var Posts = sequelize.define('Posts', {
    id_post: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV1
    },
    sku: {
      type: DataType.STRING(17),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [1, 17]
        }
      }
    },
    title: {
      type: DataType.STRING(256),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [1, 17]
        }
      }
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    stock: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    description: {
      type: DataType.TEXT
    }
  }, {
    tableName: 'posts',
    hooks: {
      // executed "after" `Model.sync(...)`
      afterSync: function afterSync(options) {
        // this = Model Load Fake data
        this.bulkCreate(_init.posts);
      }
    }
  });
  /*Create foreign keys and associations between models*/

  Posts.associate = function (models) {
    /*A post has a category*/
    Posts.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      foreignKeyConstraint: true
    });
    /*A post has many images*/

    Posts.hasMany(models.Picture, {
      foreignKey: 'post_id',
      foreignKeyConstraint: true
    });
  };

  return Posts;
};