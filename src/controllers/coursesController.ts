import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { ResultQueryWatched, ResultQueryInsertWacting, ResultQueryInsertCategory,
  ResultQueryInsertCourse, ResultQueryCourseModules } = require('./types/shortResultTyped');
const { v4: uuidv4 } = require('uuid');

class coursesController {
 public async verifyWatched(req: Request, res: Response) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const {
      id_usuario
      } = await req.body;

      if(!id_usuario) {
        res.status(404).send({
          message: 'Error: ID not provided.'
        })
      }

      const sqlWatched: typeof sqlType = `
      SELECT *
      FROM usuario_curso_assistindo
      WHERE id_usuario=?
      `

      const sqlWatched2: typeof sqlType = `
      SELECT *
      FROM usuario_curso_assistindo
      LEFT JOIN curso
      ON usuario_curso_assistindo.id_curso = curso.id
      `
      
      db.query(sqlWatched, [id_usuario], async function (err: Error, result: typeof ResultQueryWatched[]) {
        if (err) throw err;
        // const result_user_course = result
        // const id_curso = result[0]?.id_curso;
        if(result.length <= 0) {
          res.status(200).send({
            watching: false 
          });
        } else {
          db.query(sqlWatched2, [id_usuario], function (err: Error, result: typeof ResultQueryWatched[]) {
          res.status(200).json({
            watching: true,
            curso: result
          }) 
          })
        }
      });
}

public async insertCourse(req: Request, res: Response) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
        res.status(404).send({
          message: 'Error: No course provided.'
        })
      }

      const sqlWatched: typeof sqlType = `
      INSERT INTO curso
      (id, nome, descricao, foto_capa, autor)
      VALUES (?,?,?,?,?) 
      ` 
 
      const sqlCategory: typeof sqlType = `
      INSERT INTO curso_category
      (id_curso, categoria, sub_categoria, item)
      VALUES (?,?,?,?) 
      ` 
   
      db.query(sqlWatched, [id, nome, descricao, autor, foto_capa], async function (err: Error, result: typeof ResultQueryInsertCourse[]) {
        if (err) throw err;
        const [course] = result
        console.log(course);
        
          db.query(sqlCategory, [id, categoria, sub_categoria, item], function (err: Error, result: typeof ResultQueryInsertCourse[]) {
          if (err) throw err;
          
          res.status(200).send('Course Created Successfully.')

          
          // db.query(sqlSelect, )
        })
    })
}

public async getCourseAndCategory(req: Request, res: Response) {
  const {
    id
  } = req.body

  if (!id) {
    res.status(404).send('ID not found.')
  }

  const sqlSelect: typeof sqlType = `
  SELECT *
  FROM curso
  LEFT JOIN curso_category
  ON curso.id = curso_category.id_curso
  `

  db.query(sqlSelect, [id], async function (err: Error, result: typeof ResultQueryInsertCourse[]) {
    if (err) throw err;

    res.send(result[0])
    
  })

}

public async insertWatching(req: Request, res: Response) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
    const {
      id_usuario,
      id_curso,
      aula_assistindo,
      timestamp,
      total_timestamp,
      } = await req.body;

      if(!id_usuario) {
        res.status(404).send({
          message: 'Error: No ID provided.'
        })
      }
 
      const sqlWatched: typeof sqlType = `
      INSERT INTO usuario_curso_assistindo
      (id_usuario, id_curso, aula_assistindo, timestamp, total_timestamp)
      VALUES (?,?,?,?,?) 
      ` 
        
      db.query(sqlWatched, [id_usuario, id_curso, aula_assistindo, timestamp, total_timestamp], async function (err: Error, result: typeof ResultQueryInsertWacting[]) {
        if (err) throw err;
        res.status(200).json(result);
      })
}

    public async insertCourseCategory(req: Request, res: Response) {
      const {
        categoria,
        sub_categoria,
        item
      } = req.body;


      if (!categoria || !sub_categoria) {
        res.status(404).send('Categories not found.');
      }

      const sql: typeof sqlType = `
      INSERT INTO curso_category (categoria, sub_categoria, item)
      VALUES (?, ?, ?)
      ` 

      db.query(sql, [categoria, sub_categoria, item], async function (err: Error, result: typeof ResultQueryInsertCategory[]) {
        if (err) throw err;
        res.send(result)
      })
     }

     public async sendCourseCategory(req: Request, res: Response) {
      const {
        sub_categoria
      } = req.params
      
      if (!sub_categoria) {
        res.status(404).send('Category not found.')
      }

      const sql: typeof sqlType = `
      SELECT sub_categoria
      FROM curso_category
      WHERE sub_categoria=?
      `

      db.query(sql, [sub_categoria], async function (err: Error, result: any) {
        if(err) throw err;
        res.send(result)
      })

     }

     

     public async insertAula(req: Request, res: Response) {

      const {
        id_curso,
        id_modulo,
        aula_nome,
        video
      } = req.body

      if ( !id_curso || !id_modulo || !aula_nome || !video) {
        res.status(404).send('Required data not found.')
      }
      
      const sql: typeof sqlType = `
      INSERT INTO curso_aulas (id, id_curso, id_modulo, aula_nome, video)
      VALUES (?, ?, ?, ?, ?)
      `

      const id = uuidv4();

      db.query(sql, [id, id_curso, id_modulo, aula_nome, video], async function (err: Error, result: any) {
        if(err) throw err;
        res.send(result)
      })
     } 

     public async insertModolo(req: Request, res: Response) {

      const {
        id_curso,
        nome_modulo,
        modulo_ordem
      } = req.body

      if ( !id_curso || !nome_modulo || !modulo_ordem) {
        res.status(404).send('Required data not found.')
      }

      const id = uuidv4();
      
      const sql: typeof sqlType = `
      INSERT INTO curso_modulos (id, id_curso, nome_modulo, modulo_ordem) 
      VALUES (?, ?, ?, ?)
      `
 
      db.query(sql, [id, id_curso, nome_modulo, modulo_ordem], async function (err: Error, result: any) {
        if(err) throw err;
        res.send(result)
      })
     }

     public async getModules (req: Request, res: Response) {
      const {
        id_curso
      } = req.body;

      if (!id_curso) {
        res.status(404).send('No ID provided.')
      }
  
      const sqlSelecttest: typeof sqlType = `
      SELECT nome_modulo, id, modulo_ordem
      FROM curso_modulos
      WHERE id_curso=?
      `

      db.query(sqlSelecttest, [id_curso], async function (err: Error, result: typeof ResultQueryCourseModules[]) {
        if (err) throw err;
       
        res.json({
          modulo: result
        })
      })
      
     }

     public async getAulas (req: Request, res: Response) {
      const {
        id_modulo
      } = req.body;

      if (!id_modulo) {
        res.status(404).send('No ID provided.')
      }

      const sqlSelecttest: typeof sqlType = `
      SELECT aula_nome
      FROM curso_aulas
      WHERE id_modulo=?
      `

      db.query(sqlSelecttest, [id_modulo], async function (err: Error, result: typeof ResultQueryCourseModules[]) {
        if (err) throw err;
       
        res.json({
          aulas: result
        })
      })
      
     }
}

module.exports = new coursesController();
