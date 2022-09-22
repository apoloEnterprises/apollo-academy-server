import { Request, Response } from 'express';
const db = require('../database/db');

// trophies, rankings and levels of user

class rankingsController {
 public async userLevelUp(req: Request, res: Response) {
    const {
      id
      } = await req.body; 

      if(!id) {
        res.status(404).send({
          message: `ID not found.`
        })
      }

      interface ResultQuey {
        level: number,
        exp: number,
      }

      type sqlType = string;

      const sql: sqlType = `
      SELECT level, exp 
      FROM usuarios
      WHERE ID = ?
      `;

      const sqlUpdate: sqlType = `UPDATE usuarios
      SET 
          level=?
      WHERE 
          id=?
      `;

      const qnt_XP = {
        level_1_to_5: 100,
        level_5_to_15: 250,
        level_15_to_25: 350,
        level_25_to_50: 400,
        level_50_to_75: 550,
        level_75_to_90: 650,
        level_90_to_99: 1000,
      }

      function handleLevel(level: number) {
        if(level <= 5) {
         return qnt_XP.level_1_to_5
        } else if (level > 5 && level <= 15) {
          return qnt_XP?.level_5_to_15
        } else if (level > 15 && level <= 24) {
          return qnt_XP?.level_15_to_25
        } else if (level > 25 && level <= 49) {
          return 400
        } else if (level > 50 && level <= 74) {
          return qnt_XP?.level_50_to_75
        } else if (level > 75 && level <= 89) {
          return qnt_XP?.level_75_to_90
        } else if (level > 90 && level <= 98) {
          return qnt_XP?.level_90_to_99
        }
      }

      // console.log(moment.utc("2019-12-04 12:00:24").local().startOf('seconds').fromNow());
      

      db.query(sql, [id], async function (err: Error, result: ResultQuey[]) {
        if (err) throw err;
        let level = result[0].level;
        
        let exp = result[0].exp; 

        if (exp == handleLevel(level) && level < 99) {
          ++level;
          exp = 0;
        }

        db.query(sqlUpdate, [level, id], async function (err: Error, result: ResultQuey[]) {
          if (err) throw err;
          // res.status(200).send(result[0])
          res.status(200).send({
            level: level,
            exp: exp
          })
        })

      })
    }

    public async insertXP (req: Request, res: Response) {
      const {
        id,
        qnt_XP 
      } = req.body;

      
      if(!id) {
        res.status(404).send({
          message: `ID not found.`
        })
      }
      interface ResultQuey {
        level: number,
        exp: number,
      }

      type sqlType = string;

      const sql: sqlType = `
      SELECT level, exp 
      FROM usuarios
      WHERE ID = ?
      `;

      const sqlUpdate: sqlType = `UPDATE usuarios
      SET 
          exp=?
      WHERE 
          id=?
      `;

      db.query(sql, [id], async function(err: Error, result: ResultQuey[]) {
        if (err) throw err;
        const exp = result[0].exp;
        const newXP = exp - qnt_XP;
        db.query(sqlUpdate, [newXP, id], async function(err: Error, result: ResultQuey[]) {
          if(err) throw err;
          res.status(200).send(result);
        })
      })
    }
}

module.exports = new rankingsController();
