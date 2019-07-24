const router = require('express').Router();
const userService = require('../services/users');
const authService = require('../services/auth');

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

// user authentication routes
router.post('/login', (req, res) => {
    authService
        .login(req, res);
});

module.exports = router;