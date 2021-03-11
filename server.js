const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.get('/users', (req, res) => {
    res.json(rooms);
});

io.on('connection', socket => {
    console.log('user connected');
});

server.listen(3000, (err) => {
    if (err) throw new Error(err);
    console.log('Server has been started...');
});
