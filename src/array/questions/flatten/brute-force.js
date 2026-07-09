/*
 * Question: flatten a nested array.
 *
 * Brute force idea:
 * If we already know the nesting depth, we can flatten one level at a time.
 *
 * Problem:
 * Real inputs may be nested to unknown depth.
 */

const values = [1, [2, [3]], 4, [5]];

const oneLevel = [].concat(...values);

console.log('1. After one known-depth pass:', oneLevel);
// Expected output: [ 1, 2, [ 3 ], 4, 5 ]

const twoLevels = [].concat(...oneLevel);

console.log('2. After two known-depth passes:', twoLevels);
// Expected output: [ 1, 2, 3, 4, 5 ]

/*
 * This approach works only because this input needs exactly two passes.
 * If another input has deeper nesting, we would need to add more manual passes.
 */
const deeperValues = [1, [2, [3, [4]]]];
const stillNested = [].concat(...[].concat(...deeperValues));

console.log('3. Deeper input is still nested:', stillNested);
// Expected output: [ 1, 2, 3, [ 4 ] ]
