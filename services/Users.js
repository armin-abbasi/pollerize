const BaseService = require('./Base');
const models = require('../models');
const User = models.User;
const Response = require('../utils/responser');

class Users extends BaseService {

    constructor() {
        super(User);
    }

    create(req, res) {
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

}

module.exports = Users;