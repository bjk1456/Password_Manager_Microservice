import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import { PostgresRouter } from './controllers/v0/postgres.router';

import bodyParser from 'body-parser';
import { config } from './config/config';
import { V0MODELS } from './controllers/v0/model.index';
import cors from 'cors';

const c = config.dev;
//const cors = require('cors')

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  const app = express();
  app.use(cors())
  //app.options('*',cors())
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());



  //CORS Should be restricted
  app.use('/api/v0/', IndexRouter)
  app.use('/api/v0/postgres', PostgresRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running ` + c.url );
      console.log( `press CTRL+C to stop server` );
  } );
})();