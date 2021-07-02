import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
const socket  = require('../connections/socket').socket


/*
game logic contains rules behind cards being played
if allowed or not
============
bsically every possible play avaialble
============
*/
export default function gameLogic (selectedCard, selectedArr,  playedArr, playerHand, isTurn) {
    const pairs = playedArr.length 
    const selectedPairs = selectedArr.length
    const suitPlayed = playedArr.map(i => i.charAt(0))
    const rankPlayed = playedArr.map(i => i.charAt(1))
    const suitSelected = selectedArr.map(i => i.charAt(0))
    const rankSelected = selectedArr.map(i => i.charAt(1))
    const suitHand = playerHand.map(i => i.charAt(0)) 
    const rankHand = playerHand.map(i => i.charAt(1))  
    const suit = selectedCard.charAt(0)
    const rank = selectedCard.charAt(1)
if (isTurn === true) {
        //must find length first
        // must find suit and then number and ONLY allow to select playable cards
// empty board
if (pairs < 1) {
    return 'allow'
}
// SINGLES 
if (pairs === 1) {
        // NUMBER CARDS 
        //this is if the same RANK is selected, a suit must be higher 
        
        if (rank > rankPlayed[0]) {
            return 'allow';
        }
        if (rank === rankPlayed[0] && suit > suitPlayed[0]) {
            return 'allow'
    }
    
}    

// DOUBLES
if (pairs === 2) {
    if (selectedPairs === 0) {
        if (rankPlayed[0] === rank) {
            if(suitPlayed[1] !== 'h') {
                return 'allow'
            }
        }
        if (rank > rankPlayed[0]) {
            return 'allow'
        }
    }
    //to make doubles = same rank
    else {
        if(rankSelected[0] === rank)  {
        return 'allow'
        }
    }
} 

// TRIPLES 

if (pairs === 3) {
    //TRIPLE PAIRS
    if(rankPlayed[0] === rankPlayed[1]) {
    // triple pairs have no same rank counters
        if (selectedPairs === 0) {
            if(rank > rankPlayed[0]) {
                return 'allow'
            }
        }

    // to make the pairs the same rank
        if(rankSelected[0] === rank)  {
            return 'allow'
        }
        
    }
    //TRIPLE ADDs
    else {
        // playing the same ranks when Adds were played
        if (selectedPairs === 0) {
        if (rankPlayed[0] === rank && rankPlayed[-1] !== 'h') {
            if (suit > suitPlayed[0]) {
                return 'allow'
            }
        }
        // playing higher cards
            if (rank > rankPlayed[0]) {
                return 'allow'
            }
        }
        
        //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
                return 'allow'
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            return 'allow'
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            return 'allow'
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            return 'allow'
                        } 
                        break;
                    case 'd':
                        if (rank === 'e') {
                            return 'allow'
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            return 'allow'
                        }
                        break;          
                }
            }
        }
    }
}
// QUADS
if (pairs === 4) {
    //QUADRUPLE PAIRS
    if(rankPlayed[0] === rankPlayed[1] && rankPlayed[0] === rankPlayed[2]) {
    // quadruple pairs have no same rank counters
    if(rank > rankPlayed[0]) {
        return 'allow'
    }
    // to make the pairs the same rank
    if(rankSelected[0] === rank) {
        return 'allow'
    }
    }
    //quadruple ADDs
    else {
        // playing the same ranks when Adds were played
        if (rankPlayed[0] === rank) {
            if (suit > suitPlayed) {
                return 'allow'
            }
        }
        // playing higher cards
        if (rank > rankPlayed[0]) {
            return 'allow'
        }
        //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
                return 'allow'
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            return 'allow'
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            return 'allow'
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            return 'allow'
                        }
                        break; 
                    case 'd':
                        if (rank === 'e') {
                            return 'allow'
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            return 'allow'
                        }
                        break;          
                }
            }
        }
    }
}

//CHAINS
if (pairs > 4) {
    //same rank, higher suit
    if (rankPlayed[0] === rank) {
        if (suit > suitPlayed) {
            return 'allow'
        }
    }
    //higher rank, higher suit
    if (rank > rankPlayed[0]) {
        return 'allow'
    }
    //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
                return 'allow'
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            return 'allow'
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            return 'allow'
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            return 'allow'
                        }
                        break; 
                    case 'd':
                        if (rank === 'e') {
                            return 'allow'
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            return 'allow'
                        }
                        break;          
                }
            }
        }
}
// bomb
/*
        if(pairs === 1) {

            // if selected cards surpass 2 then it would just replace it 
            if (selectedPairs > 2) {
                var i;
                for (i = 0; i < selectedArr.length; i ++) {
                    var j;
                        for (j = 0; j < this.state.pHand.length;j  ++)
                            if (selectedArr[i] === this.state.pHand[j]) {
                                selectedArr.splice(i, 1);
                  }
                }
            }
        }
        */
}
}