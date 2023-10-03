import MatchModel from '../models/MatchModel';
import { IMatch } from '../interfaces/match/IMatch';
import { IMatchModel } from '../interfaces/match/IMatchModel';
import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findByProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.update({ id, homeTeamGoals, awayTeamGoals });
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }
}
