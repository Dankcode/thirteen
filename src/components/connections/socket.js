import { io } from 'socket.io-client'

const socket = io("http://localhost:8000")

/*
will have to remove socket = local host to URL and URL = to our main page
=================
CAN possibly make a game room recognizer by:
Starting and arry in Server side and sending info from who's and Admin + game Id
ID is registered to server side array and can self destruct after 24 hours OR if Admin socket.io disconnects 

set an ?Admin requirement on /game/ page and Redirect if ID does not == Array list ID

*/

var mySocketId



socket.on("connection", statusUpdate => {
    console.log("A new game has been created! Usernam")
    
})

export {
    socket,
    mySocketId
}