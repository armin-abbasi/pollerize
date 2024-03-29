process.env.NODE_ENV = 'test';
let app = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);

// API tests for polls service module.

createUser = () => {
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
        });
};

getToken = (callback) => {
    createUser();
    chai.request(app)
        .post('/users/sign-in')
        .send({
            username: "john.doe",
            password: "abcd"
        })
        .end((err, res) => {
                if (err) throw err;
                callback(res.body.data.token);
            }
        );
};

describe('Get polls', () => {
    it('should return all of polls', (done) => {
        getToken((token) => {
            chai.request(app)
                .get('/polls')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.code).to.be.equal(0);
                    done();
                });
        });
    });
});

describe('Create Poll', () => {
    it('should create a poll successfully', (done) => {
        let poll = {
            "userId": 1,
            "question": "Whos gonna win on election 2020?",
            "expiresAt": "2019-07-09"
        };

        getToken((token) => {
            chai.request(app)
                .post('/polls')
                .set('Authorization', `Bearer ${token}`)
                .send(poll)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.be.equal(200);
                    expect(res.body.code).to.be.equal(0);
                    done();
                });
        });
    });
});