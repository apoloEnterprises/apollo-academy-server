const mysql = require('mysql2/promise');

const bluebird = require('bluebird');

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sql',
  database: 'apollo',
  Promise: bluebird
});

db.connect((error: string): void => {
  if (error) {
    console.log(error);
  } else {
    console.log('🔥 Conectado ao banco de dados');
  }
});


module.exports = db; 