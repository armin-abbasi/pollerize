const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('main route');
});

module.exports = router;