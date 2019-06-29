const models = require('../models');
const Poll = models.Poll;

const getAll = () => {
    Poll.findAll().then(polls => console.log(polls));
};

module.exports = {getAll};