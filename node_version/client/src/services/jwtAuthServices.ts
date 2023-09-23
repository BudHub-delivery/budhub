import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';

interface JwtPayload {
  userId: number;
  iat: number; // Issued at
  exp: number; // Expiration time
}

export default class AuthService {

  private readonly secret: string = config.jwt.jwtSecret;
  token: string | null;

  constructor(){
    this.token = this.getToken();
  }

  generateToken(userId: number): string {
    const payload: JwtPayload = {
      userId: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 180), // 3 hour
    };

    return jwt.sign(payload, this.secret)
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }


  loggedIn() : boolean{
    // Checks if there is a saved token and it's still valid
    return this.token && this.verifyToken() ? true : false;
  }

  verifyToken(): boolean {

    if (!this.token) {
      return false;
    }

    try {
      jwt.verify(this.token, this.secret) as JwtPayload; // Use the config.jwt.secret directly
      return true // No error, token is valid
    } catch (error) {
     return false
    }
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    this.token = idToken;
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    this.token = null;
    window.location.assign('/')
  }
}
