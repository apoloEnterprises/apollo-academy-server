const server = require('../database/db');
const { nowDate } = require('../controllers/exports/getData')
const { v4: uuidv4 } = require('uuid');
import { Request, Response, response } from 'express';

class trophyRepository {
  public async perguntaTrophy (req: Request, res: Response, name: string) {
    const id = uuidv4();

    const data = nowDate;

    const sql: string = `
    SELECT *
    FROM perguntas
    WHERE autor_name=?
    `

    const sqlTrophy: string = `
    INSERT INTO trofeus_conquistado (id, data, trofeu_nome, trofeu_tipo, usuario_nome )
    values (?, ?, ?, ?, ?)
    ` 

    const sqlSelectTrophy: string = `
    SELECT *  
    FROM trofeus_conquistado
    WHERE trofeu_nome=? AND usuario_nome=?
    `   

    const sqlUpdate: string = `
    UPDATE trofeus_conquistado
    SET conquistado=1
    WHERE trofeu_nome=?
    `


   
      server.query(sql, [name], async function (err: Error, result: any) {
        if (err) throw err;
        const re = result.length
        
        
        
        if (re === 1 ) {
          const troufeu_nome = 'O curisoso'
          const troufeu_tipo = 'Bronze'

          server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length
            const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

            
            
        
            if (trofeu === 0 && re === 1) {
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
          
          server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
            if (err) throw err;
            const re = result.length;
            const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

            if (trofeu === 0 && re === 1) {
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                })
              })
          } else if (trofeu === 0 && re === 0)  { 
            server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
          
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado;  
                   
            
          if (trofeu === 0 && re === 1) {
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
                res.status(200).json({
                  troufeu_nome: troufeu_nome,
                  troufeu_tipo: troufeu_tipo
                }) 
              })
          } else if (trofeu === 0 && re === 0)  { 
            server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
              if (err) throw err;
              server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
  
  }

  public async respostaTrophy(req: Request, res: Response, name: string) {

    const id = uuidv4();

    const data = nowDate;

    const sql: string = `
    SELECT *
    FROM perguntas
    WHERE autor_name=?
    `

    const sqlTrophy: string = `
    INSERT INTO trofeus_conquistado (id, data, trofeu_nome, trofeu_tipo, usuario_nome )
    values (?, ?, ?, ?, ?)
    ` 

    const sqlSelectTrophy: string = `
    SELECT *  
    FROM trofeus_conquistado
    WHERE trofeu_nome=? AND usuario_nome=?
    `   

    const sqlUpdate: string = `
    UPDATE trofeus_conquistado
    SET conquistado=1
    WHERE trofeu_nome=?
    `


       
    const sqlRespostas: string = `
    SELECT *
    FROM respostas
    WHERE autor_resposta_name=?
    `
 
    server.query(sqlRespostas, [name], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;

      if (re === 1 ) {
        const troufeu_nome = 'Ajudante'
        const troufeu_tipo = 'Bronze'
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
 
 
          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

 
          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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

  }

  public async likeTrophy(req: Request, res: Response, name: string) {

    const id = uuidv4();

    const data = nowDate;

    const sql: string = `
    SELECT *
    FROM perguntas
    WHERE autor_name=?
    `

    const sqlTrophy: string = `
    INSERT INTO trofeus_conquistado (id, data, trofeu_nome, trofeu_tipo, usuario_nome )
    values (?, ?, ?, ?, ?)
    ` 

    const sqlSelectTrophy: string = `
    SELECT *  
    FROM trofeus_conquistado
    WHERE trofeu_nome=? AND usuario_nome=?
    `   

    const sqlUpdate: string = `
    UPDATE trofeus_conquistado
    SET conquistado=1
    WHERE trofeu_nome=?
    `


       
    const sqlRespostas: string = `
    SELECT *
    FROM respostas
    WHERE autor_resposta_name=?
    `

    const sqlLikes: string = `
    SELECT *
    FROM respostas_likes
    WHERE autor_like=?
    `

    server.query(sqlLikes, [name], function (err: Error, result: any) {
      if (err) throw err;
      const re = result.length;
 
      if (re === 1) {
        const troufeu_nome = 'Timido'
        const troufeu_tipo = 'Bronze'
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
        server.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
          if (err) throw err;
          const re = result.length;
          const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


          if (trofeu === 0 && re === 1) {
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
              res.status(200).json({
                troufeu_nome: troufeu_nome,
                troufeu_tipo: troufeu_tipo
              })
            })
        } else if (trofeu === 0 && re === 0)  { 
          server.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
            if (err) throw err;
            server.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
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
  }
}

module.exports = new trophyRepository()

