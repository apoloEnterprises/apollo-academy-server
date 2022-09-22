import { Request, Response } from 'express';
const db = require('../database/db');

class coursesController {
 public async postIndex(req: Request, res: Response) {
    const {
      data,
      autor_ID,
      categoria,
      subCategoria1,
      subCategoria2,
      subCategoria3,
      pergunta_Txt,
      pergunta_Descr,
      } = await req.body;
}
}

module.exports = new coursesController();
