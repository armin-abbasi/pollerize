const models = require('../models');
const User = models.User;
const Response = require('../utils/responser');

class Users {

    static create(req, res) {
        // Hash the entered password
        let input = req.body;
        input.password = User.generateHash(input.password);

        User
            .create(input)
            .then(result => {
                return Response.create(res, 0, result);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    static getAll(req, res) {
        User
            .findAll()
            .then(Users => {
                return Response.create(res, 0, Users);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    static getById(req, res) {
        User
            .findByPk(req.params.id)
            .then(User => {
                return Response.create(res, 0, User);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    static update(req, res) {
        User
            .findByPk(req.params.id)
            .then(User => {
                User.update(req.body)
                    .then(updatedItem => {
                        return Response.create(res, 0, updatedItem);
                    })
                    .catch(err => {
                        return Response.create(res, -1, err)
                    });
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

    static deleteById(req, res) {
        User
            .destroy({where: {id: req.params.id}})
            .then(result => {
                let responseCode = 0;

                if (result === 0) {
                    responseCode = -2;
                }

                return Response.create(res, responseCode, []);
            })
            .catch(err => {
                return Response.create(res, -1, err);
            });
    }

}

module.exports = Users;