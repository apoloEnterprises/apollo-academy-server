import { log } from 'console';
import { Request, Response } from 'express';
import { send } from 'process';
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const sqlType = require('../controllers/types/sqlTyped');
const sha256 = require('sha256');
  
// user first actions - login, sign up, first choice of cateogries etc..
   
class userController {
  // public async index (nomeDeUsuario: string, senhauuid: string) {

  //   console.log(`isnide repo: ${senhauuid}`);
    

  // interface ResultQuey {
  //   id: number,
  //   nomeDeUsuario: string,
  //   senha: string,
  //   email: string,
  // }

  //   const sql: typeof sqlType = `
  //   SELECT id, nomeDeUsuario, email, senha
  //   FROM usuarios
  //   WHERE nomeDeUsuario=?
  //   `; 

  //   db.query(sql, [nomeDeUsuario], async function (err: Error, result: ResultQuey[]) {
  //     if (err) {
  //       console.log(err);
  //       return 500;
  //     }

  //     const ResultUsername = await result[0]?.nomeDeUsuario;
  //     console.log(`inside query: ${ResultUsername}`);
      
  //     const ResultPassword = await result[0]?.senha;
  //     const resultid = result[0]?.id;

  //     if(nomeDeUsuario === ResultUsername && senhauuid === ResultPassword) {
  //       const data =  await new Promise ((resolve, reject) => {
  //         resolve(
  //           {
  //             status: nomeDeUsuario,
  //             id: resultid
  //           }
  //         );
  //       }); 
        
  //       return data;
  //     } else {
  //       return  'Username or password is not valid.';
  //     }
  //   });
  // }

  async index (nomeDeUsuario: string) {
    const sql: typeof sqlType = `
    SELECT id, nomeDeUsuario, email, senha
    FROM usuarios
    WHERE nomeDeUsuario=?
    `; 

    interface ResultQuey {
      id: number,
      nomeDeUsuario: string,
      senha: string,
      email: string,
    }
 
    const [row] = await db.execute(sql, [nomeDeUsuario], function (err: Error, result: ResultQuey) {
      if (err) throw err;
      return result;
    });
    console.log(row);
    return row; 
  }
}  

module.exports = new userController();
