const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sql',
  database: 'apollo',
});

db.connect((error: string): void => {
  if (error) {
    console.log(error);
  } else {
    console.log('🔥 Conectado ao banco de dados');
  }
});


module.exports = db;