const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const gameLogic = require('./players')

const socketio = require('socket.io');
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})



const PORT = process.env.PORT || 8000;
/*
io.on('connection', (socket) => {
  console.log('user has joined ' + socket.id);
  
  socket.on('join', (room, callback) => {
    socket.join(room)
    callback(`Joined ${room}`)
    
  })


  
 })
 */
 io.on('connection', client => {
  gameLogic.initializeGame(io, client)
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
