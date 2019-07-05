const models = require('../models');
const Poll = models.Poll;

const getAll = () => {
    return Poll.findAll();
};

module.exports = {getAll};