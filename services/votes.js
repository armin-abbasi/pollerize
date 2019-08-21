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

const poll = async(req, res) => {
    try {
        let voteId = req.body.voteId;
        let userId = req.body.user.id;

        let PollVote = await Vote.findByPk(voteId);
        
        let foundVotes = await UserVote.findAll({where: {voteId: PollVote.id, userId}});

        if (foundVotes.length !== 0) {
            return Responser.create(res, -1, {message: "You've voted before"});
        }

        // Add this vote's count value and update
        let count = ++PollVote.count;

        let updatedItem = await PollVote.update({count});

        let result = await UserVote.create({userId, voteId});

        // Return final result as success message
        return Responser.create(res, 0, result);
    } catch (err) {
        return Responser.create(res, -1, err);
    }
};

const unPoll = (req, res) => {
    let voteId = req.body.voteId;
    let userId = req.body.user.id;

    UserVote
        .destroy({where: {voteId, userId}})
        .then(result => {
            // Decrease vote's count number
            Vote
                .findByPk(voteId)
                .then(Vote => {
                    let count = Vote.count > 0 ? --Vote.count : 0;

                    Vote
                        .update({count})
                        .then(updatedItem => {
                            return Responser.create(res, 0, updatedItem);
                        })
                        .catch(err => {
                            return Responser.create(res, -1, err);
                        });
                })
                .catch(err => {
                    return Responser.create(res, -1, err);
                });
        })
        .catch(err => {
            return Responser.create(res, 1, err);
        });

    
};

module.exports = {create, poll, unPoll, delete: deleteById};