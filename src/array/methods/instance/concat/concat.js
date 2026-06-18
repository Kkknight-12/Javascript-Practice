/*
 * Array.prototype.concat()
 *
 * This file teaches concat() as an Array instance method.
 *
 * Main tools:
 * 1. concat()
 * 2. non-mutating merge
 * 3. shallow copy
 * 4. nested array behavior
 * 5. Symbol.isConcatSpreadable
 *
 * Mental model:
 * "concat() builds a new array. It starts with the current array, then adds each
 * argument. Array arguments are spread one level; normal values are added as
 * values."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
 */

console.log('--- Basic merge ---')

/*
 * concat() is called on an array.
 * The array before the dot becomes the first part of the new array.
 */
const letters = ['a', 'b', 'c']
const moreLetters = ['d', 'e', 'f']

const mergedLetters = letters.concat(moreLetters)

console.log('merged letters:', mergedLetters)
// expected output: ['a', 'b', 'c', 'd', 'e', 'f']

console.log('original letters:', letters)
// expected output: ['a', 'b', 'c']

console.log('original moreLetters:', moreLetters)
// expected output: ['d', 'e', 'f']

console.log('--- Multiple arguments ---')

/*
 * concat() accepts arrays and normal values.
 * Array arguments are spread one level.
 * Normal values are added as values.
 */
const mixedMerge = letters.concat(moreLetters, 'g', 'h', ['i', 'j'])

console.log('mixed merge:', mixedMerge)
// expected output: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

console.log('--- concat() with no arguments ---')

/*
 * concat() with no arguments returns a shallow copy of the array.
 * It is a new array reference, but it contains the same element values.
 */
const copy = letters.concat()

console.log('copy:', copy)
// expected output: ['a', 'b', 'c']

console.log('copy is same reference:', copy === letters)
// expected output: false

console.log('copy has same values:', copy.join('') === letters.join(''))
// expected output: true

console.log('--- concat() is shallow ---')

/*
 * Shallow copy means nested objects/arrays are not deeply cloned.
 * The outer array is new, but nested references are shared.
 */
const team = [{ name: 'Mayank', skills: ['JS'] }]
const teamCopy = team.concat()

teamCopy[0].skills.push('React')

console.log('team copy:', teamCopy)
// expected output: [{ name: 'Mayank', skills: ['JS', 'React'] }]

console.log('original team changed through nested reference:', team)
// expected output: [{ name: 'Mayank', skills: ['JS', 'React'] }]

console.log('outer array is new:', teamCopy === team)
// expected output: false

console.log('nested object is shared:', teamCopy[0] === team[0])
// expected output: true

console.log('--- Nested arrays are not flattened deeply ---')

/*
 * concat() spreads array arguments one level.
 * It does not recursively flatten nested arrays.
 */
const nestedOne = [[1]]
const nestedTwo = [2, [3]]
const nestedResult = nestedOne.concat(nestedTwo)

console.log('nested result:', nestedResult)
// expected output: [[1], 2, [3]]

nestedOne[0].push(4)

console.log('nested result after changing nestedOne:', nestedResult)
// expected output: [[1, 4], 2, [3]]

console.log('--- Empty slots are preserved ---')

/*
 * concat() preserves empty slots from sparse arrays.
 */
const sparseStart = [1, , 3]
const sparseEnd = [4, , 6]
const sparseResult = sparseStart.concat(sparseEnd)

console.log('sparse result:', sparseResult)
// expected output: [1, <1 empty item>, 3, 4, <1 empty item>, 6]

console.log('index 1 exists:', Object.hasOwn(sparseResult, 1))
// expected output: false

console.log('index 4 exists:', Object.hasOwn(sparseResult, 4))
// expected output: false

console.log('--- Array-like objects are not spread by default ---')

/*
 * Normal objects and array-like objects are added as one value by default.
 */
const arrayLike = {
  0: 'x',
  1: 'y',
  length: 2,
}

console.log('array-like default:', ['start'].concat(arrayLike))
// expected output: ['start', { 0: 'x', 1: 'y', length: 2 }]

console.log('--- Symbol.isConcatSpreadable ---')

/*
 * Symbol.isConcatSpreadable tells concat() whether a value should be spread.
 */
const spreadableArrayLike = {
  0: 'x',
  1: 'y',
  length: 2,
  [Symbol.isConcatSpreadable]: true,
}

console.log('array-like spreadable:', ['start'].concat(spreadableArrayLike))
// expected output: ['start', 'x', 'y']

const notSpreadArray = ['x', 'y']

Object.defineProperty(notSpreadArray, Symbol.isConcatSpreadable, {
  value: false,
  configurable: true,
})

console.log('array marked not spreadable:', ['start'].concat(notSpreadArray))
// expected output: ['start', ['x', 'y']]

console.log('--- concat() is generic ---')

/*
 * concat() can be called with a non-array this value.
 * The return value is still a new plain array.
 */
console.log('called on object:', Array.prototype.concat.call({ type: 'object' }, 1, 2))
// expected output: [{ type: 'object' }, 1, 2]

console.log('called on number:', Array.prototype.concat.call(10, 20))
// expected output: [[Number: 10], 20]

console.log('--- concat() vs push() ---')

/*
 * concat() returns a new array.
 * push() changes the original array and returns the new length.
 */
const concatSource = [1, 2]
const concatResult = concatSource.concat(3)

console.log('concat result:', concatResult)
// expected output: [1, 2, 3]

console.log('concat source after concat:', concatSource)
// expected output: [1, 2]

const pushSource = [1, 2]
const pushResult = pushSource.push(3)

console.log('push return value:', pushResult)
// expected output: 3

console.log('push source after push:', pushSource)
// expected output: [1, 2, 3]

console.log('--- Spread syntax comparison ---')

/*
 * For everyday array merging, spread syntax is often shorter.
 * concat() becomes useful when you want method chaining or need concat-specific
 * behavior such as Symbol.isConcatSpreadable.
 */
console.log('concat merge:', [1, 2].concat([3, 4]))
// expected output: [1, 2, 3, 4]

console.log('spread merge:', [...[1, 2], ...[3, 4]])
// expected output: [1, 2, 3, 4]
