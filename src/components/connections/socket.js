import { io } from 'socket.io-client'

const socket = io("https://thirteen-online.herokuapp.com/")

var mySocketId

socket.on("connection", statusUpdate => {
})

export {
    socket,
    mySocketId
}