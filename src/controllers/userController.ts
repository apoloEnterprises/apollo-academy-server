import { log } from 'console';
import { Request, Response } from 'express';
import { send } from 'process';
const db = require('../database/db');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');
const sqlType = require('./types/sqlTyped');
const {
  ResultQueyUser,ResultQueyPost} = require('./types/resultTyped');
const {  ResultQueryInsertCategory } = require('./types/shortResultTyped');

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


    const sql: typeof sqlType = `UPDATE usuarios
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
                res.status(200).json({
                categoria: `${categoria}`,
                subCategoria1: `${subCategoria1}`,
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
    }

    const id = uuidv4();

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
        (id, nomeDeUsuario, email, senha) VALUES (?,?,?,?)`, [id, nomeDeUsuario, email, senha], async function (err: Error, result: ResultQuey[]) {
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

    const sql: typeof sqlType = `
    SELECT nomeDeUsuario, email, senha
    FROM usuarios
    WHERE nomeDeUsuario=?
    `;

    if(!nomeDeUsuario) {
      res.status(404).send('Email or username not found.');
    }

    db.query(sql, [nomeDeUsuario], async function (err: Error, result: ResultQuey[]) {
      if(err) throw err;
      const ResultUsername = result[0]?.nomeDeUsuario;
      const ResultPassword = result[0]?.senha;

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

   public async handleFeed(req: Request, res: Response) {
    const {
      id,
      } = await req.body;
          
      if(!id) {
        res.status(404).json({
          message: 'User not found.',
        })
      }
 

      const sqlUser: typeof sqlType = `
      SELECT *
      FROM usuario_category
      RIGHT JOIN usuarios
      ON usuario_category.id_usuario = usuarios.id
      `

      const sqlMatchCategories: typeof sqlType = `
      SELECT item
      FROM curso_category
      WHERE sub_categoria IN (?, ?, ?)
      `
   
      db.query(sqlUser, [id], async function (err: Error, result: typeof ResultQueyUser[]) {
        if (err) throw err;
        const [re] = await result;
        const categoryUser = re?.categoria;
        const subCategory_1_User = re?.sub_categoria;
        const subCategory_2_User = re?.sub_categoria2;
        const SubCategory_3_User = re?.sub_categoria3;
        
        db.query(sqlMatchCategories, [subCategory_1_User, subCategory_2_User, SubCategory_3_User], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
          res.status(200).send(result)
         } )
      })

   }

   public async inserUserCategory(req: Request, res: Response) {
    const {
      id_usuario,
      categoria,
      sub_categoria,
      sub_categoria2,
      sub_categoria3,
    } = req.body

    if (!id_usuario && !categoria && !sub_categoria && !sub_categoria2 && !sub_categoria3) {
      res.status(404).send('No data found.')
    }

    // const sqlUser: typeof sqlType = `
    // SELECT *
    // FROM usuarios
    // RIGHT JOIN usuario_category
    // ON usuarios.id = usuario_category.id_usuario
    // `

    // const sqlMatchCategories: typeof sqlType = `
    // SELECT item
    // FROM curso_category
    // WHERE sub_categoria IN (?, ?)
    // `

    const sqlInsertCategories: typeof sqlType = `
    SELECT curso
    `

    db.query(sqlInsertCategories, [id_usuario, categoria, sub_categoria, sub_categoria2, sub_categoria3], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      res.status(200).send(result)
     })

   }
}

module.exports = new userController();
