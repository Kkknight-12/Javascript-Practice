/*
 * indexOf() method of String values searches this
 * string and returns the index of the first occurrence
 * of the specified substring.
 *
 * indexOf(searchString)
 * indexOf(searchString, position)
 * 
 *  indexOf() method is case sensitive.
 */

const paragraph = "I think Ruth's dog is cuter than your dog!";

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(indexOfFirst);
// Expected output: "15"

// The indexOf() second argument.
console.log(paragraph.indexOf(searchTerm, indexOfFirst + 1));
// Expected output: "38"

console.log(paragraph.indexOf(`'`)); // 12

console.log(paragraph.length); // 42

// ------------------------------------------------------------------------------

// indexOf() method is case sensitive
console.log('Blue Whale'.indexOf('blue')); // returns -1

// ------------------------------------------------------------------------------

//  If position is less than zero, the method behaves as it would if position were 0.
console.log('hello world hello'.indexOf('o', -5)); // 4
//  it causes the method to behave as if the second argument were 0

// If position is greater than the length of the calling
// string, the method doesn't search the calling string at all.
console.log('hello world hello'.indexOf('o', 99)); // -1

//                       ↓
console.log('hello world hello'.indexOf('world', 12)); // -1
// returns -1 — because, while it's true the substring
// world occurs at index 6, that position is not greater than or equal to 12.

// ------------------------------------------------------------------------------

// strange behavior with empty string search

console.log('hello world'.length); // 11

// when second argument is not provided
console.log('hello world'.indexOf('')); // returns 0

// when second argument is provided and
// is less than the length of the string
console.log('hello world'.indexOf('', 0)); // returns 0
console.log('hello world'.indexOf('', 3)); // returns 3

// when second argument value is gretaer than the length of the string
// return the length of the string
console.log('hello world'.indexOf('', 22)); // returns 11
