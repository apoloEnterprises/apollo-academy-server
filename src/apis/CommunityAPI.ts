// api to update total number of answers and likes of a post

import { Request, Response } from 'express';
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');
// all community posts, comments, reactions, lists etc..

class communityController {
  async getPostTotalAnswersNumber (req: Request, res: Response) {
    const {
      id
    } = await req.body;

    type sqlType = string;

    interface ResultQuey {
      categoria: string,
    }

    const sql: sqlType = `
    SELECT *
    FROM respostas
    WHERE pergunta_ID=?
    `;

    const sqlUpdate: sqlType = `UPDATE usuarios
    SET 
        categoria=?,
        subCategoria1=?,
        subCategoria2=?,
        subCategoria3=?
    WHERE 
        nomeDeUsuario=?
    `;

    if (id) {
      db.query(sql, [id], 
        async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          const postCount = result.length;
          // res.status(200).json({
          //   numero_respostas: `${postCount}`
          // })
          const numero_respostas = `${postCount}`
          db.query(sqlUpdate, [id], 
            async function (err: Error, result: ResultQuey[]) {
             if (err) throw err;
             
     
            })
        })
    } else {
      res.status(404).send('Answers not found.')
    }
  }
}

module.exports = new communityController();
