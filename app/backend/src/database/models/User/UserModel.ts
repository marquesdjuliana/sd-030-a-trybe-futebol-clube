import SequelizeUser from './SequelizeUser';
import { IUser } from '../../../interfaces/user/IUser';
import { IUserModel } from '../../../interfaces/user/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });
    console.log(user);
    if (!user) return null;

    return user.toJSON();
  }
}
