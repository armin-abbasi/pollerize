process.env.NODE_ENV = 'test';
let app = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

// API tests for users service module.

describe('Get users', () => {
    it('should return all of users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.code).to.be.equal(0);
                done();
            });
    });
});

describe('Create user', () => {
    it('should create a user successfully', (done) => {
        let user = {
            "name": "John Doe",
            "username": "john.doe",
            "password": "abcd",
            "gender": "male",
            "dob": "1990-06-15",
            "location": "iran/tehran",
            "active": true
        };

        chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body.data.name).to.be.equal(user.name);
                expect(res.body.data.username).to.be.equal(user.username);
                done();
            });
    });
})