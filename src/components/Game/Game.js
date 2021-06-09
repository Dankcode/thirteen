import React, { useEffect } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
const socket  = require('../connections/socket').socket


/* generate deck of cards first
display 13 cards for player 1
rest of players come after
pass turn button works


use State Class to generate DECK and then

============
FIRST TO CLICK PLAYER 1 IS NOW ADMIN OF ROOM

*/
const Game = (props) => {
    useEffect (() => {
        
          const shuffledDeck = deck

          console.log(shuffledDeck)


        const player1Deck = shuffledDeck.cards.splice(0, 13)
        const player2Deck = shuffledDeck.cards.splice(0, 13)
        const player3Deck = shuffledDeck.cards.splice(0, 13)
        const player4Deck = shuffledDeck.cards.splice(0, 13)

        console.log(player1Deck)
        console.log(player2Deck)
        console.log(player3Deck)
        console.log(player4Deck)
        
    })
    return(
        <div>
            <h1>
           
            </h1>
        </div>
    )
}
// array not being shuffled also found in cards: Array which needs to be fixed

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
            <Game />
            </h1>
        </div>
    )
}

export default GameRoom;