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
  "sA", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "sJ", "sQ", "sK",
  "hA", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "hJ", "hQ", "hK",
  "cA", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "cJ", "cQ", "cK",
  "dA", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "dJ", "dQ", "dK",
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
