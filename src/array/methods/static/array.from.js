/*
 * Array.from()
 *
 * Array.from() is a static method, so we call it on Array itself.
 *
 * It creates a new real array from:
 * 1. iterable values: String, Set, Map
 * 2. array-like values: arguments, { length: n }
 *
 * It returns a shallow-copied array:
 * - the outer array is new
 * - nested objects are still shared by reference
 *
 * Mental model:
 * "Take something that is not a normal array yet and return a real array."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 */

console.log('--- Array.from with iterables ---')

/*
 * A string is iterable.
 * Array.from() reads each character and puts it into a new array.
 */
console.log('from string:', Array.from('foo'))
// expected output: ['f', 'o', 'o']

/*
 * A Set is iterable.
 * Set keeps unique values, so duplicate 'admin' is removed by Set before
 * Array.from() converts it.
 */
const roles = new Set(['admin', 'editor', 'admin'])
console.log('from Set:', Array.from(roles))
// expected output: ['admin', 'editor']

/*
 * A Map is iterable.
 * Array.from(map) returns an array of [key, value] pairs.
 */
const scores = new Map([
  ['a', 10],
  ['b', 20],
])
console.log('from Map:', Array.from(scores))
// expected output: [['a', 10], ['b', 20]]

console.log('--- Array.from with array-like values ---')

/*
 * arguments is array-like.
 * It has indexed values and length, but it is not a real array.
 */
function collectArguments() {
  return Array.from(arguments)
}

console.log('from arguments:', collectArguments('a', 'b', 'c'))
// expected output: ['a', 'b', 'c']

/*
 * This object is array-like because:
 * - it has numeric keys: 0, 1
 * - it has length: 2
 *
 * Array.from() reads indexes from 0 to length - 1.
 */
const arrayLike = {
  0: 'first',
  1: 'second',
  length: 2,
}

console.log('from array-like object:', Array.from(arrayLike))
// expected output: ['first', 'second']

/*
 * If an object only has length and no indexed values,
 * Array.from() still creates that many slots.
 *
 * The values are undefined because indexes 0, 1, and 2 do not exist.
 */
const onlyLength = { length: 3 }
console.log('from only length:', Array.from(onlyLength))
// expected output: [undefined, undefined, undefined]

console.log('--- Array.from with plain objects ---')

/*
 * A normal object is not iterable and does not have a useful length.
 * Array.from() does not collect object values automatically.
 */
const user = {
  name: 'Amit',
  role: 'admin',
}

console.log('from plain object:', Array.from(user))
// expected output: []

/*
 * For normal objects, use Object.keys(), Object.values(), or Object.entries().
 */
console.log('Object.values for plain object:', Object.values(user))
// expected output: ['Amit', 'admin']

console.log('--- Array.from with mapFn ---')

/*
 * Array.from(value, mapFn) converts and transforms in one step.
 * Here, every number is doubled while the new array is created.
 *
 * mapFn receives:
 * 1. element
 * 2. index
 */
const doubled = Array.from([1, 2, 3], (number) => number * 2)
console.log('double while creating:', doubled)
// expected output: [2, 4, 6]

/*
 * mapFn can use the index while creating the new array.
 */
const labels = Array.from(['a', 'b'], (letter, index) => `${index}:${letter}`)
console.log('labels with index:', labels)
// expected output: ['0:a', '1:b']

/*
 * mapFn only receives two arguments: element and index.
 * It does not receive the full array like Array.prototype.map() does.
 */
const mapFnArgumentCount = Array.from(['a'], function () {
  return arguments.length
})
console.log('mapFn argument count:', mapFnArgumentCount)
// expected output: [2]

/*
 * thisArg sets the value of this inside a normal function mapFn.
 * Arrow functions do not get their own this, so use function here.
 */
const multiplier = { factor: 3 }
const tripled = Array.from(
  [1, 2, 3],
  function (number) {
    return number * this.factor
  },
  multiplier,
)
console.log('thisArg example:', tripled)
// expected output: [3, 6, 9]

/*
 * Sequence pattern:
 * { length: 5 } creates five positions.
 * index gives the current position: 0, 1, 2, 3, 4.
 *
 * We use _ for the value because the value is undefined in this pattern.
 */
const zeroBasedRange = Array.from({ length: 5 }, (_, index) => index)
console.log('range 0 to 4:', zeroBasedRange)
// expected output: [0, 1, 2, 3, 4]

/*
 * Same pattern, but add 1 to the index when you want counting to start from 1.
 */
const oneBasedRange = Array.from({ length: 5 }, (_, index) => index + 1)
console.log('range 1 to 5:', oneBasedRange)
// expected output: [1, 2, 3, 4, 5]

console.log('--- Array.from creates a shallow copy ---')

/*
 * Array.from(original) creates a new outer array.
 * But it is a shallow copy, so nested objects are still shared by reference.
 */
const original = [{ name: 'Mayank' }]
const clone = Array.from(original)

console.log('different array:', clone !== original)
// expected output: true

console.log('same nested object:', clone[0] === original[0])
// expected output: true
