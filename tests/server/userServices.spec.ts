import * as bcrypt from 'bcryptjs';
import UserServices from '../../services/userServices';

import MailerService from '../../services/mailerServices';
import { PrismaClient, RoleType, User } from '@prisma/client';
import jwtAuthServices from '../../services/jwtAuthServices';
import { log } from 'console';

interface Role {
  id: number;
  role: RoleType;
}

interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  role: Role;
}

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          findUnique: jest.fn(),
        },
      };
    }),
  };
});

jest.mock("../../services/userServices");
jest.mock("../../services/jwtAuthServices");
jest.mock("../../services/mailerServices");

describe('UserServices Validators', () => {

  let userServices: UserServices; 

  beforeEach(() => {
    userServices = new UserServices();
  });
  
  it('should return hashed password', async () => {

    const hashedPassword = await userServices.hashPassword('password');
    
    expect(hashedPassword).not.toBe('password');
  });

  it('should validate correct password', async () => {

    const plainTextPassword = 'Password1!';
    const hashedPassword = await userServices.hashPassword(plainTextPassword);
    console.log(hashedPassword);
    const isValidPassword = userServices.validatePasswordHash(plainTextPassword, hashedPassword);

    expect(isValidPassword).toBe(true);
  });

  it('should validate incorrect password format', async () => {
    const plainTextPassword = 'Password1!';
    const isValidFormat = userServices.validatePassword(plainTextPassword);

    expect(isValidFormat).toBe(false);
  });

  it('should validate correct password format', async () => {
    const plainTextPassword = 'Password1!';
    const isValidFormat = userServices.validatePassword(plainTextPassword);

    expect(isValidFormat).toBe(true);
  });

  it('should validate correct email', async () => {

    const email = 'test@example.com';
    const isValidEmail = await userServices.validateEmail(email);
    
    expect(isValidEmail).toBe(true);
  });

  it('should validate incorrect email', async () => {

    const email = 'testexample.com';
    const isValidEmail = await userServices.validateEmail(email);
    
    expect(isValidEmail).toBe(false);
  });

  it('should generate a temporary password that passes validation', async () => {
      const tempPassword = await userServices.generateTempPassword();
      const isValidPassword = await userServices.validatePassword(tempPassword);
  
      expect(isValidPassword).toBe(true);
  });
});

describe('UserServices CRUD Actions', () => {

  let prisma: PrismaClient;
  let userServices: UserServices;

  beforeEach(async () => {
    prisma = new PrismaClient();
    userServices = new UserServices();
  });

  afterAll(async () => {
    prisma = new PrismaClient();
    await prisma.$disconnect();
  });

  it('should create user with default role', async () => {

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test1@mail.com',
      password: 'Password1!'
    };

    const endUser = await userServices.createUser(payload);

    const userRoles: UserRole[] = await prisma.userRole.findMany({
      where: {
        userId: endUser.id,
        role: {
          role: 'USER'
        }
      },
      include: {
        role: true
      }
    });
    
    expect(endUser.firstName).toBe('John');
    expect(endUser.lastName).toBe('Doe');
    expect(endUser.email).toBe('test1@mail.com');
    expect(await userServices.validatePasswordHash(payload.password, endUser.password)).toBe(true);
    expect(userRoles[0].role.role).toBe(RoleType.USER);

    await prisma.userRole.deleteMany({ 
      where: { 
        userId: endUser.id
      },
    });

    await prisma.user.deleteMany({ 
      where: { 
        id: endUser.id
      } 
    });
  });

  it('should create user with provided role', async () => {

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test2@mail.com',
      password: 'Password2!'
    };

    const adminUser = await userServices.createUser(payload, RoleType.ADMIN);

    const userRoles: UserRole[] = await prisma.userRole.findMany({
      where: {
        userId: adminUser.id,
        role: {
          role: 'ADMIN'
        }
      },
      include: {
        role: true
      }
    });

    expect(adminUser.firstName).toBe('John');
    expect(adminUser.lastName).toBe('Doe');
    expect(adminUser.email).toBe('test2@mail.com');
    expect(await userServices.validatePasswordHash(payload.password, adminUser.password)).toBe(true);
    expect(userRoles[0].role.role).toBe(RoleType.ADMIN);

    await prisma.userRole.deleteMany({ 
      where: { 
        userId: adminUser.id
      },
    });

    await prisma.user.deleteMany({ 
      where: { 
        id: adminUser.id
      } 
    });
  });

  it('should throw an error due to invalid password format', async () => {

    const invalidPayload = { 
      firstName: 'John', 
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'invalidPassword'
    };

    await expect(userServices.createUser(invalidPayload)).rejects.toThrow('Invalid password Format, must be in the format of "Password1!"')

  });

  it('should throw an error due to invalid email format', async () => {

    const invalidPayload = { 
      firstName: 'John', 
      lastName: 'Doe',
      email: 'invalidEmail',
      password: 'Password1!'
    };

    await expect(userServices.createUser(invalidPayload)).rejects.toThrow('Invalid email format, must be in the form of "username@domain.com"');

  });
});

describe('UserServices Token Validators', () => {

  let userService: UserServices;
  let mockUser: any;
  let mockJwtAuthService: any;
  let mockPrisma: any;

  beforeEach(() => {
    mockJwtAuthService = new jwtAuthServices;
    mockPrisma = new PrismaClient();
    userService = new UserServices();

    mockUser = {
      email: "john@example.com",
      password: "hashedPassword",
      firstName: "John",
      lastName: "Doe",
      emailConfirmed: true
    };
    
    (userService.validatePasswordHash as jest.Mock) = jest.fn();
  });

  it('should return user if token is valid', async () => {

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    (userService.validatePasswordHash as jest.Mock).mockResolvedValue(true);
    mockJwtAuthService.signToken.mockResolvedValue('token');

    const results = await userService.loginUser(mockUser.email, mockUser.password);

    expect(results).toEqual(mockUser);
    expect(mockPrisma.user.findUnique).toBeCalledWith({where: {email: mockUser.email}});
    expect(userService.validatePasswordHash).toBeCalledWith('plainTextPassword', mockUser.password);
    expect(mockJwtAuthService.signToken).toBeCalledWith(mockUser);

  });

  it('should throw an error if token is invalid', async () => {

    mockPrisma.user.findUnique.mockResolvedValue(mockUser);
    (userService.validatePasswordHash as jest.Mock).mockResolvedValue(false);
    mockJwtAuthService.signToken.mockResolvedValue('token');

    await expect(userService.loginUser(mockUser.email, mockUser.password)).rejects.toThrow('Invalid password');

  });

  it('should throw an error if user is not found', async () => {

    mockPrisma.user.findUnique.mockResolvedValue(null);
    (userService.validatePasswordHash as jest.Mock).mockResolvedValue(true);
    mockJwtAuthService.signToken.mockResolvedValue('token');

    await expect(userService.loginUser(mockUser.email, mockUser.password)).rejects.toThrow('User not found');

  });

  it('should throw an error if user is not confirmed', async () => {
      
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (userService.validatePasswordHash as jest.Mock).mockResolvedValue(true);
      mockJwtAuthService.signToken.mockResolvedValue('token');
  
      await expect(userService.loginUser(mockUser.email, mockUser.password)).rejects.toThrow('Please confirm your email address before you can login.');
  
    });

});
