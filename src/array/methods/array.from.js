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

// Array from a String
const str1 = "foo";
console.log(Array.from(str1));
// expected output: Array ["f", "o", "o"]

// Array from a Set
const set1 = new Set(["foo", "bar", "baz", "foo"]);
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

// Using arrow functions and Array.from()
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