import { Request, Response } from 'express';
const db = require('../database/db');
const sqlType = require('./types/sqlTyped');
const { ResultQueryWatched, ResultQueryInsertWacting } = require('./types/shortResultTyped');
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
      SELECT aula_assistindo, timestamp
      FROM usuario_curso
      WHERE id_usuario=?
      `
      db.query(sqlWatched, [id_usuario], async function (err: Error, result: typeof ResultQueryWatched[]) {
        if (err) throw err;
        if(result.length <= 0) {
          res.status(200).send({
            watching: false
          });
        } else {
          res.status(200).json({
            watching: true,
            result: result
          })
        }
      })
}

public async insertCourse(req: Request, res: Response) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const {
      nome,
      descricao,
      modulos,
      aula,
      autor,
      alunos
      } = await req.body;

      const id = uuidv4();

      if(!nome) {
        res.status(404).send({
          message: 'Error: No course provided.'
        })
      }

      const sqlWatched: typeof sqlType = `
      INSERT INTO curso
      (id, nome, descricao, modulos, aula, autor, alunos)
      VALUES (?,?,?,?,?,?, ?) 
      `
      
      db.query(sqlWatched, [id, nome, descricao, modulos, aula, autor, alunos], async function (err: Error, result: typeof ResultQueryWatched[]) {
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
      timestamp
      } = await req.body;

      if(!id_usuario) {
        res.status(404).send({
          message: 'Error: No ID provided.'
        })
      }

      const sqlWatched: typeof sqlType = `
      INSERT INTO usuario_curso
      (id_usuario, id_curso, aula_assistida, aula_assistindo, timestamp)
      VALUES (?,?,?,?,?) 
      `
      
      db.query(sqlWatched, [id_usuario, id_curso, aula_assistida, aula_assistindo, timestamp], async function (err: Error, result: typeof ResultQueryInsertWacting[]) {
        if (err) throw err;
        res.status(200).json(result);
      })
}
}

module.exports = new coursesController();
