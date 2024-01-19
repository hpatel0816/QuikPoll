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

const printPolls = () => {
    console.log(Object.keys(polls).length);
}

const generateJoinCode = () => {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};


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

    socket.on("join-poll", (joinCode, socket) => {
        if (joinCode in polls) {
            socket.emit('joined-poll');
        } else {
            socket.emit('error', 'The join is code is invalid. Try again.');
        }
    })

    socket.on("vote", (data) => {
        socket.emit("poll-update");
    })

})

app.get('/', function (req, res) {
    res.send('This is the main page.')
})


server.listen(port, () => {
    console.log(`The backend server is running at http://localhost:${port}`);
})