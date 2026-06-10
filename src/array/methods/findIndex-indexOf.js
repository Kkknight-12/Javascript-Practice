/*
 * The indexOf() method of Array instances returns
 * the first index at which a given element can be
 * found in the array, or -1 if it is not present.
 * 
 * indexOf(searchElement)
 * indexOf(searchElement, fromIndex)
 */

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1

// ----------------------------------------------------------

/*
 * The findIndex() method of Array instances returns
 * the index of the first element in an array that
 * satisfies the provided testing function.
 *
 * If no elements satisfy the testing function,
 * -1 is returned.
 * 
 * Like find() method, which returns the first element 
 * that satisfies the testing function (rather than its index)
 *
 * findIndex(callbackFn)
 * findIndex(callbackFn, thisArg)
 */

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3

// ----------------------------------------------------------
