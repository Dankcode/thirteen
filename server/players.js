
/**
 * Here is where we should register event listeners and emitters. 
 */

 var io
 var gameSocket
 // gamesInSession stores an array of all active socket connections
 var gamesInSession = []
 
 
 const initializeGame = (sio, socket) => {
     /**
      * initializeGame sets up all the socket event listeners. 
      */
 
     // initialize global variables.
     io = sio 
     gameSocket = socket 
 
     // pushes this socket to an array which stores all the active sockets.
     gamesInSession.push(gameSocket)

     gameSocket.on("new move", newMove)
 
     // Run code when the client disconnects from their socket session. 
     gameSocket.on("disconnect", onDisconnect)
 
     // Sends new move to the other socket session in the same room. 
     gameSocket.on("updateGameState", newMove)
 
     gameSocket.on("createNewGame", createNewGame)
 
     // User joins gameRoom after going to a URL with '/game/:gameId' 
     gameSocket.on("playerJoinGame", playerJoinsGame)
 
    // gameSocket.on('request username', requestUserName)
 
     //gameSocket.on('recieved userName', recievedUserName)
 
    
 }
 
function playerJoinsGame(idData) {
    var sock = this
     /*
     if (gamesInSession.map(i => i) !== idData.gameId) {
         this.emit('status' , console.log('no room'));
         return
     }
     else {
    */
    idData.mySocketId = sock.id;
        
    sock.join(idData.gameId);

    io.sockets.to(idData.gameId).emit('playerJoinedRoom', idData);

}

 
function createNewGame(gameId) {
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});
    this.join(gameId)
}
 
 
function newMove(move) {
     
    const gameId = move.gameId 
     
    io.to(gameId).emit('updateGameState', move, console.log(move));
}
 
function onDisconnect() {
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i, 1);
}
 
 /*
 function requestUserName(gameId) {
     io.to(gameId).emit('give userName', this.id);
 }
 
 function recievedUserName(data) {
     data.socketId = this.id
     io.to(data.gameId).emit('get Opponent UserName', data);
 }
 */
 exports.initializeGame = initializeGame