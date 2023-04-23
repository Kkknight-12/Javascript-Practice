//splice
/*
splice us used to add/delete elements at any position in array

• first argument is position where you want to start editing
	
• second is how many elements you wants to delete , zero mean nothing to delete
	
• third argument is string which you want to add to your to your array
*/
const months = ["Jan", "March", "April", "June"]
months.splice(1, 0, "Feb") // adding Feb
// inserts at index 1 , delete zero, add Feb
console.log(months)
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May") // replacing June
// insert at index 4, replaces 1 element, add May
console.log(months)
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

let a = [1, 2, 3, 4]
a.splice(-2, 1, 9)
console.log(a) // [1, 2, 9, 4]

console.log("--------------------------")
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
