import React from 'react';
import CreateNewGame from '../../Join/CreateNewGame';
const socket  = require('../../connections/socket').socket



/* generate deck of cards first
display 13 cards for player 1
rest of players come after
pass turn button works


use State Class to generate DECK and then
*/
/*
const SUITS = ["S", "C", "D", "H"]
const RANKS = ["2", "3","4","5","6","7","8","9","10","J","Q","K","A"] 

class Deckgen {
    constructor(cards = createDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit,rank){
        this.suit = suit
        this.rank = rank
    }
}

function createDeck() {
    return SUITS.flatMap(suit => {
        return RANKS.map(rank => {
            return new Card(suit, rank);
        })
    })
    }

const deck = new Deckgen();
deck.shuffle()
*/
const deck = [
  "ea", "fa", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "aa", "ba", "ca", "da",
  "eh", "fh", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "ah", "bh", "ch", "dh",
  "ec", "fc", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "ac", "bc", "cc", "dc",
  "ed", "fd", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "ad", "bd", "cd", "dd",
  ];
export default deck;



/*
const SUITS = ["S", "C", "D", "H"]
const RANKS = ["2", "3","4","5","6","7","8","9","10","J","Q","K","A"] 

class Deckgen {
    constructor(cards = createDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit,rank){
        this.suit = suit
        this.rank = rank
    }

    getCard() {
        const cardDiv = <div>
            <h1>{this.suit} {this.rank}</h1>
        </div>
        return cardDiv        
    }
}

function createDeck() {
    return SUITS.flatMap(suit => {
        return RANKS.map(rank => {
            return new Card(suit, rank);
        })
    })
    }

const deck = new Deckgen();
deck.shuffle()




class Deck extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        genDeck: false,
        totalDeck: ''
    }
};

cardGen = () => {
    console.log(deck.cards)
    const deckcards = deck.cards
    var adddeck = this.state.totalDeck.concat(deckcards)
        this.setState({
            totalDeck: adddeck
        })
    socket.emit(('Deck generated', this.state.totalDeck))
}
//function that renders visible suits and values to the card
makeCard = () => {
    
}

render(){
    return(
        <div>
            <h3>
                <button onClick = {this.cardGen}>TEST TECK </button>
            
            <button onClick = {this.makeCard}>GET CARD </button>
            {this.state.totalDeck}
            </h3>
        </div>
    )
}
}


export default Deck;

*/
