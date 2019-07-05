const models = require('../models');
const Poll = models.Poll;

// Handling responses
let response = {code: 0, message: 'completed successfully', data: []};
const handleErrors = (err, response) => {
    response.code = -1;
    response.data = [];
    response.message = (process.env.DEBUG === true) ? err.message : 'operation failed!';

    return response;
};

const getAll = (req, res) => {
    Poll
        .findAll()
        .then(polls => {
            response.data = polls;
            res.json(response).end();
        })
        .catch((err => {
            handleErrors(err, response);
        }));
};

module.exports = {getAll};