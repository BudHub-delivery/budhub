import AuthService from '../../client/src/services/jwtAuthServices';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config'; 

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}


Object.defineProperty(window, 'location', {
  value: {
    assign: jest.fn(),
  }
});

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

interface JwtPayload {
  userId: number;
  iat: number; // Issued at
  exp: number; // Expiration time
}

describe('AuthService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize token on constructor', () => {
    const authService = new AuthService();
    expect(authService.getToken()).toBe(undefined);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('id_token');

  });

  it('should generate a valid token', () => {
    const authSerivce = new AuthService();
    const userId = 1;
    const token = authSerivce.generateToken(userId);
    expect(token).toBe(jwt.sign({ 
      userId: userId, 
      iat: Math.floor(Date.now() / 1000), 
      exp: Math.floor(Date.now() / 1000) + (60 * 180) 
    }, config.jwt.jwtSecret));
  });


  it('should return false if token is null', () => {
    const authService = new AuthService();
    authService.token = null;
    expect(authService.verifyToken()).toBe(false);
  })

  it('should return true if token is valid', () => {
    const authService = new AuthService();
    const userId = 1;
    authService.token = authService.generateToken(userId);
    expect(authService.verifyToken()).toBe(true);
  }
  );

  it('should return false if token is expired', () => {
    const authService = new AuthService();
    const payload: JwtPayload = {
      userId: 1,
      iat: Math.floor(Date.now() / 1000) - (60*60), // 1 hour ago
      exp: Math.floor(Date.now() / 1000) - (30*60), 
    }
    authService.token = jwt.sign(payload, config.jwt.jwtSecret);
    expect(authService.verifyToken()).toBe(false);
  });

  it('should return false if token is invalid', () => {
    const authService = new AuthService();
    const payload: JwtPayload = {
      userId: 1,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 180), // 3 hour
    }

    authService.token = jwt.sign(payload, 'invalidSecret');
    expect(authService.verifyToken()).toBe(false);
  });



});