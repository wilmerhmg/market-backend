import { Categories } from '../config/init.data';

module.exports = (sequelize, DataType) => {
   const categories = sequelize.define('Categories', {
      id_category: {
         type: DataType.INTEGER,
         primaryKey: true,
         autoIncrement: true,
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
         afterSync: function (options) {
            // this = Model
            this.bulkCreate(Categories);
         }
      }
   });

   categories.associate = (models) => {

   };

   return categories;
};