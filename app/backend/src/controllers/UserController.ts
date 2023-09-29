import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  // public async getUserRole(req: Request, res: Response): Promise<Response> {
  //   const { email } = req.body;
  //   const serviceResponse = await this.userService.getUserRoleByEmail(email);
  //   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  // }
}
