module.exports = (app) => {
   app.config.db.sequelize.sync({force: true}).done(() => {
      app.listen(app.get('port'), () => {
         console.log('Server on port', app.get('port'));
      });
   });
};