module.exports = function (app) {
   /**
    * @return {array<Object>}
    * @param categories
    * */
   this.bunch = (categories) => {
      let GroupByParentID = (i) => !i.parent_id;
      let GroupCategories = categories.filter(GroupByParentID);
      return GroupCategories.map(i => {
         i.childs = categories.filter(e => e.parent_id === i.id_category);
         return i;
      });
   };

   return this;
};

/*
* The arrow function don't replace at classic functions 😉
* */