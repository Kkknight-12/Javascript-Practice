/*
 * Array.prototype.includes()
 *
 * This file teaches includes() as an Array instance method.
 *
 * Main tools:
 * 1. includes()
 * 2. boolean return value
 * 3. fromIndex
 * 4. SameValueZero comparison
 * 5. sparse array behavior
 * 6. generic array-like behavior
 *
 * Mental model:
 * "includes() asks: does this exact value exist in the array?"
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes
 */

console.log('--- Basic includes() ---')

/*
 * includes() returns true when the exact searched value exists.
 * It returns false when the value is missing.
 */
const numbers = [1, 2, 3]

console.log('has 2:', numbers.includes(2))
// expected output: true

console.log('has 9:', numbers.includes(9))
// expected output: false

console.log('original numbers:', numbers)
// expected output: [1, 2, 3]

console.log('--- includes() returns a boolean ---')

/*
 * includes() does not return the value.
 * It does not return the index.
 * It only returns true or false.
 */
const pets = ['cat', 'dog', 'bat']

console.log('has cat:', pets.includes('cat'))
// expected output: true

console.log('has at:', pets.includes('at'))
// expected output: false

console.log('--- Exact value, not substring search ---')

/*
 * Array includes() checks full array elements.
 * It does not search inside string elements.
 */
const words = ['cat', 'dog', 'bat']

console.log('array has "cat":', words.includes('cat'))
// expected output: true

console.log('array has "at":', words.includes('at'))
// expected output: false

console.log('string has "at":', 'cat'.includes('at'))
// expected output: true

console.log('--- No type coercion ---')

/*
 * includes() does not convert strings to numbers or numbers to strings.
 */
const mixedValues = ['1', '2', '3']

console.log('has string "3":', mixedValues.includes('3'))
// expected output: true

console.log('has number 3:', mixedValues.includes(3))
// expected output: false

console.log('--- fromIndex starts the search later ---')

/*
 * The second argument is fromIndex.
 * It controls where the search starts.
 */
const letters = ['a', 'b', 'c', 'a', 'd']

console.log('has a from start:', letters.includes('a'))
// expected output: true

console.log('has a from index 1:', letters.includes('a', 1))
// expected output: true

console.log('has a from index 4:', letters.includes('a', 4))
// expected output: false

console.log('fromIndex beyond length:', letters.includes('d', 5))
// expected output: false

console.log('--- Negative fromIndex ---')

/*
 * A negative fromIndex counts back from the end first.
 * The search still moves left to right after that.
 */
console.log('has c from -3:', letters.includes('c', -3))
// expected output: true

console.log('has b from -3:', letters.includes('b', -3))
// expected output: false

console.log('has a from -100:', letters.includes('a', -100))
// expected output: true

console.log('--- SameValueZero comparison ---')

/*
 * includes() uses SameValueZero comparison.
 * This is close to ===, but NaN matches NaN.
 */
console.log('includes NaN:', [1, 2, NaN].includes(NaN))
// expected output: true

console.log('indexOf NaN:', [1, 2, NaN].indexOf(NaN))
// expected output: -1

console.log('includes 0 when array has -0:', [-0].includes(0))
// expected output: true

console.log('includes -0 when array has 0:', [0].includes(-0))
// expected output: true

console.log('--- Object reference behavior ---')

/*
 * Objects are compared by reference.
 * A new object with the same properties is not the same value.
 */
const keyboard = { id: 2, name: 'Keyboard' }
const products = [
  { id: 1, name: 'Laptop' },
  keyboard,
]

console.log('has same keyboard object:', products.includes(keyboard))
// expected output: true

console.log('has new object with same data:', products.includes({ id: 2, name: 'Keyboard' }))
// expected output: false

console.log('--- includes() vs some() for conditions ---')

/*
 * includes() searches for a value.
 * It does not run a callback condition.
 */
const scores = [72, 81, 64, 90]

console.log('includes exact score 90:', scores.includes(90))
// expected output: true

console.log('wrong callback search:', scores.includes((score) => score >= 90))
// expected output: false

console.log('condition search with some:', scores.some((score) => score >= 90))
// expected output: true

console.log('--- Empty arrays ---')

console.log('empty array includes undefined:', [].includes(undefined))
// expected output: false

console.log('empty array includes anything:', [].includes('anything'))
// expected output: false

console.log('--- Sparse array behavior ---')

/*
 * includes() treats empty slots as undefined.
 */
const sparseValues = [1, , 3]

console.log('sparse has undefined:', sparseValues.includes(undefined))
// expected output: true

console.log('index 1 exists:', 1 in sparseValues)
// expected output: false

/*
 * This differs from indexOf(), which skips empty slots.
 */
console.log('indexOf undefined in sparse array:', sparseValues.indexOf(undefined))
// expected output: -1

console.log('--- Generic array-like behavior ---')

/*
 * includes() is generic.
 * It can be called on array-like objects that have length and integer keys.
 */
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 1,
}

console.log('array-like has 2:', Array.prototype.includes.call(arrayLike, 2))
// expected output: true

console.log('array-like has 1:', Array.prototype.includes.call(arrayLike, 1))
// expected output: false

/*
 * Missing integer-keyed properties are read as undefined.
 * Properties outside length are ignored.
 */
const arrayLikeWithMissingIndex = {
  length: 3,
  1: 'mayank',
  2: 'b',
  3: 'ignored',
}

console.log(
  'array-like has mayank:',
  Array.prototype.includes.call(arrayLikeWithMissingIndex, 'mayank')
)
// expected output: true

console.log(
  'array-like missing index behaves like undefined:',
  Array.prototype.includes.call(arrayLikeWithMissingIndex, undefined)
)
// expected output: true

console.log(
  'array-like ignores key outside length:',
  Array.prototype.includes.call(arrayLikeWithMissingIndex, 'ignored')
)
// expected output: false
