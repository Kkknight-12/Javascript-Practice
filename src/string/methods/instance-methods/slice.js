/*
 * slice() method of String values extracts a section
 * of this string and returns it as a new string
 *
 * slice(indexStart)
 * slice(indexStart, indexEnd)
 *
 * Parameters
 * indexStart
 * The index of the first character to include in the returned substring.
 *
 * indexEnd Optional
 * The index of the first character to exclude from the returned substring.
 */

//                 indexStart        indexEnd
//                   ↓                   ↓
// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
// | T | h | e |   | m | i | r | r | o | r |
// |-10|-9|-8  |-7| -6 |-5 |-4 |-3 |-2 |-1 |

const str = 'The mirror';
console.log(str.slice(4, 9));
// Expected output: "mirro"

// If indexStart >= str.length, slice() returns an empty string.
console.log(str.slice(11));
// Expected output: " "

// If indexStart < 0, slice() treats it as str.length + indexStart.
console.log(str.slice(-4));
// Expected output: "rror"

// If indexStart is omitted, undefined, or null, slice() treats it as 0.
console.log(str.slice(undefined));
// Expected output: "The mirror"

// If indexEnd is omitted or undefined
// or if indexEnd >= str.length, slice() extracts to the end of the string.
console.log(str.slice(4, undefined));
// Expected output: "mirror"

console.log(str.slice(4, 20));
// Expected output: "mirror"

// If indexEnd < 0, slice() treats it as str.length + indexEnd.
console.log(str.slice(4, -2));
// Expected output: "mirr"

// If indexEnd <= indexStart, slice() returns an empty string.
console.log(str.slice(4, 4));
// Expected output: " "
console.log(str.slice(4, 3));
// Expected output: " "
