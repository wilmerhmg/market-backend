import { pictures } from "../config/init.data";

module.exports = (sequelize, DataType) => {
   const Picture = sequelize.define('Picture', {
      id_picture: {
         type: DataType.UUID,
         primaryKey: true,
         defaultValue: DataType.UUIDV1,
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
      tableName: 'posts_gallery',
      hooks: {
         // executed "after" `Model.sync(...)`
         afterSync: function (options) {
            // this = Model
            this.bulkCreate(pictures, {validate: false});
         }
      }
   });

   /*Create foreign keys and associations between models*/
   Picture.associate = (models) => {

      /*A image has a post*/
      Picture.belongsTo(models.Posts, {foreignKey: 'post_id', foreignKeyConstraint: true});
   };

   return Picture;
};