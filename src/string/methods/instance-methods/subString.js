/*
 * substring() method returns a specified part
 * of the string between start and end indexes.
 *
 * substring() does not change the original string.
 *
 * - argument value < 0 is treated as 0.
 * - argument value > str.length is treated as str.length.
 * - NaN argument value is treated as 0.
 * - If indexStart is greater than indexEnd, the two arguments
 *   are swapped, i.e. str.substring(a, b) will be str.substring(b, a).
 *
 * substring(indexStart)
 * substring(indexStart, indexEnd)
 */

// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10| 11| 12| 13| 14| 15| 16| 17|
// | J | a | v | a | S | c | r | i | p | t |   | i | s |   | f | u | n | . |
const message = 'JavaScript is fun.';
console.log(message.length); // 18

// get the substring starting from index 0 to 10
let result = message.substring(0, 10);
console.log(result);
// Output: JavaScript

// If indexEnd is omitted, substring() extracts
// characters to the end of the string.
// from index 4 to the end of the string
console.log(message.substring(4)); // Script is fun.

// If indexStart is equal to indexEnd, substring() returns an empty string.
console.log(message.substring(4, 4)); // empty string

// If indexStart is greater than indexEnd,
// then the effect of substring() is as if the two arguments
// were swapped; see example below.
console.log(message.substring(10, 0)); // JavaScript

// -----------------------------

/* 
Differences between substring() and slice()

- substring() method swaps its two arguments if 
    indexStart is greater than indexEnd, meaning 
    that a string is still returned.
- slice() method returns an empty string if 
    indexStart is greater than indexEnd (with a negative index).
*/

// | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
// | M | o | z | i | l | l | a |
// | -7| -6|-5 |-4 |-3 |-2 |-1 |
const text = 'Mozilla';

console.log(text.substring(5, 2)); // "zil"
//
console.log(text.slice(5, 2)); // ""

// If either or both of the arguments are negative or NaN,
// the substring() method treats them as if they were 0.
console.log(text.substring(-5, 2)); // "Mo"
console.log(text.substring(-5, -2)); // ""

/*
 * slice() also treats NaN arguments as 0,
 * but when it is given negative values it counts
 * backwards from the end of the string to find the indexes.
 */
console.log(text.slice(-5, 2)); // ""
console.log(text.slice(-5, 3)); // "z"
console.log(text.slice(-5, -2)); // "zil"

const str = 'JavaScript is a very absurd programming language.';

// from 9th to last element till end
console.log(str.slice(-9)); // 'language.'
