import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

export interface ILogin {
  email: string;
  password: string;
}

export interface RequestWithRole extends Request {
  role: JwtPayload;
}
