const express = require('express');
require('express-async-errors');
const getPort = require('get-port');
const bodyParser = require('body-parser');
const bot = require('./controllers/bot_router.js');

const app = express();

const defaultPort = Number(process.env.PORT || 5000);

// json bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '512mb'}));


// routes
app.post('/', bot.respond());

app.get('/health', (req, res) => {
    res.send('Ok');
});

getPort(defaultPort).then((port) => {
    app.listen(port, async () => {
        console.log(`listening on port ${port}`);
        if (process.env.NODE_ENV === 'development') {
            console.log(`Navigate to http://localhost:${port} to use the application`); // eslint-disable-line no-console
        }
    });
});

module.exports = app;
