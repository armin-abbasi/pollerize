const router = require('express').Router();
const models = require('./models');

router.get('/', (req, res) => {
    models.User.findAll({include: [{model: models.Poll}]}).then(users => res.send(users));
});

module.exports = router;