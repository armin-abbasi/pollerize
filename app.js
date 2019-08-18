const app = require('express')();
const config = require('./config/app');
const pollRoutes = require('./routes/polls');
const userRoutes = require('./routes/users');
const voteRoutes = require('./routes/votes');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/handler');
const port = config.port || 3000;

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/polls', pollRoutes);

app.use('/user', userRoutes);

app.use('/votes', voteRoutes);

app.use(errorHandler.check);

app.listen(port, () => {
    console.log(`app listening to port ${port}`);
});