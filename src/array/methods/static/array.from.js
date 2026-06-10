/*
 * Array.from()
 * static method creates a new, shallow-copied Array instance from
 * an array-like or iterable object.
 *
 * parameters:
 * - arrayLike: An array-like or iterable object to convert to an array.
 * - mapFn (optional): Map function to call on every element of the array.
 * - thisArg (optional): Value to use as this when executing mapFn.
 *
 *
 * Return value:
 * A new Array instance.
 *
 * MDN reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 *  */

/*
 * This method can create an array from:
 * -> array-like objects - The objects that have length
 *    property and have indexed elements like String.
 * -> Iterable objects like Map or Set.
 */

// Array from a String
const str1 = 'foo';
console.log(Array.from(str1));
// expected output: Array ["f", "o", "o"]

// Array from a Set
const set1 = new Set(['foo', 'bar', 'baz', 'foo']);
console.log(Array.from(set1));
// expected output: Array ["foo", "bar", "baz"]

// Array from a Map
const map1 = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
console.log(Array.from(map1));
// expected output: Array [[1, 2], [2, 4], [4, 8]]

// Array from an Array-like object (arguments)
function f() {
  return Array.from(arguments);
} // [1, 2, 3]
console.log(f(1, 2, 3));

/*
 * Array.from(obj, mapFunc, thisArg) is equivalent to
 * Array.from(obj).map(mapFunc, thisArg).
 */
const a = Array.from([1, 2, 3], (x) => x + x);
console.log(a);
// [2, 4, 6]

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const arr = Array.from({ length: 5 }, (v, i) => i);
console.log(arr);
// [0, 1, 2, 3, 4]
/*
 * In this case, Array.from() is being called with two arguments:
 *
 * { length: 5 }: This is an array-like object. An array-like
 * object is an object which has a property length and whose
 * property keys can be coerced to numbers. Here, it's an
 * object with a single property length set to 5. This means
 * the new array will have a length of 5.
 *
 * (v, i) => i: This is a map function that will be called
 * on every element of the array. The map function takes two
 * arguments: the current value (v) and the current index (i).
 * In this case, the function is simply returning the index,
 * so the new array will be filled with its index values.
 *
 * NOTE:
 * if you use any property name instead of length in the
 * Array.from() method, but it will not behave as expected.
 * The Array.from() method specifically looks for a length property
 * to determine the size of the new array. If you use a different
 * property name, Array.from() will not be able to determine the
 * size of the new array and will return an empty array.
 *
 * v represents the current value of the array-like or iterable
 * object that is being converted into an array. However, in this
 * specific code snippet Array.from({ length: 5 }, (v, i) => i);,
 * v is always undefined.  This is because you're creating an array
 * from an object { length: 5 } that doesn't have any actual elements,
 * just a length property. Therefore, there are no values for v to represent,
 *  and it remains undefined.
 */

const aaaaa = Array.from({ length: 5 }, () => 0);
console.log(aaaaa);
const result = aaaaa.map((_, row) => row);
console.log(result);

const rows = 3;
const columns = 4;

Array.from({ length: rows }, () => 0).map((_, row) =>
  Array.from({ length: columns }, () => 0).map((_, col) =>
    col % 2 === 0
      ? console.log('divisible ', rows * col + (row + 1))
      : console.log('not divisibe ', rows * (col + 1) - row)
  )
);

// 3 * 0 + ( 0 + 1) => 1
// 3 * ( 1 + 1 ) - 0 => 6
// 3 * 2 + ( 0 + 1 ) => 7
// 3 * ( 3 + 1 ) - 0 => 12
// console.log(0 % 2);

// Range calculation approach - systematic derivation
function calculateColumnRanges(rows, columns) {
  // Har column mein kitni values hain? = rows
  // Har column ka starting point kahan hai?

  for (let col = 0; col < columns; col++) {
    const startValue = rows * col + 1;
    const endValue = rows * (col + 1);

    console.log(`Column ${col}: Range ${startValue} to ${endValue}`);

    // Example output for 3 rows:
    // Column 0: Range 1 to 3
    // Column 1: Range 4 to 6
    // Column 2: Range 7 to 9
    // Column 3: Range 10 to 12
  }
}

console.log('calculateColumnRanges ', calculateColumnRanges(3, 4));
