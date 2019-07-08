const models = require('../models');
const Poll = models.Poll;

let response = {code: 0, message: 'success', data: []};
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
            let success = response;

            success.data = polls;
            return res.json(success);
        })
        .catch(err => {
            return res.json(handleErrors(err, response));
        });
};

const getById = (req, res) => {
    Poll
        .findByPk(req.params.id)
        .then(poll => {
            let success = response;

            success.data = poll;
            return res.json(success);
        })
        .catch(err => {
            return res.json(handleErrors(err, response));
        });
};

const deleteById = (req, res) => {
    Poll
        .destroy({where: {id: req.params.id}})
        .then(result => {
            let success = response;

            if (result === 0) {
                success.message = 'item not found';
                success.code = -2;
            }

            return res.json(success);
        })
        .catch(err => {
            return res.json(handleErrors(err, response));
        });
};

module.exports = {getAll, getById, deleteById};