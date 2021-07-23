import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import queryString from 'query-string'
import shuffleArray from './Deck/Shuffle';
import io, { Socket } from 'socket.io-client'
import './Game.css';
import reactDom from 'react-dom';
import gameLogic from './Gamelogic.js';
import bombCheck from './Bomb.js';
const socket  = require('../connections/socket').socket

class Game extends React.Component {

    state = {
        roomId: '',
        newGame: false,
        render: false,
        firstJoin: false,
        bombTrue: false,
        isTurn: false,
        player: '',
        p1Hand: [],
        p2Hand: [],
        p3Hand: [],
        p4Hand: [],
        pHand: [],
        selectArr: [],
        playedCard: [],
        bombArr: [],
        winRank: [],
        passRank: [],
        winArray: [],
        p1Online: [],
        p2Online: [],
        p3Online: [],
        p4Online: [],
        playedOnline: [],
        currentTurn: '',
        curRound: ['player1', 'player2', 'player3', 'player4'],
    }
   
    componentDidMount() {        
socket.on('playerJoinedRoom', gameId => {
    this.setState({
        roomId: gameId.gameId,
    })
})
 
socket.on('updateGameState', move => {
    this.setState({
    p1Online: move.p1, 
    p2Online: move.p2, 
    p3Online: move.p3, 
    p4Online: move.p4,
    playedCard: move.playedOnline,
    currentTurn: move.turn,
    currentRound: move.currentRound,
    currentWinners: move.currentWinners,
    passRank: move.currentPassed,
    })
})
}

playDeck = () => {
    if (this.state.firstJoin === false) {
    const shuffledDeck = shuffleArray(deck)
    
        //const player1Deck = shuffledDeck.splice(0, 13)
        //const player2Deck = shuffledDeck.splice(0, 13)
        //const player3Deck = shuffledDeck.splice(0, 13)
        //const player4Deck = shuffledDeck.splice(0, 13)

    const player1Deck = ['3a',]
    const player2Deck = ['4a',]
    const player3Deck = ['5a',]
    const player4Deck = ['6a',]
    socket.emit('new move', {
        gameId: this.state.roomId,
        p1: player1Deck,
        p2: player2Deck,
        p3: player3Deck,
        p4: player4Deck,
        playedOnline: this.state.playedCard,
        currentPassed: [],
    })  
    }
}
joinRoom = () => {
    socket.emit('new move', {
        gameId: this.state.roomId,
        p1: this.state.p1Online,
        p2: this.state.p1Online,
        p3: this.state.p1Online,
        p4: this.state.p1Online,
        playedOnline: this.state.playedCard,
        currentPassed: this.state.passRank,
    })  
}

p1Seat = () => {
    const playerHand = this.state.p1Online.sort()
    if (this.state.winRank.length === 0) {    
    if (playerHand[0] === '3a') {
        this.setState({
            currentTurn: 'player1'
        })
    }
}
this.setState({
    pHand: playerHand,
    player: 'player1',
})
}      
p2Seat = () => {
    const playerHand = this.state.p2Online.sort();
    if (this.state.winArray.length === 0) {    
        if (playerHand[0] === '3a') {
            this.setState({
                currentTurn: 'player2'
            })
        }
    }
this.setState({
    pHand: playerHand,
    player: 'player2'
})}      
p3Seat = () => {
    const playerHand = this.state.p3Online.sort();
    if (this.state.winArray.length === 0) {    
        if (playerHand[0] === '3a') {
            this.setState({
                currentTurn: 'player3'
            })
        }
    }
    this.setState({
        pHand: playerHand,
        player: 'player3'
    })}    
p4Seat = () => {
    const playerHand = this.state.p4Online.sort();
    if (this.state.winArray.length === 0) {    
        if (playerHand[0] === '3a') {
            this.setState({
                currentTurn: 'player4'
            })
        }
    }
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
                {this.state.p2Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p3Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p4Online.map((item, i) => (
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
                {this.state.p3Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p4Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p1Online.map((item, i) => (
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
                {this.state.p4Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p1Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p2Online.map((item, i) => (
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
                {this.state.p1Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'top'>
                {this.state.p2Online.map((item, i) => (
                                    <img
                                        alt = ''
                                        key={i}
                                        className='smallCard'
                                        src={require(`./Deck/assets/back.png`).default}
                                        />
                    ))}
            </div>
            <div className = 'left'>
                {this.state.p3Online.map((item, i) => (
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
            {this.state.p2Online.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'top'>
            {this.state.p3Online.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'left'>
            {this.state.p4Online.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='smallCard'
                                    src={require(`./Deck/assets/back.png`).default}
                                    />
                ))}
        </div>
        <div className = 'bottom'>
            {this.state.p1Online.map((item, i) => (
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
    
    if (this.state.selectArr.length > 0) {
        const quit = this.state.selectArr.splice(0)
this.state.pHand.push(quit)

    this.setState({
        player: ''
    })
    }
}
// GAME LOGIC GOES HERE
// =====================================
checkCard = (selected_card) => {
    if (gameLogic(selected_card, this.state.selectArr,  this.state.playedCard, this.state.pHand, this.state.bombArr, this.state.bombCheck, true) === 'allow' ) {
        this.selectCard(selected_card)
    }
}

selectCard = (selected_card) => {
    if (this.state.currentTurn === this.state.player) {
    this.state.selectArr.push(selected_card);
        console.log(selected_card)
        bombCheck(this.state.pHand)
    if (bombCheck(this.state.pHand).length >= 4) {
        this.setState({
            bombTrue: true,
            bombArr: bombCheck(this.state.pHand)
        })
    }
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
    } else 
    console.log('not your turn')
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


turnFunction = () => {
    // set the turn to the next player
    const players = this.state.curRound
    const player = this.state.currentTurn
    var i;
        for (i = 0; i < players.length; i ++) {
                if (player === players[i]) {
                    return players[i + 1]
            }   
                if (player === players[players.length -1]){
                    return players[0]
            }
        }
}
currentRoundFunction = () => {
    const players = this.state.curRound
    const winners = this.state.winRank
    const passed = this.state.passRank

    var i;
        for (i = 0; i < players.length; i ++) {
            var j;
                for (j = 0; j < winners.length;j  ++) {
                    if (players[i] === winners[j]) 
                        players.splice(i, 1);                
                }
            }   
        for (i = 0; i < players.length; i ++) {
                for (j = 0; j < passed.length;j  ++) {
                    if (players[i] === passed[j]) 
                        players.splice(i, 1);                
                }
            }         
    return players
}

playAgain = () => {
    const shuffledDeck = shuffleArray(deck)
    
        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)

    socket.emit('new move', { 
            gameId: this.state.roomId,
            playedOnline: [],
            p1: player1Deck,
            p2: player2Deck,
            p3: player3Deck,
            p4: player4Deck,
            turn: this.state.curRound[0],
            currentRound: ['player1', 'player2', 'player3', 'player4'],
            currentWinners: this.state.winRank,
            currentPassed: this.state.passRank,
        })
}

playFunction = (selectedArray) => {
    //filter out duplicates clicked and puts them on board
    //remove from player's hand
    selectedArray = this.state.selectArr
        let uniqueCards =  selectedArray.splice(0, 13).sort()
          
        socket.emit('new move', { 
            gameId: this.state.roomId,
            playedOnline: uniqueCards,
            p1: this.state.p1Online,
            p2: this.state.p2Online,
            p3: this.state.p3Online,
            p4: this.state.p4Online,
            turn: this.turnFunction(),
            currentRound: this.currentRoundFunction(),
            currentWinners: this.state.winRank,
            currentPassed: this.state.passRank,
        })

        const player = this.state.player
        const winners = this.state.winRank

        if (this.state.pHand.length === 0) {
            winners.push(player)

            socket.emit('new move', { 
                gameId: this.state.roomId,
                playedOnline: uniqueCards,
                p1: this.state.p1Online,
                p2: this.state.p2Online,
                p3: this.state.p3Online,
                p4: this.state.p4Online,
                turn: this.turnFunction(),
                currentRound: this.currentRoundFunction(),
                currentWinners: this.state.winRank,
                currentPassed: this.state.passRank,
            })
        }

        if (this.state.winRank.length === 3) {
            this.playAgain()
        }
}

passFunction = () => {
    const players = this.state.curRound
    const player = this.state.player
    const passed = this.state.passRank

    if (players.length === 1) {
        socket.emit('new move', { 
            gameId: this.state.roomId,
            playedOnline: [],
            p1: this.state.p1Online,
            p2: this.state.p2Online,
            p3: this.state.p3Online,
            p4: this.state.p4Online,
            turn: this.state.curRound[0],
            currentRound: ['player1', 'player2', 'player3', 'player4'],
            currentWinners: this.state.winRank,
            currentPassed: [],
        })
    } else {
        passed.push(player)

        socket.emit('new move', { 
            gameId: this.state.roomId,
            playedOnline: this.state.playedCard,
            p1: this.state.p1Online,
            p2: this.state.p2Online,
            p3: this.state.p3Online,
            p4: this.state.p4Online,
            turn: this.turnFunction(),
            currentRound: this.currentRoundFunction(),
            currentWinners: this.state.winRank,
            currentPassed: this.state.passRank,
        })
    }    
}
 
playButton = () => {
    // checks if the card can be played specifically the bomb
    if (this.state.selectArr.length === this.state.playedCard.length) {
    return (
        <div>
            <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
        </div>
    )
    }
    if (this.state.playedCard.length === 0) {
        // prevent doubles from non pairs
        if (this.state.selectArr.length === 2) {
            if (this.state.selectArr[0].charAt(0) === this.state.selectArr[1].charAt(0)) {
             return (
                <div>
                    <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
                </div>
                    )   
            }
        }    else {
    return (
        <div>
            <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
        </div>
    )    
        }
    }
    
    if (this.state.bombTrue === true && this.state.selectArr.length === 8) {
        if (bombCheck(this.state.selectArr).length === 4) {
            return (
        <div>
            <button onClick= {() => this.playFunction()}>PLAY CARDS</button>
        </div>
            )   
        }    
    }
}
passButton = () => {
    return (
        <div>
            <button onClick = {() => this.passFunction()}>PASS</button>
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
                <button onClick={() => this.playDeck()}> DECK</button>
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

const JoinGame = (gameid, admin) => {
    const data = {
        gameId : gameid,
        admin: admin
    }
    socket.emit("playerJoinGame", data, console.log(data))
}

const GameRoom = (props) => {
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