import { categories } from '../config/init.data';

module.exports = (sequelize, DataType) => {
   const Categories = sequelize.define('Categories', {
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
            this.bulkCreate(categories);
         }
      }
   });

   /*Create foreign keys and associations between models*/
   Categories.associate = (models) => {

      /*A category has many post*/
      Categories.hasMany(models.Posts, {foreignKey: 'category_id', foreignKeyConstraint: true});

   };

   return Categories;
};