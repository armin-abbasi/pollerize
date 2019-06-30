const router = require('express').Router();
const pollService = require('./services/polls');

router.get('/polls', (req, res) => {
    pollService
    .getAll()
    .then(polls => {
        res.send(polls);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;