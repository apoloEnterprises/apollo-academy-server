import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { nowDate } = require('./exports/getData')
const { v4: uuidv4 } = require('uuid');


// trophies, rankings and levels of user

class rankingsController {
 public async QuestionTrophy(req: Request, res: Response) {
    const {
      name,
      id_user
      } = await req.params; 

      if (!name) {
        res.status(404).send('No id provided.')
      }

      const id = uuidv4();

      const data = nowDate;

      const sql: typeof sqlType = `
      SELECT *
      FROM perguntas
      WHERE autor_name=?
      `

      const sqlTrophy: typeof sqlType = `
      INSERT INTO trofeus_conquistado (id, data, trofeu_nome, trofeu_tipo, usuario_nome )
      values (?, ?, ?, ?, ?)
      `

      const sqlSelectTrophy: typeof sqlType = `
      SELECT * 
      FROM trofeus_conquistado
      WHERE trofeu_nome=?
      `

      db.query(sql, [name], async function (err: Error, result: any) {
        if (err) throw err;
        const re = result.length
        if (re === 1 ) {
          const troufeu_nome = 'O curisoso'
          const troufeu_tipo = 'Bronze'

          db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length
            
            if (re === 0) {
              db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
                if (err) throw err;
                res.status(200).send(result)
              })
            }
          })


      } else if (re === 3) {
        const troufeu_nome = 'Extrovertido'
        const troufeu_tipo = 'Prata'
          
          db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length
            if (re === 0) {
              db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
                if (err) throw err;
                res.status(200).send(result)
              })
            }
          })
      }
      else if (re >= 5) {
        const troufeu_nome = 'Extrovertido'
        const troufeu_tipo = 'Ouro'
          
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          
          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(result)
            })
          }
        })
      }
      
    })

    const sqlRespostas: typeof sqlType = `
    SELECT *
    FROM respostas
    WHERE autor_resposta_name=?
    `

    db.query(sqlRespostas, [name], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;

      if (re === 1) {
        const troufeu_nome = 'Ajudante'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(result)
            })
          }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Networking'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(result)
            })
          }
        })
      } else if ( re >= 5) {
        const troufeu_nome = 'Mentor'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(`trofeu ${troufeu_nome} desbloqueado! `)
            })
          }
        }) 
      }

    })

    const sqlLikes: typeof sqlType = `
    SELECT *
    FROM respostas_likes
    WHERE autor_like=?
    `

    db.query(sqlLikes, [name], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;

      if (re === 1) {
        const troufeu_nome = 'Timido'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(result)
            })
          }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Interativo'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(result)
            })
          }
        })
      } else if ( re >= 5) {
        const troufeu_nome = 'Da comunidade'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(`trofeu ${troufeu_nome} desbloqueado! `)
            })
          }
        }) 
      }

    })

    const sqlCurso: typeof sqlType = `
    SELECT *
    FROM curso_alunos
    WHERE id_aluno=?
    `

    db.query(sqlCurso, [id_user], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;
      console.log(re);
      

      if (re >= 1) {
        const troufeu_nome = 'Visitante'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(`trofeu ${troufeu_nome} desbloqueado! `)
            })
          }
        })
      } else if (re === 3) {
        const troufeu_nome = 'De casa'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(`trofeu ${troufeu_nome} desbloqueado! `)
            })
          }
        })
      } else if ( re >= 5) {
        const troufeu_nome = 'Astronauta'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).send(`trofeu ${troufeu_nome} desbloqueado! `)
            })
          }
        }) 
      }

    })

    }
}

module.exports = new rankingsController();
