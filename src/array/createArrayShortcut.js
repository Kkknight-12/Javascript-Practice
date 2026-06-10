// https://medium.com/@wisecobbler/4-ways-to-populate-an-array-in-javascript-836952aea79f

// Using the Spread Operator

const arr1 = [...new Array(5)];
console.log(arr1);
// [ undefined, undefined, undefined, undefined, undefined ]

console.log(Object.getOwnPropertyNames(arr1));
// [ '0', '1', '2', '3', '4', 'length' ]

var arr2 = Array.of(5); // [5]
console.log(arr2);
console.log(arr2.length); // 1

console.log(Object.getOwnPropertyNames(arr2));
// [ '0', 'length' ]

// -----------------------------------------------------------------------------

// Array.from
/*
 * the first argument of the from method is the object
 * we want to create an array from.
 * The second argument is a function that fills the array
 * with whatever the result of our function is.
 */
let filledArray = Array.from({ length: 3 }, () => ({ hello: 'goodbye' }));
console.log('filledArray ', filledArray);
// filledArray  [ { hello: 'goodbye' }, { hello: 'goodbye' }, { hello: 'goodbye' } ]

// -----------------------------------------------------------------------------

// Array Constructor

let filledArray2 = new Array(5).fill(5);
console.log(filledArray2);

filledArray2[0] = 33;

console.log('filledArray2 ', filledArray2);
// [ 33, 5, 5, 5, 5 ]

console.log(Object.getOwnPropertyNames(filledArray2));
// [ '0', '1', '2', '3', '4', 'length' ]

// NOTE:
/*
 * This method works great for immutable values like numbers,
 * strings, and booleans. But it don't work when we populate an array
 * with objects.
 */

// --------------------------

/*
 * When fill gets passed an object, it will copy the reference
 * and fill the array with references to that object.
 */
let filledArray3 = new Array(10).fill({ hello: 'goodbye' });

// So if we change that object like this:
filledArray3[0].hello = 'adios';
console.log('filledArray3 ', filledArray3);
/* 
[
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' },
  { hello: 'adios' }
]
 */
/*
 * It will change every object in the array because they
 * are all referencing the same object
 */

// expensive map function
let filledArray4 = new Array(10).fill(null).map(() => ({ hello: 'goodbye' }));
// So if we change that object like this:
filledArray4[0].hello = 'adios';
console.log(filledArray4);

// -----------------------------------------------------------------------------
