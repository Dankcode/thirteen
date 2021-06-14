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

============
*/
class Gamelogic extends React.Component {


}
export default Gamelogic; 