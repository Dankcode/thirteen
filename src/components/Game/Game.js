import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
import './Game.css';
const socket  = require('../connections/socket').socket


/* generate deck of cards first
display 13 cards for player 1
rest of players come after
pass turn button works


use State Class to generate DECK and then

============
FIRST TO CLICK PLAYER 1 IS NOW ADMIN OF ROOM
============
USE SOCKET TO TRACK LAST WINNING PLAYER
*/
class Game extends React.Component {

    state = {
        newGame: false,
        p1Hand: [],
        p1Rend: '',
        buttonTest: false
    }
   
    componentDidMount() {
        
        const shuffledDeck = shuffleArray(deck)

        console.log(shuffledDeck)

        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)

        console.log(player1Deck)
        console.log(player2Deck)
        console.log(player3Deck)
        console.log(player4Deck)

        // render cards 
        // make loop thru deck and replace S with of spades
        // create a new obj for the render code and .push it
        
/*
        for (var i = player1Deck.length - 1; i >= 0; i--) {
            var j = Object.values(player1Deck[i])
            console.log(j[0])
            player1Deck.push(player1Deck.flatMap[0], player1Deck.flatMap[1])
            }   
*/    
console.log(player1Deck[0])

this.setState({
    p1Hand : player1Deck
})
            
        
  
        
// create StartingCard that searches for 3 of Spades
//extract card from Searching player decks that player 2nd player becomes first to play 
// const a first turn 

socket.emit('initGameState', {
    gameOver: false,
    turn: 'Player 1',
    player1Deck: [...player1Deck],
    player2Deck: [...player2Deck],
  //  currentColor: playedCardsPile[0].charAt(1),
   // currentNumber: playedCardsPile[0].charAt(0),
    //playedCardsPile: [...playedCardsPile],
   // drawCardPile: [...drawCardPile]
})
    }
    
renderCard = () => {
const card = this.state.p1Hand



console.log(card)

this.setState({
    buttonTest: true,
})         

}      
/*
const cardGen = card.forEach(function(x, i) {
    return <img alt = '' src ={require(`./Deck/assets/Faces/${x}.png`).default}/>
});
*/

        // socket.on INITIAL STATE
        //socket.on UPDATE STATE
        

    

    //last cards played
    
        
        // track player that played the cards
        //extract the number and rank of the played cards

        //check if the card is legal 
        //remove the card from the according player's deck
        // exception for BOMB which is allowed anytime

    

render() {
    return(
        <div>
            <h2>
            <React.Fragment>
                {this.state.buttonTest ?
                <div>
                
                {this.state.p1Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    />
                ))}
                </div>
                :             
                <div>
                    hi
                </div>
                }
            </React.Fragment>
            <button onClick={this.renderCard}> add card </button>
            </h2>
        </div>
    )
    }

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