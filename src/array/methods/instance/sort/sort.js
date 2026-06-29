/*
 * Array.prototype.sort()
 *
 * This file teaches sort() as an Array instance method.
 *
 * Main tools:
 * 1. sort()
 * 2. compareFn(a, b)
 * 3. default string sorting
 * 4. in-place mutation
 * 5. stable sorting
 * 6. toSorted()
 * 7. undefined and sparse array behavior
 * 8. generic array-like behavior
 *
 * Mental model:
 * "sort() reorders the same array. The compare function decides pair order."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort
 */

console.log('--- Basic sort() mutates ---')

/*
 * sort() changes the original array and returns that same array.
 */
const names = ['Maya', 'Asha', 'Neel']
const sortedNames = names.sort()

console.log('sorted names:', sortedNames)
// expected output: [ 'Asha', 'Maya', 'Neel' ]

console.log('original names after sort:', names)
// expected output: [ 'Asha', 'Maya', 'Neel' ]

console.log('same array reference:', sortedNames === names)
// expected output: true

console.log('--- Default sort is string sort ---')

/*
 * Without a compare function, values are converted to strings and compared
 * by UTF-16 code unit order.
 */
const defaultNumbers = [1, 30, 4, 21, 100000]
const defaultSortedNumbers = [...defaultNumbers].sort()

console.log('default number sort:', defaultSortedNumbers)
// expected output: [ 1, 100000, 21, 30, 4 ]

console.log('--- Numeric ascending sort ---')

/*
 * For numbers, use a compare function.
 *
 * a - b < 0 means a should come before b.
 * a - b > 0 means a should come after b.
 */
const scores = [40, 100, 1, 5, 25, 10]
const ascendingScores = scores.sort((a, b) => a - b)

console.log('ascending scores:', ascendingScores)
// expected output: [ 1, 5, 10, 25, 40, 100 ]

console.log('scores after sort:', scores)
// expected output: [ 1, 5, 10, 25, 40, 100 ]

console.log('--- Numeric descending sort ---')

const highScores = [40, 100, 1, 5, 25, 10]

console.log('descending scores:', highScores.sort((a, b) => b - a))
// expected output: [ 100, 40, 25, 10, 5, 1 ]

console.log('--- Compare function result meaning ---')

function explainCompareResult(result) {
  if (result < 0) return 'a before b'
  if (result > 0) return 'a after b'
  return 'keep relative order'
}

console.log('compare 2 and 5:', explainCompareResult(2 - 5))
// expected output: a before b

console.log('compare 5 and 2:', explainCompareResult(5 - 2))
// expected output: a after b

console.log('compare 5 and 5:', explainCompareResult(5 - 5))
// expected output: keep relative order

console.log('--- Sort objects by number property ---')

const people = [
  { name: 'Edward', age: 21 },
  { name: 'Sharpe', age: 37 },
  { name: 'And', age: 45 },
  { name: 'The', age: -12 },
  { name: 'Magnetic', age: 13 },
  { name: 'Zeros', age: 37 },
]

people.sort((a, b) => a.age - b.age)

console.log('people by age:', people.map((person) => `${person.name}:${person.age}`).join(', '))
// expected output: The:-12, Magnetic:13, Edward:21, Sharpe:37, Zeros:37, And:45

console.log('--- Sort objects by string property ---')

const products = [
  { title: 'banana' },
  { title: 'Apple' },
  { title: 'cherry' },
]

products.sort((a, b) => {
  return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
})

console.log('products by title:', products.map((product) => product.title))
// expected output: [ 'Apple', 'banana', 'cherry' ]

console.log('--- Stable sort ---')

/*
 * Modern JavaScript sort is stable.
 * Items that compare as equal keep their original relative order.
 */
const students = [
  { name: 'Alex', grade: 15 },
  { name: 'Devlin', grade: 15 },
  { name: 'Eagle', grade: 13 },
  { name: 'Sam', grade: 14 },
]

students.sort((a, b) => a.grade - b.grade)

console.log('students by grade:', students.map((student) => student.name))
// expected output: [ 'Eagle', 'Sam', 'Alex', 'Devlin' ]

console.log('--- toSorted() for a copying sort ---')

/*
 * toSorted() returns a sorted copy and does not mutate the original.
 */
const queue = ['third', 'first', 'second']
const sortedQueue = queue.toSorted()

console.log('sorted queue copy:', sortedQueue)
// expected output: [ 'first', 'second', 'third' ]

console.log('queue after toSorted:', queue)
// expected output: [ 'third', 'first', 'second' ]

console.log('same array reference:', sortedQueue === queue)
// expected output: false

console.log('--- Copy-first sort pattern ---')

/*
 * If toSorted() is not available in an older environment, copy first.
 */
const priorities = [3, 1, 2]
const sortedPriorities = [...priorities].sort((a, b) => a - b)

console.log('sorted priorities:', sortedPriorities)
// expected output: [ 1, 2, 3 ]

console.log('priorities after copy-first sort:', priorities)
// expected output: [ 3, 1, 2 ]

console.log('--- Shallow copy warning ---')

/*
 * toSorted() and copy-first sort create a new outer array.
 * Objects inside the array are still shared references.
 */
const tasks = [
  { title: 'learn sort', priority: 2, done: false },
  { title: 'practice compareFn', priority: 1, done: false },
]
const sortedTaskCopy = tasks.toSorted((a, b) => a.priority - b.priority)

sortedTaskCopy[0].done = true

console.log('sorted task copy:', sortedTaskCopy)
// expected output:
// [
//   { title: 'practice compareFn', priority: 1, done: true },
//   { title: 'learn sort', priority: 2, done: false }
// ]

console.log('original tasks after nested mutation:', tasks)
// expected output:
// [
//   { title: 'learn sort', priority: 2, done: false },
//   { title: 'practice compareFn', priority: 1, done: true }
// ]

console.log('--- undefined and sparse array behavior ---')

/*
 * undefined values sort after defined values.
 * The compare function is not called for undefined values.
 * Empty slots move after undefined values and remain empty slots.
 */
const mixedValues = [3, undefined, 1, , 2]

mixedValues.sort((a, b) => a - b)

console.log('mixed values after sort:', mixedValues)
// expected output: [ 1, 2, 3, undefined, <1 empty item> ]

console.log('last index exists:', Object.hasOwn(mixedValues, 4))
// expected output: false

console.log('--- Generic array-like behavior ---')

/*
 * sort() is generic.
 * It can be borrowed for array-like objects with length and integer keys.
 */
const arrayLike = {
  0: 'delta',
  1: 'alpha',
  2: 'charlie',
  length: 3,
}

const sortedArrayLike = Array.prototype.sort.call(arrayLike)

console.log('sorted array-like:', sortedArrayLike)
// expected output: { '0': 'alpha', '1': 'charlie', '2': 'delta', length: 3 }

console.log('same array-like object:', sortedArrayLike === arrayLike)
// expected output: true

console.log('--- Bad compare function warning ---')

/*
 * A compare function must be consistent.
 * Returning only 1 or 0 is not a well-formed ascending compare function.
 */
const safeNumbers = [3, 1, 2]

console.log('well-formed compare:', safeNumbers.toSorted((a, b) => a - b))
// expected output: [ 1, 2, 3 ]

console.log('boolean-style compare result:', safeNumbers.toSorted((a, b) => a > b))
// expected output in Node: [ 3, 1, 2 ]
// result can be engine-dependent; avoid this pattern
