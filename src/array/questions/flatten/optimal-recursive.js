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
  // Guard clause: this helper is written for real arrays only.
  // Throwing early gives a clear error instead of silently treating bad input as iterable data.
  if (!Array.isArray(values)) {
    throw new TypeError('flattenRecursive expects an array');
  }

  // Each function call owns its own result array.
  // Inner recursive calls build their own result and return it to the parent call.
  const result = [];

  // for...of reads the actual values.
  // Flattening cares about each value, not about numeric indexes.
  for (const value of values) {
    if (Array.isArray(value)) {
      // Array value means we found a smaller flatten problem.
      // The recursive call returns a flat array for this inner value.
      //
      // Spread (...) is important here:
      // result.push(...[2, 3]) adds 2 and 3 as separate values.
      // Without spread, result.push([2, 3]) would keep a nested array.
      result.push(...flattenRecursive(value));
    } else {
      // Non-array values are already flat.
      // Keep them exactly as they are.
      result.push(value);
    }
  }

  // Return the flat values collected by this call.
  // If this was an inner call, the parent will spread these values into its own result.
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
