import * as bcrypt from 'bcryptjs';
import { PrismaClient, User, RoleType } from '@prisma/client';
import jwtAuthServices from './jwtAuthServices';
import MailerServices from './mailerServices';
import LoginUserClass from '../classes/LoginUserClass'
import UserWithTokens from '../classes/UserWithTokens';

const { randomBytes } = require('node:crypto');


require('dotenv').config();

export default class UserServices {

  private prisma: PrismaClient;
  private jwtAuthService: jwtAuthServices;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwtAuthService = new jwtAuthServices();
  }

  async createUser(payload: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  },
    roleType?: RoleType | null
  ): Promise<User> {

    if (!this.validateEmail(payload.email)) {
      throw new Error('Invalid email format, must be in the form of "username@domain.com"');
    }

    if (!this.validatePassword(payload.password)) {
      throw new Error('Invalid password Format, must be in the format of "Password1!"');
    }

    if (!roleType) {
      roleType = RoleType.USER;
    }

    let user: User;
    try {
      user = await this.prisma.user.create({
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
    } catch (err: any) {
      if ("code" in err) {
        if (err.code == "P2002") {
          throw new Error("Email already registered")
        }
      }
      throw new Error("Unknown error: userServices at createUser method")
    }

    await this.sendResetConfirmEmail(user, 'userInvitation');

    return user;
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email }
    });
  }

  // Hash password
  async hashPassword(plain_text_password: string) {
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

  // Validate password hash
  async validatePasswordHash(plain_text_password: string, hashed_password: string) {
    return await bcrypt.compare(plain_text_password, hashed_password);
  }

  // Validate password format
  validatePassword(plain_text_password: string): boolean {
    let passwordRegex: RegExp;
    // must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters in length.
    passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/);

    return passwordRegex.test(plain_text_password);
  }

  // Validate email format
  validateEmail(email: string): boolean {
    let emailRegex: RegExp;
    // must be in the form of "username@domain"
    emailRegex = new RegExp(/.+@.+\..+/);

    return emailRegex.test(email);
  }

  // Login user and return a JWT amnd user object
  async loginUser(input: LoginUserClass): Promise<any> {

    const userExists = await this.prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!userExists) {
      throw new Error('Invalid email or password');
    }

    const validPassword = await this.validatePasswordHash(input.password, userExists.password);
    
    if (!validPassword) {
      throw new Error('Invalid email or password');
    }

    if (!userExists.emailConfirmed) {

      await this.sendResetConfirmEmail(userExists, 'userInvitation');

      throw new Error('Please confirm your email address before you can login.');
    }

    const token = await this.jwtAuthService.signToken(userExists, "1m");
    const refresh = await this.jwtAuthService.generateRefreshToken(userExists)

    return new UserWithTokens(userExists, token, refresh.value);
  }

  // Send a password reset email
  async forgotPassword(email: string): Promise<any> {

    const user = await this.getUserByEmail(email);

    if (!user) {
      // This is done to prevent user enumeration
      throw new Error('Password email will be sent!');
    }

    await this.sendResetConfirmEmail(user, 'passwordReset');

    return user;

  }

  // Validate the token and reset the password
  async resetPassword(token: string, password: string): Promise<any> {

    const validToken = await this.jwtAuthService.verifyToken(token);

    if (!validToken) {
      throw new Error('Invalid token');
    }

    const { data }: any = await this.jwtAuthService.verifyToken(token);
    const user = await this.prisma.user.findUnique({
      where: { id: data.id }
    });

    if (!user) {
      throw new Error('There was an error resetting your passwordm please try again later.');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.update({
      where: { id: data.id },
      data: { password: hashedPassword }
    });

    return token;

  }

  // Validate the token and confirm the email
  async confirmEmail(token: string): Promise<any> {
    const validToken = await this.jwtAuthService.verifyToken(token);

    if (!validToken) {
      throw new Error('Invalid token');
    }

    const decoded : any = await this.jwtAuthService.decodeToken(token);

    const user = await this.prisma.user.findUnique({
      where: { id: decoded.data.id }
    });
    if (!user) {
      throw new Error('There was an error confirming your email, please try again later.');
    }

    await this.prisma.user.update({
      where: { id: decoded.data.id },
      data: { emailConfirmed: true }
    });

    return token;
  }

  // Generate a temporary password for the user created by the admin user at store level  
  async generateTempPassword(): Promise<string> {
    var tempPassword = randomBytes(16).toString('hex');
    const specialChar = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomChars = [
      specialChar[Math.floor(Math.random() * specialChar.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)]
    ]

    for (let randomChar of randomChars) {
      const index = Math.floor(Math.random() * (tempPassword.length + 1));
      tempPassword = tempPassword.slice(0, index) + randomChar + tempPassword.slice(index);
    }

    return tempPassword

  }

  async sendResetConfirmEmail(user: User, event: string, storeName = null): Promise<any> {

    const token = await this.jwtAuthService.signToken(user);

    let url: string;

    switch (event) {
      case 'passwordReset':
        url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
        break;
      case 'userInvitation' || 'storeUserInvitation':
        url = `${process.env.CLIENT_URL}/confirm-email?token=${token}`;
        break;
      default:
        url = `${process.env.CLIENT_URL}`;
        break;
    }

    const userPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      url: url,
      storeName: storeName
    }

    new MailerServices(event, userPayload).sendMail();

  }
}
