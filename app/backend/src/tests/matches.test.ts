import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { matches } from './matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';


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

});