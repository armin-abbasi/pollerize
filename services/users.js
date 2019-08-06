const models = require('../models');
const User = models.User;
const Responser = require('../utils/responser');

const create = (req, res) => {
    // Hash the entered password
    let input = req.body;
    input.password = User.generateHash(input.password);

    User
        .create(input)
        .then(result => {
            return Responser.create(res, 0, result);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const getAll = (req, res) => {
    User
        .findAll()
        .then(Users => {
            return Responser.create(res, 0, Users);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const getById = (req, res) => {
    User
        .findByPk(req.params.id)
        .then(User => {
            return Responser.create(res, 0, User);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

const update = (req, res) => {
    User
        .findByPk(req.params.id)
        .then(User => {
            User.update(req.body)
                .then(updatedItem => {
                    return Responser.create(res, 0, updatedItem);
                })
                .catch(err => { return Responser.create(res, -1, err) });
        })
        .catch(err => {
            return Responser.create(res, -1, err);
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

            return Responser.create(res, responseCode, []);
        })
        .catch(err => {
            return Responser.create(res, -1, err);
        });
};

module.exports = {getAll, getById, deleteById, create, update};