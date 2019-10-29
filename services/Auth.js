const models = require('../models');
const User = models.User;
const Response = require('../utils/responser');
const JWT = require('jsonwebtoken');
const secret = require('../config/app.json').secret;

const signIn = (req, res) => {
    let input = req.body;

    User
        .findOne({where: {username: input.username}})
            .then(User => {
                // Invalid username or password
                if (!User || User.validPassword(input.password) !== true) {
                    return Response.create(res, -5, []);
                }
                
                // Generate json web token
                let token = JWT.sign(JSON.stringify(User), secret);
                
                return Response.create(res, 3, {token});
            })
            .catch(err => {
                console.log(err);
                return Response.create(res, -1, err);
            });
};

module.exports = {signIn};