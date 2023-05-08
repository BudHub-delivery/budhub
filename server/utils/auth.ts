import jwt, { JwtPayload } from 'jsonwebtoken';
import decode from 'jwt-decode';
import path from 'path';
import dotenv from 'dotenv';

interface CustomJwtPayload extends JwtPayload{
  data: string;
}

dotenv.config({ path: path.join(__dirname, '../.env') });

const secret: string = process.env.AUTH_SECRET!;
const expiration: string = process.env.AUTH_EXP!;

interface UserPayload {
  email: string;
  firstName: string;
  _id: string;
}

export const authMiddleware = ({ req }: { req: any }): any => {
  let token: string | undefined = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization && token != undefined) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as CustomJwtPayload;
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = ({ email, firstName, _id }: UserPayload, exp: string = expiration): string => {
  const payload = { email, firstName, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: exp });
};

export const isTokenExpired = (token: string): boolean => {
  // Decode the token to get its expiration time that was set by the server
  const decoded: any = decode(token);
  // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
  if (decoded.exp < Date.now() / 1000) {
    return true;
  }
  // If token hasn't passed its expiration time, return `false`
  return false;
};
