import React, { useEffect, useState } from 'react';
import deck from './Deck/Deck.js';
const socket  = require('../connections/socket').socket

export default function bombCheck (playerHand) {
    const suitHand = playerHand.map(i => i.charAt(1)) 
    const rankHand = playerHand.map(i => i.charAt(0))  

const findDupes = (arr) => {
let sorted_arr = rankHand.slice().sort()
let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] === sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  return results;
}

const dupeArr = findDupes(rankHand)

const findBomb = (arr) => {
var j;
for (j = 0; j < arr.length; j++) {
    if (arr[j + 3] - arr[j] === 3 ) {
        return 'nuclear';
    } else {
        switch (arr[j]) {
        default:
            return;
        case '7':
            if (arr[j + 3] === 'a') {
                return 'nuclear';
            }
            break;
        case '8':
            if (arr[j + 3] === 'b') {
                return 'nuclear';
            }
            break;        
        case '':
            if (arr[j + 3] === 'c') {
                return 'nuclear';
            }
            break;    
        case 'a':
            if (arr[j + 3] === 'd') {
                return 'nuclear';
            }
            break;
        case 'b':
            if (arr[j + 3] === 'e') {
                return 'nuclear';
            }
            break;
        case 'c':
            if (arr[j + 3] === 'f') {
                return 'nuclear';
            }
            break;
        }
    }
}
}
function mineSweep (arr) {
if (dupeArr.length >= 4)   { 
    if(arr === 'nuclear') {
        dupeArr.splice(4)
        return dupeArr;
    } else {
        dupeArr.shift()
        mineSweep(findBomb(dupeArr));
    }
} 
}

mineSweep(findBomb(dupeArr))
console.log(dupeArr)

return dupeArr;
}