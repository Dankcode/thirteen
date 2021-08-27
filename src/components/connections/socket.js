import { io } from 'socket.io-client'

const socket = io("https://secret-badlands-96001.herokuapp.com/")

var mySocketId

socket.on("connection", statusUpdate => {
})

export {
    socket,
    mySocketId
}