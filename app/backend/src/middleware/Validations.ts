import { RequestHandler, Response } from 'express';
import authenticateToken from '../utils/authenticateToken';
import { RequestWithRole } from '../interfaces/user/IUser';
import MatchModel from '../models/MatchModel';

class Validations {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    const defaultEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const defaultPassword = typeof password === 'string' && password.length < 6;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    if (defaultPassword || !defaultEmail.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static validateToken: RequestHandler = (req, res, next): Response | void => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = authorization.split(' ')[1];
    const role = authenticateToken.decodeToken(token);

    if (!role) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    (req as RequestWithRole).role = role;
    next();
  };

  static validateMatch: RequestHandler = async (req, res, next): Promise<Response | void> => {
    const { homeTeamId, awayTeamId } = req.body;

    const model = new MatchModel();
    const [homeTeam, awayTeam] = await Promise.all([
      model.findById(Number(homeTeamId)),
      model.findById(Number(awayTeamId)),
    ]);

    if (awayTeamId === homeTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };
}

export default Validations;
