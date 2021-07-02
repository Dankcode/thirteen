import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
import './Game.css';
import reactDom from 'react-dom';
import gameLogic from './Gamelogic.js';
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
        render: false,
        firstCard: false,
        player: '',
        winners: [],
        p1Hand: [],
        p2Hand: [],
        p3Hand: [],
        p4Hand: [],
        pHand: [],
        selectArr: [],
        playedCard: []
    }
   
    componentDidMount(props) {
        
        const shuffledDeck = shuffleArray(deck)
    
        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)

        console.log(player1Deck)
        console.log(player2Deck)
        console.log(player3Deck)
        console.log(player4Deck)
        
this.setState({
    p1Hand : player1Deck,
    p2Hand : player2Deck,
    p3Hand : player3Deck,
    p4Hand : player4Deck,
}) 

socket.emit('initGameState', {
    newGame: false,
    turn: 'Player 1',
    player1Deck: [...player1Deck],
    player2Deck: [...player2Deck],
    player3Deck: [...player3Deck],
    player4Deck: [...player4Deck],
})}
    
p1Seat = () => {
    const playerHand = this.state.p1Hand.sort()
this.setState({
    pHand: playerHand,
    player: 'player1'
})}      
p2Seat = () => {
    const playerHand = this.state.p2Hand
this.setState({
    pHand: playerHand,
    player: 'player2'
})}      
p3Seat = () => {
    const playerHand = this.state.p3Hand
    this.setState({
        pHand: playerHand,
        player: 'player3'
    })}    
p4Seat = () => {
    const playerHand = this.state.p4Hand
this.setState({
    pHand: playerHand,
    player: 'player4'
})}    
otherDeck = () => {
    switch (this.state.player){
    case 'player1':
        return ( 
            <div>
            <div className = 'right'>
                {this.state.p2Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p3Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p4Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            </div>
        )
    case 'player2':
        return ( 
            <div>
            <div className = 'right'>
                {this.state.p3Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p4Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p1Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            </div>
        )
    case 'player3':
        return ( 
            <div>
            <div className = 'right'>
                {this.state.p4Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p1Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p2Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            </div>
        )
    case 'player4':
        return ( 
            <div>
            <div className = 'right'>
                {this.state.p1Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p2Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p3Hand.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            </div>
        )
    default: return ( 
        <div>
        <div className = 'right'>
            {this.state.p2Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'top'>
            {this.state.p3Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'left'>
            {this.state.p4Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'bottom'>
            {this.state.p1Hand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        </div>
    )
    }
}
changeSeat = () => {
    if (this.state.selectArr.length > 1) {
        const quit = this.state.selectArr.splice(0, 13)
this.state.pHand.push(quit)
    this.setState({
        player: ''
    })}
}

// GAME LOGIC GOES HERE
// =====================================
checkCard = (selected_card) => {
    var selectfunction
    gameLogic(selected_card, this.state.selectArr,  this.state.playedCard, this.state.pHand, true)
    if (gameLogic(selected_card, this.state.selectArr,  this.state.playedCard, this.state.pHand, true) === 'allow' ) {
        this.selectCard(selected_card)
    }
}


selectCard = (selected_card) => {
    this.state.selectArr.push(selected_card);
        console.log(selected_card)
    // LEGAL PLAYS GO HERE
    //disallow 
    
        var i; //this loop moves hand to Selected Array
        for (i = 0; i < this.state.pHand.length; i ++) {
            var j;
                for (j = 0; j < this.state.selectArr.length;j  ++)
                    if (this.state.pHand[i] === this.state.selectArr[j]) {
                        this.state.pHand.splice(i, 1);
          }
        }  
    const selectedCard = this.state.selectArr.sort()
    this.setState({
        selectArr: selectedCard
    })
}

deselectCard = (selected_card) => {
    this.state.pHand.push(selected_card);
        console.log(selected_card)
    
        var i;
        for (i = 0; i < this.state.selectArr.length; i ++) {
            var j;
                for (j = 0; j < this.state.pHand.length;j  ++)
                    if (this.state.selectArr[i] === this.state.pHand[j]) {
                        this.state.selectArr.splice(i, 1);
          }
        }
    const selectedCard = this.state.pHand.sort()
    this.setState({
        pHand: selectedCard
    })
}

playFunction = () => {
    //filter out duplicates clicked and puts them on board
    //remove from player's hand
    let uniqueCards =  this.state.selectArr.splice(0, 13).sort()
   
    console.log(this.state.playedCard)
    this.setState({
        playedCard: uniqueCards,
    })
}
playButton = () => {
    if (this.state.selectArr.length === this.state.playedCard.length) {
    return (
        <div>
            <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
        </div>
    )
    }
    if (this.state.playedCard.length === 0) {
    return (
        <div>
            <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
        </div>
    )    
    }
    // needs to check if played cards are legal 
}
passButton = () => {
    return (
        <div>
            <button>PASS</button>
        </div>
    )
}

render() {
    return(
        <div>
            <div className = 'otherDeck'>
            {this.otherDeck()}
            </div>
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
            <React.Fragment>
                {this.state.player === 'player1' || this.state.player ==='player2' || this.state.player ==='player3' || this.state.player ==='player4'?
                <div>
                    {this.passButton()}{this.playButton()}
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
                {this.state.pHand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    onClick={() => this.checkCard(item)}
                                    />
                ))}
                
            <button onClick={() => this.changeSeat()}> CHANGE SEAT</button>
                </div>
                </div>
                
                :             
                <div>
                    SELECT SEAT
                </div>
                }
            </React.Fragment>
<div>
            <button onClick={() => this.p1Seat()}> Player 1 </button>
            <button onClick={() => this.p2Seat()}> Player 2 </button>
            <button onClick={() => this.p3Seat()}> Player 3 </button>
            <button onClick={() => this.p4Seat()}> Player 4 </button>
</div>
</React.Fragment> 
            
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