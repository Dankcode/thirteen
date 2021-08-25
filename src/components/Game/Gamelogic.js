


/*
game logic contains rules behind cards being played
if allowed or not
============
bsically every possible play avaialble
============
*/
export default function gameLogic (selectedCard, selectedArr,  playedArr, playerHand, bombArr, bombCheck, isTurn) {
    const pairs = playedArr.length 
    const selectedPairs = selectedArr.length
    const suitPlayed = playedArr.map(i => i.charAt(1))
    const rankPlayed = playedArr.map(i => i.charAt(0))
    //const suitSelected = selectedArr.map(i => i.charAt(1))
    const rankSelected = selectedArr.map(i => i.charAt(0))
    //const suitHand = playerHand.map(i => i.charAt(1)) 
    //const rankHand = playerHand.map(i => i.charAt(0))  
    const suit = selectedCard.charAt(1)
    const rank = selectedCard.charAt(0)
function rule () {
    switch (rankSelected[rankSelected.length -1]) {
        default:
            return;
        case '3':
            if (rank === '4') {
                return '1up'
            }
            break;
        case '4':
            if (rank === '5') {
                return '1up'
            }
            break;
        case '5':
            if (rank === '6') {
                return '1up'
            }
            break;
        case '6':
            if (rank === '7') {
                return '1up'
            }
            break;
        case '7':
            if (rank === '8') {
                return '1up'
            }
            break;
        case '8':
            if (rank === '9') {
                return '1up'
            }
            break;   
        case '9':
            if (rank === 'a') {
                return '1up'
            }
            break;
        case 'a':
            if (rank === 'b') {
                return '1up'
            }
            break;
        case 'b':
            if (rank === 'c') {
                return '1up'
            }
            break;
        case 'c':
            if (rank === 'd') {
                return '1up'
            } 
            break;
        case 'd':
            if (rank === 'e') {
                return '1up'
            }
            break;
        case 'e':
            if (rank === 'f') {
                return '1up'
            }
            break;          
    }
}
if (isTurn === true) {
        //must find length first
        // must find suit and then number and ONLY allow to select playable cards
// empty board
if (pairs === 0) {
    //for chains
    if (selectedPairs >= 1 && rankSelected[0] !== rankSelected[1]){
        if (rule() === '1up') {
            return 'allow'
        }
    }
    // pairs
    if (rank === rankSelected[0]) {
        return 'allow'
    }
    // singles
    if (selectedPairs === 0) {
        return 'allow'
    }
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
        if (rankPlayed[0] === rank && suitPlayed[suitPlayed.length -1] === 'h') {
            if (rank > rankPlayed[0]) {
                return 'allow'
            } else {
                return null
            }
        }
        if (selectedPairs === 2) {
            if (rankPlayed[0] === rankSelected[0]) {
                if (suit > suitPlayed[suitPlayed.length -1] && rule() === '1up') {
                    return 'allow'
                }
            } else {
                if (rule() === '1up') {
                    return 'allow'
                }
            }
        } 
        else {
            if (selectedPairs === 0) {
                if (rank === rankPlayed[0] || rank > rankPlayed[0]) {
                    return 'allow'
                } 
            }
        //next card played lines up
            if (rank > rankSelected[0]) {
                if (rule() === '1up') {
                    return 'allow'
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
        if (rankPlayed[0] === rank && suitPlayed[suitPlayed.length -1] === 'h') {
            if (rank > rankPlayed[0]) {
                return 'allow'
            } 
        }
        if (selectedPairs === 3) {
            if (rankPlayed[0] === rankSelected[0]) {
                if (suit > suitPlayed[suitPlayed.length -1] && rule() === '1up') {
                    return 'allow'
                }
            } else {
                if (rule() === '1up') {
                    return 'allow'
                }
            }
        } 
        else {
            if (selectedPairs === 0) {
                if (rank === rankPlayed[0] || rank > rankPlayed[0]) {
                    return 'allow'
                } 
            }
        //next card played lines up
        if (rank > rankSelected[0]) {
            if (rule() === '1up') {
                return 'allow'
            }
        }
        }
    }
}

//CHAINS
if (pairs > 4) {
    //same rank, higher suit
    if (rankPlayed[0] === rank && suitPlayed[suitPlayed.length -1] === 'h') {
        if (rank > rankPlayed[0]) {
            return 'allow'
        } 
    }
    // make sure last card is higher than the last card of the chain
    if (selectedPairs === pairs-1) {
        if (rankPlayed[0] === rankSelected[0]) {
            if (suit > suitPlayed[suitPlayed.length -1] && rule() === '1up') {
                return 'allow'
            }
        } else {
            if (rule() === '1up') {
                return 'allow'
            }
        }
    } 
    //next card played lines up
    else {
        if (selectedPairs === 0) {
            if (rank === rankPlayed[0] || rank > rankPlayed[0]) {
                return 'allow'
            } 
        }
        if (rank > rankSelected[0]) {
            if (rule() === '1up') {
                return 'allow'
            }
        }
    }
}
    
// BOMBS
else {
    for (let i = 0; i < bombArr.length; i++) {
if (rank === bombArr[i]  ) {
    if (selectedPairs === 0) {
        return 'allow'
    }
    else {
        if (selectedPairs % 2 !== 0) {
            if (rank === rankSelected[rankSelected.length -1]) {
                return 'allow'
        }
    }
        if (selectedPairs % 2 === 0) {
            if (rule() === '1up') {
                return 'allow'
        }
    }
    }
}
}
}
    

}
}