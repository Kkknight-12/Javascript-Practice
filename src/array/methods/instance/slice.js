// practice slice method

let str = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

// arguments: start index, end index

// from index 0 to index 4
// console.log(str.slice(0, 4)); // [ 'a', 'b', 'c', 'd' ]

// from index 4 to index 8
// console.log(str.slice(4, 8)); // [ 'e', 'f', 'g', 'h' ]

// from index 8 to the end of the array
console.log(str.slice(8)) // [ 'i', 'j' ]
console.log()

// -----------------------------------------------------------------------
// slice
//             0   ,     1    ,    2   ,    3   ,   4x
let faal = ["Banana", "Orange", "Lemon", "Apple", "Mango"]

let newFaal = []
// remove something from middle
// Lemon
newFaal = newFaal.concat(faal.slice(0, 2), faal.slice(2 + 1))
console.log("Lemon removed", newFaal)

// select from 0 to 1 index
console.log(faal.slice(0, 2))

// select after 3 to last element
console.log(faal.slice(2 + 1))

// remove first element in array
console.log("remove first element", faal.slice(1))

// select last element
faal = ["Banana", "Orange", "Lemon", "Apple", "Mango"]
console.log("select last element", faal.slice(-1))

// remove last element
console.log("remove last element", faal.slice(0, faal.length - 1))
