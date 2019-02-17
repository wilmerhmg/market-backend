module.exports = (sequelize, DataType) => {
   const Stock = sequelize.define('Stock', {
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
      },

   });

   Stock.associate = (models) => {

   };

   return Stock;
};