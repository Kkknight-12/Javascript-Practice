/*
 * Array.prototype.reverse()
 *
 * This file teaches reverse() as an Array instance method.
 *
 * Main tools:
 * 1. reverse()
 * 2. in-place mutation
 * 3. same-reference return value
 * 4. toReversed()
 * 5. copy-first reverse patterns
 * 6. sparse array behavior
 * 7. generic array-like behavior
 *
 * Mental model:
 * "reverse() turns the same array around. It does not create a new array."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reverse
 */

console.log('--- Basic reverse() ---')

/*
 * reverse() changes the original array and returns that same array.
 */
const words = ['one', 'two', 'three']
const reversedWords = words.reverse()

console.log('reversed words:', reversedWords)
// expected output: [ 'three', 'two', 'one' ]

console.log('original words after reverse:', words)
// expected output: [ 'three', 'two', 'one' ]

console.log('same array reference:', reversedWords === words)
// expected output: true

console.log('--- reverse() takes no parameters ---')

/*
 * Passing arguments does not change how reverse() works.
 */
const letters = ['a', 'b', 'c']

console.log('reverse with ignored argument:', letters.reverse('ignored'))
// expected output: [ 'c', 'b', 'a' ]

console.log('--- Mutating the returned array mutates the original ---')

/*
 * The returned value and the original value are the same array object.
 */
const numbers = [3, 2, 4, 1, 5]
const reversedNumbers = numbers.reverse()

reversedNumbers[0] = 99

console.log('reversed numbers:', reversedNumbers)
// expected output: [ 99, 1, 4, 2, 3 ]

console.log('original numbers:', numbers)
// expected output: [ 99, 1, 4, 2, 3 ]

console.log('--- Object references are not cloned ---')

/*
 * reverse() only changes element positions.
 * It does not clone objects inside the array.
 */
const asha = { name: 'Asha' }
const ira = { name: 'Ira' }
const neel = { name: 'Neel' }
const users = [asha, ira, neel]

const reversedUsers = users.reverse()

console.log('first reversed user:', reversedUsers[0])
// expected output: { name: 'Neel' }

console.log('same user object reference:', reversedUsers[0] === neel)
// expected output: true

reversedUsers[0].name = 'Neel updated'

console.log('updated original object:', neel)
// expected output: { name: 'Neel updated' }

console.log('--- toReversed() for a copying reverse ---')

/*
 * toReversed() returns a new reversed array and does not mutate the original.
 */
const queue = ['first', 'second', 'third']
const reversedQueue = queue.toReversed()

console.log('toReversed result:', reversedQueue)
// expected output: [ 'third', 'second', 'first' ]

console.log('queue after toReversed:', queue)
// expected output: [ 'first', 'second', 'third' ]

console.log('toReversed returns new array:', reversedQueue === queue)
// expected output: false

console.log('--- Copy-first reverse patterns ---')

/*
 * If toReversed() is not available in an older environment, copy first.
 */
const scores = [10, 20, 30]

const reversedWithSpread = [...scores].reverse()
const reversedWithArrayFrom = Array.from(scores).reverse()

console.log('spread copy reverse:', reversedWithSpread)
// expected output: [ 30, 20, 10 ]

console.log('Array.from copy reverse:', reversedWithArrayFrom)
// expected output: [ 30, 20, 10 ]

console.log('scores after copy-first reverse:', scores)
// expected output: [ 10, 20, 30 ]

console.log('--- Shallow copy warning ---')

/*
 * Copy-first reverse creates a new outer array.
 * Nested objects are still shared references.
 */
const tasks = [
  { title: 'learn reverse', done: false },
  { title: 'practice methods', done: false },
]

const reversedTaskCopy = tasks.toReversed()

reversedTaskCopy[0].done = true

console.log('reversed task copy:', reversedTaskCopy)
// expected output:
// [
//   { title: 'practice methods', done: true },
//   { title: 'learn reverse', done: false }
// ]

console.log('original tasks after nested mutation:', tasks)
// expected output:
// [
//   { title: 'learn reverse', done: false },
//   { title: 'practice methods', done: true }
// ]

console.log('--- Empty and single-item arrays ---')

const emptyValues = []
const oneValue = ['only']

console.log('empty reverse:', emptyValues.reverse())
// expected output: []

console.log('single-item reverse:', oneValue.reverse())
// expected output: [ 'only' ]

console.log('--- Sparse array behavior ---')

/*
 * reverse() preserves empty slots.
 */
const sparseValues = ['first', , 'third', 'fourth']

console.log('sparse before:', sparseValues)
// expected output: [ 'first', <1 empty item>, 'third', 'fourth' ]

sparseValues.reverse()

console.log('sparse after reverse:', sparseValues)
// expected output: [ 'fourth', 'third', <1 empty item>, 'first' ]

console.log('index 2 exists after reverse:', Object.hasOwn(sparseValues, 2))
// expected output: false

console.log('--- Generic array-like behavior ---')

/*
 * reverse() is generic.
 * It can be borrowed for array-like objects with length and integer keys.
 */
const arrayLike = {
  0: 'zero',
  1: 'one',
  2: 'two',
  length: 3,
}

const reversedArrayLike = Array.prototype.reverse.call(arrayLike)

console.log('reversed array-like:', reversedArrayLike)
// expected output: { '0': 'two', '1': 'one', '2': 'zero', length: 3 }

console.log('same array-like object:', reversedArrayLike === arrayLike)
// expected output: true

console.log('--- reverse() vs sort() ---')

/*
 * reverse() only flips current order.
 * It does not sort values.
 */
const unsortedNumbers = [3, 1, 2]

console.log('reverse current order:', [...unsortedNumbers].reverse())
// expected output: [ 2, 1, 3 ]

console.log('sort ascending:', [...unsortedNumbers].sort((a, b) => a - b))
// expected output: [ 1, 2, 3 ]
