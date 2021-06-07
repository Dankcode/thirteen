const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})



const PORT = process.env.PORT || 8000;


/* 
const router = require('./router');

const socket = io(PORT)

app.use(router);
*/
/*
IS NOT CONNECTING TO CLIENT 
no socket.id messages being displayed
*/
io.on('connection', (socket) => {
  console.log('user has joined ' + socket.id);

})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
