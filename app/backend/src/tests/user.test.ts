import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { user } from './user.mock';
import SequelizeUser from '../database/models/User/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;


describe('Users Test', function() {

  it('should return a user by id', async function() {
    sinon.stub(SequelizeUser, 'findByPk').resolves(user as any);

    const { status, body } = await chai.request(app).get('/users/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(user);
  });

  afterEach(sinon.restore);
});
