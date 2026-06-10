/*
 * The includes() method of Array instances determines
 * whether an array includes a certain value among its
 * entries, returning true or false as appropriate.
 *
 * includes(searchElement)
 * includes(searchElement, fromIndex)
 */

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// Expected output: true

// returns true only if the exact element is found in the array
console.log(pets.includes('at'));
// Expected output: false

// --------------------------------------------------------

/*
 * Calling includes() on non-array objects
 * The includes() method reads the length property
 * of this and then accesses each property whose key
 * is a nonnegative integer less than length.
 */

/*
 * An array-like object is an object that has a length
 * property and whose property keys are indices,
 */
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 1, // ignored by includes() since length is 3
};
console.log(Array.prototype.includes.call(arrayLike, 2));
// true
console.log(Array.prototype.includes.call(arrayLike, 1));
// false

// keys must be within the range of length
const arrayLike2 = { length: 3, 1: 'mayank', 2: 'b', 3: 'c' };
console.log(Array.prototype.includes.call(arrayLike2, 'mayank'));
console.log(Array.prototype.includes.call(arrayLike2, 'b'));
// false
