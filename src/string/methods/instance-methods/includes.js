/*
 * includes() method of String values performs a
 * case-sensitive search to determine whether a given
 * string may be found within this string, returning
 * true or false as appropriate.
 *
 * includes(searchString)
 * includes(searchString, position)
 */

const sentence = 'The quick brown fox jumps over the lazy dog.';

const word = 'fox';

console.log(sentence.includes(word));
// Expected output: true

// Empty string always returns true
console.log(''.includes('')); // true

// matching space returns true
// zero space != one space
console.log(''.includes(' ')); // false
// one space == one space
console.log('The quick'.includes(' ')); // true

// Case-sensitive search
console.log(sentence.includes('Word'));
// Expected output: false

console.log('Blue Whale'.toLowerCase().includes('blue'));
// returns true
