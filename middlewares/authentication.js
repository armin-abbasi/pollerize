const JWT = require('jsonwebtoken');
const Responser = require('../utils/responser');
const secret = require('../config/app.json').secret;

module.exports.authenticate = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        return Responser.create(res, -3, []);
    }
    
    // Authenticate the user
    const token = req.headers.authorization.split(' ')[1];

    try {
        const user = JWT.verify(token, secret);
        
        // Assign user info to request body
        req.body.user = user;
        
        return next();
    } catch (err) {
        // Invalid token exception
        return Responser.create(res, -3, err);
    }
}