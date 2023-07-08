import jwt from 'jsonwebtoken';
import { User, PrismaClient, Prisma } from '@prisma/client'
import { randomBytes } from 'crypto';
import { decodedTextSpanIntersectsWith } from 'typescript';

export default class JwtAuthServices {

  // Set token expiration time
  private readonly expiration: string = process.env.JWT_EXPIRATION || '';
  private readonly secret: string = process.env.JWT_SECRET || '';

  private client: PrismaClient;

  constructor(){
    this.expiration = process.env.JWT_EXPIRATION || '';
      this.secret = process.env.JWT_SECRET || '';
      this.client = new PrismaClient();
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
    console.log(new Date())
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

  async validateTokenIntegrity(token: string) {
    try {
      jwt.verify(token, this.secret, {ignoreExpiration:true})
      return true
    } catch (error) {
      console.log("validateTokenIntegrity in jwtAuthServices.ts failed. Error "+error)
     return false
    }
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
      console.log("verifyToken in jwtAuthServices.ts failed. Error "+error)
     return false
    }
  }

  async verifyRefreshToken(rft: string) {
    const tokenExists = await this.client.refreshToken.findFirst({
      where: { value: rft }
    });
    
    return tokenExists ? true : false
  }

  async confirmTokenClaim(token: string, id: number, claim : number) {
    try {
      let decoded = jwt.verify(token, this.secret, { ignoreExpiration: true }) // Use the config.jwt.secret directly
      return decoded // No error, token is valid
    } catch (error) {
      console.log("confirmTokenClaim in jwtAuthServices.ts failed. Error "+error)
     return null
    }
  }

  async executeRefresh(refreshToken : string) {
    const storedRefreshToken = await this.client.refreshToken.findFirst({
      where: {value:refreshToken}
    })

    if (!storedRefreshToken) throw new Error("Refresh token not found.");

    const userExists = await this.client.user.findUnique({
      where: { id: storedRefreshToken.userId }
    })

    if (!userExists) throw new Error("Refresh token not found");

    const newRft = await this.generateRefreshToken(userExists);
    const newJwt = await this.signToken(userExists, "1m");

    return {rft:newRft.value, jwt:newJwt}
  }

  async generateRefreshToken(user: User) {
    await this.client.refreshToken.deleteMany({
      where: { userId: user.id }
    })

    const rft = randomBytes(64).toString('hex');

    let date = new Date();
    date.setDate(date.getDate() + 30)
    let token = await this.client.refreshToken.create({
      data: {
        value: rft,
        expiry: date,
        userId: user.id
      }
    })
    return token;
  }
  
  async decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret, {ignoreExpiration:true})
      return decoded
    } catch (err) {
      return false
    }
  }
} 
