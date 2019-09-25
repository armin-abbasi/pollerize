const BaseService = require('./Base');

// Resolve database model
const models = require('../models');
const Poll = models.Poll;

class Polls extends BaseService {

    constructor () {
        super(Poll)
    }
    
}

module.exports = Polls;