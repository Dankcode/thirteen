
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

     gameSocket.on("new move", newMove)
     gameSocket.on("new profile", newBuy)
     gameSocket.on("new item", shopItem)
 
     // Run code when the client disconnects from their socket session. 
     gameSocket.on("disconnect", onDisconnect)
 
     // Sends new move to the other socket session in the same room. 
     gameSocket.on("updateGameState", newMove)
     gameSocket.on("updateProfile", newBuy)
     gameSocket.on("updateItem", newBuy)

     gameSocket.on("createNewGame", createNewGame)
 
     // User joins gameRoom after going to a URL with '/game/:gameId' 
     gameSocket.on("playerJoinGame", playerJoinsGame)
     gameSocket.on("select seat", playerJoinsGame)
    
 }
function playerJoinsGame(idData) {
    var sock = this

    //console.log(gamesInSession)
    //console.log(idData.gameId)
    idData.mySocketId = sock.id;

    if (gamesInSession.find(i => i === idData.gameId)) {

    if (io.sockets.adapter.rooms.get(sock.id).size < 4) {

        // Join the room
        sock.join(idData.gameId);
       
        var numbers = io.sockets.adapter.rooms.get(idData.gameId).size

        //console.log(numbers)

        if (numbers === 4) {
            // start seat selection
            io.sockets.in(idData.gameId).emit('Start', numbers)
        }

        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);

    } if (io.sockets.adapter.rooms.get(idData.gameId).size > 4) {
        // Otherwise, send an error message back to the player.
        this.emit('status' , 'There are already 4 people playing in this room.' );
    }
} else {
        this.emit('status' , 'This game session does not exist.' );
}
}

 
function createNewGame(gameId) {
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});
    gamesInSession.push(gameId)
    this.join(gameId)
}
 
 
function newMove(move) {
     
    const gameId = move.gameId 
     
    io.to(gameId).emit('updateGameState', move);
    //console.log(move)
}

function newBuy(points) {
     
    const gameId = points.gameId 
     
    io.to(gameId).emit('updateProfile', points);
    //console.log(points)
}
function shopItem (shop) {
     
    const gameId = shop.gameId 
     
    io.to(gameId).emit('updateItem', shop);
    //console.log(shop)
}
 
function onDisconnect() {
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i, 1);
}
 
 exports.initializeGame = initializeGame