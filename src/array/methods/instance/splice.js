// practice splice method
// slice method returns a new array with the selected elements
// splice method changes the original array

// arguments: start index, delete count (optional), elements to add ( optional )

//  from index 0 to 4
let result

// take element from index 4 to the end of the array
result = str.splice(4)
console.log("d to j", result) //  [ 'e', 'f', 'g', 'h', 'i', 'j' ]
console.log("original array ", str) //  [ 'a', 'b', 'c', 'd' ]
console.log()

str = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// from index 0, delete 4 elements
result = str.splice(0, 4)
console.log("a to d", result) // [ 'a', 'b', 'c', 'd' ]
console.log("original array ", str) //  [ 'e', 'f', 'g', 'h', 'i', 'j' ]
console.log()

str = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// add 1 element "z" to original array
// from index 0, delete 4 elements, add 1 element "z" to original array
result = str.splice(0, 4, "z") // [ 'a', 'b', 'c', 'd' ]
console.log("a to d", result) // [ 'z' ]
console.log("original array ", str) // [ 'z', 'e', 'f', 'g', 'h', 'i', 'j' ]
console.log()

str = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// add 2 elements "z" and "y" to original array at index 3
// delete nothing
result = str.splice(3, 0, "z", "y")
console.log("nothing", result) // []
console.log("original array ", str) // [ 'a', 'b', 'c', 'z', 'y', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]
// -----------------------------------------------------------------------
