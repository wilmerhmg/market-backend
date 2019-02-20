"use strict";

var _init = require("../config/init.data");

module.exports = function (sequelize, DataType) {
  var Picture = sequelize.define('Pictures', {
    id_picture: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV1
    },
    url: {
      type: DataType.STRING(256),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [10, 256]
        }
      }
    },
    thumbnail: {
      type: DataType.STRING(256),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true
        },
        len: {
          args: [10, 256]
        }
      }
    }
  }, {
    tableName: 'article_pictures',
    hooks: {
      // executed "after" `Model.sync(...)`
      afterSync: function afterSync(options) {
        // this = Model Load Fake Data
        this.bulkCreate(_init.pictures);
      }
    }
  });
  /*Create foreign keys and associations between models*/

  Picture.associate = function (models) {
    /*A image has a post*/
    Picture.belongsTo(models.Articles, {
      foreignKey: 'article_id',
      foreignKeyConstraint: true
    });
  };

  return Picture;
};