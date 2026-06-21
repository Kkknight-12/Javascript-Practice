/*
 * Array.prototype.flat()
 *
 * This file teaches flat() as an Array instance method.
 *
 * Main tools:
 * 1. flat()
 * 2. depth
 * 3. Infinity depth
 * 4. shallow-copy result
 * 5. sparse array behavior
 * 6. generic array-like behavior
 *
 * Mental model:
 * "flat() opens nested arrays up to the depth you choose and returns a new
 * array."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */

console.log('--- Basic flat() ---')

/*
 * flat() returns a new array.
 * By default, it flattens one nested level.
 */
const oneLevelNested = [0, 1, 2, [3, 4]]

const oneLevelResult = oneLevelNested.flat()

console.log('one-level result:', oneLevelResult)
// expected output: [0, 1, 2, 3, 4]

console.log('original one-level array:', oneLevelNested)
// expected output: [0, 1, 2, [3, 4]]

console.log('--- Default depth is 1 ---')

/*
 * Only the first nested level is opened when depth is not provided.
 */
const deepNumbers = [0, 1, [2, [3, [4, 5]]]]

console.log('flat default depth:', deepNumbers.flat())
// expected output: [0, 1, 2, [3, [4, 5]]]

console.log('flat depth 2:', deepNumbers.flat(2))
// expected output: [0, 1, 2, 3, [4, 5]]

console.log('flat Infinity:', deepNumbers.flat(Infinity))
// expected output: [0, 1, 2, 3, 4, 5]

console.log('--- Depth 0 means no flattening, but still returns a new array ---')

/*
 * flat(0) keeps the same nesting level.
 * The returned outer array is still a new array reference.
 */
const depthZeroSource = [1, [2, 3]]
const depthZeroResult = depthZeroSource.flat(0)

console.log('flat depth 0:', depthZeroResult)
// expected output: [1, [2, 3]]

console.log('same outer array reference:', depthZeroResult === depthZeroSource)
// expected output: false

console.log('--- flat() is not recursive unless depth is high enough ---')

/*
 * Choose depth based on how many nested array levels should be opened.
 */
const boxes = ['outer', ['level 1', ['level 2', ['level 3']]]]

console.log('boxes flat 1:', boxes.flat(1))
// expected output: ['outer', 'level 1', ['level 2', ['level 3']]]

console.log('boxes flat 2:', boxes.flat(2))
// expected output: ['outer', 'level 1', 'level 2', ['level 3']]

console.log('boxes flat Infinity:', boxes.flat(Infinity))
// expected output: ['outer', 'level 1', 'level 2', 'level 3']

console.log('--- flat() does not mutate the original array ---')

/*
 * flat() is a copying method.
 * It returns a new outer array and leaves the original nesting unchanged.
 */
const original = [1, [2, 3]]
const flattened = original.flat()

flattened.push(4)

console.log('flattened after push:', flattened)
// expected output: [1, 2, 3, 4]

console.log('original after flattened push:', original)
// expected output: [1, [2, 3]]

console.log('--- flat() is a shallow copy ---')

/*
 * The returned array is new, but nested objects are shared references.
 */
const teams = [
  [{ name: 'Asha', skills: ['JS'] }],
  [{ name: 'Mayank', skills: ['CSS'] }],
]

const flatTeams = teams.flat()

flatTeams[0].skills.push('React')

console.log('changed object from flat result:', flatTeams[0])
// expected output: { name: 'Asha', skills: ['JS', 'React'] }

console.log('same object inside original:', teams[0][0])
// expected output: { name: 'Asha', skills: ['JS', 'React'] }

console.log('same object reference:', flatTeams[0] === teams[0][0])
// expected output: true

/*
 * Replacing an item in the flat result does not replace the object in the
 * original array. The sharing only matters when the same object is mutated.
 */
flatTeams[1] = { name: 'Nina', skills: ['Node'] }

console.log('replaced item in flat result:', flatTeams[1])
// expected output: { name: 'Nina', skills: ['Node'] }

console.log('original second object:', teams[1][0])
// expected output: { name: 'Mayank', skills: ['CSS'] }

console.log('--- flat() removes empty slots at flattened levels ---')

/*
 * A sparse array has missing indexes.
 * flat() removes empty slots from the root level and from levels it flattens.
 */
const sparseValues = [1, , 3, [4, , 6]]

console.log('sparse flat result:', sparseValues.flat())
// expected output: [1, 3, 4, 6]

console.log('root index 1 exists:', 1 in sparseValues)
// expected output: false

/*
 * Empty slots deeper than the selected depth stay inside nested arrays that
 * were not opened yet.
 */
const deepSparseValues = [1, [2, [3, , 5]]]
const deepSparseFlatOne = deepSparseValues.flat(1)
const deepSparseFlatTwo = deepSparseValues.flat(2)

console.log('deep sparse flat 1:', deepSparseFlatOne)
// expected output: [1, 2, [3, empty, 5]]

console.log('hole still inside nested array:', 1 in deepSparseFlatOne[2])
// expected output: false

console.log('deep sparse flat 2:', deepSparseFlatTwo)
// expected output: [1, 2, 3, 5]

console.log('--- flat() only flattens real arrays ---')

/*
 * Array-like objects inside the array are not flattened.
 */
const arrayLikeInside = [
  ['a', 'b'],
  { 0: 'c', 1: 'd', length: 2 },
  ['e'],
]

console.log('array-like object inside flat result:', arrayLikeInside.flat())
// expected output: ['a', 'b', { 0: 'c', 1: 'd', length: 2 }, 'e']

console.log('--- Generic array-like behavior ---')

/*
 * flat() itself is generic.
 * It can be called on an array-like object, but only real array elements are
 * flattened.
 */
const arrayLike = {
  length: 3,
  0: [1, 2],
  1: { 0: 3, 1: 4, length: 2 },
  2: 5,
}

const genericFlatResult = Array.prototype.flat.call(arrayLike)

console.log('generic flat result:', genericFlatResult)
// expected output: [1, 2, { 0: 3, 1: 4, length: 2 }, 5]

console.log('--- flat() vs concat() ---')

/*
 * concat() joins values and array arguments.
 * flat() opens nested arrays that already exist inside one array.
 */
const nestedForFlat = [1, [2, 3]]

console.log('flat nested array:', nestedForFlat.flat())
// expected output: [1, 2, 3]

console.log('concat nested array as value:', [1].concat([[2, 3]]))
// expected output: [1, [2, 3]]
