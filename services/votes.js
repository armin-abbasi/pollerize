const models = require('../models');
const Vote = models.Vote;
const Responser = require('../utils/responser');

const create = (req, res) => {
    let pollId = req.body.pollId;
    let answer = req.body.answer;
    let count = 0;
    
    Vote
        .create({
            pollId,
            answer,
            count
        })
        .then((result) => {
            return Responser.create(res, 0, result);
        })
        .catch((err) => {
            return Responser.create(res, -1, err);
        });
};

const deleteById = (req, res) => {
    Vote
        .destroy({where: {id: req.params.id}})
        .then(result => {
            let responseCode = 0;

            if (result === 0) {
                responseCode = -2;
            }

            return Responser.create(res, responseCode, []);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const poll = (req, res) => {

};

const unPoll = (req, res) => {

};

module.exports = {create, poll, unPoll, delete: deleteById};