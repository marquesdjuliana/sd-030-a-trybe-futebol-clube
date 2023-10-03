import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findByProgress(inProgress: boolean): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
  findById(id: number): Promise<IMatch | null>;
  update(matchData: { id: number; homeTeamGoals: number; awayTeamGoals: number }): Promise<void>;
}
