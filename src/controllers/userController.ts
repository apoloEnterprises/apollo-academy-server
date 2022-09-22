import { Request, Response } from 'express';
const db = require('../database/db');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');

// user first actions - login, sign up, first choice of cateogries etc..
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
    } else {
      res.status(404).send('User not found.');
    }
  }

  public async select(req: Request, res: Response) {
    const {
      nomeDeUsuario,
      email, 
      senha,
    } = req.body;
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

    const id = uuidv4();

    interface NumData {
      trofeus: number,
      categoria: number,
      subCategoria1: number,
      subCategoria2: number,
      subCategoria3: number
    }

    const otherData: NumData = {trofeus: 0, categoria: 0, subCategoria1: 0, subCategoria2: 0, subCategoria3: 0};

    if (!nomeDeUsuario) {
      res.status(404).send('No user provided.')
    }

    db.query(`SELECT nomeDeUsuario FROM usuarios WHERE nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: ResultQuey[]) {
    if (err) throw err;
    if (result[0]?.nomeDeUsuario.length > 0 ) {
      res.status(401).send('Username already in use.');
    }
    db.query(`SELECT email FROM usuarios WHERE email=?`, [email], async function (err: Error, result: ResultQuey[]) {
      if (err) throw err;
      if ( result[0]?.email.length > 0 ) {
        res.status(401).send('Email already in use.');
      } else {
        db.query(`INSERT INTO usuarios
        (id, nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?,?, ?,?,?)`, [id, nomeDeUsuario, email, senha, otherData.trofeus, otherData.categoria, otherData.subCategoria1, otherData.subCategoria2, otherData.subCategoria3], async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          res.status(200).send(`User created successfully: ${nomeDeUsuario}`)      
        })}
     })}
    ) 
  }

  public async getIn(req: Request, res: Response) {
    const {
      nomeDeUsuario,
      senha
    } = req.body;

    interface ResultQuey {
      id: number,
      nomeDeUsuario: string,
      senha: string,
      email: string,
    }

    type sqlType = string;

    const sql: sqlType = `
    SELECT nomeDeUsuario, email, senha
    FROM usuarios
    WHERE nomeDeUsuario=?
    `;

    if(!nomeDeUsuario) {
      res.status(404).send('Email or username not found.');
    }

    db.query(sql, [nomeDeUsuario], async function (err: Error, result: ResultQuey[]) {
      if(err) throw err;
      const ResultUsername = result[0].nomeDeUsuario;
      const ResultPassword = result[0].senha;

      if(nomeDeUsuario === ResultUsername && senha === ResultPassword) {
        res.status(200).send({
          status: `logged in successfully as ${nomeDeUsuario}`
        })
      } else {
        res.status(404).send({
          status: 'Username or password is not valid.'
        })
      }
    });
   }
}

module.exports = new userController();
