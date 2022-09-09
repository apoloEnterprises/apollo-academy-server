import { Request, Response } from 'express';
const db = require('../database/db');
const userRepository = require('../repository/userRepository')
class userController {
 public async index (req: Request, res: Response) {
    const {
      subCategoria1,
      subCategoria2,
      subCategoria3,
      nomeDeUsuario,
      categoria,
      } = await req.body;

    type sqlType = string;

    const sql: sqlType = `UPDATE usuarios
    SET 
        categoria=?,
        subCategoria1=?,
        subCategoria2=?,
        subCategoria3=?
    WHERE 
        nomeDeUsuario=?
    `;

    if(categoria && nomeDeUsuario && subCategoria3 && subCategoria1 && subCategoria2) {
      db.query(`SELECT * FROM usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error): void {
        if (err) throw err;
            db.query(sql, [categoria, subCategoria1, subCategoria2, subCategoria3,nomeDeUsuario], function (err: Error): void {
              if (err) throw err;
                res.status(200).json({categoria: `${categoria}`, subCategoria1: `${subCategoria1}`,
                subCategoria2: `${subCategoria2}`,
                subCategoria3: `${subCategoria3}`
            }); 
          })
      })
    }
  };

  public async select(req: Request, res: Response) {
    const {
      nomeDeUsuario,
      email, 
      senha,
    } = req.body;

    interface NumData {
      trofeus: number,
      categoria: number,
      subCategoria1: number,
      subCategoria2: number,
      subCategoria3: number
    }

    const otherData: NumData = {trofeus: 0, categoria: 0, subCategoria1: 0, subCategoria2: 0, subCategoria3: 0};

    type sqlType = string;

    const sql: sqlType =  `INSERT INTO usuarios 
    (nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?, ?, ?,?)`;

    interface ResultQuey {
      id: number,
      nomeDeUsuario: string,
      senha: string,
      email: string,
      trofeus: number,
      categoria: number,
      subCategoria1: number,
      subCategoria2: number,
      subCategoria3: number
    }

    if (!nomeDeUsuario) {
      res.status(404).send('No user provided.')
    } else {
      db.query(`SELECT nomeDeUsuario from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: any) :void {
        if (err) throw err;
        if (result.length > 0) {
          res.status(409).send('User Already Registered.')
        } else {
          db.query(sql, [nomeDeUsuario, email, senha, otherData.trofeus, otherData.categoria, otherData.subCategoria1, otherData.subCategoria2, otherData.subCategoria3], async function (err: Error, result: any) {
            if (err) throw err;
            db.query(`SELECT * FROM usuarios where nomeDeUsuario=?`, [nomeDeUsuario], 
            function (err: Error, result: ResultQuey[]): void {
              res.status(200).send(`User registered successfully: ${result[0].nomeDeUsuario}`);
              console.log(result[0].nomeDeUsuario);
            })
          })
        }
    })
    }

  }

  public async getCategory (req: Request, res: Response) {
    const {
      subCategoria1,
      subCategoria2,
      subCategoria3,
      nomeDeUsuario,
      categoria,
      } = await req.body;



      if (categoria && nomeDeUsuario && subCategoria3 && subCategoria1 && subCategoria2) {

      }
  }
}

module.exports = new userController();
