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
console.log(dupeArr)
var j;
for (j = 0; j < dupeArr.length; j ++) {
    if (dupeArr[j + 1] - dupeArr[j] === 1 && dupeArr[j + 2] - dupeArr[j] === 2 && dupeArr[j + 3] - dupeArr[j] === 3 ) {
        return console.log('dank')
}
}
}