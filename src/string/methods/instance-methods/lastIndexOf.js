/* 
lastIndexOf() method of String values searches this string and returns the index of the last occurrence of the specified substring. The method returns -1 if substring is not found in the given string.

Parameters
-> substr- The value to search for in the given string.
-> fromIndex (optional) - The index to start searching the string backwards. 
   By default it is +Infinity.

Notes:
method is case sensitive
If fromIndex >= string.length, the whole string is searched.
If fromIndex < 0, it is considered to be the same as 0.

str.lastIndexOf(searchValue, fromIndex)
 */

//                 rangeEnd
//                   ↓
// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10| 11| 12 | 13 | 14 | 15 | 16 |
// | h | e | l | l | o |   | w | o | r | l | d |   | h  | e  | l  | l  | o  |
const paragraph = 'hello world hello';

// when string is not found -1 is returned
console.log(paragraph.lastIndexOf('em')); 
// -1

// | 0 | 1 | 2 | 3 | 4 |
// | h | e | l | l | o |
console.log(paragraph.lastIndexOf('world', 4));
// -1
// because, while the substring world does occurs
// at index 6, that position is not less than or equal to 4.

/* 
If position is greater than the length of the calling string, the method searches the entire string
 */
console.log(paragraph.lastIndexOf('hello', 99)); // 12
// because the last occurrence of hello at a position
// less than or equal to 99 is at position 12

/* 
If position is less than 0, the behavior is the same as for 0 — that is, the method looks for the specified substring only at index 0.
*/

console.log(paragraph.lastIndexOf('hello', 0)); // 0
console.log(paragraph.lastIndexOf('hello', -5)); // 0

