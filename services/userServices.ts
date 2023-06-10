import * as bcrypt from 'bcryptjs';
import { PrismaClient, User, RoleType } from '@prisma/client';
const { randomBytes } = require('node:crypto');

require('dotenv').config();

export default class UserServices {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(payload: { 
      firstName: string, 
      lastName: string,
      email: string,
      password: string,
    },
    roleType?: RoleType | null
    ): Promise<User> {

    if(!this.validateEmail(payload.email)){
      throw new Error('Invalid email format, must be in the form of "username@domain.com"');
    }

    if(!this.validatePassword(payload.password)){
      throw new Error('Invalid password Format, must be in the format of "Password1!"');
    }

    if(!roleType){
      roleType = RoleType.USER;
    }

    return await this.prisma.user.create({
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

  async generateTempPassword(): Promise<string> {
    var tempPassword = randomBytes(16).toString('hex');
    const specialChar = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChars = [
      specialChar[Math.floor(Math.random() * specialChar.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)]
    ]
    
    for(let randomChar of randomChars){
      const index = Math.floor(Math.random() * (tempPassword.length + 1));
      tempPassword = tempPassword.slice(0, index) + randomChar + tempPassword.slice(index);
    }
  
    return tempPassword
  }
}
