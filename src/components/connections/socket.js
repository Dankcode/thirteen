import { io } from 'socket.io-client'

const socket = io("http://localhost:8000/")

var mySocketId

socket.on("connection", statusUpdate => {
})

export {
    socket,
    mySocketId
}