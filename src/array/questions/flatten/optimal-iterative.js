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
  // Guard clause: this helper works with real arrays only.
  // Array-like objects are rejected so the behavior stays predictable.
  if (!Array.isArray(values)) {
    throw new TypeError('flattenIterative expects an array');
  }

  // slice() creates a shallow copy of the outer array.
  // The loop will replace result again and again, so the original input stays untouched.
  let result = values.slice();

  // some(Array.isArray) asks whether at least one nested array still exists.
  // If yes, one more flattening pass is needed.
  while (result.some(Array.isArray)) {
    // concat() opens arrays one level.
    // Spread passes each current item as a separate concat argument.
    result = [].concat(...result);
  }

  // When the loop stops, no item in result is an array anymore.
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
