const app = require('express')();
const cors = require('cors');
const config = require('./config/app');
const pollRoutes = require('./routes/polls');
const userRoutes = require('./routes/users');
const voteRoutes = require('./routes/votes');
const bodyParser = require('body-parser');
const { check } = require('./middlewares/handler');
const port = config.port || 3000;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/polls', pollRoutes);

app.use('/users', userRoutes);

app.use('/votes', voteRoutes);

app.use(check);

app.listen(port, () => {
    console.log(`app listening to port ${port}`);
});

module.exports = app;