/*
 * entries() method of Array instances returns
 * a new array iterator object that contains the
 * key/value pairs for each index in the array.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
 * An Iterator object is an object that conforms
 * to the iterator protocol by providing a next() method
 * that returns an iterator result object.
 */

const array1 = ['a', 'b', 'c'];

const iterator1 = array1.entries();
console.log(iterator1);

console.log(iterator1.next().value);
// [0, "a"]

console.log(iterator1.next().value);
// [ 1, 'b' ]

const winCombos = [
  [0, 1, 2], // 0
  [3, 4, 5], // 1
  ['a', 'b', 'c'], // 2 X
  [0, 3, 6], // 3
  [9, 9, 9], // 4 X
  [2, 5, 8], // 5
  [0, 4, 8], // 6
  [7, 9, 8], // 7 X
];

/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries */
// .entries()
console.log('winCombos.entries()', winCombos.entries());

// Iterating with for of loop
for (let [index, win] of winCombos.entries()) {
  // console.log(win);
}
/*
  [0, 1, 2], 
  [3, 4, 5], 
  ['a', 'b', 'c'], 
  [0, 3, 6], 
  [9, 9, 9], 
  [2, 5, 8], 
  [0, 4, 8], 
  [7, 9, 8], 
 */

// -------------------------------------------------------------------------
// Example 1
let plays = [0, 2, 3, 4, 5];
//
let arr = [];
for (let [index, win] of winCombos.entries()) {
  //   console.log("win", win) // each row -> [ 0, 1, 2 ],  [ 3, 4, 5 ], ....
  win.find((elem, indi) =>
    // if the element is in plays than add that to
    // arr else return arr
    {
      if (plays.indexOf(elem) > -1) {
        arr = [...arr, index];
        return true;
      }
    }
  );
  // break;
}
console.log('arr ', arr); // [0, 1, 3, 5, 6]

// -------------------------------------------------------------------------
// for Obejct we use Object.entries

const obj = { 0: 'a', 1: 'b', 2: 'c' };

for (let [key, value] of Object.entries(obj)) {
  console.log('value', value);
}
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
