const router = require('express').Router();
const userService = require('../services/users');

router.post('/', (req, res) => {
    userService
        .create(req, res);
});

router.get('/', (req, res) => {
    userService
        .getAll(req, res);
});

router.get('/:id', (req, res) => {
    userService
        .getById(req, res);
});

router.delete('/:id', (req, res) => {
    userService
        .deleteById(req, res);
});

module.exports = router;