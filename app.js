const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const index = require('./routes/index');
const list = require('./routes/list');
const docs = require('./routes/docs');

const port = process.env.PORT || 1337;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Ett annat sätt att uppnå samma funktionalitet med parsing
//finns numer tillgängligt direkt i express.
//app.use(express.json());

//cross-origin resource sharing, to consume our api from
//clients in other domains
app.use(cors());

//middleware, morgan for logging
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

//event-listener to check for connections
io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat
});

io.on('connection', (client) => {
    client.on('client-event', (docContent) => {
        console.log(docContent);
    });
});

app.use('/', index);
app.use('/list', list);
app.use('/docs', docs);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

const server = httpServer.listen(port, () => {
    console.log('API listening on port ' + port);
});

module.exports = server;
