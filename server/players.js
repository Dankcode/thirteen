
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
     /*
     if (gamesInSession.map(i => i) !== idData.gameId) {
         this.emit('status' , console.log('no room'));
         return
     }
    */
     if (idData.gameId === undefined) {
        this.emit('status' , "This game session does not exist." );
        return
    }
    idData.mySocketId = sock.id;
    if (io.sockets.adapter.rooms.get(idData.gameId).size < 2) {
        // attach the socket id to the data object.
        idData.mySocketId = sock.id;

        // Join the room
        sock.join(idData.gameId);

        console.log(io.sockets.adapter.rooms.get(idData.gameId).size)
        var numbers = io.sockets.adapter.rooms.get(idData.gameId).size

        if (io.sockets.adapter.rooms.get(idData.gameId).size === 2) {
            // start seat selection
            io.sockets.in(idData.gameId).emit('Start', numbers)
        }

        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);

    } else {
        // Otherwise, send an error message back to the player.
        this.emit('status' , "There are already 2 people playing in this room." );
    }

}

 
function createNewGame(gameId) {
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});
    this.join(gameId)
}
 
 
function newMove(move) {
     
    const gameId = move.gameId 
     
    io.to(gameId).emit('updateGameState', move, console.log(move));
}

function newBuy(points) {
     
    const gameId = points.gameId 
     
    io.to(gameId).emit('updateProfile', points, console.log(points));
}
function shopItem (shop) {
     
    const gameId = shop.gameId 
     
    io.to(gameId).emit('updateItem', shop, console.log(shop));
}
 
function onDisconnect() {
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i, 1);
}
 
 exports.initializeGame = initializeGame