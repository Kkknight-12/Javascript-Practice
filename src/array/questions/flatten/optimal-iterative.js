/*
 * Question: flatten a nested array.
 *
 * Iterative idea:
 * - start with a copy of the input,
 * - check whether any item is still an array,
 * - use concat() to open one level,
 * - repeat until no nested arrays remain.
 */

function flattenIterative(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('flattenIterative expects an array');
  }

  let result = values.slice();

  while (result.some(Array.isArray)) {
    result = [].concat(...result);
  }

  return result;
}

const nestedNumbers = [1, [2, [3]], 4, [5]];

console.log('1. Iterative flatten:', flattenIterative(nestedNumbers));
// Expected output: [ 1, 2, 3, 4, 5 ]

console.log('2. Original array unchanged:', nestedNumbers);
// Expected output: [ 1, [ 2, [ 3 ] ], 4, [ 5 ] ]

/*
 * concat() has special one-level behavior:
 * - normal value -> add it directly,
 * - array value  -> copy its elements one level into the result.
 */
const oneLevel = [].concat(1, [2, [3]], 4);

console.log('3. concat() opens arrays one level:', oneLevel);
// Expected output: [ 1, 2, [ 3 ], 4 ]

console.log('4. Built-in flat(Infinity):', nestedNumbers.flat(Infinity));
// Expected output: [ 1, 2, 3, 4, 5 ]

try {
  flattenIterative({ length: 2, 0: 1, 1: [2] });
} catch (error) {
  console.log('5. Array-like input error:', error.name);
  // Expected output: TypeError
}
