/*
 * Array.prototype[Symbol.iterator]()
 *
 * This file teaches the built-in Array iterator method.
 *
 * Main tools:
 * 1. [Symbol.iterator]()
 * 2. iterator.next()
 * 3. for...of, spread, destructuring, and Array.from()
 * 4. values(), keys(), and entries()
 * 5. sparse array behavior
 * 6. generic array-like behavior
 *
 * Mental model:
 * "An array knows how to hand out its values one by one."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype-%symbol.iterator%
 */

console.log('--- Basic array iterator ---')

/*
 * Array.prototype[Symbol.iterator]() returns an Array Iterator object.
 * The iterator reads array values from left to right.
 */
const letters = ['a', 'b', 'c']
const iterator = letters[Symbol.iterator]()

console.log('first next():', iterator.next())
// expected output: { value: 'a', done: false }

console.log('second next():', iterator.next())
// expected output: { value: 'b', done: false }

console.log('third next():', iterator.next())
// expected output: { value: 'c', done: false }

console.log('after the last value:', iterator.next())
// expected output: { value: undefined, done: true }

console.log('--- Same function as values() ---')

/*
 * For arrays, Symbol.iterator starts as the same function as values().
 * That is why array iteration gives values by default.
 */
console.log(
  'Symbol.iterator is values:',
  Array.prototype[Symbol.iterator] === Array.prototype.values
)
// expected output: true

console.log('values iterator result:', [...letters.values()])
// expected output: [ 'a', 'b', 'c' ]

console.log('Symbol.iterator result:', [...letters[Symbol.iterator]()])
// expected output: [ 'a', 'b', 'c' ]

console.log('--- for...of uses Symbol.iterator automatically ---')

/*
 * You usually do not call [Symbol.iterator]() yourself.
 * Syntax like for...of asks the array for its iterator automatically.
 */
for (const letter of letters) {
  console.log('for...of value:', letter)
}
// expected output:
// for...of value: a
// for...of value: b
// for...of value: c

console.log('--- Spread, destructuring, and Array.from() ---')

/*
 * Spread, array destructuring, and Array.from() also read iterable values.
 */
const colors = ['red', 'green', 'blue']

console.log('spread copy:', [...colors])
// expected output: [ 'red', 'green', 'blue' ]

const [firstColor, secondColor] = colors

console.log('destructured colors:', firstColor, secondColor)
// expected output: red green

console.log('Array.from result:', Array.from(colors))
// expected output: [ 'red', 'green', 'blue' ]

console.log('--- Iterators are stateful ---')

/*
 * An iterator remembers its current position.
 * Once a value has been consumed, the same iterator does not rewind.
 */
const names = ['Aman', 'Bina', 'Charu']
const namesIterator = names[Symbol.iterator]()

console.log('manual read:', namesIterator.next().value)
// expected output: Aman

console.log('remaining values:', [...namesIterator])
// expected output: [ 'Bina', 'Charu' ]

console.log('same iterator after spread:', [...namesIterator])
// expected output: []

console.log('fresh iterator:', [...names[Symbol.iterator]()])
// expected output: [ 'Aman', 'Bina', 'Charu' ]

console.log('--- Iterator objects are also iterable ---')

/*
 * The array iterator returns itself from its own Symbol.iterator method.
 * That lets for...of continue from the iterator's current position.
 */
const scoreIterator = [10, 20, 30][Symbol.iterator]()

console.log('iterator is iterable:', scoreIterator[Symbol.iterator]() === scoreIterator)
// expected output: true

console.log('consume one score:', scoreIterator.next().value)
// expected output: 10

for (const score of scoreIterator) {
  console.log('remaining score:', score)
}
// expected output:
// remaining score: 20
// remaining score: 30

console.log('--- values(), keys(), and entries() ---')

/*
 * values() and Symbol.iterator read values.
 * keys() reads indexes.
 * entries() reads [index, value] pairs.
 */
const topics = ['array', 'object', 'string']

console.log('values:', [...topics.values()])
// expected output: [ 'array', 'object', 'string' ]

console.log('keys:', [...topics.keys()])
// expected output: [ 0, 1, 2 ]

console.log('entries:', [...topics.entries()])
// expected output: [ [ 0, 'array' ], [ 1, 'object' ], [ 2, 'string' ] ]

console.log('--- Sparse array behavior ---')

/*
 * Array iterators do not skip empty slots.
 * Empty slots are read as undefined values.
 */
const sparseValues = ['first', , 'third']

console.log('sparse values:', [...sparseValues[Symbol.iterator]()])
// expected output: [ 'first', undefined, 'third' ]

console.log('index 1 exists:', 1 in sparseValues)
// expected output: false

console.log('--- Plain object gotcha ---')

/*
 * Plain objects are not iterable by default.
 * They do not have a Symbol.iterator method unless you add one.
 */
const user = {
  name: 'Aman',
  role: 'admin',
}

console.log('plain object iterator:', user[Symbol.iterator])
// expected output: undefined

console.log('object entries are iterable:', [...Object.entries(user)])
// expected output: [ [ 'name', 'Aman' ], [ 'role', 'admin' ] ]

console.log('--- Generic array-like behavior ---')

/*
 * The array iterator method is generic.
 * It can read values from an array-like object with length and integer keys.
 */
const arrayLike = {
  length: 3,
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'ignored because length is 3',
}

const arrayLikeIterator = Array.prototype[Symbol.iterator].call(arrayLike)

console.log('array-like values:', [...arrayLikeIterator])
// expected output: [ 'zero', 'one', 'two' ]

const missingIndexArrayLike = {
  length: 3,
  0: 'present',
  2: 'also present',
}

console.log(
  'missing array-like index:',
  [...Array.prototype[Symbol.iterator].call(missingIndexArrayLike)]
)
// expected output: [ 'present', undefined, 'also present' ]

console.log('--- Common mistake: string property name ---')

/*
 * Symbol.iterator is a symbol key, not the string "Symbol.iterator".
 */
console.log('wrong string key:', letters['Symbol.iterator'])
// expected output: undefined

console.log('correct symbol key is a function:', typeof letters[Symbol.iterator])
// expected output: function
