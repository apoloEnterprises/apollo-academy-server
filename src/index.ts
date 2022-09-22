const express = require('express');
import { Request, Response } from 'express';
const app = express();
const routes = require('./Routes');
const db = require('./database/db');
const bodyParser = require('body-parser');

const port = 3010;

app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log('online'));
