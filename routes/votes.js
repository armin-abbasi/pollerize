const router = require('express').Router();
const voteService = require('../services/votes');
const { check } = require('../middlewares/authentication');

router.use(check);

router.post('/', (req, res) => {
    voteService
        .create(req, res);
});

router.delete('/:vodeId', (req, res) => {
    voteService
        .delete(req, res);
});

router.post('/poll', (req, res) => {
    voteService
        .poll(req, res);
});

router.post('/un-poll', (req, res) => {
    voteService
        .unPoll(req, res);
});

module.exports = router;