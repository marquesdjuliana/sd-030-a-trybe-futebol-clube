import { Request, Response } from 'express';
import LeaderboadServices from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardServices = new LeaderboadServices(),
  ) { }

  async getTeamsLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardServices.getTeamsLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
