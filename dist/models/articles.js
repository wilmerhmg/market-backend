"use strict";

var _init = require("../config/init.data");

module.exports = function (sequelize, DataType) {
  var Articles = sequelize.define('Articles', {
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
    tableName: 'articles',
    hooks: {
      // executed "after" `Model.sync(...)`
      afterSync: function afterSync(options) {
        // this = Model Load Fake data
        this.bulkCreate(_init.articles);
      }
    },
    indexes: [// Add a FULLTEXT index [MATCH AGAINST ALGORITHM]
    {
      type: 'FULLTEXT',
      name: 'text_idx',
      fields: ['description', 'title', 'sku']
    }]
  });
  /*Create foreign keys and associations between models*/

  Articles.associate = function (models) {
    /*A article has a category*/
    Articles.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      foreignKeyConstraint: true
    });
    /*A article has many pictures*/

    Articles.hasMany(models.Pictures, {
      foreignKey: 'article_id',
      foreignKeyConstraint: true
    });
  };

  return Articles;
};