import React from 'react';
import './Shop.css';
const socket  = require('../connections/socket').socket

export default function shop (roomId, player, p1Counter, p2Counter, p3Counter, p4Counter, p1Points, p2Points, p3Points, p4Points, p1Profile, p2Profile, p3Profile, p4Profile, currentBackgroundId) {

function buyFunction (cost) {
    if (player === 'player1') {
        if (p1Points >= cost) {
        socket.emit('new profile', {
            gameId: roomId,
            p1Counter: p1Counter,
            p2Counter: p2Counter,
            p3Counter: p3Counter,
            p4Counter: p4Counter,
            p1Points: p1Points - cost,
            p2Points: p2Points,
            p3Points: p3Points,
            p4Points: p4Points,
        })  
        }
    }
}
//p1 function
function p1ItemFunction (item) {
    if (item === 'profileChange1') {
        console.log('change')
        return p1ProfileChange1();
    }
    if (item === 'profileChange2') {
        console.log('change')
        return p1ProfileChange2();
    }
    if (item === 'profileChange3') {
        console.log('change')
        return p1ProfileChange3();
    }
    if (item === 'backgroundChange1') {
        console.log('change')
        return backgroundChange1();
    }
}
//p2 function 
function p2ItemFunction (item) {
    if (item === 'profileChange1') {
        console.log('change')
        return p2ProfileChange1();
    }
    if (item === 'profileChange2') {
        console.log('change')
        return p2ProfileChange2();
    }
    if (item === 'profileChange3') {
        console.log('change')
        return p2ProfileChange3();
    }
    if (item === 'backgroundChange1') {
        console.log('change')
        return backgroundChange1();
    }
}
//p3 function 
function p3ItemFunction (item) {
    if (item === 'profileChange1') {
        console.log('change')
        return p3ProfileChange1();
    }
    if (item === 'profileChange2') {
        console.log('change')
        return p3ProfileChange2();
    }
    if (item === 'profileChange3') {
        console.log('change')
        return p3ProfileChange3();
    }
    if (item === 'backgroundChange1') {
        console.log('change')
        return backgroundChange1();
    }
}
//p4 function 
function p4ItemFunction (item) {
    if (item === 'profileChange1') {
        console.log('change')
        return p4ProfileChange1();
    }
    if (item === 'profileChange2') {
        console.log('change')
        return p4ProfileChange2();
    }
    if (item === 'profileChange3') {
        console.log('change')
        return p4ProfileChange3();
    }
    if (item === 'backgroundChange1') {
        console.log('change')
        return backgroundChange1();
    }
}
function buyButton (cost, item) {
    // for player 1 function
    if (player === 'player1') {
        if (p1Points >= cost) {
            return (
                <div className ='buy'>
                    <button className ='buy' onClick = {() => {buyFunction(cost); p1ItemFunction(item)}}>BUY</button>
                </div>
            )
        } else {
            return (
                <div className ='cant-buy'>
                <button>CANT BUY</button>
                </div>
            )
        }
    }
        // for player 2 function
    if (player === 'player2') {
        if (p2Points >= cost) {
            return (
                <div className ='buy'>
                    <button onClick = {() => {buyFunction(cost); p2ItemFunction(item)}}>BUY</button>
                </div>
            )
        } else {
            return (
                <div className ='cant-buy'>
                <button>CANT BUY</button>
                </div>
            )
        }
    }
        // for player 3 function
    if (player === 'player3') {
        if (p3Points >= cost) {
            return (
                <div className ='buy'>
                    <button onClick = {() => {buyFunction(cost); p3ItemFunction(item)}}>BUY</button>
                </div>
            )
        } else {
            return (
                <div className ='cant-buy'>
                <button>CANT BUY</button>
                </div>
            )
        }
    }
        // for player 4 function
    if (player === 'player4') {
        if (p4Points >= cost) {
            return (
                <div className ='buy'>
                    <button onClick = {() => {buyFunction(cost); p4ItemFunction(item)}}>BUY</button>
                </div>
            )
        } else {
            return (
                <div className ='cant-buy'>
                <button>CANT BUY</button>
                </div>
            )
        }
    }
}
//picture changes here
//player 1
function p1ProfileChange1 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: 'player1',
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p1ProfileChange2 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: 'player2',
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p1ProfileChange3 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: 'player3',
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
//player 2
function p2ProfileChange1 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: 'player1',
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p2ProfileChange2 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: 'player2',
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p2ProfileChange3 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: 'player3',
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
//player 3
function p3ProfileChange1 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: 'player1',
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p3ProfileChange2 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: 'player2',
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p3ProfileChange3 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: 'player3',
        p4Profile: p4Profile,
        currentBackgroundId: currentBackgroundId,
    }) 
}
//player 4
function p4ProfileChange1 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: 'player1',
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p4ProfileChange2 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: 'player2',
        currentBackgroundId: currentBackgroundId,
    }) 
}
function p4ProfileChange3 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: 'player3',
        currentBackgroundId: currentBackgroundId,
    }) 
}
//background changers here
function backgroundChange1 () {
    socket.emit('new item', {
        gameId: roomId,
        p1Profile: p1Profile,
        p2Profile: p2Profile,
        p3Profile: p3Profile,
        p4Profile: p4Profile,
        currentBackgroundId: 'Circle',
    }) 
}
return (
    <div className ='shop-menu'>
        <p>Change your profile picture with points</p>
        <li className ='shop-list'>
            <div className = 'shop-item'>
                <img src={require(`./Assets/player1.jpg`).default} alt="Logo" className = 'item'/>
                <div className = 'buy-button'> 
                <p>300 points</p>
                {buyButton(100, 'profileChange1')}
            </div>
            </div>

        </li>
        <li className ='shop-list'>
            <div className = 'shop-item'>
                <img src={require(`./Assets/player2.jpg`).default} alt="Logo" className = 'item'/>
                <div className = 'buy-button'> 
            <p>300 points</p>
                {buyButton(300, 'profileChange2')}
            </div>
            </div>

        </li>
        <li className ='shop-list'>
            <div className = 'shop-item'>
                <img src={require(`./Assets/player3.jpg`).default} alt="Logo" className = 'item'/>
                <div className = 'buy-button'> 
            <p>300 points</p>
                {buyButton(300, 'profileChange3')}
            </div>
            </div>

        </li>

    </div>
)
}

