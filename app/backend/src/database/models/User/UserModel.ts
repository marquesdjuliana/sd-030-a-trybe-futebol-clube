import SequelizeUser from './SequelizeUser';
import { IUser } from '../../../interfaces/user/IUser';
import { IUserModel } from '../../../interfaces/user/IUserModel';

export default class UserModelAdapter implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map((user) => user.toJSON());
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user.toJSON();
  }
}
