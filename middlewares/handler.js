const Response = require('../utils/responser');

module.exports.check = (err, req, res, next) => {
    if (err) {
        return Response.create(res, -1, err);
    }

    return next();
};