import { Request, Response } from 'express';
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');
// all community posts, comments, reactions, lists etc..
const sqlType = require('./types/sqlTyped');
const {
  ResultQueyUser,ResultQueyPost} = require('./types/resultTyped');
const { 
  ResultQueyCateogry,
  ResultQueyResposta, 
  ResultQueyComment } = require('./types/shortResultTyped');

const { nowDate } = require('./exports/getData')

class communityController {
 public async postIndex(req: Request, res: Response) {
    const {
      autor_name,
      categoria,
      subCategoria,
      pergunta_Txt,
      } = await req.body;
 
      if (!autor_name || !categoria || !subCategoria || !pergunta_Txt) {
        res.status(404).send('Error sir')
      } 
 
      const data = nowDate;

      const id = uuidv4();

      const sql: typeof sqlType = `INSERT INTO perguntas 
      (id, data, pergunta_Txt, autor_name, categoria,subCategoria) VALUES (?,?,?,?,?, ?) 
      `;
 
      const sqlUser: typeof sqlType = `
      SELECT nomeDeUsuario
      FROM usuarios 
      WHERE id=?
      `  


        db.query(sql, [id, data, pergunta_Txt, autor_name, categoria, subCategoria], async function (err: Error, result: typeof ResultQueyUser[]) {
          if (err) throw err;
          const re = await result[0];
          db.query(sqlUser, [autor_name], async function (err: Error, result: any) {
            if (err) throw err;
            res.send(result[0])
          })
        })
      }
      
  public async getUserPosts(req: Request, res: Response) {
    const {
      id
    } = req.params;

    type sqlType = string;

    const sql: sqlType = `
    SELECT pergunta_Txt, id FROM perguntas WHERE autor_name=?
    `;

      db.query(sql, [id], async function (err: Error, result: typeof ResultQueyPost[]) {
        if (err) throw err;
        res.status(200).send(JSON.stringify(result))
      })
  }

  public async getPostByCategory(req: Request, res: Response) {
    const {
      categoria, subCategoria
    } = req.params;

    const sql: typeof sqlType = `
    SELECT *
    FROM perguntas
    WHERE categoria=?
    `;

    const sql2: typeof sqlType = `
    SELECT *
    FROM perguntas
    WHERE categoria=?
    AND subCategoria=?
    `;

    if (!categoria && !subCategoria) {
      res.status(404).send('Category not found.')
    }

    if(subCategoria === 'Selecionar filtro') {
      db.query(sql, [categoria], 
        async function (err: Error, result: typeof ResultQueyCateogry[]) {
          if (err) throw err;
          // const user = result[0].autor_name
          // const re = result[0]
          res.status(200).send(result)
        })
    } else {
      db.query(sql2, [categoria, subCategoria], 
        async function (err: Error, result: typeof ResultQueyCateogry[]) {
          if (err) throw err;
          // const user = result[0].autor_name
          // const re = result[0]
                   res.status(200).send(result)
        })
    }
    

    // if (categoria &&  !subCategoria) {
    //   db.query(sql, [categoria], 
    //     async function (err: Error, result: typeof ResultQueyCateogry[]) {
    //       if (err) throw err;
    //       // const user = result[0].autor_name
    //       // const re = result[0]
    //       res.status(200).send(result)
    //     })
    // } 
    // else {
    //   db.query(sql2, [categoria, subCategoria], 
    //     async function (err: Error, result: typeof ResultQueyCateogry[]) {
    //       if (err) throw err;
    //       // const user = result[0].autor_name
    //       // const re = result[0]
    //       res.status(200).send(result)
    //     })
    // }
  }
 
  async getPostNumber (req: Request, res: Response) {
    const {
      categoria
    } = await req.body;

    type sqlType = string;

    const sql: sqlType = `
    SELECT pergunta_Txt, pergunta_Descr, categoria, subCategoria1, subCategoria2
    FROM perguntas
    WHERE categoria=?
    `;

    if (categoria) {
      db.query(sql, [categoria], 
        async function (err: Error, result: typeof ResultQueyCateogry[]) {
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
      id,
    } = await req.params;

    const sql: typeof sqlType = `
    SELECT *
    FROM respostas
    WHERE pergunta_ID=?
    `; 

    if (id) {
      db.query(sql, [id], 
        async function (err: Error, result: typeof ResultQueyCateogry[]) {
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
      autor_resposta_name,
      resposta_Txt,
      } = await req.body;
  
      if (!autor_resposta_name) {
        res.status(404).send('Error sir')
      } 
 
      const data = nowDate;
  
      const id = uuidv4();
  
      const sql: typeof sqlType = `INSERT INTO respostas 
      (id, data, pergunta_ID, autor_resposta_name, resposta_Txt) VALUES (?,?,?, ?,?)
      `;  
 
      const sqlGetNumberAnswers: typeof sqlType = `
      SELECT *
      FROM respostas
      WHERE pergunta_ID=?`;
  
      // const sqlUpdate: typeof sqlType = `UPDATE perguntas
      // SET 
      //   qnt_respostas
      // WHERE 
      //   id=?`;

        db.query(sql, [id,  data, pergunta_ID, autor_resposta_name, resposta_Txt], function (err: Error, result: typeof ResultQueyResposta[]) {
          if (err) throw err;
          const queryResult = result[0];
          db.query(sqlGetNumberAnswers, [pergunta_ID], 
            async function (err: Error, result: typeof ResultQueyResposta[]) {
              if (err) throw err;
              const postCount = result.length;
              const numero_respostas = `${postCount}`;
              res.status(200).send(queryResult)
            })}  
        ) 
      }
  
      public async getPostAndAnswers (req: Request, res: Response) {
        const {
          id
        } = await req.params;
    
        type sqlType = string;

        interface ResultQueyAnswer {
          autor_name: string,
          pergunta_ID: string,
          resposta_Txt: string,
        }

        const sqlAnswer: sqlType = `
        SELECT *
        FROM respostas
        WHERE pergunta_ID=?
        `;
     
        const sql: sqlType = `
        SELECT id, pergunta_Txt, categoria, subCategoria, qnt_respostas, autor_name, data
        FROM perguntas
        WHERE id=?
        `;


        if (id) {
          db.query(sql, [id], 
             async function (err: Error, result: typeof ResultQueyPost[]) {
              if (err) throw err;
              const postResult = result
                db.query(sqlAnswer, [id], function (err: Error, result: typeof ResultQueyResposta[]) {
                  if (err) throw err;
                  const postAnswer = result
                    db.query(sqlAnswer, [id], function (err: Error, result: typeof ResultQueyResposta[]) {
                      if (err) throw err;
                      const answerComment = result
                      res.status(200).json({
                        pergunta: postResult,
                        respostas: postAnswer
                      });
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

        const data = nowDate;

  
        const sql: typeof sqlType = `INSERT INTO comentarios 
        (id, resposta_ID, data, autor_ID, comentario_Txt) VALUES (?,?,?, ?, ?)`

        db.query(sql, [id, resposta_ID, data, autor_ID, comentario_Txt], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).json({
            comentario: JSON.stringify(result)
          })
        })
      }

      public async getCommentAnswer(req: Request, res: Response) {
        const {
          resposta_ID
        } = req.params;
 
        if (!resposta_ID) {
          res.status(404).send('No user id provided.')
        }
  
        const sql: typeof sqlType = `
        SELECT * 
        FROM comentarios
        WHERE resposta_ID=? 
        `

        db.query(sql, [resposta_ID], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).send(result)
        })
      }



      public async postCommentToQuestion(req: Request, res: Response) {
        const {
          pergunta_ID,
          autor_name,
          comentario_Txt
        } = req.body;
 
        if (!autor_name) {
          res.status(404).send('No user id provided.')
        }
  
        const id = uuidv4();

        const data = nowDate;

        const sql: typeof sqlType = `INSERT INTO comentario_pergunta 
        (id, pergunta_ID, data, autor_name, comentario_Txt) VALUES (?,?,?, ?, ?)`

        db.query(sql, [id, pergunta_ID, data, autor_name, comentario_Txt], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).json({
            comentario: JSON.stringify(result)
          })
        })
      }

      public async getCommentsQuestion(req: Request, res: Response) {
        const {
          pergunta_ID
        } = req.params;
 
        if (!pergunta_ID) {
          res.status(404).send('No user id provided.')
        }
  
        const sql: typeof sqlType = `
        SELECT comentario_Txt
        FROM comentario_pergunta
        WHERE pergunta_ID=?
        `

        db.query(sql, [pergunta_ID], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).send(result)
        })
      }
   
      public async likeAnswer (req: Request, res: Response) {
        const {
          resposta_id,
          autor_like
        } = req.body;
 
        if(!resposta_id || !autor_like) {
          res.status(404).send('Data not found.')
        }; 
    
        const id = uuidv4();
   
        const data = nowDate;

        const sql: typeof sqlType = `INSERT INTO respostas_likes 
        (id, data, resposta_id, autor_like) VALUES (?,?,?,?)`
 

        db.query(sql, [id, data, resposta_id, autor_like], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          return res.status(200).json({
            comentario: JSON.stringify(result)
          }) 
        })
      }

      public listLikesAnswer (req: Request, res: Response) {
        const {
          resposta_id
        } = req.params;

        if (!resposta_id) {
          res.status(404).send('Data not found.')
        }
 
        const sql: typeof sqlType = `
        SELECT autor_like
        FROM respostas_likes
        WHERE resposta_id=?
        `

        db.query(sql, [resposta_id], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).json({
            likes: result.length
          })
        }) 
      }

      public listSelfLikesAnswer (req: Request, res: Response) {
        const {
          autor_like,
          resposta_id
        } = req.params;

        if (!autor_like || !resposta_id) {
          res.status(404).send('Data not found.')
        }
 
        const sql: typeof sqlType = `
        SELECT autor_like
        FROM respostas_likes
        WHERE (autor_like=? AND resposta_id=?)
        `

        db.query(sql, [autor_like, resposta_id], function (err: Error, result: typeof ResultQueyComment[]) {
          if (err) throw err;
          res.status(200).json({
            likes: result.length
          })
        }) 
      } 

}

module.exports = new communityController();
