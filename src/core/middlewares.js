import express from 'express';

module.exports = app => {
   console.log('Middleware load...');
   // Settings
   app.set('port', process.env.MRKP_BACK_PORT || 14002);
   app.set('json spaces', 4);

   // middlewares
   app.use(express.json());
   app.use((req, res, next) => {
      res.setHeader('X-Powered-By', 'CondorLabs');
      next();
   });
};