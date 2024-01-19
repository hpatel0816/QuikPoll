const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const secrets = require('./secrets.json');

const port = 3001;
const app = express();
//const db_uri = secrets['mongo-db'].URI;

app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`,
        methods: ["GET", "POST"]
    },
});

const polls = {};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create-poll", (data) => {
        const pollId = uuidv4();
        polls[pollId] = {
            creator: socket.id,
            topic: data['topic'],
            options: data['options'],
            active: true,
        };
        io.emit('started', { pollId, data })
    })

    socket.on("join-poll", (joinCode) => {
        if (joinCode in polls) {
            io.emit('joined-poll', polls[joinCode]);
        } else {
            io.emit('error', 'The join is code is invalid. Try again.');
        }
    })

    socket.on("vote", (data) => {
        socket.emit("poll-update", data);
    })

})

app.get('/', function (req, res) {
    res.send('This is the main page.')
})


server.listen(port, () => {
    console.log(`The backend server is running at http://localhost:${port}`);
})