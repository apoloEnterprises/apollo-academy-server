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
const sha256 = require('sha256');
 
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
      db.query('SELECT * FROM usuarios where nomeDeUsuario=?', [nomeDeUsuario], function (err: Error): void {
        if (err) throw err;
        db.query(sql, [categoria, subCategoria1, subCategoria2, subCategoria3,nomeDeUsuario], function (err: Error): void {
          if (err) throw err;
          res.status(200).json({
            categoria: `${categoria}`,
            subCategoria1: `${subCategoria1}`,
            subCategoria2: `${subCategoria2}`,
            subCategoria3: `${subCategoria3}`
          }); 
        });
      });
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

    const password = sha256(senha);

    if (!nomeDeUsuario) {
      res.status(404).send('No user provided.');
    }

    db.query('SELECT nomeDeUsuario FROM usuarios WHERE nomeDeUsuario=?', [nomeDeUsuario], function (err: Error, result: ResultQuey[]) {
      if (err) throw err;
      if (result[0]?.nomeDeUsuario.length > 0 ) {
        res.status(401).send('Username already in use.');
      }
      db.query('SELECT email FROM usuarios WHERE email=?', [email], async function (err: Error, result: ResultQuey[]) {
        if (err) throw err;
        if ( result[0]?.email.length > 0 ) {
          res.status(401).send('Email already in use.');
        } else {
          db.query(`INSERT INTO usuarios
        (id, nomeDeUsuario, email, senha) VALUES (?,?,?,?)`, [id, nomeDeUsuario, email, password], async function (err: Error, result: ResultQuey[]) {
            if (err) throw err;
            res.status(200).json({
              status: nomeDeUsuario,
              id
            });      
          });}
      });}
    ); 
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
    SELECT id, nomeDeUsuario, email, senha
    FROM usuarios
    WHERE nomeDeUsuario=?
    `;

    const senhauuid = sha256(JSON.stringify(senha));

    

    if(!nomeDeUsuario) {
      res.status(404).send('Email or username not found.');
      return;
    }

    db.query(sql, [nomeDeUsuario], async function (err: Error, result: ResultQuey[]) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      const ResultUsername = result[0]?.nomeDeUsuario;
      const ResultPassword = result[0]?.senha;
      const resultid = result[0]?.id;

      if(nomeDeUsuario === ResultUsername && senhauuid === ResultPassword) {
        res.status(200).send({
          status: nomeDeUsuario,
          id: resultid
        }); 
        return;
      } else {
        res.status(400).send({
          status: 'Username or password is not valid.'
        });
        return;
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
      });
    }
 

    const sqlUser: typeof sqlType = `
      SELECT *
      FROM usuario_category
      RIGHT JOIN usuarios
      ON usuario_category.id_usuario = usuarios.id
      `;

    const sqlMatchCategories: typeof sqlType = `
      SELECT item
      FROM curso_category
      WHERE sub_categoria IN (?, ?, ?)
      `;
   
    db.query(sqlUser, [id], async function (err: Error, result: typeof ResultQueyUser[]) {
      if (err) throw err;
      const [re] = await result;
      const categoryUser = re?.categoria;
      const subCategory_1_User = re?.sub_categoria;
      const subCategory_2_User = re?.sub_categoria2;
      const SubCategory_3_User = re?.sub_categoria3;
        
      db.query(sqlMatchCategories, [subCategory_1_User, subCategory_2_User, SubCategory_3_User], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
        res.status(200).send(result);
      } );
    });

  }

  public async inserUserCategory(req: Request, res: Response) {
    const {
      id_usuario,
      categoria,
      sub_categoria,
      sub_categoria2,
      sub_categoria3,
    } = req.body;

    if (!id_usuario && !categoria && !sub_categoria && !sub_categoria2 && !sub_categoria3) {
      res.status(404).send('No data found.');
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
    `;

    db.query(sqlInsertCategories, [id_usuario, categoria, sub_categoria, sub_categoria2, sub_categoria3], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      res.status(200).send(result);
    });

  }

  public async checkUserName(req: Request, res: Response) {
    const {
      name
    } = req.body;

    if (!name) {
      res.status(404).send('No name provided.');
    }

    const sqlName: typeof sqlType = `
    SELECT nomeDeUsuario
    FROM usuarios
    WHERE nomeDeUsuario=?
    `;
    

    db.query(sqlName, [name], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      if (result.length > 0) {
        res.status(400).json({
          inUse: true
        });
      } else {
        res.status(200).json({
          inUse: false
        });
      }
    });
    
  }

  public async changeUsername(req: Request, res: Response) {
    const {
      id_user,
      name
    } = req.body;

    if(!id_user) {
      return res.status(404).send('no id provided.');
    }

    const sql: typeof sqlType = `
    UPDATE usuarios
    SET nomeDeUsuario=?
    WHERE id=?
    `;

    db.query(sql, [name, id_user], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      return res.status(200).send(result);
    });
  }

  public async insertFullname(req: Request, res: Response) {
    const {
      id_usuario,
      nome_completo
    } = req.body;

    if (!id_usuario || !nome_completo) {
      res.status(404).send('no data provided.');
    }

    const id = uuidv4();

    const sql: typeof sqlType = `
    INSERT INTO usuario_nomeCompleto (id, id_usuario, nome_completo)
    VALUES (?, ?, ?)
    `;

    db.query(sql, [id, id_usuario, nome_completo], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      return res.status(200).send(result);
    });
  }

  public async findFullName (req: Request, res: Response) {
    const {
      id_usuario
    } = req.params;

    if (!id_usuario) {
      res.status(404).send('No id provided');
    }

    const sql: typeof sqlType = `
    SELECT *
    FROM usuario_nomeCompleto
    WHERE id_usuario=?
    `;

    db.query(sql, [id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      
      if (result.length >= 1) {
        res.status(200).send(result);
      } else {
        res.status(400).send('No name found.');
      }
    });
  }

  public async changeSettingShowFullname(req: Request, res: Response) {
    const {
      id_usuario,
    } = req.body;

    if (!id_usuario) {
      res.status(404).send('No id provided.');
    }

    const sqlSelect: typeof sqlType = `
    SELECT *
    FROM usuario_nomeCompleto
    WHERE id_usuario=?
    `;

    const sql: typeof sqlType = `
    UPDATE usuario_nomeCompleto
    SET mostrar=?
    WHERE id_usuario=?
    `;
    
    db.query(sqlSelect, [id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      const mostrar = result[0].mostrar;
      
      if (mostrar == 0) {
        db.query(sql, [1, id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
          if (err) throw err;
          res.status(200).json({
            mostrar : mostrar
          });
        }); 
      } else if (mostrar == 1 ) {
        db.query(sql, [0, id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
          if (err) throw err;
          res.status(200).json({
            mostrar : mostrar
          });
        });
      }
    }); 
  }

  public async getConfigFullname (req: Request, res: Response) {
    const {
      id_usuario
    } = req.body;

    if (!id_usuario) {
      return res.status(404).send('No id provided.');
    }

    const sqlSelect: typeof sqlType = `
    SELECT *
    FROM usuario_nomeCompleto
    WHERE id_usuario=?
    `; 

    db.query(sqlSelect, [id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      // const mostrar = result;
      if (result.length >= 1) {
        const mostrar = result[0]?.mostrar;
        console.log(mostrar);
        
        if (mostrar == 1) {
          return res.status(200).json({
            mostrar: true
          });
        } else if (mostrar == 0) {
          return res.status(200).json({
            mostrar: false
          });
        }
      } else {
        return res.status(200).json({
          mostrar: false
        });
      }
    }); 
  }

  public async findVistoSlide (req: Request, res: Response) {
    const {
      id_usuario
    } = req.params;

    if (!id_usuario) {
      res.status(404).send('No id provided');
    }

    const sql: typeof sqlType = `
    SELECT *
    FROM slides
    WHERE id_usuario=?
    `;

    db.query(sql, [id_usuario], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      if (result.length >= 1) {
        res.status(200).json({
          visto: true
        });
      } else {
        res.status(400).json({
          visto: false
        });
      }

    });
  }

  public async insertSlideVisto (req: Request, res: Response) {
    const {
      id_usuario
    } = req.body;

    if (!id_usuario) {
      res.status(404).send('No data provided');
    }

    const id = uuidv4();
     
  
    const sqlInsertInto: typeof sqlType = `
    INSERT INTO slides (id, id_usuario)
    VALUES (?,?)  
    `;  
    
    db.query(sqlInsertInto, [id, id_usuario], async function (err: Error, result: any) {
      if (err) throw err;
      res.status(200).json({
        re: result
      });
    });
  }

  public async getNotfications (req: Request, res: Response) {
    const {
      usuario_da_notificacao
    } = req.body;

    if (!usuario_da_notificacao) {
      return res.status(404).send('User not found.');
    }

    const sqlNotificacoes: typeof sqlType = `
    SELECT * FROM notificacoes
    WHERE usuario_da_notificacao=?
    ORDER BY data DESC
    `; 

    db.query(sqlNotificacoes, [usuario_da_notificacao], async function (err: Error, result: any) {
      if (err) throw err;
      const notificationsComentario = result;

      return res.status(200).send(notificationsComentario);
    });
  }
}  

module.exports = new userController();
