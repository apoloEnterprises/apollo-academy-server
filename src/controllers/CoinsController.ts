import { log } from 'console';
import { Request, Response } from 'express';
import { send } from 'process';
const db = require('../database/db');
const userRepository = require('../repository/userRepository');
const { v4: uuidv4 } = require('uuid');
const sqlType = require('./types/sqlTyped');
const {
  ResultQueyUser,ResultQueyPost} = require('./types/resultTyped');
const {  ResultQueryInsertCategory } = require('./types/shortResultTyped');
 
// user first actions - login, sign up, first choice of cateogries etc..
 
class userController {
 public async index (req: Request, res: Response) {
    const {
      id_usuario
      } = await req.body;

  }
}