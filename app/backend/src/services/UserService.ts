import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUserModel } from '../interfaces/user/IUserModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { ILogin } from '../interfaces/user/IUser';
import authenticateToken from '../utils/authenticateToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<{ token: string }>> {
    const invalidMessage = 'Invalid email or password';
    const user = await this.userModel.findByEmail(data.email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const token = authenticateToken.generateToken({ role: user.role, email: user.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
