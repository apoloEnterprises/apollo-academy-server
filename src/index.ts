const express = require('express');
import { NextFunction, Request, Response, response } from 'express';
const app = express();
const routes = require('./Routes');
const db = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression')

const port = 3010;
 
app.use(cors()); 
  
app.use(bodyParser.json());
app.use(routes);
app.use(compression());

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next()
// })
  
 
app.listen(port, () => console.log('online'))
   
                 