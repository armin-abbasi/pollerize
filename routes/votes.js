const router = require('express').Router();
const voteService = require('../services/votes');
const { authenticate } = require('../middlewares/authentication');
const { check, validationResult } = require('express-validator');
const Response = require('../utils/responser');

router.use(authenticate);

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

router.delete('/:vodeId', (req, res) => {
    voteService
        .delete(req, res);
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