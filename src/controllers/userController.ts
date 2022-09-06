import { Request, Response } from 'express';
const db = require('../database/db')
class userController {
  async index (req: Request, res: Response) {
    const {
      categoriaIncial, 
    } = await req.body;


    const tech = {
      linguagens: ['Javascript', 'Typerscript', 'C#'],
      conteudo: 'Primeiro programa em JS',
      frontEnd: 'ReactJS'
    }

    const design = [
     { 'Ferramentas': ['Figma', 'Photoshop', 'Adobe Xd']},
      {'Areas': ['Web design', 'Mobile design', 'Social media', 'Photos']},
      {'Principios': ['Cores', 'Fonte', 'Alinhamentos']}
    ]

    const game = [
     { 'Ferramentas': ['Adobe Unity', 'Blender']},
      {'Linguagens': ['Java', 'C#', 'C']},
      {'Area': ['Mobile Games', 'Desktop']}
    ];

    type sqlType = string

    const sql: sqlType = `INSERT INTO usuarios (categoriaIncial) VALUES (?)`


    if(categoriaIncial) {
      db.query('')

      switch (categoriaIncial) {
        case 'tech': 
        res.send(`conteudo em tech: ${tech.conteudo}, ${tech.frontEnd}`)
        break;
        case 'design': 
        res.send(`categoriaIncial desigh: ${categoriaIncial}`)
        break;
        case 'game': 
        res.send(`categoriaIncial game: ${categoriaIncial}`)
        break;
        default: 
        console.log('idk man');
      }
      
      // if (opt1 == tech.linguagens[0])  {
      //   res.status(200).send(`${tech.conteudo}`)
      // } else {
      //   console.log(tech.linguagens[0]);
      // }
    }
  }

  async select(req: Request, res: Response) {
    const {
      nomeDeUsuario,
      email, 
      senha
    } = req.body;

    type sqlType = string;

    const sql: sqlType = `INSERT INTO usuarios 
    (nomeDeUsuario, email, senha) VALUES (?,?,?)`;

    if(nomeDeUsuario && email && senha) {
      db.query(`SELECT nomeDeUsuario from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: any) :void {
        if (err) throw err;
        if (result.length > 0) {
          res.status(409).send('User Already Registered.')
        } else {
          db.query(sql, [nomeDeUsuario, email, senha], async function (err: Error, result: any) {
            if (err) throw err;
            res.status(200).send(`User registered successfully: ${result}`);
          })
        }
    })
    
    }}
}

module.exports = new userController();
