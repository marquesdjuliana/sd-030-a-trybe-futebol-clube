import { ITeam } from '../../../Interfaces/Team/ITeam';
import { ITeamModel } from '../../../Interfaces/Team/ITeamModel';
import SequelizeTeam from './SequelizeTeam';

export default class BookModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
