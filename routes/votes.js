const router = require('express').Router();
const voteService = require('../services/votes');
const authMiddleware = require('../middlewares/authentication');

router.use(authMiddleware.check);

