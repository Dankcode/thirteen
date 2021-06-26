import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
import { ids } from 'webpack';
const socket  = require('../connections/socket').socket


/*
game logic contains rules behind cards being played
if allowed or not
============
bsically every possible play avaialble
============
*/
function Gamelogic (selectedCard, selectedArr,  playedArr, isTurn) {
    const pairs = playedArr.length 
    const selectedPairs = selectedArr.length
    const suitPlayed = playedArr.forEach(i => i.charAt(0))
    const rankPlayed = playedArr.forEach(i => i.charAt(1))
    const suitSelected = selectedArr.forEach(i => i.charAt(0))
    const rankSelected = selectedArr.forEach(i => i.charAt(1))   
    const suit = selectedCard.charAt(0)
    const rank = selectedCard.charAt(1)
    const numbersCards = [3, 4, 5, 6, 7, 8, 9, 10]
    const numbers = numbersCards.map(i => i)
if (isTurn === true) {
        //must find length first
        // must find suit and then number and ONLY allow to select playable cards
// empty board
if (selectedPairs.length === 0) {
    selectedCard(selectedCard)
}
// SINGLES 
if (pairs === 1) {
        // NUMBER CARDS 
        //this is if the same RANK is selected, a suit must be higher 
        if (rankPlayed === rank) {
            if (suit > suitPlayed) {
                selectedCard(selectedCard)
            }
        /*    
            switch (suitPlayed){
                case 'a':
                if (suit === 'c' || 'd' || 'h') {
                    selectedCard(selectedCard)
                }
                case 'c':
                if (suit === 'd' || 'h') {
                        selectedCard(selectedCard)
                }
                case 'd':
                if (suit === 'h') {
                        selectedCard(selectedCard)
                }
                default:
                    return;
            }
        */
        }
        if (selectedCard > playedArr) {
            selectedCard(selectedCard)
/*
        if(rank > rankPlayed || 'J' || 'Q' || 'K' || 'A' || 2) {
            selectedCard(selectedCard)
        }
        //FACE CARDS 
        else {
            switch (rankPlayed){
                case 'J':
                if (rank === 'Q' || 'K' || 'A' || 2) {
                    selectedCard(selectedCard)
                }
                case 'Q':
                if (rank === 'K' || 'A' || 2) {
                    selectedCard(selectedCard)
                }
                case 'K':
                if (rank === 'A' || 2) {
                    selectedCard(selectedCard)
                }
                case 'A':
                if (rank === 2) {
                    selectedCard(selectedCard)
                }
                default:
                    return;
            }
        }
*/
        }
}    

// DOUBLES
if (pairs === 2) {
    if (rankPlayed[0] === rank) {
        if (suit > suitPlayed[0]) {
            selectedCard(selectedCard)
        }
        
    }
    if (rank > rankPlayed[0]) {
        selectedCard(selectedCard)
    }
    //to make doubles = same rank
    if(rankSelected[0] === rank)  {
        selectedCard(selectedCard)
    }
    } 

// TRIPLES 

if (pairs === 3) {
    //TRIPLE PAIRS
    if(rankPlayed[0] === rankPlayed[1]) {
    // triple pairs have no same rank counters
    
    if(rank > rankPlayed[0]) {
        selectedCard(selectedCard)
    }
    // to make the pairs the same rank
    if(rankSelected[0] === rank) {
        selectedCard(selectedCard)
    }
    }
    //TRIPLE ADDs
    else {
        // playing the same ranks when Adds were played
        if (rankPlayed[0] === rank) {
            if (suit > suitPlayed) {
                selectedCard(selectedCard)
            }
        }
        // playing higher cards
        if (rank > rankPlayed[0]) {
            selectedCard(selectedCard)
        }
        //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
            selectedCard(selectedCard)
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            selectedCard(selectedCard)
                        } 
                        break;
                    case 'd':
                        if (rank === 'e') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            selectedCard(selectedCard)
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
        selectedCard(selectedCard)
    }
    // to make the pairs the same rank
    if(rankSelected[0] === rank) {
        selectedCard(selectedCard)
    }
    }
    //quadruple ADDs
    else {
        // playing the same ranks when Adds were played
        if (rankPlayed[0] === rank) {
            if (suit > suitPlayed) {
                selectedCard(selectedCard)
            }
        }
        // playing higher cards
        if (rank > rankPlayed[0]) {
            selectedCard(selectedCard)
        }
        //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
            selectedCard(selectedCard)
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            selectedCard(selectedCard)
                        }
                        break; 
                    case 'd':
                        if (rank === 'e') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            selectedCard(selectedCard)
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
            selectedCard(selectedCard)
        }
    }
    //higher rank, higher suit
    if (rank > rankPlayed[0]) {
        selectedCard(selectedCard)
    }
    //next card played lines up
        if (rank > rankSelected[-1]) {
            // 1 - 9 number cards
            if (rank === rankSelected[-1] + 1) {
            selectedCard(selectedCard)
            }
            //face cards
            else {
                switch (rankSelected[-1]) {
                    default:
                        return;
                    case 'a':
                        if (rank === 'b') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'b':
                        if (rank === 'c') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'c':
                        if (rank === 'd') {
                            selectedCard(selectedCard)
                        }
                        break; 
                    case 'd':
                        if (rank === 'e') {
                            selectedCard(selectedCard)
                        }
                        break;
                    case 'e':
                        if (rank === 'f') {
                            selectedCard(selectedCard)
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
export default Gamelogic; 