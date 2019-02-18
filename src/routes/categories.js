module.exports = (app) => {
   const baseApi    = app.config.init.baseApi;
   const Categories = app.config.db.models.Categories;
   const Controller = app.controllers.categories;

   app.get(`${baseApi}categories`, (req, res) => {
      Categories.findAll({
         attributes: [
            'id_category',
            'description',
            'parent_id'
         ],
         order: [
            ['parent_id', 'ASC'],
            ['description', 'ASC']
         ],
         raw: true //Don't create DAO model
      }).then(
         Controller.bunch
      ).then(BunchCategories => {
         res.json(BunchCategories);
      }).catch(error => {
         res.json([]);
      })
   });
};