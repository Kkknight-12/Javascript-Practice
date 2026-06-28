/*
 * Array.prototype.slice()
 *
 * This file teaches slice() as an Array instance method.
 *
 * Main tools:
 * 1. slice()
 * 2. start index
 * 3. end index
 * 4. shallow copied result
 * 5. negative indexes
 * 6. copy-first patterns
 * 7. sparse array behavior
 * 8. generic array-like behavior
 *
 * Mental model:
 * "slice() copies part of an array into a new array. It does not mutate the original."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.slice
 */

console.log('--- Basic slice(start, end) ---')

/*
 * slice(start, end) copies from start up to, but not including, end.
 */
const letters = ['a', 'b', 'c', 'd', 'e']
const middleLetters = letters.slice(1, 4)

console.log('middle letters:', middleLetters)
// expected output: [ 'b', 'c', 'd' ]

console.log('original letters:', letters)
// expected output: [ 'a', 'b', 'c', 'd', 'e' ]

console.log('same array reference:', middleLetters === letters)
// expected output: false

console.log('--- End index is excluded ---')

/*
 * The end index marks where copying stops.
 * The element at that end index is not included.
 */
const colors = ['red', 'green', 'blue', 'yellow']

console.log('slice(0, 2):', colors.slice(0, 2))
// expected output: [ 'red', 'green' ]

console.log('element at index 2:', colors[2])
// expected output: blue

console.log('--- Start only means copy to the end ---')

const numbers = [10, 20, 30, 40, 50]

console.log('slice(2):', numbers.slice(2))
// expected output: [ 30, 40, 50 ]

console.log('--- No arguments means shallow copy ---')

const originalScores = [80, 90, 100]
const copiedScores = originalScores.slice()

console.log('copied scores:', copiedScores)
// expected output: [ 80, 90, 100 ]

console.log('same array reference:', copiedScores === originalScores)
// expected output: false

console.log('--- Negative indexes count from the end ---')

const fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']

console.log('last item:', fruits.slice(-1))
// expected output: [ 'Mango' ]

console.log('last two items:', fruits.slice(-2))
// expected output: [ 'Apple', 'Mango' ]

console.log('middle using negative end:', fruits.slice(1, -1))
// expected output: [ 'Orange', 'Lemon', 'Apple' ]

console.log('--- Removing items without mutating ---')

/*
 * slice() does not remove values by itself.
 * To build a version without one item, copy the parts around that item.
 */
const menu = ['Tea', 'Coffee', 'Juice', 'Water']
const indexToSkip = 2
const menuWithoutJuice = menu
  .slice(0, indexToSkip)
  .concat(menu.slice(indexToSkip + 1))

console.log('menu without Juice:', menuWithoutJuice)
// expected output: [ 'Tea', 'Coffee', 'Water' ]

console.log('original menu:', menu)
// expected output: [ 'Tea', 'Coffee', 'Juice', 'Water' ]

console.log('--- Shallow copy warning ---')

/*
 * slice() creates a new outer array.
 * Objects inside the array are still shared references.
 */
const tasks = [
  { title: 'learn slice', done: false },
  { title: 'practice arrays', done: false },
]
const copiedTasks = tasks.slice()

copiedTasks[0].done = true

console.log('copied tasks:', copiedTasks)
// expected output:
// [
//   { title: 'learn slice', done: true },
//   { title: 'practice arrays', done: false }
// ]

console.log('original tasks after nested mutation:', tasks)
// expected output:
// [
//   { title: 'learn slice', done: true },
//   { title: 'practice arrays', done: false }
// ]

console.log('--- Out-of-range and reversed bounds ---')

const values = ['a', 'b', 'c']

console.log('start past end:', values.slice(10))
// expected output: []

console.log('end before start:', values.slice(2, 1))
// expected output: []

console.log('negative start before array:', values.slice(-10, 2))
// expected output: [ 'a', 'b' ]

console.log('--- Fractional indexes are converted to integers ---')

const fractionalIndexValues = ['zero', 'one', 'two', 'three']

console.log('slice(1.9, 3.1):', fractionalIndexValues.slice(1.9, 3.1))
// expected output: [ 'one', 'two' ]

console.log('--- Sparse array behavior ---')

/*
 * slice() preserves empty slots.
 */
const sparseValues = ['first', , 'third', 'fourth']
const sparseCopy = sparseValues.slice(0, 3)

console.log('sparse copy:', sparseCopy)
// expected output: [ 'first', <1 empty item>, 'third' ]

console.log('index 1 exists in sparse copy:', Object.hasOwn(sparseCopy, 1))
// expected output: false

console.log('--- Generic array-like behavior ---')

/*
 * slice() is generic.
 * It can be borrowed for array-like objects with length and integer keys.
 */
const arrayLike = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  length: 4,
}

const arrayLikeSlice = Array.prototype.slice.call(arrayLike, 1, 3)

console.log('array-like slice:', arrayLikeSlice)
// expected output: [ 'one', 'two' ]

console.log('--- slice() vs splice() ---')

/*
 * slice() copies. splice() mutates.
 */
const sliceSource = ['a', 'b', 'c', 'd']
const spliceSource = ['a', 'b', 'c', 'd']

const slicedPart = sliceSource.slice(1, 3)
const splicedPart = spliceSource.splice(1, 2)

console.log('sliced part:', slicedPart)
// expected output: [ 'b', 'c' ]

console.log('slice source after slice:', sliceSource)
// expected output: [ 'a', 'b', 'c', 'd' ]

console.log('spliced part:', splicedPart)
// expected output: [ 'b', 'c' ]

console.log('splice source after splice:', spliceSource)
// expected output: [ 'a', 'd' ]
