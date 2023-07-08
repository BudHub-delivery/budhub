import { Router, Request, Response } from 'express';
import userService from '../services/userServices';
import UserWithTokens from '../classes/UserWithTokens';
import JwtAuthServices from '../services/jwtAuthServices';
import MailerService from '../services/mailerServices';
const userController = Router();
const bodyParser = require('body-parser')

const uServ = new userService();
const jwtAuthServ = new JwtAuthServices();
const jsonParser = bodyParser.json()

//Create user
userController.post('/', jsonParser, async (req: Request, res: Response) => {
  try {
    await uServ.createUser(req.body);
    res.status(201).json({message: "Confirmation email sent."})
  } catch (err : any) {
      res.status(400).json({error: err.message});
  }
});

export default userController;