process.env.NODE_ENV = 'test';
let app = require('../app');
let chai = require('chai');
let should = chai.should;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

// API tests for users service module.

describe('Get users', () => {
    it('it should return all of users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body).to.be.a('object');
                chai.expect(res.body.code).to.be.equal(0);
            done();
          });
    });
});