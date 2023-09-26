import TeamModel from '../database/models/Team/TeamModel';
import { ITeam } from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
