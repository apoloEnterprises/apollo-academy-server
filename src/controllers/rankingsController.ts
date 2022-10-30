import { Request, Response } from 'express';
const db = require('../database/db');

// trophies, rankings and levels of user

class rankingsController {
 public async userLevelUp(req: Request, res: Response) {
    const {
      id
      } = await req.body; 

        
    }
}

module.exports = new rankingsController();
