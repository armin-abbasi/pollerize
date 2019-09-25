const router = require('express').Router();
const authService = require('../services/Auth');
const { check, validationResult } = require('express-validator');
const Response = require('../utils/responser');

const User = require('../services/Users');
const userService = new User();

// User CRUD routes
router.post('/', [
    check('name').isString().not().isEmpty(),
    check('username').isString().not().isEmpty(),
    check('password').isString().not().isEmpty(),
    check('gender').isString().not().isEmpty(),
    check('dob').isString().not().isEmpty(),
    check('location').isString().not().isEmpty(),
    check('active').isBoolean()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Response.create(res, -6, errors.array());
    }
    
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

router.put('/:id', [
    check('name').optional().isString(),
    check('username').optional().isString(),
    check('password').optional().isString(),
    check('gender').optional().isString(),
    check('dob').optional().isString(),
    check('location').optional().isString(),
    check('active').optional().isBoolean()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return Response.create(res, -6, errors.array());
    }
    
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