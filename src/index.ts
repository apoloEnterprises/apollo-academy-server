const express = require('express');
const app = express();
const routes = require('./Routes');
// const db = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const port = 3010;
 
app.use(cors()); 
  
app.use(bodyParser.json()); 
app.use(routes);
app.use(compression());
 
app.listen(port, () => console.log('online'));
   
                 