/*
 * Split method is used to split a string into an array of
 * substrings, and returns the new array.
 *
 * parameter:
 * separator - The separator to use when splitting the string.
 * limit (optional) - A number limit of splits to be found.
 *
 *  */

const str = "The quick brown fox jumps over the lazy dog.";
const words = str.split(" ");
console.log(words); // ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]

const chars = str.split("");
console.log(chars); //

const strCopy = str.split();
console.log(strCopy); // ["The quick brown fox jumps over the lazy dog."]

// passing second parameter
const str1 = "How are you doing today?";
const words1 = str1.split(" ", 3);
console.log(words1); // ["How", "are", "you"]