/*
 * Array creation shortcuts
 *
 * This file compares common ways to create arrays.
 *
 * Main tools:
 * 1. array literal: []
 * 2. Array constructor: Array() / new Array()
 * 3. Array.of()
 * 4. spread syntax: [...]
 * 5. Array.from()
 * 6. fill()
 *
 * Mental model:
 * "Choose the array creation tool based on whether you already know the values,
 * need a length, need indexes, or need separate object instances."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 */

console.log('--- Array literal ---')

/*
 * Use an array literal when you already know the values.
 * This is the clearest everyday way to create an array.
 */
const roles = ['admin', 'editor']
console.log('literal:', roles)
// expected output: ['admin', 'editor']

console.log('--- Array constructor ---')

/*
 * Array(3) or new Array(3) creates an array with length 3.
 * But the positions are empty slots, not real undefined values.
 */
const emptySlots = new Array(3)
console.log('new Array(3):', emptySlots)
// expected output: [ <3 empty items> ]

console.log('length:', emptySlots.length)
// expected output: 3

console.log('index 0 exists:', Object.hasOwn(emptySlots, 0))
// expected output: false

/*
 * If the single argument is not a number, it becomes the first element.
 */
console.log('new Array("3"):', new Array('3'))
// expected output: ['3']

/*
 * Multiple arguments become normal elements.
 */
console.log('Array(1, 2, 3):', Array(1, 2, 3))
// expected output: [1, 2, 3]

console.log('--- Array.of ---')

/*
 * Array.of() always treats arguments as elements.
 * This avoids the Array(3) empty-slot surprise.
 */
console.log('Array.of(3):', Array.of(3))
// expected output: [3]

console.log('Array.of(1, 2, 3):', Array.of(1, 2, 3))
// expected output: [1, 2, 3]

console.log('--- Spread over an empty-slot array ---')

/*
 * Spreading an empty-slot array creates actual undefined values.
 */
const undefinedValues = [...new Array(3)]
console.log('spread new Array(3):', undefinedValues)
// expected output: [undefined, undefined, undefined]

console.log('spread index 0 exists:', Object.hasOwn(undefinedValues, 0))
// expected output: true

console.log('--- Array.from for sequences ---')

/*
 * Array.from({ length: n }, mapFn) is useful when you want indexes.
 */
const zeroBasedRange = Array.from({ length: 5 }, (_, index) => index)
console.log('range 0 to 4:', zeroBasedRange)
// expected output: [0, 1, 2, 3, 4]

const oneBasedRange = Array.from({ length: 5 }, (_, index) => index + 1)
console.log('range 1 to 5:', oneBasedRange)
// expected output: [1, 2, 3, 4, 5]

console.log('--- fill with primitive values ---')

/*
 * fill() is useful when every position should get the same primitive value.
 */
const zeros = new Array(4).fill(0)
console.log('zeros:', zeros)
// expected output: [0, 0, 0, 0]

zeros[0] = 9
console.log('after changing first zero:', zeros)
// expected output: [9, 0, 0, 0]

console.log('--- fill with objects gotcha ---')

/*
 * fill(object) puts the same object reference in every position.
 * Changing one object changes what every position sees.
 */
const sharedObjects = new Array(3).fill({ status: 'new' })
sharedObjects[0].status = 'changed'
console.log('shared object references:', sharedObjects)
// expected output: every object has status 'changed'

console.log('same object reference:', sharedObjects[0] === sharedObjects[1])
// expected output: true

console.log('--- create separate objects ---')

/*
 * Use Array.from() when every position needs a fresh object.
 */
const separateObjects = Array.from({ length: 3 }, () => ({ status: 'new' }))
separateObjects[0].status = 'changed'
console.log('separate object references:', separateObjects)
// expected output: only first object has status 'changed'

console.log('same object reference:', separateObjects[0] === separateObjects[1])
// expected output: false
