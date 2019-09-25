const JWT = require('jsonwebtoken');
const Response = require('../utils/responser');
const secret = require('../config/app.json').secret;

module.exports.authenticate = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        return Response.create(res, -3, []);
    }
    
    // Authenticate the user
    const token = req.headers.authorization.split(' ')[1];

    try {
        // Assign user info to request body
        req.body.user = JWT.verify(token, secret);

        return next();
    } catch (err) {
        // Invalid token exception
        return Response.create(res, -3, err);
    }
};