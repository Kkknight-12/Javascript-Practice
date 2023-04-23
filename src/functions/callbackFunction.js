/*
 a function passed as an argument to a function. This function that is passed as an argument inside of another function is called a callback function.  
*/

function comparatorTwo(pred) {
  return (x, y) => pred(x, y) // 6 < 5 -> false
}
// function comparatorTwo(pred) {
//   return (x, y) => {
//     if (pred(x, y)) return -1 // 6 < 5
//     if (pred(y, x)) return 1 // 5 < 6
//     return 0
//   }
// }

// argument 0: -> (a, b) => a < b
const trial = comparatorTwo((a, b) => a < b)
console.log(trial(6, 5)) // false

// ------------------------------------------------------------------------

function tempFuncInvoke(athing) {
  return (aarg) => console.log(athing(aarg)) // athing function invocation
}

// athing function which is annonymous function here
// body of the function is here
const varibleKanam = tempFuncInvoke((num) => num + 1) //
varibleKanam(2) // 3
