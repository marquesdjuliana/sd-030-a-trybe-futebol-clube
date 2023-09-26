import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teams } from './teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  beforeEach(sinon.restore);
  it('should return a list of teams', async () => {
    const { status, body } = await chai.request(app).get('/teams').send(teams);
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams)
  });
 
 

});
