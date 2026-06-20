/*
 * Array.prototype.fill()
 *
 * This file teaches fill() as an Array instance method.
 *
 * Main tools:
 * 1. fill(value)
 * 2. fill(value, start)
 * 3. fill(value, start, end)
 * 4. mutation
 * 5. negative indexes
 * 6. sparse arrays
 * 7. object reference gotcha
 *
 * Mental model:
 * "fill() walks through a range of indexes and writes the same value into each
 * slot. It changes the original array and returns that same array."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
 */

console.log('--- Basic fill() ---')

/*
 * fill(value) replaces every index with the given value.
 * It mutates the original array.
 */
const numbers = [1, 2, 3, 4]
const filledNumbers = numbers.fill(0)

console.log('filled numbers:', filledNumbers)
// expected output: [0, 0, 0, 0]

console.log('original numbers after fill:', numbers)
// expected output: [0, 0, 0, 0]

console.log('--- fill() returns the same array reference ---')

/*
 * fill() does not create a new array.
 * It returns the same array after changing it.
 */
const letters = ['a', 'b', 'c']
const fillReturnValue = letters.fill('x')

console.log('letters after fill:', letters)
// expected output: ['x', 'x', 'x']

console.log('return value is same reference:', fillReturnValue === letters)
// expected output: true

console.log('--- fill(value, start) ---')

/*
 * start is the first index that should be changed.
 * If end is omitted, fill() continues until the end of the array.
 */
const scores = [10, 20, 30, 40, 50]

scores.fill(100, 2)

console.log('fill from index 2:', scores)
// expected output: [10, 20, 100, 100, 100]

console.log('--- fill(value, start, end) ---')

/*
 * start is included.
 * end is excluded.
 */
const seats = ['open', 'open', 'open', 'open', 'open']

seats.fill('booked', 1, 4)

console.log('booked seats:', seats)
// expected output: ['open', 'booked', 'booked', 'booked', 'open']

console.log('--- end index is not included ---')

const endExclusiveDemo = [1, 2, 3, 4]

endExclusiveDemo.fill(9, 1, 3)

console.log('end exclusive demo:', endExclusiveDemo)
// expected output: [1, 9, 9, 4]

console.log('--- Negative indexes ---')

/*
 * Negative start/end values count backward from the end of the array.
 */
const lastItems = ['a', 'b', 'c', 'd', 'e']

lastItems.fill('z', -3, -1)

console.log('negative indexes result:', lastItems)
// expected output: ['a', 'b', 'z', 'z', 'e']

console.log('--- No change cases ---')

/*
 * If start is at or beyond array.length, nothing changes.
 * If end is before or equal to start, nothing changes.
 */
const noChangeStart = [1, 2, 3]
noChangeStart.fill(9, 5)

console.log('start beyond length:', noChangeStart)
// expected output: [1, 2, 3]

const noChangeRange = [1, 2, 3]
noChangeRange.fill(9, 2, 2)

console.log('end equals start:', noChangeRange)
// expected output: [1, 2, 3]

console.log('--- Filling an empty array ---')

/*
 * fill() cannot add length to an empty array.
 * There are no indexes to write into.
 */
const emptyArray = []

emptyArray.fill('x')

console.log('empty array after fill:', emptyArray)
// expected output: []

/*
 * Create an array with length first, then fill it.
 */
const fourSlots = Array(4).fill('x')

console.log('array with length filled:', fourSlots)
// expected output: ['x', 'x', 'x', 'x']

console.log('--- Sparse arrays get filled ---')

/*
 * fill() writes into empty slots too.
 */
const sparseValues = [1, , 3, , 5]

sparseValues.fill(0, 1, 4)

console.log('sparse values after fill:', sparseValues)
// expected output: [1, 0, 0, 0, 5]

console.log('index 1 exists now:', Object.hasOwn(sparseValues, 1))
// expected output: true

console.log('--- Object reference gotcha ---')

/*
 * When the fill value is an object, every filled slot receives the same object
 * reference.
 */
const users = Array(3).fill({ active: false })

users[0].active = true

console.log('users after changing first object:', users)
// expected output: [{ active: true }, { active: true }, { active: true }]

console.log('same object reference:', users[0] === users[1])
// expected output: true

console.log('--- Safer object creation ---')

/*
 * Use Array.from() with a mapping function when each slot needs its own object.
 */
const separateUsers = Array.from({ length: 3 }, () => ({ active: false }))

separateUsers[0].active = true

console.log('separate users:', separateUsers)
// expected output: [{ active: true }, { active: false }, { active: false }]

console.log('separate object references:', separateUsers[0] === separateUsers[1])
// expected output: false

console.log('--- Matrix gotcha ---')

/*
 * Filling with an array creates shared row references.
 */
const badMatrix = Array(3).fill(Array(2).fill(0))

badMatrix[0][0] = 1

console.log('bad matrix:', badMatrix)
// expected output: [[1, 0], [1, 0], [1, 0]]

/*
 * Create each row separately when building a matrix.
 */
const goodMatrix = Array.from({ length: 3 }, () => Array(2).fill(0))

goodMatrix[0][0] = 1

console.log('good matrix:', goodMatrix)
// expected output: [[1, 0], [0, 0], [0, 0]]

console.log('--- fill() is generic ---')

/*
 * fill() can be called on array-like objects.
 * It reads length and writes integer-keyed properties.
 */
const arrayLike = {
  length: 3,
}

Array.prototype.fill.call(arrayLike, 'item')

console.log('array-like after fill:', arrayLike)
// expected output: { '0': 'item', '1': 'item', '2': 'item', length: 3 }
