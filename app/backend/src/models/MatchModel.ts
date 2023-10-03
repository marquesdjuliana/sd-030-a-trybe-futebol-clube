import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../interfaces/match/IMatch';
import { IMatchModel } from '../interfaces/match/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbResults = await this.model.findAll(
      {
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ],
      },
    );
    return dbResults.map((match) => match);
  }

  async findByProgress(inProgress: boolean): Promise<IMatch[]> {
    const dbResults = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbResults.map((match) => match);
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
