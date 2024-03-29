const router = require('express').Router();
const { authenticate } = require('../middlewares/authentication');
const { check, validationResult } = require('express-validator');
const Response = require('../utils/responser');

const Vote = require('../services/Votes');
const voteService = new Vote();

router.use(authenticate);

router.get('/', (req, res) => {
    voteService
        .getAll(req, res);
});

router.post('/', [
    check('pollId').isNumeric().not().isEmpty(),
    check('answer').isString().not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Response.create(res, -6, errors.array());
    }

    voteService
        .create(req, res);
});

router.delete('/:id', (req, res) => {
    voteService
        .deleteById(req, res);
});

router.post('/poll', [
    check('voteId').isNumeric().not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Response.create(res, -6, errors.array());
    }

    voteService
        .poll(req, res);
});

router.post('/un-poll', [
    check('voteId').isNumeric().not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Response.create(res, -6, errors.array());
    }

    voteService
        .unPoll(req, res);
});

module.exports = router;