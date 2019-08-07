const router = require('express').Router();
const userService = require('../services/users');
const authService = require('../services/auth');

// User CRUD routes
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

router.put('/:id', (req, res) => {
    userService
        .update(req, res);
});

router.delete('/:id', (req, res) => {
    userService
        .deleteById(req, res);
});

// User authentication routes
router.post('/sign-in', (req, res) => {
    authService
        .signIn(req, res);
});

module.exports = router;