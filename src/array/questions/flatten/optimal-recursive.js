/*
 * Question: flatten a nested array.
 *
 * Recursive idea:
 * - create a result array,
 * - read every value,
 * - if the value is an array, flatten that array first,
 * - otherwise keep the value directly.
 */

function flattenRecursive(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('flattenRecursive expects an array');
  }

  const result = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flattenRecursive(value));
    } else {
      result.push(value);
    }
  }

  return result;
}

const nestedNumbers = [1, [2, [3]], 4, [5]];

console.log('1. Recursive flatten:', flattenRecursive(nestedNumbers));
// Expected output: [ 1, 2, 3, 4, 5 ]

console.log('2. Original array unchanged:', nestedNumbers);
// Expected output: [ 1, [ 2, [ 3 ] ], 4, [ 5 ] ]

/*
 * Mixed values are kept as values.
 * Flattening changes the array structure; it does not clone objects.
 */
const settings = { theme: 'dark' };
const mixedValues = ['start', [null, [settings]], [[undefined]], 'end'];
const flattenedMixedValues = flattenRecursive(mixedValues);

console.log('3. Mixed values:', flattenedMixedValues);
// Expected output: [ 'start', null, { theme: 'dark' }, undefined, 'end' ]

console.log('4. Object reference is same:', flattenedMixedValues[2] === settings);
// Expected output: true

console.log('5. Empty nested arrays:', flattenRecursive([1, [], [2, []], 3]));
// Expected output: [ 1, 2, 3 ]

try {
  flattenRecursive('not an array');
} catch (error) {
  console.log('6. Non-array input error:', error.name);
  // Expected output: TypeError
}
