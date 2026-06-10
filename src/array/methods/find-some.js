/*
 * It calls a provided callbackFn function once for
 * each element in an array in ascending-index order,
 * until callbackFn returns a truthy value. find()
 * then returns that element and stops iterating
 * through the array. If callbackFn never returns a
 * truthy value, find() returns undefined.
 */

const array1 = [5, 12, 8, 130, 44];
const foundElement = array1.find((element, index) => element > 10);

console.log('foundElement ', foundElement);
// Expected output: 12

const found = array1.find((element, index) => {
  if (element > 10) {
    array1[index] = 'XX';
    return true; // true will stop the iteration
    // return element; // will also stop the iteration
  }
});

console.log(array1);
// [ 5, 'XX', 8, 130, 44 ]
console.log(found);
// Expected output: 12

// ----------------------------------------------------------

// some method is used to check if at least one element
// in the array passes the test implemented by the provided function.
// It returns a boolean value.
const foundSome = array1.some((element) => {
  if (element > 10) return element;
});

console.log(foundSome);
// Expected output: true
