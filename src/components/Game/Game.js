import React from 'react';
import deck from './Deck/Deck.js';
import {useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
import './Game.css';
import gameLogic from './Gamelogic.js';
import bombCheck from './Bomb.js';
import counter from './Counter.js';
import shop from './Shop.js';
const socket  = require('../connections/socket').socket

class Game extends React.Component {

    state = {
        roomId: '',
        roomStarted: false,
        newGame: false,
        render: false,
        bombTrue: false,
        isTurn: false,
        musicFunction: false,
        player: '',
        numberOfPlayersJoined: 0,
        shopMenuOpen:false,
        p1Profile: 'empty',
        p2Profile: 'empty',
        p3Profile: 'empty',
        p4Profile: 'empty',
        currentBackgroundId: 'Square',
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
        p1Counter: 0,
        p2Counter: 0,
        p3Counter: 0,
        p4Counter: 0,
        p1Points: 0,
        p2Points: 0,
        p3Points: 0,
        p4Points: 0,
    }
   
    componentDidMount() {        
socket.on('playerJoinedRoom', gameId => {
    this.setState({
        roomId: gameId.gameId,
    })
})
socket.on('Start', (numberOfPlayersJoined) => {
    //console.log(numberOfPlayersJoined)
    if (numberOfPlayersJoined === 4) {
        // start game
        this.playDeck()
    } else {
        console.log('waiting for more players')
    }
})
 
socket.on('updateGameState', move => {
    this.setState({
    p1Online: move.p1, 
    p2Online: move.p2, 
    p3Online: move.p3, 
    p4Online: move.p4,
    playedCard: move.playedOnline,
    currentTurn: move.turn,
    curRound: move.currentRound,
    winRank: move.currentWinners,
    passRank: move.currentPassed,
    roomStarted: move.roomStarted,
    })
    if (this.state.winRank.length === 3) {
        this.playAgain();
    }
    else {
        if (this.state.p1Online.length === 0 && this.state.p2Online.length === 0 && this.state.p3Online.length === 0 && this.state.p4Online.length === 0) {
            this.playAgain();
        }
    }
    // if no one else can top currently played card(s)
    bombCheck(this.state.pHand)
    if (this.state.selectArr.length === 0) {
        if (bombCheck(this.state.pHand).length >= 4) {
            this.setState({
                bombTrue: true,
                bombArr: bombCheck(this.state.pHand)
            })
        }
        if (bombCheck(this.state.pHand).length < 4) {
            this.setState({
                bombTrue: false,
                bombArr: []
            })
        }
    }
})
socket.on('updateProfile', points => {
    this.setState({
        p1Counter: points.p1Counter,
        p2Counter: points.p2Counter,
        p3Counter: points.p3Counter,
        p4Counter: points.p4Counter,
        p1Points: points.p1Points,
        p2Points: points.p2Points,
        p3Points: points.p3Points,
        p4Points: points.p4Points,
    })
})
socket.on('updateItem', shop => {
    this.setState({
        p1Profile: shop.p1Profile,
        p2Profile: shop.p2Profile,
        p3Profile: shop.p3Profile,
        p4Profile: shop.p4Profile,
    })
})
socket.on('status', statusUpdate => {
    alert(statusUpdate)
    if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 4 people playing in this room.') {
       return window.location.href = "http://localhost:3000/"
    }
})
}
playDeck = () => {
    const shuffledDeck = shuffleArray(deck)
    
        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)
    //bomb test

    //const player2Deck = ['3a','3d', '4a', '4d','5a','5d','6a','6d','7a','7d', '8a','8d']

    //turn test 
    //const player1Deck = ['3a','3d', 'aa']
    //const player2Deck = ['4a',]
    //const player3Deck = ['5a',]
    //const player4Deck = ['6a',]


    socket.emit('new move', {
        gameId: this.state.roomId,
        roomStarted: true,
        p1: player1Deck,
        p2: player2Deck,
        p3: player3Deck,
        p4: player4Deck,
        playedOnline: this.state.playedCard,
        currentRound: ['player1', 'player2', 'player3', 'player4'],
        currentWinners: [],
        currentPassed: [],
    })  

    socket.emit('new profile', {
        gameId: this.state.roomId,
        p1Counter: this.state.p1Counter,
        p2Counter: this.state.p2Counter,
        p3Counter: this.state.p3Counter,
        p4Counter: this.state.p4Counter,
        p1Points: this.state.p1Points,
        p2Points: this.state.p2Points,
        p3Points: this.state.p3Points,
        p4Points: this.state.p4Points,
    })  
}
joinRoom = () => {
    if (this.state.roomStarted === false) {
        return (
            <div className ='waiting-room'>
                <div className ='wait-instruction'>
                    <p>Game begins after everyone has joined</p>
                    <p>share this link to invite your friends</p>
                </div>
                 <input className='link' type='text' defaultValue={window.location.href}/>
            </div>
        )
    }
}

p1Seat = () => {
    const playerHand = this.state.p1Online.sort()
    if (this.state.winRank.length === 0) {    
    if (playerHand[0] === '3a') {
        this.setState({
            currentTurn: 'player1'
        })
    }
    socket.emit('new item', {
        gameId: this.state.roomId,
        p1Profile: 'player',
        p2Profile: this.state.p2Profile,
        p3Profile: this.state.p3Profile,
        p4Profile: this.state.p4Profile,
    }) 
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
    socket.emit('new item', {
        gameId: this.state.roomId,
        p1Profile: this.state.p1Profile,
        p2Profile: 'player',
        p3Profile: this.state.p3Profile,
        p4Profile: this.state.p4Profile,
    })     
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
    socket.emit('new item', {
        gameId: this.state.roomId,
        p1Profile: this.state.p1Profile,
        p2Profile: this.state.p2Profile,
        p3Profile: 'player',
        p4Profile: this.state.p4Profile,
    })     
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
    socket.emit('new item', {
        gameId: this.state.roomId,
        p1Profile: this.state.p1Profile,
        p2Profile: this.state.p2Profile,
        p3Profile: this.state.p3Profile,
        p4Profile: 'player',
    })     
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
                <div className = 'win-counter' itemID="player2-Profile">
                    <p>Wins: {this.state.p2Counter}</p>
                    <p>Points: {this.state.p2Points}</p>
                    <p>player 2</p>
                        <div>
                            <img src={require(`./Assets/${this.state.p2Profile}.png`).default} alt="Logo" />
                        </div>
                </div>                
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
            <div className = 'win-counter' itemID="player3-Profile">
                <p>Wins: {this.state.p3Counter}</p>
                <p>Points: {this.state.p3Points}</p>
                <p>player 3</p>
                <div>
                    <img src={require(`./Assets/${this.state.p3Profile}.png`).default} alt="Logo" />
                </div>
            </div>                    
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
            <div className = 'win-counter' itemID="player4-Profile">
            <p>Wins: {this.state.p4Counter}</p>
            <p>Points: {this.state.p4Points}</p>
            <p>player 4</p>
            <div>
            <img src={require(`./Assets/${this.state.p4Profile}.png`).default} alt="Logo" />
            </div>
            </div>                    
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
                                <div className = 'win-counter' itemID="player3-Profile">
                <p>Wins: {this.state.p3Counter}</p>
                <p>Points: {this.state.p3Points}</p>
                <p>player 3</p>
                <div>
                    <img src={require(`./Assets/${this.state.p3Profile}.png`).default} alt="Logo" />
                </div>
            </div>    
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
                                <div className = 'win-counter' itemID="player4-Profile">
            <p>Wins: {this.state.p4Counter}</p>
            <p>Points: {this.state.p4Points}</p>
            <p>player 4</p>
            <div>
            <img src={require(`./Assets/${this.state.p4Profile}.png`).default} alt="Logo" />
            </div>
            </div>   
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
                    <div className = 'win-counter' itemID="player1-Profile">
            <p>Wins: {this.state.p1Counter}</p>
            <p>Points: {this.state.p1Points}</p>
            <p>player 1</p>
            <div>
            <img src={require(`./Assets/${this.state.p1Profile}.png`).default} alt="Logo" />
            </div>
            </div>
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
                                <div className = 'win-counter' itemID="player4-Profile">
            <p>Wins: {this.state.p4Counter}</p>
            <p>Points: {this.state.p4Points}</p>
            <p>player 4</p>
            <div>
            <img src={require(`./Assets/${this.state.p4Profile}.png`).default} alt="Logo" />
            </div>
            </div>   
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
                    <div className = 'win-counter' itemID="player1-Profile">
            <p>Wins: {this.state.p1Counter}</p>
            <p>Points: {this.state.p1Points}</p>
            <p>player 1</p>
            <div>
            <img src={require(`./Assets/${this.state.p1Profile}.png`).default} alt="Logo" />
            </div>
            </div>
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
                <div className = 'win-counter' itemID="player2-Profile">
                    <p>Wins: {this.state.p2Counter}</p>
                    <p>Points: {this.state.p2Points}</p>
                    <p>player 2</p>
                        <div>
                            <img src={require(`./Assets/${this.state.p2Profile}.png`).default} alt="Logo" />
                        </div>
                </div>                         
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
                    <div className = 'win-counter' itemID="player1-Profile">
            <p>Wins: {this.state.p1Counter}</p>
            <p>Points: {this.state.p1Points}</p>
            <p>player 1</p>
            <div>
            <img src={require(`./Assets/${this.state.p1Profile}.png`).default} alt="Logo" />
            </div>
            </div>                    
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
                    <div className = 'win-counter' itemID="player2-Profile">
                    <p>Wins: {this.state.p2Counter}</p>
                    <p>Points: {this.state.p2Points}</p>
                    <p>player 2</p>
                        <div>
                            <img src={require(`./Assets/${this.state.p2Profile}.png`).default} alt="Logo" />
                        </div>
                </div>   
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
                <div className = 'win-counter' itemID="player3-Profile">
                <p>Wins: {this.state.p3Counter}</p>
                <p>Points: {this.state.p3Points}</p>
                <p>player 3</p>
                <div>
                    <img src={require(`./Assets/${this.state.p3Profile}.png`).default} alt="Logo" />
                </div>
            </div>    
            </div>
            </div>
        )
    default: 
        return (
            <div>
            <div className = 'right-seat'>
                <img onClick={() => {
                    if (this.state.p2Profile === 'player') {
                        return console.log('seat is taken')
                    } else {
                        this.p2Seat()
                    }
                }
             } className = 'seat-button' src={require(`./Assets/${this.state.p2Profile}.png`).default} alt="Logo" />
             <p>Player 2 Seat</p>
            </div>
            <div className = 'top-seat'>
                <img onClick={() => {
                    if (this.state.p3Profile === 'player') {
                        return console.log('seat is taken')
                    } else {
                        this.p3Seat()
                    }
                }} className = 'seat-button' src={require(`./Assets/${this.state.p3Profile}.png`).default} alt="Logo" />
                
             <p>Player 3 Seat</p>
            </div>
            <div className = 'left-seat'>
                <img onClick={() => {
                    if (this.state.p4Profile === 'player') {
                        return console.log('seat is taken')
                    } else {
                        this.p4Seat()
                    }
                }} className = 'seat-button' src={require(`./Assets/${this.state.p4Profile}.png`).default} alt="Logo" />
             <p>Player 4 Seat</p>
            </div>
            <div className = 'bottom-seat'>
                <img onClick={() => {
                    if (this.state.p1Profile === 'player') {
                        return console.log('seat is taken')
                    } else {
                        this.p1Seat()
                    }
                }} className = 'seat-button' src={require(`./Assets/${this.state.p1Profile}.png`).default} alt="Logo" />
             <p>Player 1 Seat</p>
            </div>
            </div>
        )
    }
}

checkCard = (selected_card) => {
    if (gameLogic(selected_card, this.state.selectArr,  this.state.playedCard, this.state.pHand, this.state.bombArr, this.state.bombCheck, true) === 'allow' ) {
        this.selectCard(selected_card)
        bombCheck(this.state.pHand)
        bombCheck(this.state.selectArr)
    }
}

selectCard = (selected_card) => {
    if (this.state.currentTurn === this.state.player) {
    this.state.selectArr.push(selected_card);

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
    
    if(selected_card === this.state.selectArr[this.state.selectArr.length -1]) {
    this.state.pHand.push(selected_card);
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
    } else return null
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
currentRoundFunction = (playerArr) => {
    const players = playerArr
    const winners = this.state.winRank
    const passed = this.state.passRank
    var removeThis = winners.concat(passed)
    var i;
        for (i = 0; i < players.length; i ++) {
            var j;
                for (j = 0; j < removeThis.length;j  ++) {
                    if (players[i] === removeThis[j]) 
                        players.splice(i, 1);                
                }
            }   
    return players
    
}
newRoundFunction = (playerArr) => {
    const players = playerArr
    const winners = this.state.winRank
    var i;
        for (i = 0; i < players.length; i ++) {
            var j;
                for (j = 0; j < winners.length;j  ++) {
                    if (players[i] === winners[j]) 
                        players.splice(i, 1);                
                }
            }   
    return players
    
}
playAgain = () => {
    const newDeck = [...deck]
    const shuffledDeck = new shuffleArray(newDeck)
    
        const player1Deck = shuffledDeck.splice(0, 13)
        const player2Deck = shuffledDeck.splice(0, 13)
        const player3Deck = shuffledDeck.splice(0, 13)
        const player4Deck = shuffledDeck.splice(0, 13)

    //winner from previous game starts the new game
    socket.emit('new move', { 
        gameId: this.state.roomId,
        playedOnline: [],
        p1: player1Deck,
        p2: player2Deck,
        p3: player3Deck,
        p4: player4Deck,
        turn: this.state.winRank[0],
        currentRound: ['player1', 'player2', 'player3', 'player4'],
        currentWinners: [],
        currentPassed: [],
    })
this.state.winArray.push(this.state.winRank[0])    
socket.on('updateGameState', move => {
    if (this.state.player === 'player1') {
        this.setState({
            pHand: move.p1.sort()
        })
        }   
        if (this.state.player === 'player2') {
        this.setState({
            pHand: move.p2.sort()
        })
        }   
        if (this.state.player === 'player3') {
        this.setState({
            pHand: move.p3.sort()
        })
        }   
        if (this.state.player === 'player4') {
        this.setState({
            pHand: move.p4.sort()
        })
        }       
})
}

playFunction = (selectedArray) => {
    const newRound = ['player1', 'player2', 'player3', 'player4']
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
            currentRound: this.currentRoundFunction(newRound),
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
                currentRound: this.currentRoundFunction(newRound),
                currentWinners: this.state.winRank,
                currentPassed: this.state.passRank,
            })
        this.pointCountHandler();
        }        
   
}

passFunction = () => {
    //const players = this.state.curRound
    const player = this.state.player
    const passed = this.state.passRank
    const newRound = ['player1', 'player2', 'player3', 'player4']

    passed.push(player)
    //cur round of 0 means the player that leaded won the match and is now in the winrank array

    if (this.state.curRound.length === 1) {
        socket.emit('new move', { 
            gameId: this.state.roomId,
            playedOnline: [],
            p1: this.state.p1Online,
            p2: this.state.p2Online,
            p3: this.state.p3Online,
            p4: this.state.p4Online,
            turn: this.state.passRank[0],
            currentRound: this.newRoundFunction(newRound),
            currentWinners: this.state.winRank,
            currentPassed: [],
        })
    }
            // normal pass 
    if (this.state.curRound.length > 2) {
            socket.emit('new move', { 
                gameId: this.state.roomId,
                playedOnline: this.state.playedCard,
                p1: this.state.p1Online,
                p2: this.state.p2Online,
                p3: this.state.p3Online,
                p4: this.state.p4Online,
                turn: this.turnFunction(),
                currentRound: this.currentRoundFunction(this.state.curRound),
                currentWinners: this.state.winRank,
                currentPassed: this.state.passRank,
            })   
        }
    if (this.state.curRound.length === 2) {
        if (this.state.player === this.state.curRound[0]) {
            socket.emit('new move', { 
                gameId: this.state.roomId,
                playedOnline: [],
                p1: this.state.p1Online,
                p2: this.state.p2Online,
                p3: this.state.p3Online,
                p4: this.state.p4Online,
                turn: this.state.curRound[1],
                currentRound: this.newRoundFunction(newRound),
                currentWinners: this.state.winRank,
                currentPassed: [],
            })
        }
        if (this.state.player === this.state.curRound[1]) {
            socket.emit('new move', { 
                gameId: this.state.roomId,
                playedOnline: [],
                p1: this.state.p1Online,
                p2: this.state.p2Online,
                p3: this.state.p3Online,
                p4: this.state.p4Online,
                turn: this.state.curRound[0],
                currentRound: this.newRoundFunction(newRound),
                currentWinners: this.state.winRank,
                currentPassed: [],
            })
        }
    }
}
 
playButton = () => {
    // checks if the card can be played specifically the bomb
    if (this.state.selectArr.length === this.state.playedCard.length && this.state.playedCard.length > 0 && this.state.bombTrue === false) {
    return (
        <div  className = 'playButton'>
            <button onClick= {() => this.playFunction()}>PLAY</button>
        </div>
    )
    }
    if (this.state.playedCard.length === 0) {
        // prevent doubles from being non pairs
        if (this.state.selectArr.length === 2) {
            if (this.state.selectArr[0].charAt(0) === this.state.selectArr[1].charAt(0)) {
             return (
                <div  className = 'playButton'>
                    <button onClick= {() => this.playFunction()}>PLAY</button>
                </div>
                    )   
            }
        }    else {
            if (this.state.selectArr.length > 0) {
                return (
                    <div  className = 'playButton'>
                        <button onClick= {() => this.playFunction()}>PLAY</button>
                    </div>
                )    
            }
            }
    }
    if (this.state.bombTrue === true) {
        if (this.state.selectArr.length === 8) {
            if (bombCheck(this.state.selectArr).length >= 4) {
                return (
            <div  className = 'playButton'>
                <button onClick= {() => this.playFunction()}>PLAY</button>
            </div>
                )   
            }    
        }
        if (this.state.selectArr.length === this.state.playedCard.length && this.state.playedCard.length > 0 && this.state.selectArr[0] > this.state.playedCard[this.state.playedCard.length -1]) {
            return (
                <div  className = 'playButton'>
                    <button onClick= {() => this.playFunction()}>PLAY</button>
                </div>
            )
            }
            if (this.state.playedCard.length === 0) {
                // prevent doubles from being non pairs
                if (this.state.selectArr.length === 2) {
                    if (this.state.selectArr[0].charAt(0) === this.state.selectArr[1].charAt(0)) {
                     return (
                        <div  className = 'playButton'>
                            <button onClick= {() => this.playFunction()}>PLAY</button>
                        </div>
                            )   
                    }
                }    else {
                    if (this.state.selectArr.length > 0) {
                        return (
                            <div  className = 'playButton'>
                                <button onClick= {() => this.playFunction()}>PLAY</button>
                            </div>
                        )    
                    }
                    }
            } else return null 
    }
}
passButton = () => {
    if (this.state.selectArr.length === 0) {
    if (this.state.playedCard.length > 0 && this.state.currentTurn === this.state.player) {    
    return (
        <div  className = 'passButton'>
            <button onClick = {() => this.passFunction()}>PASS</button>
        </div>
    )
} else {
    return null
}
}
}
turnAnnouncer = () => {
    if (!this.state.currentTurn) {
        return null
    } 
    if (this.state.currentTurn === this.state.player) {
        return (
            <div className = 'turn-accouncer'>Your turn</div>
        )
    }
    else {
        return(
            <div className = 'turn-accouncer'>
            {this.state.currentTurn}'s turn
            </div>
        ) 
    }
}

playerStats = (player) => {
    player = this.state.player
    switch (player) {
        default:
            return;
        case 'player1':
            return (
                <div className ='player-stats'>
                    <div>
                    <img src={require(`./Assets/${this.state.p1Profile}.png`).default} alt="Logo" />
                    </div>
                    <p>You are player 1</p>
                    <p>Wins: {this.state.p1Counter}</p>
                    <p>Points: {this.state.p1Points}</p>
                </div>
            )
        case 'player2':
            return (
                <div className ='player-stats'>
                    <div>
                    <img src={require(`./Assets/${this.state.p2Profile}.png`).default} alt="Logo" />
                    </div>
                    <p>You are player 2</p>
                    <p>Wins: {this.state.p2Counter}</p>
                    <p>Points: {this.state.p2Points}</p>       
                </div>
            ) 
        case 'player3':
            return (
                <div className ='player-stats'>
                    <div>
                    <img src={require(`./Assets/${this.state.p3Profile}.png`).default} alt="Logo" />
                    </div>
                    <p>You are player 3</p>
                    <p>Wins: {this.state.p3Counter}</p>
                    <p>Points: {this.state.p3Points}</p>       
                </div>
            )
        case 'player4':
            return (
                <div className ='player-stats'>
                    <div>
                    <img src={require(`./Assets/${this.state.p4Profile}.png`).default} alt="Logo" />
                    </div>
                    <p>You are player 4</p>
                    <p>Wins: {this.state.p4Counter}</p>
                    <p>Points: {this.state.p4Points}</p>       
                </div>
            )           
    }
}
pointCountHandler = () => {
    counter (this.state.winRank, this.state.roomId, this.state.p1Counter, this.state.p2Counter, this.state.p3Counter, this.state.p4Counter, this.state.p1Points, this.state.p2Points, this.state.p3Points, this.state.p4Points)
}
shopMenu () {
    if (this.state.shopMenuOpen === true) {
return(
    <div className="shop">
        {shop(this.state.roomId, this.state.player, this.state.p1Counter, this.state.p2Counter, this.state.p3Counter, this.state.p4Counter, this.state.p1Points, this.state.p2Points, this.state.p3Points, this.state.p4Points, this.state.p1Profile, this.state.p2Profile, this.state.p3Profile, this.state.p4Profile, this.state.CurrentBackgroundId)}
        </div>
)
    } else {
        return null
    }
}
shopMenuButton() {
    if (this.state.shopMenuOpen === false) {
        this.setState({
            shopMenuOpen: true
        })
    } else {
        this.setState({
            shopMenuOpen: false
        })
    }
}
render() {
    return(
        <div className = 'table'>
            <div className = 'otherDeck'>
            {this.otherDeck()}
            </div>
                <div className='Square'>
                {this.joinRoom()}
                {this.turnAnnouncer()}
                <div className ='played-cards'>
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
                <div className = 'action-buttons'>
                    {this.passButton()}{this.playButton()}
                <div className = 'player'>
                    <div className = 'selected-hand'>
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
                <div  className = 'hand'>
                {this.state.pHand.map((item, i) => (
                                <img
                                    alt = ''
                                    key={i}
                                    className='Card'
                                    src={require(`./Deck/assets/Faces/${item}.png`).default}
                                    onClick={() => this.checkCard(item)}
                                    />
                ))}
                </div>
                {this.playerStats()}
                <button onClick={() => this.shopMenuButton()} className = 'shop-button'><img src={require(`./Assets/shop.png`).default} alt="Logo" className="store"/></button>
{this.shopMenu()}
                </div>
                </div>
                
                :             
                <div className = 'introduction'>
                    <p>Game will begin when seats are full.</p> <p>Click an empty seat to join as that player.</p> <p>Turns will go counter clockwise.</p>
                </div>
                }
            </React.Fragment>
<div>

</div>
</React.Fragment> 
            
        </div>
    )
    }
}


const GameRoom = () => {
    
function JoinGame () {
    const data = {
        gameId : gameid,
    }
    socket.emit("playerJoinGame", data)
}
const { gameid } = useParams()

    JoinGame(gameid)

    return(
        <div>
            <h1>
            <Game />
            </h1>
        </div>
    )
}

export default GameRoom;