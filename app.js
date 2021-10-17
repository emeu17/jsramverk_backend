const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        // origin: "*",
        origin: "http://www.student.bth.se",
        methods: ["GET", "POST"]
    }
});

const visual = false;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");

const index = require('./routes/index');
const list = require('./routes/list');
const docs = require('./routes/docs');
const auth = require("./routes/auth.js");
const mail = require("./routes/mail.js");
const authMod = require("./models/auth.js");

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

// let lastRoomId;

io.on('connection', (client) => {
    client.on('create', function(room) {
        // client.leave(lastRoomId);
        client.join(room);
        // lastRoomId = room;
        // console.log("Joined room: " + room);
    });

    client.on("doc", function (data) {
        // client.to(data["_id"]).emit("doc", data);
        client.to(data["_id"]).emit("doc", data);
        // console.log("emitting data: " + data["html"]);
    });

    client.on("leave", function(room) {
        client.leave(room);
    });
});


app.use('/', index);
app.use('/list', list);
app.use('/docs', docs);
app.use("/auth", auth);
app.use("/mail", mail);

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.post('/graphql',
    (req, res, next) => authMod.checkToken(req, res, next),
    graphqlHTTP({
        schema: schema,
        graphiql: visual,
}));

// app.use('/graphql',
//     graphqlHTTP({
//         schema: schema,
//         graphiql: visual,
// }));

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
