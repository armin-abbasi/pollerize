const models = require('../models');
const Vote = models.Vote;
const UserVote = models.UserVote;
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
    let voteId = req.body.voteId;
    let userId = req.body.user.id;

    Vote
        .findByPk(voteId)
        .then(Vote => {
            console.log(`voteID : ${voteId} and userId : ${userId}`);
            // process.exit(-1);
            UserVote
                .findAll({where: {voteId: Vote.id, userId}})
                .then(UserVote => {
                    // Each user can vote once
                    if (UserVote.length !== 0) {
                        return Responser.create(res, -1, {message: "You've voted before"});
                    }
                })
                .catch(err => {
                    return Responser.create(res, -1, err);
                });

            // Add this vote's count value and update
            let count = ++Vote.count;

            Vote
                .update({count: count})
                .then(updatedItem => {
                    // Continue
                })
                .catch(err => {
                    return Responser.create(res, -1, err);
                });
            
            // Insert into UserVotes table
            UserVote
                .create({userId,voteId})
                .then(result => {
                    return Responser.create(res, 0, result);
                })
                .catch(err => {
                    return Responser.create(res, -1, err);
                })
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const unPoll = (req, res) => {

};

module.exports = {create, poll, unPoll, delete: deleteById};