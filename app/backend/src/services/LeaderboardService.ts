import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboadServices {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  async getTeamsLeaderboard() {
    const teamLeaderboard = await this.leaderboardModel.getTeamsLeaderboard();
    return { status: 'SUCCESSFUL', data: teamLeaderboard };
  }
}
