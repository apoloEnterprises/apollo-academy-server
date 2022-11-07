// import { Request, Response } from 'express';
// const db = require('../database/db');
// class userRepository {
  
//  findUserByName (nomeDeUsuario: string) {
//   interface ResultQuey {
//     nomeDeUsuario: string,
//   };

//   const userQuery = db.query(`SELECT * from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], 
//   function (err: Error, result: ResultQuey[]) {
//     if (err) throw err;
//     console.log(result);
//   });
//   };

//   async crateUser({nomeDeUsuario: string, email, senha, trofeus = 0, categoria = 0, subCategoria1 = 0, subCategoria2 = 0, subCategoria3 = 0}) {

//     // const otherData = {trofeus: 0, categoria: 0, subCategoria1: 0, subCategoria2: 0, subCategoria3: 0};
//     interface ResultQuey {
//       id: number,
//       nomeDeUsuario: string,
//       senha: string,
//       email: string,
//       trofeus: number,
//       categoria: number,
//       subCategoria1: number,
//       subCategoria2: number,
//       subCategoria3: number
//     }

//     type sqlType = string;

//     const [mysql]: sqlType = db.query(`INSERT INTO usuarios 
//     (nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?, ?, ?,?)`, [nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1, subCategoria2, subCategoria3], async function (err: Error, result: ResultQuey[]) {
//       if (err) throw err;
//       console.log(result);
//     });

//     return mysql
//   }

//   public async getCategory (req: Request, res: Response) {

//   }
// }

// module.exports = new userRepository();
