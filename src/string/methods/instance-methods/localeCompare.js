/*
 * localeCompare() method of String values returns a
 * number indicating whether this string comes before,
 * or after, or is the same as the given string in sort order.
 * In implementations with Intl.Collator API support,
 * this method simply calls Intl.Collator.
 *
 * Negative when the referenceStr occurs before compareString
 * Positive when the referenceStr occurs after compareString
 * Returns 0 if they are equivalent
 *
 * localeCompare(compareString)
 * localeCompare(compareString, locales)
 * localeCompare(compareString, locales, options)
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#ignorepunctuation
 */

const a = 'réservé'; // With accents, lowercase
const b = 'RESERVE'; // No accents, uppercase

console.log(a.localeCompare(b));
// Expected output: 1

// case-insensitive comparison using the { sensitivity: “base” } option
console.log(a.localeCompare(b, 'en', { sensitivity: 'base' }));
// Expected output: 0

// ------------------------------

// letter "a" is before "c" yielding a negative value
'a'.localeCompare('c'); // -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
'check'.localeCompare('against'); // 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
'a'.localeCompare('a'); // 0

// ------------------------------

/* 
results provided by localeCompare() vary between languages. In order to get the sort order of the language used in the user interface of your application, make sure to specify that language (and possibly some fallback languages) using the locales argument: */

// german  ä -> z | negative
console.log("ä".localeCompare("z", "de")); // a negative value: in German, ä sorts before z

// swedish  z -> ä | positive
console.log("ä".localeCompare("z", "sv")); // a positive value: in Swedish, ä sorts after z

// ------------------------------

// in German, ä has a as the base letter
console.log('ä'.localeCompare('a', 'de', { sensitivity: 'base' })); // 0

// in Swedish, ä and a are separate base letters
console.log('ä'.localeCompare('a', 'sv', { sensitivity: 'base' })); // a positive value

// ------------------------------

// ignorePunctuation option means that
// the locale-aware comparison will ignore any punctuation differences
const items = ['réservé', 'Premier', 'Cliché', 'communiqué', 'café', 'Adieu'];

// Positive when the referenceStr occurs after compareString
console.log(
  'ignorePunctuation ',
  'réservé'.localeCompare('Adieu', 'fr', { ignorePunctuation: true })
); // 1

// ------------------------------

// Numeric sorting

// by default, "2" > "10"
console.log('2'.localeCompare('10')); // 1

// numeric using options:
console.log('2'.localeCompare('10', undefined, { numeric: true })); // -1

// numeric using locales tag:
console.log('2'.localeCompare('10', 'en-u-kn-true')); // -1

// ------------------------------
