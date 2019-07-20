// Resolve database model
const models = require('../models');
const User = models.User;

// Get response module
const Responser = require('../utils/responser');

const create = (req, res) => {
    User
        .create(req.body)
        .then(result => {
            Responser.create(res, 0, result);
        })
        .catch(err => {
            Responser.create(res, -1, err);
        });
};

const getAll = (req, res) => {
    User
        .findAll()
        .then(Users => {
            Responser.create(res, 0, Users);
        })
        .catch(err => {
            Responser.create(res, -1, err);
        });
};

const getById = (req, res) => {
    User
        .findByPk(req.params.id)
        .then(User => {
            Responser.create(res, 0, User);
        })
        .catch(err => {
            Responser.create(res, -1, err);
        });
};

const deleteById = (req, res) => {
    User
        .destroy({where: {id: req.params.id}})
        .then(result => {
            let responseCode = 0;

            if (result === 0) {
                responseCode = -2;
            }

            Responser.create(res, responseCode, []);
        })
        .catch(err => {
            Responser.create(res, -1, err);
        });
};

module.exports = {getAll, getById, deleteById, create};