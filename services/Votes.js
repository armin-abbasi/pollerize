const BaseService = require('./Base');
const models = require('../models');
const Vote = models.Vote;
const UserVote = models.UserVote;
const Response = require('../utils/responser');

class Votes extends BaseService {

    constructor() {
        super(Vote);
    }

    /**
     * Save user's poll
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async poll(req, res) {
        let voteId = req.body.voteId;
        let userId = req.body.user.id;
        try {
            let PollVote = await Vote.findByPk(voteId);
            let foundVotes = await UserVote.findAll({where: {voteId: PollVote.id, userId}});
            if (foundVotes.length !== 0) {
                return Response.create(res, -1, {message: "You've voted before"});
            }
            // Increase vote count by one unit.
            let count = ++PollVote.count;
            let updatedItem = await PollVote.update({count});
            let result = await UserVote.create({userId, voteId});
            // Return final result as success message
            return Response.create(res, 0, result);
        } catch (err) {
            return Response.create(res, -1, err);
        }
    };

    /**
     * Delete a user's poll
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async unPoll(req, res) {
        let voteId = req.body.voteId;
        let userId = req.body.user.id;
        try {
            let deleteResult = await UserVote.destroy({where: {voteId, userId}});
            if (deleteResult) {
                let pollVote = await Vote.findByPk(voteId);
                // Decrease vote count by one unit.
                let count = pollVote.count > 0 ? --pollVote.count : 0;
                let updatedItem = await pollVote.update({count});
                return Response.create(res, 0, updatedItem);
            }
            return Response.create(res, -1, []);
        } catch (err) {
            return Response.create(res, -1, err);
        }
    };

}


module.exports = Votes;