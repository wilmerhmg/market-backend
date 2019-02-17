import { Categories } from "../config/init.data";

module.exports = (sequelize, DataType) => {
   const Gallery = sequelize.define('Gallery', {
      id_post:{
         type: DataType.UUID,
         primaryKey: true,
         defaultValue: DataType.UUIDV1,
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

   }, {
      tableName: 'posts_gallery'
   });

   Gallery.associate = (models) => {

   };

   return Gallery;
};