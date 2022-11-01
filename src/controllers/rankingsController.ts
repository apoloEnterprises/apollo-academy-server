import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { nowDate } = require('./exports/getData')
const { v4: uuidv4 } = require('uuid');


// trophies, rankings and levels of user

class rankingsController {
 public async trophy(req: Request, res: Response) {
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
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
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
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
            }
          })
      }
      else if (re === 5) {
        const troufeu_nome = 'Extrovertido'
        const troufeu_tipo = 'Ouro'
          
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          
          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Mentor'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Da comunidade'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
      

      if (re === 1) {
        const troufeu_nome = 'Visitante'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Astronauta'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        }) 
      }

    })

    const sqlmyList: typeof sqlType = `
    SELECT *
    FROM curso_favorito
    WHERE id_aluno=?
    `

    db.query(sqlmyList, [id_user], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;
      console.log(re); 

      if (re === 1) {
        const troufeu_nome = 'Pioneiro'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if (re === 2) {
        const troufeu_nome = 'Favoritos'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Colecao'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        }) 
      }

    })

    const sqlDownload: typeof sqlType = `
    SELECT *
    FROM curso_download
    WHERE id_aluno=?
    `

    db.query(sqlDownload, [id_user], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;
      

      if (re >= 1) {
        const troufeu_nome = 'Testando'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Preparado'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        })
      } else if ( re >= 5) {
        const troufeu_nome = 'O sem internet'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length

          if (re === 0) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          }
        }) 
      }
    })

    res.status(200).send('No new trophy.')

    }

    public async getTotalUserTrophies(req: Request, res: Response) {
      const {
        nome
      } = req.params;

      if(!nome) {
        res.status(404).send('No username provded.')
      }
 
      const sqlGet: typeof sqlType = `
      SELECT trofeu_tipo
      FROM trofeus_conquistado
      WHERE usuario_nome=?
      `

      db.query(sqlGet, [nome], function (err: Error, result: any) {
        if (err) throw err;
        const re = result.length
        res.status(200).json({
          trofeus: re
        }) 
      })
    }

    public async getUserEachTrophyNumber(req: Request, res: Response) {
      const {
        nome
      } = req.params;

      if (!nome) {
        res.status(404).send('No username provided')
      }

      const sqlGetBronze: typeof sqlType = `
      SELECT trofeu_tipo
      FROM trofeus_conquistado
      WHERE (usuario_nome=? AND trofeu_tipo=?)
      `

      const sqlGetPrata: typeof sqlType = `
      SELECT trofeu_tipo
      FROM trofeus_conquistado
      WHERE usuario_nome=? AND trofeu_tipo=?
      `

      const sqlGetOuro: typeof sqlType = `
      SELECT trofeu_tipo
      FROM trofeus_conquistado
      WHERE usuario_nome=? AND trofeu_tipo=?
      `

      const sqlGetApollo: typeof sqlType = `
      SELECT trofeu_tipo
      FROM trofeus_conquistado
      WHERE usuario_nome=? AND trofeu_tipo=?
      `

      db.query(sqlGetBronze, [nome, 'bronze'], function (err: Error, result: any) {
        if (err) throw err;
        const bronze = result.length
        db.query(sqlGetPrata, [nome, 'prata'], function (err: Error, result: any) {
          if (err) throw err;
          const prata = result.length
          db.query(sqlGetOuro, [nome, 'ouro'], function (err: Error, result: any) {
            if (err) throw err;
            const ouro = result.length
            db.query(sqlGetApollo, [nome, 'apollo'], function (err: Error, result: any) {
              if (err) throw err;
              const apollo = result.length
              res.status(200).json({
                bronze: bronze,
                prata: prata,
                ouro: ouro,
                apollo: apollo
              })
            })
          })
        })
      })


    }
}

module.exports = new rankingsController();
