import { Request, Response } from 'express';

class userController {
  async index (req: Request, res: Response) {
    res.status(200).send('mike');
  }
}

module.exports = new userController();
