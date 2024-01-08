const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
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

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create-poll", (data) => {
        console.log(data);
    })
})

app.get('/', function (req, res) {
    res.send('This is the main page.')
})

app.post('/create', function (req, res) {
    const creator = req.body.creator;
    const topic = req.body.topic;
    const options = req.body.options;
})

server.listen(port, () => {
    console.log(`The backend server is running at http://localhost:${port}`);
})