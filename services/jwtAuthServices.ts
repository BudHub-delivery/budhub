import jwt from 'jsonwebtoken';
import { User } from '@prisma/client'


export default class JwtAuthServices {

  // Set token expiration time
  private readonly expiration: string = process.env.JWT_EXPIRATION || '';
  private readonly secret: string = process.env.JWT_SECRET || '';

  constructor(){
    this.expiration = process.env.JWT_EXPIRATION || '';
    this.secret = process.env.JWT_SECRET || '';
  }

  // Verify the token provided by user during login
  async authMiddleware(req: any, res: any, next: any) {

    if(this.secret == '' || this.expiration == ''){
      throw new Error('JWT_SECRET or JWT_EXPIRATION environment(s) variable is not defined');
    }

    let token = req.body.token || req.query.token || req.headers.authorization;

    if(req.headers.authorization){

      token = req.headers.authorization.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const { data }: any = jwt.verify(token, this.secret, { maxAge: this.expiration });
      req.user = data;
    } catch {
      throw new Error('Invalid token');
    }

    return req;

  }

  // Create a token from a payload
  async signToken(user: User, exp = this.expiration) {
    
    if(this.secret == '' || this.expiration == ''){
      throw new Error('JWT_SECRET || JWT_EXPIRATION environment variable(s) is not defined');
    }

    if(!user){
      throw new Error('User is not defined');
    }
    
    // Create payload containing user information and sign token
    const payload = {
      id: user.id
    }

    return jwt.sign({ data: payload }, this.secret, { expiresIn: exp });

  }

  async verifyToken(token: string) {
    
    if(this.secret == ''){
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    if(!token){
      throw new Error('Token is not defined');
    }

    try {
      jwt.verify(token, this.secret) // Use the config.jwt.secret directly
      return true // No error, token is valid
    } catch (error) {
     return false
    }
  }
} 
