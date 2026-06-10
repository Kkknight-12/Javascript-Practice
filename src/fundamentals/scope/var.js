/*
https://www.notion.so/Var-let-Const-b021b742368f42058c16508373a9d087
*/

////////////
// SCOPE  //
////////////
var a = 1

function add1() {
  return (a = a + 1)
}

console.log(add1()) // 2
// when you define variable with var
// and you change that even inside function
// you change the value of
// that variable in global scope
console.log(a) // 2

// Declaring variables with the var keyword will add
// them to the window object.
/*  
var currentlyEatingV = "ice cream"
window.currentlyEatingV === currentlyEatingV
// true!

let currentlyEatingL = "ice cream"
window.currentlyEatingL === currentlyEatingL
// false!
*/

// counter variable is local to the increase() function.
// It cannot be accessible outside of the function.
function increase() {
  var counter = 10
  return counter
}
console.log(increase()) // 10
// console.log(counter) // ReferenceError: counter is not defined

for (var i = 0; i < 5; i++) {
  console.log(`Inside the loop: ${i}`) // 0 1 2 3 4
}
console.log(`Outside the loop: ${i}`) // Outside the loop: 5
