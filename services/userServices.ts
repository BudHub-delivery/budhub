import * as bcrypt from 'bcryptjs';
import { PrismaClient, User, RoleType } from '@prisma/client';
import jwtAuthServices from './jwtAuthServices';
import MailerServices from './mailerServices';
require('dotenv').config();

export default class UserServices {

  async createUser(payload: { 
      firstName: string, 
      lastName: string,
      email: string,
      password: string
    },
    roleType?: RoleType | null
    ): Promise<User> {

    const prisma = new PrismaClient();

    if(!this.validateEmail(payload.email)){
      throw new Error('Invalid email format, must be in the form of "username@domain.com"');
    }

    if(!this.validatePassword(payload.password)){
      throw new Error('Invalid password Format, must be in the format of "Password1!"');
    }

    if(!roleType){
      roleType = RoleType.USER;
    }

    return await prisma.user.create({
      data: {
        ...payload,
        password: await this.hashPassword(payload.password),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: roleType },
                where: { role: roleType }
              }
            }
          }
        }
      }
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const prisma = new PrismaClient();
    return await prisma.user.findUnique({
      where: { email: email }
    });
  }
  
  async hashPassword(plain_text_password: string){
    let saltRounds: number;
 
    if (process.env.SALT_ROUNDS !== undefined) {
      saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    } else {
        // Handle the case where the environment variable is not defined.
        // Maybe throw an error, or set a default value.
        throw new Error("SALT_ROUNDS environment variable is not defined");
    }
    return await bcrypt.hash(plain_text_password, saltRounds);
  }

  async validatePasswordHash(plain_text_password: string, hashed_password: string){
    return await bcrypt.compare(plain_text_password, hashed_password);
  }

  validatePassword(plain_text_password: string): boolean{
    let passwordRegex: RegExp;
    // must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters in length.
    passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/);
    
    return passwordRegex.test(plain_text_password);
  }
  
  validateEmail(email: string): boolean{
    let emailRegex: RegExp;
    // must be in the form of "username@domain"
    emailRegex = new RegExp(/.+@.+\..+/);
  
    return emailRegex.test(email);
  }

  async loginUser(email: string, password: string): Promise<any>{

    const jwtAuthService = new jwtAuthServices();

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if(!user){
      throw new Error('Invalid email or password');
    }

    if(!user.emailConfirmed){
      const token = await jwtAuthService.signToken(user);

      const url = `${process.env.CLIENT_URL}/confirm-email?token=${token}`;
      const userPayload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        url: url
      }
      
      new MailerServices('userInvitation', userPayload).sendMail();

      throw new Error('Please confirm your email address before you can login.');
    }

    const validPassword = await this.validatePasswordHash(password, user.password);

    if(!validPassword){
      throw new Error('Incorrect credentials');
    }

    if(!validPassword){
      throw new Error('Invalid email or password');
    }

    const token = await jwtAuthService.signToken(user);

    return user;
  }
  
  // Send a password reset email
  async forgotPassword(email: string): Promise<any>{

    const user = await this.getUserByEmail(email);

    if(!user){
      // This is done to prevent user enumeration
      throw new Error('Password email will be sent!');
    }

    const jwtAuthService = new jwtAuthServices();

    // If user exists, create a token and send the password reset email
    const token = await jwtAuthService.signToken(user);
    const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    const userPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      url: url
    }

    new MailerServices('passwordReset', userPayload).sendMail();

    return user;
    
  }

  // Validate the token and reset the password
  async resetPassword(token: string, password: string): Promise<any>{
    const jwtAuthService = new jwtAuthServices();
    const prisma = new PrismaClient();

    const validToken = await jwtAuthService.verifyToken(token);

    if(!validToken){
      throw new Error('Invalid token');
    }

    const { data }: any = await jwtAuthService.verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: data.id }
    });

    if(!user){
      throw new Error('There was an error resetting your passwordm please try again later.');
    }

    const hashedPassword = await this.hashPassword(password);

    await prisma.user.update({
      where: { id: data.id },
      data: { password: hashedPassword }
    });

    return token;

  }

  async confirmEmail(token: string): Promise<any>{
    const jwtAuthService = new jwtAuthServices();
    const prisma = new PrismaClient();

    const validToken = await jwtAuthService.verifyToken(token);

    if(!validToken){
      throw new Error('Invalid token');
    }

    const { data }: any = await jwtAuthService.verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: data.id }
    });

    if(!user){
      throw new Error('There was an error confirming your email, please try again later.');
    }

    await prisma.user.update({
      where: { id: data.id },
      data: { emailConfirmed: true }
    });

    return token;

  }
}
