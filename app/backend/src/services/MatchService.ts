import MatchModel from '../models/MatchModel';
import { IMatch } from '../interfaces/match/IMatch';
import { IMatchModel } from '../interfaces/match/IMatchModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}
