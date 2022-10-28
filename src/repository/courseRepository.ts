import { Request, Response } from 'express';
const db = require('../database/db');

class courseRepository {
  
 findUserByName (nomeDeUsuario: string) {
  interface ResultQuey {
    nomeDeUsuario: string,
  }

  const userQuery = db.query(`SELECT * from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], 
  function (err: Error, result: ResultQuey[]) {
    if (err) throw err;
    console.log(result);
  });
  }
} 
 
module.exports = new courseRepository();
