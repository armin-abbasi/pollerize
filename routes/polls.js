const router = require('express').Router();
const pollService = require('../services/polls');
let response = {code: 0, message: 'completed successfully', data: []};

const handleErrors = (err, response) => {
    response.code = -1;
    response.data = [];
    response.message = (process.env.DEBUG === true) ? err.message : 'operation failed!';

    return response;
};

router.get('/polls', (req, res) => {
    pollService
    .getAll()
    .then(polls => {
        response.data = polls;

        return res.json(response);
    })
    .catch(err => {
      return res.json(handleErrors(err, response));
    });
});

module.exports = router;