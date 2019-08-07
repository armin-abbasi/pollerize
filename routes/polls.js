const router = require('express').Router();
const pollService = require('../services/polls');
const authMiddleware = require('../middlewares/authentication').check;

router.use(authMiddleware);

router.post('/', (req, res) => {
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