const Responser = require('../utils/responser');

module.exports.check = (err, req, res, next) => {
    if (err) {
        return Responser.create(res, -1, err);
    }

    return next();
};