const winCombos = [
  [0, 1, 2], // 0
  [3, 4, 5], // 1
  [6, 7, 8], // 2
  [0, 3, 6], // 3
  [1, 4, 7], // 4
  [2, 5, 8], // 5
  [0, 4, 8], // 6
  [6, 4, 2], // 7
]

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries */
// .entries()
console.log("winCombos.entries()", winCombos.entries())

for (let [index, win] of winCombos.entries()) {
  //   console.log(win)
}
/* [ 0, 1, 2 ]
[ 3, 4, 5 ]
[ 6, 7, 8 ]
[ 0, 3, 6 ]
[ 1, 4, 7 ]
[ 2, 5, 8 ]
[ 0, 4, 8 ]
[ 6, 4, 2 ] */

// -------------------------------------------------------------------------
// Example 1
let plays = [0, 2, 3, 4, 5]
//
let arr = []
for (let [index, win] of winCombos.entries()) {
  //   console.log("win", win) // each row -> [ 0, 1, 2 ],  [ 3, 4, 5 ], ....
  win.find((elem, indi) =>
    // if the element is in plays than add that to
    // arr else return arr
    plays.indexOf(elem) > -1 ? (arr = [...arr, index]) : arr
  )
  // break;
}
console.log(arr) // [0, 1, 3, 5, 6]

// -------------------------------------------------------------------------
// for Obejct we use Object.entries

const obj = { 0: "a", 1: "b", 2: "c" }

for (let [key, value] of Object.entries(obj)) {
  console.log("value", value)
}
console.log(Object.entries(obj)) // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
