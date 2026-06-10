/*
 * padStart() method of String values pads this string
 * with another string (multiple times, if needed) until
 * the resulting string reaches the given length.
 *
 * str.padStart(targetLength, padString)
 *
 * padStart() method takes two parameters:
 * -> targetLength - The length of the final string after
 *                   the current string has been padded.
 * -> padString (optional) - The string to pad the current
 *                           string with. Its default value is " ".
 *
 * Note:
 * If padString is too long, it will be truncated from the
 * end to meet targetLength. 
 * For targetLength < str.length, the string is returned unmodified.
 */

const str1 = '5';

console.log(str1.padStart(2, '0'));
// Expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
console.log(last4Digits); // 5581
const maskedNumber = last4Digits.padStart(fullNumber.length - 10, '*');

console.log(maskedNumber);
// Expected output: "************5581"

// when no padding string is provided, space is used as default padding string
// 7 spaces + "abc"
console.log('abc'.padStart(10)); // "       abc"

// when the length of the string is equal to or greater than the specified length, the original string is returned
const result = 'abc'.padStart(10, 'foo');
console.log(result.length); // 10
console.log(result);
// Expected output: "foofoofabc"

// when the final length of the string is greater than the specified length, the padding string is truncated to the length of the specified length
// 123465 + "abc" = 8 > 6
// padding string "123465" is truncated to "123"
// "123" + "abc" = 6
console.log('abc'.padStart(6, '123465')); // "123abc"

// when the targetLength is less than the length of initial
// string plus the length of the padString string,
// the padStart() method returns the original string
console.log('abc'.padStart(1)); // "abc"
