// Array constructor with single parameter
/*
 * array can be created using construstor with a single number parameter.
 * An array is created with its length property set to that number,
 * and the array elements are empty slots.
 */
const array1 = new Array(5);
console.log('array1 ', array1[0]); // undefined
console.log('array1 ', array1[1]); // undefined
console.log(Object.getOwnPropertyNames(array1)); // ['length]
console.log('array1 length ', array1.length); // 5
/* 
keys were never set 
*/

// --------------------------------------------------------------------------------

// Array constructor with multiple parameters
/*
 * If more than one argument is passed to the constructor,
 * a new Array with the given elements is created.
 */

const array2 = Array(1, 2, 3);
console.log('array2 ', array2); // 1
console.log('array2 ', array2[1]); // 2
console.log(Object.getOwnPropertyNames(array2)); // [ '0', '1', '2', 'length' ]
array2.map((ele) => console.log('ele ', ele));
// 1
// 2
// 3
