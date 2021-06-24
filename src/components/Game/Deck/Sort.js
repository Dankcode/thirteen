export default function sortCards(array) { 

   const sorting = array.map(i => i.charAt(0).replace('s', 'a').replace('c', 'b') + i.charAt(1).replace('J', 'a').replace('Q', 'b').replace('K', 'c').replace('A', 'd').replace('2', 'e')
   )

   const result = array.map(function(item) {
    var n = sorting.indexOf(item[0]);
    sorting[n] = '';
    return [n, item]
}).sort().map(function(j) { return j})

return result
}

