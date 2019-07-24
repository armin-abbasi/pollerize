const models = require('../models');
const User = models.User;
const Responser = require('../utils/responser');

const login = (req, res) => {
    let input = req.body;
    User
        .findOne({where: {username: input.username}})
        .then(User => {
            if (User.validPassword(input.password) !== true) {
                Responser.create(res, -5, []);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {login};