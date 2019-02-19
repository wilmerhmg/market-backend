module.exports = (app) => {
   const baseApi    = app.config.init.baseApi;
   const sequelize  = app.config.db.sequelize;
   const Articles   = app.config.db.models.Articles;
   const Controller = app.controllers.articles;

   app.get(`${baseApi}articles/find`, (req, res) => {

      let limit  = req.body.limit  || 20;
      let offset = req.body.offset || 0;
      let search = req.body.search || null;

      Articles.findAll({
         attributes: [
            'id_post',
            'sku',
            'title',
            'price',
            'stock',
            [sequelize.literal(
               `MATCH (title,description) AGAINST ( ${sequelize.escape(search)} IN BOOLEAN MODE)`
            ), 'score']
         ],
         order: [
            [
               sequelize.literal('score'),
               'DESC'
            ]
         ],
         raw: true //Don't create DAO model
      }).then(BunchCategories => {
         res.json(BunchCategories);
      }).catch(error => {
         res.json([error.message]);
      })
   });
};