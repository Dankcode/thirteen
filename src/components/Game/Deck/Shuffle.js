 
 
export default function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp;
    }   
    return array
}
// Array is inside an array THIS CODE ONLY TARGETS outside array

/*
export default function shuffleArray() {
    let counter = this.length, temp, i;

    while (counter){
        i = Math.floor(Math.random() * counter --);
        temp = this.deck[counter];
        this.deck[counter] = this.deck[i];
        this.deck[i] = temp;
    }
    return this.deck
}
 
*/