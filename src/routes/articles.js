module.exports = (app) => {
   const baseApi    = app.config.init.baseApi;
   const sequelize  = app.config.db.sequelize;
   const Op         = app.config.db.sequelize.Op;
   const Categories = app.config.db.models.Categories;
   const Articles   = app.config.db.models.Articles;
   const Pictures   = app.config.db.models.Pictures;
   const Controller = app.controllers.articles;

   app.get(`${baseApi}articles/find`, (req, res) => {

      let paginator = Controller.buildPagination(req);
      let search    = req.query.search || null;
      let filter    = Controller.buildFilters(req);
      let having    = Controller.buildHaving(req);

      Articles.findAll({
         attributes: [
            sequelize.literal('SQL_CALC_FOUND_ROWS id_post AS id_post'),
            'sku', 'title', 'price', 'stock', 'preview', 'Articles.createdAt',
            [sequelize.literal(
               `MATCH (title,Articles.description,sku) AGAINST ( ${sequelize.escape(search)} IN BOOLEAN MODE)`
            ), 'score']
         ],
         include: [{
            model: Categories,
            required: true,
            attributes: [
               'description'
            ]
         }],
         limit: paginator.limit,
         offset: paginator.offset,
         where: filter,
         having: having,
         order: [
            [sequelize.literal('score'), 'DESC'],
            ['title', 'ASC']
         ],
         raw: true //Don't create DAO model
      }).then(Controller.getFoundRows).then(response => {
         res.json(response);
      }).catch(error => {
         res.json([error.message]);
      })
   });

   app.get(`${baseApi}articles/:id`, (req, res) => {
      Articles.findOne({
         where: {
            id_post: req.params.id
         },
         include: [{
            model: Pictures,
            required: false,
            attributes: [
               'url',
               'thumbnail'
            ]
         }, {
            model: Categories,
            required: true,
            attributes: [
               'id_category',
               'description'
            ]
         }]
      }).then(article => {
         !(article) ? res.status(404).json(null) : res.json(article);
      }).catch(error => {
         res.status(404).json(error);
      })
   });
};