/*
 * Substring method returns the part of the string
 * between the start and end indexes, or to the end
 * of the string.
 *
 * method does not change the original string.
 *
 * parameters
 * start - The index of the first character to include
 * in the returned substring.
 * end - Optional. The index of the first character to
 * exclude from the returned substring.
 *
 *  */

//  method does not change the original string.
const str = "Mozilla";
const result = str.substring(1, 3);
console.log(result); // => 'oz'
console.log(str); // => 'Mozilla'

/*
 * If start is greater than end, this method will
 * swap the two arguments, meaning str.substring(1, 4)
 * == str.substring(4, 1).
 *  */
const result2 = str.substring(3, 1);
console.log(result2); // => 'oz'

/*
 * If either argument is less than 0 or is NaN,
 * it is treated as if it were 0.
 *  */
const result3 = str.substring(-3, 2);
console.log(result3); // => 'Mo'

/*
 *  If either argument is greater than stringName.length,
 * it is treated as if it were stringName.length.
 *  */
const result4 = str.substring(3, 100);
console.log(result4); // => 'illa'

/*
 * If start is end, it returns an empty string.
 *  */
const result5 = str.substring(3, 3);
console.log(result5); // => ''

/*
 *  If end is omitted, substring() extracts characters
 * to the end of the string. */
const result6 = str.substring(3);
console.log(result6); // => 'illa'