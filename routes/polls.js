const router = require('express').Router();
const pollService = require('../services/polls');

router.get('/', (req, res) => {
    pollService
        .getAll(req, res);
});

router.get('/:id', (req, res) => {
    pollService
        .getById(req, res);
});

module.exports = router;