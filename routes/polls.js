const router = require('express').Router();
const pollService = require('../services/polls');
const { authenticate } = require('../middlewares/authentication');
const { check, validationResult } = require('express-validator');
const Responser = require('../utils/responser');

router.use(authenticate);

router.post('/', [
    check('userId').isNumeric().not().isEmpty(),
    check('question').isString().not().isEmpty(),
    check('expiresAt').isString()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Responser.create(res, -6, errors.array());
    }

    pollService
        .create(req, res);
});

router.get('/', (req, res) => {
    pollService
        .getAll(req, res);
});

router.get('/:id', (req, res) => {
    pollService
        .getById(req, res);
});

router.delete('/:id', (req, res) => {
    pollService
        .deleteById(req, res);
});

module.exports = router;