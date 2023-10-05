import { ILeaderboard } from '../interfaces/leaderboard/ILeaderboard';
import { IMatch } from '../interfaces/match/IMatch';
import MatchesModel from './MatchModel';
import TeamsModel from './TeamModel';

export default class LeaderboardModel {
  private readonly matchesModel = new MatchesModel();
  private readonly teamsModel = new TeamsModel();

  static filterGames(games: IMatch[], type: 'victories' | 'losses' | void): number {
    return games.reduce((count, game) => {
      const isVictory = type === 'victories' && game.homeTeamGoals > game.awayTeamGoals;
      const isLoss = type === 'losses' && game.homeTeamGoals < game.awayTeamGoals;
      const isDraw = type !== 'victories'
        && type !== 'losses' && game.homeTeamGoals === game.awayTeamGoals;
      return count + (isVictory || isLoss || isDraw ? 1 : 0);
    }, 0);
  }

  static calculatePointsAndResults(games: IMatch[]) {
    const totalVictories = LeaderboardModel.filterGames(games, 'victories');
    const totalDraws = LeaderboardModel.filterGames(games);
    const totalLosses = LeaderboardModel.filterGames(games, 'losses');
    return {
      totalPoints: (totalVictories * 3) + totalDraws,
      totalGames: games.length,
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  static calculateGoals(games: IMatch[], type: 'favor' | 'own'): number {
    return games.reduce((totalGoals, game) => {
      const goals = type === 'favor' ? game.homeTeamGoals : game.awayTeamGoals;
      return totalGoals + goals;
    }, 0);
  }

  async getTeamsLeaderboard(): Promise<ILeaderboard[]> {
    const matches = await this.matchesModel.findAll();
    const teams = await this.teamsModel.findAll();
    const finishedMatches = matches.filter(({ inProgress }) => inProgress === false);

    const teamLeaderboard = teams.map(({ id, teamName }) =>
      LeaderboardModel.calculateTeamStats(id, teamName, finishedMatches));

    return LeaderboardModel.sortLeaderboard(teamLeaderboard);
  }

  static calculateTeamStats(id: number, teamName: string, finishedMatches: IMatch[]) {
    const games = finishedMatches.filter(({ homeTeamId }) => homeTeamId === id);
    const pointsAndResults = LeaderboardModel.calculatePointsAndResults(games);
    const goalsFavor = LeaderboardModel.calculateGoals(games, 'favor');
    const goalsOwn = LeaderboardModel.calculateGoals(games, 'own');
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = (pointsAndResults.totalGames > 0)
      ? ((pointsAndResults.totalPoints / (pointsAndResults.totalGames * 3)) * 100).toFixed(2)
      : '0.00';

    return {
      name: teamName,
      ...pointsAndResults,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  static sortLeaderboard(leaderboard: ILeaderboard[]) {
    return leaderboard.sort((team1, team2) =>
      team2.totalPoints - team1.totalPoints
      || team2.totalVictories - team1.totalVictories
      || team2.goalsBalance - team1.goalsBalance
      || team2.goalsFavor - team1.goalsFavor);
  }
}
