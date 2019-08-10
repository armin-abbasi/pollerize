const router = require('express').Router();
const voteService = require('../services/votes');
const authMiddleware = require('../middlewares/authentication');

router.use(authMiddleware.check);

router.post('/', (req, res) => {
    voteService
        .create(req, res);
});

router.delete('/:vodeId', (req, res) => {
    voteService
        .delete(req, res);
});

router.post('/:pollId/poll', (req, res) => {
    
});

router.post('/:pollId/un-poll', (req, res) => {
    
});

module.exports = router;