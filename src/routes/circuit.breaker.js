module.exports = (app) => {
   const baseApi = app.config.init.baseApi;
   app.get(`${baseApi}circuit/health`, (req, res) => {
      res.status(200).send("OK!");
   });
};