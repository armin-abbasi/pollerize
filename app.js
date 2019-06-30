const server = require('express')();
const config = require('./config/app');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = config.port || 3000;

server.use(bodyParser.json({ type: 'application/json' }));

server.use('/', routes);

server.listen(port, () => {
    console.log(`app listening to port ${port}`);
});