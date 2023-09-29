import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser';
import { missingUsernameLogin, missingPasswordLogin, validLogin, validLoginDB } from './user.mock';
import TokenService from '../utils/authenticateToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('User test', () => {
  beforeEach(() => sinon.restore());

  it('should successfully log in with valid credentials', async function() {
    const result = SequelizeUser.build(validLoginDB);
    sinon.stub(SequelizeUser, 'findOne').resolves(result);

    const { status, body } = await chai.request(app).post('/login').send(validLogin);

    expect(status).to.be.equal(200)
    expect(body).to.have.property('token');
  });
  it('should return bad request if username is missing', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(missingUsernameLogin);

    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: "All fields must be filled" });
  });
  it('should return bad request if password is missing', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(missingPasswordLogin);

    expect(status).to.be.equal(400)
    expect(body).to.be.deep.eq({ message: "All fields must be filled" });
  });

  it('should return status 401 when token is not found', async () => {
   sinon.stub(TokenService, 'decodeToken').returns(null);
    const res = await chai.request(app).get('/login/role');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.eq({ message: 'Token not found' });

  });
  it('should return status 401 when token is invalid', async () => {
    sinon.stub(TokenService, 'decodeToken').returns(null);
    const res = await chai.request(app).get('/login/role').set('Authorization', 'Bearer xxxxxxxxxxxx');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.eq({ message: 'Token must be a valid token' });

  });
  // it('should decode a valid token', async () => {
  //     sinon.stub(TokenService, "decodeToken").resolves({ role: "" });

  //     const { status, body } = await chai.request(app)
  //       .get('/login/role')
  //       .set('Authorization', 'tokenvalido')

  //     expect(status).to.equal(200);
  //     expect(body).to.have.property('role');
  //     console.log(body)
  // });
})
