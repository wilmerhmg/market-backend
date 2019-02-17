module.exports = (sequelize, DataType) => {
   const Stock = sequelize.define('Posts', {
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
      tableName: 'posts'
   });

   Stock.associate = (models) => {

   };


   return Stock;
};