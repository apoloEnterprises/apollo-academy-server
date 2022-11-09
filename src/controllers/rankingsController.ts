import { log } from 'console';
import { Request, response, Response, NextFunction } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { nowDate } = require('./exports/getData')
const { v4: uuidv4 } = require('uuid');


// trophies, rankings and levels of user

class rankingsController {
 public async trophy(req: Request, res: Response, next: NextFunction) {
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
      WHERE trofeu_nome=? AND usuario_nome=?
      `   

      const sqlUpdate: typeof sqlType = `
      UPDATE trofeus_conquistado
      SET conquistado=1
      WHERE trofeu_nome=?
      `

      
      const sqlRespostas: typeof sqlType = `
      SELECT *
      FROM respostas
      WHERE autor_resposta_name=?
      `
      const sqlLikes: typeof sqlType = `
      SELECT *
      FROM respostas_likes
      WHERE autor_like=?
      `
      const sqlCurso: typeof sqlType = `
      SELECT *
      FROM curso_alunos
      WHERE id_aluno=?
      `

      db.query(sql, [name], async function (err: Error, result: any) {
        if (err) throw err;
        const pergunta_length = result.length;

        db.query(sqlRespostas, [name], function (err: Error, result: any) {
          if (err) throw err;
          const resposta_length = result.length;
    
          db.query(sqlLikes, [name], function (err: Error, result: any) {
            if (err) throw err;
            const likes_length = result.length;
            
            db.query(sqlCurso, [id_user], function (err: Error, result: any) {
              if (err) throw err;
              const curso_length = result.length;


              
              
              const check = pergunta_length === 1 || pergunta_length === 3 || pergunta_length === 5;
              const chec2 = resposta_length >= 1 || resposta_length === 3 || resposta_length === 5;
              const chec3 = likes_length >= 1  || likes_length === 3 || likes_length === 5
              const chec4 = curso_length >= 1 || curso_length === 3 || curso_length === 5
              console.log('pergunta + ' + check);
              console.log('resposta: ' + chec2);
              console.log('like: ' + chec3);
              console.log('curso: ' + chec4);
              
              
              if (pergunta_length === 1 || pergunta_length === 3 || pergunta_length === 5 ) {
                console.log('pergunta');
                

                if (pergunta_length === 1) {
                  
                  if (pergunta_length === 1 ) {
                    const troufeu_nome = 'O curisoso'
                    const troufeu_tipo = 'Bronze'        
                
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
                
                } else if (pergunta_length === 3) {
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
                else if (pergunta_length === 5) {
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
                  } 
              } else if (resposta_length >= 1 || resposta_length === 3 || resposta_length === 5) {
                console.log('resposta');
                if (resposta_length === 1 ) {
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
                } else if (resposta_length === 3) {
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
                } else if ( resposta_length === 5) {
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
                
              } else if ( likes_length >= 1  || likes_length === 3 || likes_length === 5)  {
                console.log('likes');
                
                
                if (likes_length === 1) {
                  const troufeu_nome = 'Timido'
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
                        return;
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
                } else if (likes_length === 3) {
                  const troufeu_nome = 'Interativo'
                  const troufeu_tipo = 'Prata'
                  console.log('confia');

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
                } else if ( likes_length === 5) {
                  const troufeu_nome = 'Da comunidade';
                  const troufeu_tipo = 'Ouro';
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
                  } else {
                    res.status(400).send('hehe')
                  }
                  }) 
                }
              } else if (curso_length >= 1 || curso_length === 3 || curso_length === 5) {
console.log('course');

if (curso_length === 1) {
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
} else if (curso_length === 3) {
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
} else if ( curso_length === 5) {
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
              } else {
              return res.status(400).send('no trophies')
              }
        
          })      
        })    
      })
    })
 
 




    // const sqlmyList: typeof sqlType = `
    // SELECT * 
    // FROM curso_favorito
    // WHERE id_aluno=?
    // `

    // db.query(sqlmyList, [id_user], function (err: Error, result: any) {
    //   if (err) throw err;
    //   const re = result.length;
      

    //   if (re === 0) {
    //     const troufeu_nome = 'Pioneiro'
    //     const troufeu_tipo = 'Bronze'
    //     db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length;
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado

          
    //       if (trofeu === 0 && re === 1) {
    //         db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //           res.status(200).json({
    //             troufeu_nome: troufeu_nome,
    //             troufeu_tipo: troufeu_tipo
    //           })
    //         })
    //     } else if (trofeu === 0 && re === 0)  { 
    //       db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //         if (err) throw err;
    //         db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //           res.status(200).json({
    //             troufeu_nome: troufeu_nome,
    //             troufeu_tipo: troufeu_tipo
    //           })
    //         })
    //       })
    //     }
    //     })
    //   } else if (re === 2 ) {
    //     const troufeu_nome = 'Favoritos'
    //     const troufeu_tipo = 'Prata'
    //     db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
        
          


    //       if (trofeu === 0 && re === 1) {
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //       } else if (trofeu === 0 && re === 0)  { 
    //         db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //           if (err) throw err;
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //         })
    //       }
    //     })
    //   } else if ( re === 5) {
    //     const troufeu_nome = 'Colecao'
    //     const troufeu_tipo = 'Ouro'
    //     db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length;
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado
          

    //                if (trofeu === 0 && re === 1) {
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //       } else if (trofeu === 0 && re === 0)  { 
    //         db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //           if (err) throw err;
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //         })
    //       }
    //     }) 
    //   }

    // })
 
    // const sqlDownload: typeof sqlType = `
    // SELECT *
    // FROM curso_download
    // WHERE id_aluno=?
    // `

    // db.query(sqlDownload, [id_user], function (err: Error, result: any) {
    //   if (err) throw err;
    //   const re = result.length;
      
      

    //   if (re === 1) {
    //     const troufeu_nome = 'Testando'
    //     const troufeu_tipo = 'Bronze'
    //     db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length;
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


    //       if (trofeu === 0 ) {
    //         db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //           if (err) throw err;
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
                
    //           })
    //         })
    //       }
    //     })
    //   } else if (re === 3) {
    //     const troufeu_nome = 'Preparado'
    //     const troufeu_tipo = 'Prata'
    //     db.query(sqlSelectTrophy, [troufeu_nome, name], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


    //                if (trofeu === 0 && re === 1) {
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //       } else if (trofeu === 0 && re === 0)  { 
    //         db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //           if (err) throw err;
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //         })
    //       }
    //     })
    //   } else if ( re >= 5) {
    //     const troufeu_nome = 'O sem internet'
    //     const troufeu_tipo = 'Ouro'
    //     db.query(sqlSelectTrophy, [troufeu_nome], function (err: Error, result: any) {
    //       if (err) throw err;
    //       const re = result.length
    //       const trofeu = result[0]?.conquistado === undefined ? 0 : result[0].conquistado


    //                if (trofeu === 0 && re === 1) {
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //       } else if (trofeu === 0 && re === 0)  { 
    //         db.query(sqlTrophy, [id, data, troufeu_nome,  troufeu_tipo, name], function (err: Error, result: any) {
    //           if (err) throw err;
    //           db.query(sqlUpdate, [troufeu_nome], function (err: Error, result: any) {
    //             res.status(200).json({
    //               troufeu_nome: troufeu_nome,
    //               troufeu_tipo: troufeu_tipo
    //             })
    //           })
    //         }) 
    //       }
    //     }) 
    //   } 
      
    //  })

 
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

    public async buyCourse(req: Request, res: Response) {
      const {
        username
      } = req.body;

      if (!username) {
        res.status(404).send('No data provided,')
      }

      const sql: typeof sqlType = `
      UPDATE coins
      SET coins=1
      WHERE nomeDeUsuario=?
      `

      
    }
}

module.exports = new rankingsController();
