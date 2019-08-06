// Resolve database model
const models = require('../models');
const Poll = models.Poll;

// Get response module
const Responser = require('../utils/responser');

const create = (req, res) => {
    Poll
        .create(req.body)
        .then(result => {
            return Responser.create(res, 0, result);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const getAll = (req, res) => {
    Poll
        .findAll()
        .then(polls => {
            return Responser.create(res, 0, polls);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const getById = (req, res) => {
    Poll
        .findByPk(req.params.id)
        .then(poll => {
            return Responser.create(res, 0, poll);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const deleteById = (req, res) => {
    Poll
        .destroy({where: {id: req.params.id}})
        .then(result => {
            let responseCode = 0;

            if (result === 0) {
                responseCode = -2;
            }

            return Responser.create(res, responseCode, []);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

module.exports = {getAll, getById, deleteById, create};