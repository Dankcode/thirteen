import React from 'react';
import Deck from './Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
const socket  = require('../connections/socket').socket


/* generate deck of cards first
display 13 cards for player 1
rest of players come after
pass turn button works


use State Class to generate DECK and then

============
FIRST TO CLICK PLAYER 1 IS NOW ADMIN OF ROOM

*/



const JoinGame = (gameid, admin) => {
    const data = {
        gameId : gameid,
        admin: admin
    }
    socket.emit('player joined', data)
   
}

const GameRoom = (props) => {
    socket.emit(console.log("game room"))
    const { gameid } = useParams()
    JoinGame(gameid, props.admin)
    return(
        <div>
            <h1>
            <button onClick={event =>  window.location.href='/'}>BACK HOME</button>
            <Deck />
            </h1>
        </div>
    )
}

export default GameRoom;