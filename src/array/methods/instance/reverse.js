/*
 * reverse() method of Array instances reverses an array
 * in place and returns the reference to the same array
 *
 * reverse()
 * takes no parameters
 */

const array1 = ['one', 'two', 'three'];

const reversed = array1.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]

/*
 * The reverse() method returns reference to the
 * original array, so mutating the returned array will
 * mutate the original array as well.
 */

const numbers = [3, 2, 4, 1, 5];
const reversedNums = numbers.reverse();
// numbers and reversed are both in reversed order [5, 1, 4, 2, 3]
reversedNums[0] = 5;
console.log(numbers[0]); // 5

/*
 * In case you want reverse() to not mutate the original
 * array, but return a shallow-copied array like other
 * array methods (e.g. map()) do, use the toReversed()
 * method. Alternatively, you can do a shallow copy before
 * calling reverse(), using the spread syntax or Array.from().
 */
const numbers2 = [3, 2, 4, 1, 5];
// [...numbers] creates a shallow copy, so reverse() does not mutate the original
const reverted = [...numbers2].reverse();
reverted[0] = 5; 
// reverted -> [0, 2, 4, 1, 5];
console.log(numbers2[0]); // 3
// numbers2 -> [3, 2, 4, 1, 5];