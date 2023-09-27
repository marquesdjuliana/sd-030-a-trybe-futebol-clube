import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>,
  findByEmail(email: string): Promise<IUser | null >
}
