const router = require('express').Router();
const voteService = require('../services/votes');
const authMiddleware = require('../middlewares/authentication');

router.use(authMiddleware.check);

router.post('/:pollId/poll', (req, res) => {

});

router.post('/:pollId/un-poll', (req, res) => {
    
});

module.exports = router;