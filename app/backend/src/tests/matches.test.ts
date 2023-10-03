import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { matches } from './matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import TokenService from '../utils/authenticateToken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  beforeEach(sinon.restore);

  it('Should return all matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
   
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches)
  });
  it('Should return matches by progress', async () => {
    const inProgress = true; 
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get(`/matches?inProgress=${inProgress}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Should finish a match with valid token', async () => {
    const matchId = 1;
    const token = TokenService.generateToken({ id: 1 }); 

    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    sinon.stub(TokenService, 'decodeToken').returns({ id: 1 });

    const { status, body } = await chai.request(app)
      .patch(`/matches/${matchId}/finish`) 
      .set('Authorization', `Bearer ${token}`) 
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 }); 

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });
  it('Should return 401 with invalid token', async () => {
    const matchId = 1;
    const invalidToken = 'token_invalido';

    const { status, body } = await chai.request(app)
      .patch(`/matches/${matchId}/finish`)
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

});