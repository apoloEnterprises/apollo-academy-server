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
      subCategoria1,
      subCategoria2,
      subCategoria3,
      nomeDeUsuario,
      
      } = await req.body;
          
      if(!id) {
        res.status(404).json({
          message: 'User not found.',
        })
      }
 
      const sql: typeof sqlType = `
      SELECT nomeDeUsuario
      FROM usuarios
      WHERE id=?
      `
      
      // function handleCategory() {
      // } 
      
      // const mapped = (categoria: string) => {
        
      // }

      // console.log(handleCategory());

      // const sqlMatchCategories: typeof sqlType = `
      // SELECT *
      // FROM curso_category
      // RIGHT JOIN usuarios
      // ON curso_category.sub_categoria = usuarios.subCategoria1
      // `

      const sqlMatchCategories: typeof sqlType = `
      SELECT item
      FROM curso_category
      WHERE sub_categoria IN (?, ?)
      `
  
      db.query(sql, [id], async function (err: Error, result: typeof ResultQueyUser[]) {
        if (err) throw err;
        const [re] = await result;
        const categoryUser = re?.categoria;
        const subCategory_1_User = re?.subCategoria1;
        const subCcategory_2_User = re?.subCategoria2;
        const SubCategory_3_User = re?.subCategoria3;
        

        db.query(sqlMatchCategories, [subCategory_1_User, SubCategory_3_User], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
          res.status(200).send(result)
         } )

      //   function findMe() {

      //     const steps = categorias; // (1)
      
      //     return Object.values(steps).filter((obj: any) => obj.programacao === subCcategory_2_User)[0];
      // }

        // switch (categoryUser) {
        //   case 'programacao':
        //     res.send(findMe())
        //     // res.json(categorias[0].programacao.front_End);
        //     categorias.map((category: any) => {
        //       if (category[0] == categoryUser) {
        //         console.log('foi');
        //       } else {
        //         console.log('n foi');
        //         console.log(categoryUser);
        //         console.log('-----------');
        //         console.log(Object.keys(category[0]));
        //       }
        //     })
        //     break;
        // }

        // if (categoryUser == 9) {
        //   res.status(200).send('foi');
        // } else {
        //   res.status(200).send('nao foi');
        // }

        // switch (categoryUser) {
        //     case :
            
        //     break;
        
        //   default:
        //     break;
        // }

        // categorias.map((category: any) => {
        //   if (category[0] == categoryUser) {
        //     res.status(200).send('foi');
        //   } else {
        //     res.status(200).send('nao foi');
        //     console.log(categoryUser);
        //     console.log('-----------');
        //     console.log(category);
        //   }
        // })

        // res.status(200).json(categoryUser)
      })
   }
}

module.exports = new userController();
