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
        buttonTest: false,
        firstCard: false,
        p1Hand: [],
        selectArr: [],
        removeCard: [],
        playedCard: []
    }
   
    componentDidMount() {
        
        const shuffledDeck = shuffleArray(deck)

        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)

        console.log(player1Deck)
        console.log(player2Deck)
        console.log(player3Deck)
        console.log(player4Deck)

//NEED update win conditions

// need to order the deck eventually 
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
})}
    
renderCard = () => {
this.setState({
    buttonTest: true,
})}      

/*
selectCard = (selected_card) => {
    // will have to check if cardplay is Legal
    if (!this.state.selectArr.includes(selected_card)) {
        this.state.selectArr.push(selected_card);
        console.log(selected_card)
    } else {
        var j;
            for (j = 0; j < this.state.selectArr.length;j  ++)
                if (selected_card === this.state.selectArr[j]) {
                    this.state.selectArr.splice(j, 1);
                }
    }
}
*/
selectCard = (selected_card) => {
    // will have to check if cardplay is Legal
    this.state.selectArr.push(selected_card);
        console.log(selected_card)
    
        var i;
        for (i = 0; i < this.state.p1Hand.length; i ++) {
            var j;
                for (j = 0; j < this.state.selectArr.length;j  ++)
                    if (this.state.p1Hand[i] === this.state.selectArr[j]) {
                        this.state.p1Hand.splice(i, 1);
          }
        }
    const selectedCard = this.state.selectArr
    this.setState({
        selectArr: selectedCard
    })
}

deselectCard = (selected_card) => {
    this.state.p1Hand.push(selected_card);
        console.log(selected_card)
    
        var i;
        for (i = 0; i < this.state.selectArr.length; i ++) {
            var j;
                for (j = 0; j < this.state.p1Hand.length;j  ++)
                    if (this.state.selectArr[i] === this.state.p1Hand[j]) {
                        this.state.selectArr.splice(i, 1);
          }
        }
    const selectedCard = this.state.p1Hand
    this.setState({
        p1Hand: selectedCard
    })
}

playButton = () => {
    //filter out duplicates clicked and puts them on board
    //remove from player's hand
    let uniqueCards =  this.state.selectArr.splice(0, 13)
   
    console.log(this.state.playedCard)
    
    this.setState({
        playedCard: uniqueCards,
    })
}
/*
removeHand = () => {
    var i;
    for (i = 0; i < this.state.p1Hand.length; i ++) {
        var j;
            for (j = 0; j < this.state.selectArr.length;j  ++)
                if (this.state.p1Hand[i] === this.state.selectArr[j]) {
                    this.state.p1Hand.splice(i, 1);
      }
    }

    console.log(this.state.p1Hand)
    console.log(this.state.selectArr)
  }
*/
    

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
                <div className='Square'>
            
                        <div>
                {this.state.playedCard.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    />
                ))}
                </div>
             
                </div>
            <React.Fragment>
                {this.state.buttonTest ?
                <div>
                    <button onClick={() => this.playButton()}> PLAY SELECTED </button>
                <div>
                    <div>
                {this.state.selectArr.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    onClick={() => this.deselectCard(item)}
                                    />
                ))}
                </div>
                {this.state.p1Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    onClick={() => this.selectCard(item)}
                                    />
                ))}
                </div>
                </div>
                :             
                <div>
                    hi
                </div>
                }
            </React.Fragment>
            <button onClick={() => this.renderCard()}> add card </button>
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