const router = require('express').Router();
const pollService = require('../services/polls');

router.get('/', (req, res) => {
    pollService
    .getAll(req, res);
});

module.exports = router;