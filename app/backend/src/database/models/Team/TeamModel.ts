import { ITeam } from '../../../interfaces/team/ITeam';
import { ITeamModel } from '../../../interfaces/team/ITeamModel';
import SequelizeTeam from './SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
