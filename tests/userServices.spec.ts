import * as bcrypt from 'bcrypt';
import UserServices from '../services/userServices';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
}));

describe('UserServices', () => {
  
   it('should return hashed password', async () => {
    const userServices = new UserServices();

    const hashedPassword = await userServices.hashPassword('password');
    
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(hashedPassword).toBe('hashedPassword');
  });

  it('should validate correct email', () => {
    const userServices = new UserServices();

    const email = 'test@example.com';
    const isValidEmail = userServices.validateEmail(email);
    
    expect(isValidEmail).toBe(true);
  });

  it('should validate incorrect email', () => {
    const userServices = new UserServices();

    const email = 'testexample.com';
    const isValidEmail = userServices.validateEmail(email);
    
    expect(isValidEmail).toBe(false);
  });
    
  // Additional tests...
});
