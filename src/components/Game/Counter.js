const socket  = require('../connections/socket').socket

export default function counter (winRank, roomId, p1Counter, p2Counter, p3Counter, p4Counter, p1Points, p2Points, p3Points, p4Points) {
//Win Counter
        switch (winRank[0]) {
        default:
            return;
        case 'player1':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter +1,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points + 300,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player2':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter + 1,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points + 300,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player3':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter + 1,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points + 300,
                p4Points: p4Points,
            })  
            break;
        case 'player4':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter + 1,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points + 300,
            })  
            break;          
        }    
// Point Counter

    switch (winRank[1]) {
        default:
            return;
        case 'player1':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points + 200,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player2':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points + 200,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player3':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points + 200,
                p4Points: p4Points,
            })  
            break;
        case 'player4':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points + 200,
            })  
            break;          
        }        
    switch (winRank[2]) {
        default:
            return;
        case 'player1':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points + 100,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player2':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points + 100,
                p3Points: p3Points,
                p4Points: p4Points,
            })  
            break;
        case 'player3':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points + 100,
                p4Points: p4Points,
            })  
            break;
        case 'player4':
            socket.emit('new profile', {
                gameId: roomId,
                p1Counter: p1Counter,
                p2Counter: p2Counter,
                p3Counter: p3Counter,
                p4Counter: p4Counter,
                p1Points: p1Points,
                p2Points: p2Points,
                p3Points: p3Points,
                p4Points: p4Points + 100,
            })  
            break;          
        }                

}