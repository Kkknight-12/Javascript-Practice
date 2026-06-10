/*
 * at() method of String values takes an integer value
 * and returns a new String consisting of the single UTF-16
 * code unit located at the specified offset.
 */

//                   3 5
const sentence = 'The quick brown fox jumps over the lazy dog.';
//                                                       -4

let index = 5;
console.log(sentence.at(index));
// Expected output: "u"

index = -4;
console.log(sentence.at(index));
// Expected output: "d"

console.log(sentence.at(-1)); // "."

// ---------------------------------------------------------------

// Comparing methods
// Here we compare different ways to select the character of a String.

const myString = 'Every green bus drives fast.';

// Using length property and charAt() method
//  If index is out of the range of 0 – str.length - 1,
// charAt() returns an empty string.
const lengthWay = myString.charAt(-2);
console.log(lengthWay); // ' '

// Using slice() method
const sliceWay = myString.slice(-5, -1);
console.log(sliceWay); // 'fast'

// Using at() method
const atWay = myString.at(-2);
console.log(atWay); // 't'


/* 
The charAt(), slice(), and at() methods are all used to access characters in a string, but they work in slightly different ways:

charAt(index): This method returns the character at the specified index in the string. If the index is out of range (either negative, or greater than or equal to the length of the string), it returns an empty string.

slice(startIndex, endIndex): This method returns a new string that includes the characters from startIndex up to, but not including, endIndex. If either index is negative, it is treated as strLength + index where strLength is the length of the string.

at(index): This method also returns the character at the specified index in the string, but it can handle negative indexes. If the index is negative, it is treated as strLength + index. If the index is out of range, it returns undefined.
*/