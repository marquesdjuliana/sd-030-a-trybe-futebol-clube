import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUserModel } from '../interfaces/user/IUserModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const invalidMessage = 'Invalid email or password';
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const token = jwt.sign({
      id: user.id,
      username: user.username,
    }, process.env.JWT_SECRET || 'padrao', {
      expiresIn: '10d',
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
