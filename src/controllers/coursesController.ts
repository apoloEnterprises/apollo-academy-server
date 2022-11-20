import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { ResultQueryWatched, ResultQueryInsertWacting, ResultQueryInsertCategory,
  ResultQueryInsertCourse, ResultQueryCourseModules } = require('./types/shortResultTyped');
const { v4: uuidv4 } = require('uuid');
const {
  ResultQueyUser,ResultQueyPost} = require('./types/resultTyped');
class coursesController {
  public async verifyWatched(req: Request, res: Response) {

    const {
      id_usuario
    } = req.body;

    const sqlWatched: typeof sqlType = `
      SELECT *
      FROM usuario_curso_assistindo
      WHERE id_usuario=?
      `;

    const sqlWatched2: typeof sqlType = `
      SELECT *
      FROM usuario_curso_assistindo
      WHERE id_curso AND id_usuario=?
      `;
    
    if(!id_usuario) {
      return res.status(404).send({
        message: 'Error: ID not provided.'
      });
    } 

    db.query(sqlWatched, [id_usuario], async function (err: Error, result: typeof ResultQueryWatched[]) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }         
      // const result_user_course = result
      const id_curso = result[0]?.id_curso;
      console.log(result); 
 
      if(result.length === 0) {
        return res.json({ 
          watching: false 
        });
      } else if (result.length === 1) {
        db.query(sqlWatched, [id_usuario], function (err: Error, result: typeof ResultQueryWatched[]) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          console.log(result);
          return res.json({ 
            watching: true,
            curso: result 
          });  
        }); 
      } 
    });
    
  } 

  public async insertCourse(req: Request, res: Response) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 
    const {
      nome,
      descricao,
      foto_capa,
      autor,
      categoria,
      sub_categoria,
      item
    } = await req.body;

    const id = uuidv4();
    const id_category = uuidv4();

    if(!nome) {
      return res.status(404).send({
        message: 'Error: No course provided.'
      });
    }

    const sqlWatched: typeof sqlType = `
      INSERT INTO curso
      (id, nome, descricao, foto_capa, autor)
      VALUES (?,?,?,?,?) 
      `; 
 
    const sqlCategory: typeof sqlType = `
      INSERT INTO curso_category
      (nome_curso, categoria, sub_categoria, item)
      VALUES (?,?,?,?) 
      `; 
   
    db.query(sqlWatched, [id, nome, descricao, foto_capa, autor], async function (err: Error, result: typeof ResultQueryInsertCourse[]) {
      if (err) throw err;
      const [course] = result;
        
      db.query(sqlCategory, [nome, categoria, sub_categoria, item], function (err: Error, result: typeof ResultQueryInsertCourse[]) {
        if (err) throw err;
          
        return res.status(200).send('Course Created Successfully.'); 
      });
    });
  }

  public async getCourseAndCategory(req: Request, res: Response) {
    const {
      id
    } = req.body;

    if (!id) {
      return res.status(404).send('ID not found.');
    }
  
    const sqlSelect: typeof sqlType = `
  SELECT *
  FROM curso
  LEFT JOIN curso_category
  ON curso.id = curso_category.id_curso
  `;

    db.query(sqlSelect, [id], async function (err: Error, result: typeof ResultQueryInsertCourse[]) {
      if (err) throw err;

      return res.send(result[0]);
    
    });

  }

  public async insertWatching(req: Request, res: Response) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 
    const {
      id_usuario,
      id_curso,
      aula_assistindo,
      timestamp,
      total_timestamp,
    } = await req.body;

    if(!id_usuario) {
      return res.status(404).send({
        message: 'Error: No ID provided.'
      });
    }
 
    const sqlWatched: typeof sqlType = `
      INSERT INTO usuario_curso_assistindo
      (id_usuario, id_curso, aula_assistindo, timestamp, total_timestamp)
      VALUES (?,?,?,?,?) 
      `; 
        
    db.query(sqlWatched, [id_usuario, id_curso, aula_assistindo, timestamp, total_timestamp], async function (err: Error, result: typeof ResultQueryInsertWacting[]) {
      if (err) throw err;
      return res.status(200).json(result);
    });
  }

  public async insertCourseCategory(req: Request, res: Response) {
    const {
      categoria,
      sub_categoria,
      item
    } = req.body;


    if (!categoria || !sub_categoria) {
      return res.status(404).send('Categories not found.');
    }

    const sql: typeof sqlType = `
      INSERT INTO curso_category (categoria, sub_categoria, item)
      VALUES (?, ?, ?)
      `; 

    db.query(sql, [categoria, sub_categoria, item], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
      if (err) throw err;
      return res.send(result);
    });
  }

  public async sendCourseCategory(req: Request, res: Response) {
    const {
      sub_categoria
    } = req.params;
      
    if (!sub_categoria) {
      return res.status(404).send('Category not found.');
    }

    const sql: typeof sqlType = `
      SELECT sub_categoria
      FROM curso_category
      WHERE sub_categoria=?
      `;

    db.query(sql, [sub_categoria], async function (err: Error, result: any) {
      if(err) throw err;
      return res.send(result);
    });

  }

     

  public async insertAula(req: Request, res: Response) {

    const {
      id_curso,
      id_modulo,
      aula_nome,
      video
    } = req.body;

    if ( !id_curso || !id_modulo || !aula_nome || !video) {
      return res.status(404).send('Required data not found.');
    }
      
    const sql: typeof sqlType = `
      INSERT INTO curso_aulas (id, id_curso, id_modulo, aula_nome, video)
      VALUES (?, ?, ?, ?, ?)
      `;

    const id = uuidv4();

    db.query(sql, [id, id_curso, id_modulo, aula_nome, video], async function (err: Error, result: any) {
      if(err) throw err;
      return res.send(result);
    });
  } 

  public async insertModolo(req: Request, res: Response) {

    const {
      id_curso,
      nome_modulo,
      modulo_ordem
    } = req.body;

    if ( !id_curso || !nome_modulo || !modulo_ordem) {
      return res.status(404).send('Required data not found.');
    }

    const id = uuidv4();
      
    const sql: typeof sqlType = `
      INSERT INTO curso_modulos (id, id_curso, nome_modulo, modulo_ordem) 
      VALUES (?, ?, ?, ?)
      `;
  
    db.query(sql, [id, id_curso, nome_modulo, modulo_ordem], async function (err: Error, result: any) {
      if(err) throw err;
      return res.send(result);
    });

  }
 
  public async getModules (req: Request, res: Response) {


    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
     
    const {
      id_curso
    } = req.body; 

    if (!id_curso) {
      return res.status(404).send('No ID provided.');
    }
   
    const sqlSelecttest: typeof sqlType = `
      SELECT nome_modulo, id, modulo_ordem
      FROM curso_modulos
      WHERE id_curso=?
      ORDER BY modulo_ordem ASC 
      `;

    db.query(sqlSelecttest, [id_curso], async function (err: Error, result: typeof ResultQueryCourseModules[]) {
      if (err) throw err;
       
      return res.json({
        modulo: result
      });
    });
      
  }

  public async getAulas (req: Request, res: Response) {
    const {
      id_modulo
    } = req.body;

    if (!id_modulo) {
      return res.status(404).send('No ID provided.');
    }

    const sqlSelecttest: typeof sqlType = `
      SELECT aula_nome
      FROM curso_aulas
      WHERE id_modulo=?
      `;

    db.query(sqlSelecttest, [id_modulo], async function (err: Error, result: typeof ResultQueryCourseModules[]) {
      if (err) throw err;
       
      return res.json({
        aulas: result[1]
      });
    });
      
  }

  public async sendRating(req: Request, res: Response): Promise<void> {
    const {
      id_curso,
      id_aluno,
      nota
    } = req.body;

    if (!id_curso || !id_aluno || !nota) {
      res.status(404).json({message: 'Needed data not found.'});
    }

    const id = uuidv4();

    const sqlSelecttest: typeof sqlType = `
      INSERT INTO curso_avaliacoes (id, id_curso, id_aluno, nota)
      VALUES (?,?,?, ?)
      `;
  
    db.query(sqlSelecttest, [id, id_curso, id_aluno, nota], async function (err: Error, result: any) {
      if (err) throw err;
      const re = await result;
      return res.send(re);
    });

  }
 
  public async inscreverCursoAluno(req: Request, res: Response) {
    const {
      nome_curso,
      id_aluno,
    } = req.body;

    if (!nome_curso || !id_aluno) {
      return res.status(404).json({
        message: 'Needed data not found.'
      }); 
    }  
  
    const id = uuidv4();

    const sqlInsertInto: typeof sqlType = `
      INSERT INTO curso_alunos (id, nome_curso, id_aluno)
      VALUES (?,?,?)  
      `;    
  
    const sqlSelect: typeof sqlType = `
      SELECT *
      FROM curso
      WHERE nome=?
      `;

    const sqlSelectinsert: typeof sqlType = ` 
      INSERT
      INTO usuario_curso_assistindo (id_usuario, id_curso, aula_assistindo, timestamp, total_timestamp)
      VALUES (?, ?, ?, ?, ?)
      `;  

    const aula_assistindo = 'O que o Javascript é capaz de fazer?';
  
    db.query(sqlInsertInto, [id, nome_curso, id_aluno], async function (err: Error, result: any) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      db.query(sqlSelect, [nome_curso], async function (err: Error, result: any) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        const curso_id = result[0].id;
          
        db.query(sqlSelectinsert, [id_aluno, curso_id, aula_assistindo, '00:00', '28:49' ], async function (err: Error, result: any) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
              
          }
          return res.end(); 
        });
      });
    });

  }

  public async getAlunoCursos(req: Request, res: Response) {
    const {
      id
    } = req.params;

    if(!id) {
      return res.status(404).send('No id provided.');
    }

    const sqlSelect: typeof sqlType = `
      SELECT nome_curso
      FROM curso_alunos
      WHERE id_aluno=?
      `;

    const sqlSelectRe: typeof sqlType = `
      SELECT *
      FROM curso
      WHERE id=?
      `; 

    db.query(sqlSelect, [id], async function (err: Error, result: any) {
      if (err) throw err;
      // console.log(result);
      return res.send(result);
    });
  }
 
  public async getMediaNota(req: Request, res: Response) {
    const {
      id_curso
    } = req.params;


    if (!id_curso) {
      return res.status(404).json({
        message: 'Needed data not found.'
      });
    }

    const sqlSelect: typeof sqlType = `
      SELECT nota
      FROM curso_avaliacoes
      WHERE id_curso=?
      `;
        
    db.query(sqlSelect, [id_curso], async function (err: Error, result: any) {
      if (err) throw err;
      const nota = result;
      return res.status(200).json({
        notas: nota,
        qnt_notas: nota.length
      });
    });
  }

  public async getNumAlunos(req: Request, res: Response) {
    const {
      id_aluno
    } = req.params;


    if (!id_aluno) {
      return res.status(404).json({
        message: 'Needed data not found.'
      });
    }
 
    const sqlSelect: typeof sqlType = `
      SELECT curso_alunos.id_aluno, usuarios.nomeDeUsuario
      FROM curso_alunos
      LEFT JOIN usuarios
      ON curso_alunos.id_aluno = usuarios.id
      `;
    // LEFT JOIN curso
    // ON usuario_curso_assistindo.id_curso = curso.id
        
    db.query(sqlSelect, [id_aluno], async function (err: Error, result: any) {
      if (err) throw err;
      const aluno = result;
      return res.status(200).json({
        alunos: aluno,
        qnt_alunos: aluno.length
      });
    });


  }

  public async returnCursoFeed(req: Request, res: Response) {
      
    const {
      id 
    } = req.body;
       
    const sqlSelect: typeof sqlType = `
      SELECT curso.nome, curso.foto_capa, curso_category.categoria, curso_category.item, curso_category.sub_categoria
      FROM curso
      LEFT JOIN curso_category on
      curso.id = curso_category.id_curso 
      AND curso_category.sub_categoria=?
      `; 

    const sqlUser: typeof sqlType = `
      SELECT *
      FROM usuario_category
      RIGHT JOIN usuarios
      ON usuario_category.id_usuario = usuarios.id
      `;

    const sqlMatchCategories: typeof sqlType = `
      SELECT item
      FROM curso_category
      WHERE sub_categoria IN (?, ?, ?)
      `;

         
    db.query(sqlUser, [id], async function (err: Error, result: typeof ResultQueyUser[]) {
      if (err) throw err;
      const [re] = await result;
      const categoryUser = re?.categoria;
      const subCategory_1_User = re?.sub_categoria;
      const subCategory_2_User = re?.sub_categoria2;
      const SubCategory_3_User = re?.sub_categoria3;
      db.query(sqlMatchCategories, [subCategory_1_User, subCategory_2_User, SubCategory_3_User], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
        db.query(sqlSelect, [subCategory_1_User], async function (err: Error, result: any) {
          if (err) throw err;
          return res.status(200).json({
            re: result
          }); 
        });
      } );
    });
      
  }

  public async insertIntoMyFavList (req: Request, res: Response) {
    const {
      id_aluno,
      item,
      descricao,
      img,
      nome,
      category1,
      category2,
      category3
    } = req.body;

    if (!id_aluno || !item || !descricao || !img || !nome || !category1 || !category2 || !category3) {
      return res.status(404).send('No data provided');
    }
    
    const id = uuidv4();


    const sqlInsertInto: typeof sqlType = `
      INSERT INTO curso_favorito (id, item, descricao, img, nome, category1, category2, category3, id_aluno)
      VALUES (?,?,?,?,?,?,?,?,?)  
      `;

    db.query(sqlInsertInto, [id, item, descricao, img, nome, category1, category2, category3, id_aluno], async function (err: Error, result: any) {
      if (err) throw err;
      return res.status(200).json({
        re: result
      });
    });

  }

  public async insertIntoDownload (req: Request, res: Response) {
    const {
      id_aluno,
      item,
      descricao,
      img,
      nome,
      category1,
      category2,
      category3
    } = req.body;

    console.log();
    console.log(item);
    console.log();
    

    if (!id_aluno || !item || !descricao || !img || !nome || !category1 || !category2 || !category3) {
      return res.status(404).send('No data provided');
    }

    const id = uuidv4();
      

    const sqlInsertInto: typeof sqlType = `
      INSERT INTO curso_download (id, item, descricao, img, nome, category1, category2, category3, id_aluno)
      VALUES (?,?,?,?,?,?,?,?,?)  
      `;
      
    db.query(sqlInsertInto, [id, item, descricao, img, nome, category1, category2, category3, id_aluno], async function (err: Error, result: any) {
      if (err) throw err;
      return res.status(200).json({
        re: result
      });
    });
  }

  public async getDownloads(req: Request, res: Response) {
    const {
      id_aluno
    } = req.params;

  
    if (!id_aluno) {
      return res.status(404).send('No data provided.');
    } 

    const sqlSelect: typeof sqlType = `
      SELECT *
      FROM curso_download
      WHERE id_aluno=?
      `;
 
    db.query(sqlSelect, [id_aluno], async function (err: Error, result: any) {
      if (err) throw err;
      return res.status(200).send(result);
    }); 
      
  }

  public async getTime(req: Request, res: Response) {
    const {
      id_usuario,
      id_curso
    } = req.body;

    if (!id_curso || !id_usuario) {
      return res.status(404).send('No data provided.');
    }
 
    const sqlSelect: typeof sqlType = `
      SELECT timestamp
      FROM usuario_curso_assistindo
      WHERE (id_curso=? AND id_usuario=?)
      `; 
      
    db.query(sqlSelect, [id_curso, id_usuario], async function (err: Error, result: any) {
      if (err) throw err;
      return res.status(200).send(result);
    }); 
  }
 
  public async getliked(req: Request, res: Response) {
    const {
      id_aluno
    } = req.params;

  
    if (!id_aluno) {
      return res.status(404).send('No data provided.');
    } 

    const sqlSelect: typeof sqlType = `
      SELECT *
      FROM curso_favorito
      WHERE id_aluno=?
      `;

    db.query(sqlSelect, [id_aluno], async function (err: Error, result: any) {
      if (err) throw err;
      return res.status(200).send(result);
    }); 
      
  }

  public async getLikedFromName(req: Request, res: Response) {
    const {
      id_aluno,
      nome_curso
    } = req.params;
    console.log(nome_curso);


    if (!id_aluno || !nome_curso) {
      return res.status(404).send('No data found.');
    }

    const sqlSelect: typeof sqlType = `
    SELECT *
    FROM curso_favorito
    WHERE id_aluno=? AND nome=?
    `; 

    db.query(sqlSelect, [id_aluno, nome_curso], async function (err: Error, result: any) {
      if (err) throw err;
      if (result.length >= 1 ) {
        return res.status(200).json({
          isFav: true
        });
      } else {
        return res.status(200).json({
          isFav: false
        });
      }
    }); 
  }

  public async getDownloadFromName(req: Request, res: Response) {
    const {
      id_aluno,
      nome_curso
    } = req.params;


    if (!id_aluno || !nome_curso) {
      return res.status(404).send('No data found.');
    }

    const sqlSelect: typeof sqlType = `
    SELECT *
    FROM curso_download
    WHERE id_aluno=? AND nome=?
    `; 

    db.query(sqlSelect, [id_aluno, nome_curso], async function (err: Error, result: any) {
      if (err) throw err;
      if (result.length >= 1 ) {
        return res.status(200).json({
          isDownloaded: true
        });
      } else {
        return res.status(200).json({
          isDownloaded: false
        });
      }
    }); 
  }

}

module.exports = new coursesController();
