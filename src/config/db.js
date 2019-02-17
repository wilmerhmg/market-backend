import Sequelize from 'sequelize';
import path      from 'path';
import fs        from 'fs';

let db = null;

module.exports = app => {
   if(db) return db;

   const config    = app.config.init;
   const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
   );

   db = {
      sequelize,
      Sequelize,
      models: {}
   };

   const dir = path.join(__dirname, '../models');

   /*Loading defined models*/
   fs.readdirSync(dir).forEach(filename => {
      const modelDir        = path.join(dir, filename);
      const model           = sequelize.import(modelDir);
      db.models[model.name] = model;
   });

   /*Executing association between models*/
   Object.keys(db.models).forEach(key => {
      db.models[key].associate(db.models);
   });

   return db;
};