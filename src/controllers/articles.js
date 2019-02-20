module.exports = function (app) {
   const Op = app.config.db.sequelize.Op;
   const Se = app.config.db.sequelize;

   /**
    * Return total found rows from select
    * @param records
    * @return Object*/
   this.getFoundRows = (records) => {
      return Se.query(`SELECT FOUND_ROWS() AS FoundRows`, {
         type: Se.QueryTypes.SELECT
      }).then(Found => {
         return {total: Found[0].FoundRows, rows: records};
      });
   };

   /**
    * Building Having for Computed columns in select.
    *
    * @param req
    * @return Object
    * */
   this.buildHaving = (req) => {
      let having = {};
      let search = req.query.search;

      if(search) having = Object.assign(having, {
         score: {[Op.gt]: 0}
      });

      return having;
   };

   /**
    * Building pagination.
    *
    * @param req
    * @return {Object<limit,offset>}
    * */
   this.buildPagination = (req) => {
      let limit  = parseInt(req.query.limit) || 20;
      let offset = parseInt(req.query.offset) || 0;
      return {limit, offset};
   };

   /**
    * Building all filters.
    *
    * @param req
    * @return {Object}
    * */
   this.buildFilters = (req) => {
      let filter = {};

      filter = Object.assign(filter, this.__FilterByPrice(req));
      filter = Object.assign(filter, this.__FilterByCategory(req));

      return filter;
   };

   /**
    * Filter by price [between or (gte and lte)].
    *
    * @param req
    * @return {Object}
    * */
   this.__FilterByPrice = (req) => {
      let price_min = parseFloat(req.query.price_min) || 0;
      let price_max = parseFloat(req.query.price_max) || 0;
      let ByPrice   = {};

      if(price_min && price_max) {
         ByPrice = Object.assign(ByPrice, {
            price: {[Op.between]: [price_min, price_max]}
         });
      } else if(price_min) {
         ByPrice = Object.assign(ByPrice, {
            price: {[Op.gte]: price_min}
         });
      } else if(price_max) {
         ByPrice = Object.assign(ByPrice, {
            price: {[Op.lte]: price_max}
         });
      }

      return ByPrice;
   };

   /**
    * Filter by category [eq].
    *
    * @param req
    * @return {Object}
    * */
   this.__FilterByCategory = (req) => {
      let category   = parseInt(req.query.category) || null;
      let ByCategory = {};

      if(category) ByCategory = Object.assign(ByCategory, {
         category_id: {[Op.eq]: category}
      });

      return ByCategory;
   };

   return this;
};