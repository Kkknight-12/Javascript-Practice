/*
 * flat() method of Array instances creates a
 * new array with all sub-array elements concatenated
 * into it recursively up to the specified depth
 *
 * flat()
 * flat(depth)
 *
 * depth Optional
 * The depth level specifying how deep a nested array
 * structure should be flattened. Defaults to 1.
 *
 * Return value
 * A new array with the sub-array elements concatenated into it.
 *
 * The flat() method is a copying method. It does not alter
 * this but instead returns a shallow copy that contains
 * the same elements as the ones from the original array.
 */
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(arr2.flat());
// expected output: [ 0, 1, 2, [ 3, [ 4, 5 ] ] ]

console.log(arr2.flat(2));
// expected output: [ 0, 1, 2, 3, [ 4, 5 ] ]

console.log(arr2.flat(Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]

// --------------------------------------------------------

// flat method return a shallow copy of the array
// In a shallow copy, changes to the copied array (or object) will affect the original array (or object) only when you modify the properties of the objects (or elements of the arrays) that both the original and copied array share.
const arr3 = [10, 11, [12, [13, [14, 15]]]];

console.log(arr3.flat());
// expected output: [ 10, 11, 12, [ 13, [ 14, 15 ] ] ]

const copy = arr3.flat();
console.log(copy[3]); // [ 13, [ 14, 15 ] ]

//                 ↓
//    0,  1,  2,   3-0,      3-1,
//                       3-1-0, 3-1-1
// [ 10, 11, 12, [ 13, [ 14, 15 ] ] ]

copy[3][0] = 99;
console.log(arr3);
// [ 10, 11, [ 12, [ 99, [Array] ] ] ]

// --------------------------------------------------------

// However, if you replace an element of the copied array with a new value or object, it doesn't affect the original array, because the copied array and the original array are separate arrays.


let originalArray = [{ a: 1 }, { b: 2 }, { c: 3 }];
let copiedArray = [...originalArray];

// Modifying an object in copiedArray
copiedArray[0].a = 99;
console.log(originalArray[0]); // { a: 99 } - change is seen in originalArray

// Replacing an element in copiedArray
copiedArray[1] = { d: 4 };
console.log(originalArray[1]); // { b: 2 } - change is not seen in originalArray
