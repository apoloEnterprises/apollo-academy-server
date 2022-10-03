import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { ResultQueryWatched, ResultQueryInsertWacting, ResultQueryInsertCategory } = require('./types/shortResultTyped');
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
      FROM usuario_curso
      WHERE id_usuario=?
      `

      const sqlWatched2: typeof sqlType = `
      SELECT *
      FROM usuario_curso
      LEFT JOIN curso
      ON usuario_curso.id_curso = curso.id
      `
      
      db.query(sqlWatched, [id_usuario], async function (err: Error, result: typeof ResultQueryWatched[]) {
        if (err) throw err;
        const result_user_course = result
        const id_curso = result[0]?.id_curso;
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
      modulos,
      foto_capa,
      aula,
      autor,
      alunos,
      categoria, 
      subcategoria1
      } = await req.body;

      const id = uuidv4();

      if(!nome) {
        res.status(404).send({
          message: 'Error: No course provided.'
        })
      }

      const sqlWatched: typeof sqlType = `
      INSERT INTO curso
      (id, nome, descricao, modulos, aula, autor, alunos, categoria, foto_capa, subcategoria1)
      VALUES (?,?,?,?,?,?, ?, ?, ?, ?) 
      ` 
  
      db.query(sqlWatched, [id, nome, descricao, modulos, aula, autor, alunos, categoria, foto_capa, subcategoria1], async function (err: Error, result: typeof ResultQueryWatched[]) {
        if (err) throw err;
        res.status(200).json(result);
      })
}

public async insertWatching(req: Request, res: Response) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
    const {
      id_usuario,
      id_curso,
      aula_assistida,
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
      INSERT INTO usuario_curso
      (id_usuario, id_curso, aula_assistida, aula_assistindo, timestamp, total_timestamp)
      VALUES (?,?,?,?,?, ?) 
      `
      
      db.query(sqlWatched, [id_usuario, id_curso, aula_assistida, aula_assistindo, timestamp, total_timestamp], async function (err: Error, result: typeof ResultQueryInsertWacting[]) {
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

}

module.exports = new coursesController();
