const models = require('../models');
const User = models.User;
const Responser = require('../utils/responser');

const login = (req, res) => {
    let input = req.body;
    User
        .findOne({where: {username: input.username}})
        .then(User => {
            // Invalid username or password
            if (User.validPassword(input.password) !== true) {
                Responser.create(res, -5, []);
            }

            Responser.create(res, 3, []);
        })
        .catch(err => {
            console.log(err);
            Responser.create(res, -1, err);
        });
};

module.exports = {login};