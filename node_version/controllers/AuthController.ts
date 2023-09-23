import { Router, Request, Response } from 'express';
import userService from '../services/userServices';
import UserWithTokens from '../classes/UserWithTokens';
import JwtAuthServices from '../services/jwtAuthServices';
import MailerService from '../services/mailerServices';
const authController = Router();
const bodyParser = require('body-parser')

const uServ = new userService();
const jwtAuthServ = new JwtAuthServices();
const jsonParser = bodyParser.json()

interface DecodedJwt {
  data: {
    id: string;
  };
  exp: number;
}

//Login User
authController.post('/login', jsonParser, async (req: Request, res: Response) => {
    try {
        const loggedInUser = await uServ.loginUser(req.body);
        res.send(loggedInUser)
    } catch (err : any) {
        res.status(400).json({error:err.message});
    }
})
//Confirm email
authController.post('/confirm', jsonParser, async (req: Request, res: Response) => {
  try {
    await uServ.confirmEmail(req.body.token);
    res.status(200).json({ message: "Email was confirmed!" });
  } catch (err: any) {
    console.log(err.message)
    res.status(400).json({ error: err.message });
  }
})

authController.post('/jwtDevTest', jsonParser, async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    //extract token from header
    const token: string = authHeader.substring(7)  
    //verify token is properly formatted
    const integrity = await jwtAuthServ.validateTokenIntegrity(token)
    //decode properly formatted token
    const decoded = await jwtAuthServ.decodeToken(token) as DecodedJwt
    if (!integrity || !decoded) {
      return res.status(401).json({message:"Invalid token format"})
    }
    //check expiration of decoded token
    const stillValid = await jwtAuthServ.verifyToken(token)
    if(!stillValid) {
      return res.status(401).json({message:"Token expired"})
    }
    if (parseInt(decoded.data.id,10) !== parseInt(req.body.id,10)) {
      return res.status(401).json({message:"Access Denied"})
    }
    return res.status(200).json({message:"Token is valid!"})
  }
})

authController.post('/execute-refresh-request', jsonParser, async (req: Request, res: Response) => {
  const rft = req.body.rft
  const checkRefreshToken = await jwtAuthServ.verifyRefreshToken(rft);
  if (!checkRefreshToken) {
    return res.status(401).json({message:"Failed refresh request. Token not valid"})
  }
  try {
    const refreshPayload = await jwtAuthServ.executeRefresh(rft);
    console.log(refreshPayload)
    res.status(200).json(refreshPayload)
  } catch (err:any) {
    res.status(401).json({error:err})
  }
})

export default authController;