import { Request, Response } from 'express';
import { stringify } from 'querystring';
const db = require('../database/db')
class userController {
  async index (req: Request, res: Response) {
    const {
      subCategoria1,
      subCategoria2,
      subCategoria3,
      nomeDeUsuario,
      categoria,
      } = await req.body;


    // const tech = {
    //   linguagens: ['Javascript', 'Typerscript', 'C#'],
    //   conteudo: 'Primeiro programa em JS',
    //   frontEnd: 'ReactJS'
    // }

    const tech = {
      areas: ['Front-End', ' Back-End', ' App development', ' Web development'],
      frontEnd: ['ReactJS', 'VueJS', 'HTML and CSS'],
      backEnd: ['ExpressJS', 'NodeJS', 'Typerscript'],
      appDev: ['React Native', 'Flutter', 'Java'],
      Web: ['Javascript', 'ReactJS', 'NextJS'],
    }

    const design = {
      'Ferramentas': ['Figma', 'Photoshop', 'Adobe Xd'],
      'areas': ['Web design', 'Mobile design', 'Social media', 'Photos'],
      'Principios': ['Cores', 'Fonte', 'Alinhamentos']
  }

    const game = {
      'Ferramentas': ['Adobe Unity', 'Blender'],
      'Linguagens': ['Java', 'C#', 'C'],
      'areas': ['Mobile Games', 'Desktop']
  };

    type sqlType = string

    const sql: sqlType = `UPDATE usuarios
    SET 
        categoria=?,
        subCategoria1=?,
        subCategoria2=?,
        subCategoria3=?
    WHERE 
        nomeDeUsuario=?
    `

    if(categoria && nomeDeUsuario &&subCategoria3 &&subCategoria1 &&subCategoria2){
      db.query(`SELECT * FROM usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: any): void {
          switch (categoria) {
            case 'tech': 
            db.query(sql, [categoria, subCategoria1, subCategoria2, subCategoria3,nomeDeUsuario], function (err: Error): void {
              if (err) throw err;
                res.status(200).json({categoria: `${categoria}`, subCategoria1: `${subCategoria1}`,
                subCategoria2: `${subCategoria2}`,
                subCategoria3: `${subCategoria3}`
            }); 
            })
            break;
            case 'design': 
            db.query(sql, [categoria, subCategoria1, subCategoria2, subCategoria3,nomeDeUsuario], function (err: Error): void {
              if (err) throw err;
              res.status(200).json({categoria: `${categoria}`, subCategoria1: `${subCategoria1}`,
              subCategoria2: `${subCategoria2}`,
              subCategoria3: `${subCategoria3}`
            })}); 
            break;
            case 'game': 
            db.query(sql, [categoria, subCategoria1, subCategoria2, subCategoria3,nomeDeUsuario], function (err: Error): void {
              if (err) throw err;
              res.status(200).json({categoria: `${categoria}`, subCategoria1: `${subCategoria1}`,
              subCategoria2: `${subCategoria2}`,
              subCategoria3: `${subCategoria3}`
            })}); 
            break;
            default: 
            console.log('idk man');
          }
      })
    }
  }

  async select(req: Request, res: Response) {
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

    const otherData: NumData = {trofeus: 0, categoria: 0, subCategoria1: 0, subCategoria2: 0, subCategoria3: 0}

    type sqlType = string;

    const sql: sqlType =  `INSERT INTO usuarios 
    (nomeDeUsuario, email, senha, trofeus, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?, ?, ?,?)`;

    if(nomeDeUsuario && email && senha) {
      db.query(`SELECT nomeDeUsuario from usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: any) :void {
        if (err) throw err;
        if (result.length > 0) {
          res.status(409).send('User Already Registered.')
        } else {
          db.query(sql, [nomeDeUsuario, email, senha, otherData.trofeus, otherData.categoria, otherData.subCategoria1, otherData.subCategoria2, otherData.subCategoria3], async function (err: Error, result: any) {
            if (err) throw err;
            db.query(`SELECT * FROM usuarios where nomeDeUsuario=?`, [nomeDeUsuario], function (err: Error, result: any): void {
              res.status(200).send(`User registered successfully: ${result[0].nomeDeUsuario}`);
              console.log(result);
            })
          })
        }
    })
    }}
}

module.exports = new userController();
