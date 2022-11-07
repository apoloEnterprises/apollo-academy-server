const db = require('../database/db')
import { Request, Response } from 'express';
const sqlType = require('../../../src/../src/controllers/types/sqlTyped');
const { nowDate } = require('../../../src/controllers/exports/getData')
const { v4: uuidv4 } = require('uuid');
import * as WebSocket from 'ws';

class VideoController {
  public async trophy(req: Request, res: Response) {
    const {
      name,
      id_user
      } = await req.body;  

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
      WHERE (trofeu_nome=? AND usuario_nome=?)
      `   

      const sqlUpdate: typeof sqlType = `
      UPDATE trofeus_conquistado
      SET conquistado=1
      WHERE trofeu_nome=?
      `

      db.query(sql, [name], async function (err: Error, result: any) {
        if (err) throw err;
        const re = result.length
        
        
        
        if (re === 1 ) {
          const troufeu_nome = 'O curisoso'
          const troufeu_tipo = 'Bronze'

          db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length
            const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

            
            
        
            if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
            })
          } 
          })

      } else if (re === 3) {
        const troufeu_nome = 'Comunicador'
        const troufeu_tipo = 'Prata'
          
          db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length;
            const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

            if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
            })
          }
          })
      }
      else if (re === 5) {
        const troufeu_nome = 'Tagarela'
        const troufeu_tipo = 'Ouro'
          
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado;  
                   
            
          if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                }) 
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome, 
                  troufeu_tipo: troufeu_tipo
                })
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

      if (re === 1 ) {
        const troufeu_nome = 'Ajudante'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
 
 
          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Networking'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

 
          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Mentor'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Interativo'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Da comunidade'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
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
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if (re === 3) {
        const troufeu_nome = 'De casa'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Astronauta'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

                   if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                }) 
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
      

      if (re === 0) {
        const troufeu_nome = 'Pioneiro'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

          
          if (trofeu === 0 && re === 1) {
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
          })
        }
        })
      } else if (re === 2 ) {
        const troufeu_nome = 'Favoritos'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
        
          


          if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
            })
          }
        })
      } else if ( re === 5) {
        const troufeu_nome = 'Colecao'
        const troufeu_tipo = 'Ouro'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
          

                   if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
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
      
      

      if (re === 1) {
        const troufeu_nome = 'Testando'
        const troufeu_tipo = 'Bronze'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 ) {
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
                
              })
            })
          }
        })
      } else if (re === 3) {
        const troufeu_nome = 'Preparado'
        const troufeu_tipo = 'Prata'
        db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


                   if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
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
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


                   if (trofeu === 0 && re === 1) {
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
            })
          }
        }) 
      } 
     })
 
    // const sqlTest: typeof sqlType = `
    // SELECT *
    // FROM curso_favorito
    // WHERE id_aluno=?
    // `
    
    //tests
    // db.query(sqlTest, [id_user], function(err: Error, result: any) {
    //   if (err) throw err;
    //   res.send(result)
    // })

    console.log('eae kk');
    

    }
}

module.exports = new VideoController();
