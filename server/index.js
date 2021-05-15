const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const router = require('./router');
const { v4: uuIdV4 } = require('uuid')

const PORT = process.env.PORT || 5000;

const socket = io(PORT)

/* app.use(router);
*/

app.get('/', (req,res) => {
  res.redirect(`/${uuIdV4()}`)
});

app.get('/:room', (req, res) => {
  res.render('room', {roomId: req.params.room})
});

io.on('connection', (socket) => {
  console.log('a user connected', (gameId, userId) => {
    console.log(gameId, userId)
  });

  socket.on('disconnect', () => {
      console.log('User has left');
  })
});


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default socket;