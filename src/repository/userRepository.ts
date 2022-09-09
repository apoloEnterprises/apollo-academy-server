import { Request, Response } from 'express';
const db = require('../database/db');
class userRepository {
 public async findUserByName (nomeDeUsuario: string) {
  db.query(`SELECT nomeDeUsuario from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], 
  function (err: Error, result: any) {
    if (err) throw err;
    if (result.length > 0) {
      return true;
    }})
  };

//   public async createUser(nomeDeUsuario: string, email: string, senha: string, trofeus: number, categoria: number, subCategoria1: number, subCategoria2: number, subCategoria3: number) {

//     const otherData = {trofeus: 0, categoria: 0, subCategoria1: 0, subCategoria2: 0, subCategoria3: 0};

//     type sqlType = string;

//     const sql: sqlType =  db.query(`INSERT INTO usuarios 
//     (nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?, ?, ?,?)`);

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

//  else {
//           db.query(sql, [nomeDeUsuario, email, senha, otherData.trofeus, otherData.categoria, otherData.subCategoria1, otherData.subCategoria2, otherData.subCategoria3], async function (err: Error, result: any) {
//             if (err) throw err;
//             db.query(`SELECT * FROM usuarios where nomeDeUsuario=?`, [nomeDeUsuario], 
//             function (err: Error, result: ResultQuey[]): void {
//               res.status(200).send(`User registered successfully: ${result[0].nomeDeUsuario}`);
//               console.log(result[0].nomeDeUsuario);
//             })
//           })
  
//   }

//   public async getCategory (req: Request, res: Response) {

//   }
}

module.exports = new userRepository();
