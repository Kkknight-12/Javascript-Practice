/*
 * charAt() method of String values returns a new string
 * consisting of the single UTF-16 code unit at the given index.
 * 
 * charAt(index)
 */

const sentence = 'The quick brown fox jumps over the lazy dog.';

const index = 4;

console.log(sentence.charAt(index));
// Expected output: "q"

// can't use negative index
console.log(sentence.charAt(-1));
// Expected output: ""
