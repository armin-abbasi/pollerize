process.env.NODE_ENV = 'test';
let app = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Get users', () => {
    it('it should return all of users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                console.log(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});