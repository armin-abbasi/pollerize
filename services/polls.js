const models = require('../models');
const Poll = models.Poll;

let response = {code: 0, message: 'completed successfully', data: []};
// Handling error responses
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
            return res.json(response);
        })
        .catch(err => {
            return res.json(handleErrors(err, response));
        });
};

const getById = (req, res) => {
    Poll
        .findByPk(req.params.id)
        .then(poll => {
            response.data = poll;
            return res.json(response);
        }).catch(err => {
            return res.json(handleErrors(err, response));
        });
};

module.exports = {getAll, getById};