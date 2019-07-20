const server = require('express')();
const config = require('./config/app');
const pollRoutes = require('./routes/polls');
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const port = config.port || 3000;

server.use(bodyParser.json({ type: 'application/json' }));

server.use('/polls', pollRoutes);

server.use('/users', userRoutes);

server.listen(port, () => {
    console.log(`app listening to port ${port}`);
});