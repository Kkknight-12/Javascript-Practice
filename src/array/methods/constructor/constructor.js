/*
 * Array constructor
 *
 * This file teaches Array() / new Array().
 *
 * Main tools:
 * 1. Array()
 * 2. new Array()
 * 3. single number argument
 * 4. multiple arguments
 * 5. empty slots
 *
 * Mental model:
 * "Array constructor has one surprising rule: one number means length, not one
 * element. More than one argument means elements."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
 */

console.log('--- Array() and new Array() both create arrays ---')

/*
 * Array() can be called with or without new.
 * Both create a new Array instance.
 */
const withoutNew = Array('a', 'b')
const withNew = new Array('a', 'b')

console.log('Array("a", "b"):', withoutNew)
// expected output: ['a', 'b']

console.log('new Array("a", "b"):', withNew)
// expected output: ['a', 'b']

console.log('same type:', withoutNew instanceof Array, withNew instanceof Array)
// expected output: true true

console.log('--- no arguments ---')

/*
 * No arguments creates an empty array.
 */
const empty = new Array()
console.log('new Array():', empty)
// expected output: []

console.log('length:', empty.length)
// expected output: 0

console.log('--- single number argument ---')

/*
 * One number argument creates an array with that length.
 * The positions are empty slots, not real undefined values.
 */
const emptySlots = new Array(3)
console.log('new Array(3):', emptySlots)
// expected output: [ <3 empty items> ]

console.log('length:', emptySlots.length)
// expected output: 3

console.log('index 0 exists:', Object.hasOwn(emptySlots, 0))
// expected output: false

console.log('0 in emptySlots:', 0 in emptySlots)
// expected output: false

console.log('read empty slot:', emptySlots[0])
// expected output: undefined

/*
 * Reading an empty slot gives undefined, but the slot is still missing.
 * Some array methods skip empty slots.
 */
const mappedEmptySlots = emptySlots.map(() => 'visited')
console.log('map over empty slots:', mappedEmptySlots)
// expected output: [ <3 empty items> ]

console.log('--- single non-number argument ---')

/*
 * One non-number argument becomes one element.
 */
const oneString = new Array('3')
console.log('new Array("3"):', oneString)
// expected output: ['3']

console.log('length:', oneString.length)
// expected output: 1

console.log('--- multiple arguments ---')

/*
 * Multiple arguments become normal array elements.
 */
const numbers = new Array(1, 2, 3)
console.log('new Array(1, 2, 3):', numbers)
// expected output: [1, 2, 3]

console.log('index 0 exists:', Object.hasOwn(numbers, 0))
// expected output: true

console.log('mapped numbers:', numbers.map((number) => number * 10))
// expected output: [10, 20, 30]

console.log('--- invalid length ---')

/*
 * A single number length must be an integer from 0 to 2^32 - 1.
 * Invalid lengths throw RangeError.
 */
try {
  new Array(3.5)
} catch (error) {
  console.log('new Array(3.5) error:', error.name)
}
// expected output: RangeError

console.log('--- safer everyday choices ---')

/*
 * In everyday code:
 * - use [] when you know the values
 * - use Array.of(number) when one number should be one element
 * - use Array.from({ length }, mapFn) when you need calculated values
 */
console.log('literal:', [3])
// expected output: [3]

console.log('Array.of(3):', Array.of(3))
// expected output: [3]

console.log(
  'Array.from range:',
  Array.from({ length: 3 }, (_, index) => index + 1)
)
// expected output: [1, 2, 3]
