import { Request, Response } from 'express';
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');
// all community posts, comments, reactions, lists etc..

class communityController {
 public async postIndex(req: Request, res: Response) {
    const {
      autor_ID,
      categoria,
      subCategoria1,
      subCategoria2,
      subCategoria3,
      pergunta_Txt,
      pergunta_Descr,
      } = await req.body;

 
      if (!autor_ID) {
        res.status(404).send('Error sir')
      }

      const id = uuidv4();
      interface ResultQuey {
        id: string,
        autor_ID: string,
        pergunta_Txt: string,
        pergunta_Descr: string,
        categoria: number,
        subCategoria1: number,
        subCategoria2: number,
        subCategoria3: number
      }
      
      type sqlType = string;

      const sql: sqlType = `INSERT INTO perguntas 
      (id, pergunta_Txt, autor_ID, pergunta_Descr, categoria, subCategoria1,subCategoria2,subCategoria3) VALUES (?,?,?,?,?, ?, ?, ?)
      `;

        db.query(sql, [id, pergunta_Txt, autor_ID, pergunta_Descr, categoria, subCategoria1, subCategoria2, subCategoria3], async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          res.status(200).send(JSON.stringify(result[0]))
        })
      }
      
  public async getUserPosts(req: Request, res: Response) {
    const {
      id
    } = req.params;

    type sqlType = string;

    interface ResultQuey {
      id: string,
      autor_ID: string,
      pergunta_Txt: string,
      pergunta_Descr: string,
      categoria: number,
      subCategoria1: number,
      subCategoria2: number,
      subCategoria3: number
    }

    const sql: sqlType = `
    SELECT pergunta_Txt, pergunta_Descr, categoria FROM perguntas WHERE autor_ID=?
    `;

      db.query(sql, [id], async function (err: Error, result: ResultQuey[]) {
        if (err) throw err;
        res.status(200).send(JSON.stringify(result))
      })
  }

  public async getPostByCategory(req: Request, res: Response) {
    const {
      categoria
    } = await req.body;

    type sqlType = string;

    interface ResultQuey {
      categoria: string,
    }

    const sql: sqlType = `
    SELECT pergunta_Txt, pergunta_Descr, categoria, subCategoria1, subCategoria2
    FROM perguntas
    WHERE categoria=?
    `;

    if (categoria) {
      db.query(sql, [categoria], 
        async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          res.status(200).send(JSON.stringify(result))
        })
    } else {
      res.status(404).send('Category not found.')
    }
  }

  async getPostNumber (req: Request, res: Response) {
    const {
      categoria
    } = await req.body;

    type sqlType = string;

    interface ResultQuey {
      categoria: string,
    }

    const sql: sqlType = `
    SELECT pergunta_Txt, pergunta_Descr, categoria, subCategoria1, subCategoria2
    FROM perguntas
    WHERE categoria=?
    `;

    if (categoria) {
      db.query(sql, [categoria], 
        async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          const postCount = result.length;
          res.status(200).json({
            Total: `${postCount}`
          })
        })
    } else {
      res.status(404).send('Category not found.')
    }
  }

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

    if (id) {
      db.query(sql, [id], 
        async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          const postCount = result.length;
          res.status(200).json({
            numero_respostas: `${postCount}`
          })
        })
    } else {
      res.status(404).send('Answers not found.')
    }
  }

  public async postAnwser(req: Request, res: Response) {
    const {
      pergunta_ID,
      autor_ID,
      resposta_Txt,
      } = await req.body;
 
      if (!autor_ID) {
        res.status(404).send('Error sir')
      }

      const id = uuidv4();
      interface ResultQuey {
        id: string,
        autor_ID: string,
        pergunta_ID: string,
        resposta_Txt: string,
      }
      
      type sqlType = string;

      const sql: sqlType = `INSERT INTO respostas 
      (id, pergunta_ID, autor_ID, resposta_Txt) VALUES (?,?,?, ?)
      `;

        db.query(sql, [id, pergunta_ID, autor_ID, resposta_Txt], function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          res.status(200).send(result[0])
        })
      }

      public async getPostAndAnswers (req: Request, res: Response) {
        const {
          id
        } = await req.body;
    
        type sqlType = string;
        interface ResultQuey {
          id: string,
          autor_ID: string,
          pergunta_Txt: string,
          pergunta_Descr: string,
          categoria: number,
          subCategoria1: number,
          subCategoria2: number,
          subCategoria3: number
        }

        interface ResultQueyAnswer {
          autor_ID: string,
          pergunta_ID: string,
          resposta_Txt: string,
        }

        const sqlAnswer: sqlType = `
        SELECT *
        FROM respostas
        WHERE pergunta_ID=?
        `;

        db.query(sqlAnswer, [id], function (err: Error, result: ResultQueyAnswer[]) {
          if (err) throw err;
        });
    
        const sql: sqlType = `
        SELECT pergunta_Txt, 
        pergunta_Descr, categoria, subCategoria1,
        subCategoria2, qnt_respostas
        FROM perguntas
        WHERE id=?
        `;


        if (id) {
          db.query(sql, [id], 
             async function (err: Error, result: ResultQuey[]) {
              if (err) throw err;
              const postResult = result
              db.query(sqlAnswer, [id], function (err: Error, result: ResultQueyAnswer[]) {
                if (err) throw err;
                res.status(200).json({
                  pergunta: postResult,
                  respostas: result
                });
              });
            });
        } else {
          res.status(404).send('Question not found.')
        }
      }

      public async postComment(req: Request, res: Response) {
        const {
          resposta_ID,
          autor_ID,
          comentario_Txt
        } = req.body;

        if (!autor_ID) {
          res.status(404).send('No user id provided.')
        }
  
        const id = uuidv4();
        interface ResultQuey {
          autor_ID: string,
          resposta_ID: string,
          comentario_Txt: string,
        }

        type sqlType = string;

        const sql: sqlType = `INSERT INTO comentarios 
        (id, resposta_ID, autor_ID, comentario_Txt) VALUES (?,?,?, ?)`

        db.query(sql, [id, resposta_ID, autor_ID, comentario_Txt], function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          res.status(200).json({
            comentario: JSON.stringify(result[0])
          })
        })
      }
}

module.exports = new communityController();
