module.exports = (app) => {
   app.get(`${app.config.init.baseApi}circuit/health`,(req, res) => {
      res.status(200).send("OK!");
   });
};