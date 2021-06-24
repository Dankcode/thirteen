import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
import CreateNewGame from '../Join/CreateNewGame';
import { Redirect, useParams } from 'react-router-dom';
import shuffleArray from './Deck/Shuffle';
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
            switch (suitPlayed){
                case 's':
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
        }
        if (rankPlayed === 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10) {
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
        }
}    

// DOUBLES
if (pairs === 2) {
    //doubles CHECK
    //doubles can only be pairs of the same RANK
    if (rankPlayed[0] === rank) {
        switch (suitPlayed[0]){
        // play card function will check if the array length match
        //double checker will make sure that if a Heart is played the double cannot be selected
            case 's':
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
    }
    if (rankPlayed[0] === 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10) {
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
    }
    } 
// tripples
// quads
//chains 
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
export default Gamelogic; 