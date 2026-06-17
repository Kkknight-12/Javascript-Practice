/*
 * Array.prototype
 *
 * This file teaches the concept behind array instance methods.
 *
 * Main tools:
 * 1. Array.prototype
 * 2. prototype chain lookup
 * 3. Object.getPrototypeOf()
 * 4. method categories
 * 5. monkey patching
 *
 * Mental model:
 * "An array stores its own values, but it does not copy every method. Shared
 * methods like map(), filter(), slice(), sort(), and reduce() live on
 * Array.prototype. JavaScript finds them through the prototype chain."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
 *
 * ECMAScript reference:
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
 */

console.log('--- 1. What is Array.prototype? ---')

const numbers = [10, 20, 30]

/*
 * Array.prototype is the shared prototype object for normal arrays.
 * Array instances inherit methods from it.
 */
console.log(
  'Object.getPrototypeOf(numbers) === Array.prototype:',
  Object.getPrototypeOf(numbers) === Array.prototype
)
// expected output: true

console.log(
  'Object.getPrototypeOf(Array.prototype) === Object.prototype:',
  Object.getPrototypeOf(Array.prototype) === Object.prototype
)
// expected output: true

console.log('Array.isArray(Array.prototype):', Array.isArray(Array.prototype))
// expected output: true

console.log('Array.prototype.length:', Array.prototype.length)
// expected output: 0

console.log('--- 2. How the prototype chain finds methods ---')

/*
 * The array itself does not own map.
 * The method is found on Array.prototype.
 */
console.log('numbers has own "map":', Object.hasOwn(numbers, 'map'))
// expected output: false

console.log('"map" in numbers:', 'map' in numbers)
// expected output: true

console.log('typeof Array.prototype.map:', typeof Array.prototype.map)
// expected output: function

console.log('numbers.map result:', numbers.map((number) => number * 2))
// expected output: [20, 40, 60]

/*
 * For this array, the lookup chain is:
 *
 * numbers -> Array.prototype -> Object.prototype -> null
 */
console.log(
  'Array.prototype parent is Object.prototype:',
  Object.getPrototypeOf(Array.prototype) === Object.prototype
)
// expected output: true

console.log(
  'Object.prototype parent is null:',
  Object.getPrototypeOf(Object.prototype) === null
)
// expected output: true

console.log('--- 3. Own property wins before prototype property ---')

/*
 * JavaScript checks the object first.
 * If the property exists on the object, that value is used before the prototype.
 */
const words = ['learn', 'prototype']

console.log('normal join:', words.join(' '))
// expected output: learn prototype

words.join = function () {
  return 'own join wins'
}

console.log('words has own "join":', Object.hasOwn(words, 'join'))
// expected output: true

console.log('after own join:', words.join())
// expected output: own join wins

console.log('original join through prototype:', Array.prototype.join.call(words, ' '))
// expected output: learn prototype

delete words.join

console.log('after deleting own join:', words.join(' '))
// expected output: learn prototype

console.log('--- 4. Instance methods vs static methods ---')

/*
 * Instance methods live on Array.prototype and are called on array values.
 * Static methods live on Array itself and are called on Array.
 */
console.log('Array.prototype.includes exists:', typeof Array.prototype.includes)
// expected output: function

console.log('Array.from exists:', typeof Array.from)
// expected output: function

console.log('numbers.includes(20):', numbers.includes(20))
// expected output: true

console.log('Array.from("JS"):', Array.from('JS'))
// expected output: ['J', 'S']

console.log('--- 5. Iteration methods ---')

/*
 * Iteration methods visit array items.
 * Some return a new array, some return one value, and forEach returns undefined.
 */
const scores = [70, 85, 90]

console.log('map:', scores.map((score) => score + 5))
// expected output: [75, 90, 95]

console.log('filter:', scores.filter((score) => score >= 80))
// expected output: [85, 90]

console.log('reduce:', scores.reduce((total, score) => total + score, 0))
// expected output: 245

console.log('find:', scores.find((score) => score > 80))
// expected output: 85

console.log('some:', scores.some((score) => score === 90))
// expected output: true

console.log('every:', scores.every((score) => score >= 70))
// expected output: true

const forEachResult = scores.forEach((score) => {
  return score + 5
})

console.log('forEach return value:', forEachResult)
// expected output: undefined

console.log('original after iteration methods:', scores)
// expected output: [70, 85, 90]

console.log('--- 6. Mutator methods change the original array ---')

/*
 * Mutator methods modify the same array object.
 */
const queue = ['first', 'second']

const pushResult = queue.push('third')

console.log('push return value:', pushResult)
// expected output: 3

console.log('queue after push:', queue)
// expected output: ['first', 'second', 'third']

const reversedQueue = queue.reverse()

console.log('reverse result:', reversedQueue)
// expected output: ['third', 'second', 'first']

console.log('reverse returned same array:', reversedQueue === queue)
// expected output: true

const sortableNumbers = [3, 1, 2]

const sortedNumbers = sortableNumbers.sort((current, next) => current - next)

console.log('sort result:', sortedNumbers)
// expected output: [1, 2, 3]

console.log('original after sort:', sortableNumbers)
// expected output: [1, 2, 3]

console.log('sort returned same array:', sortedNumbers === sortableNumbers)
// expected output: true

console.log('--- 7. Accessor and copying methods do not mutate ---')

/*
 * These methods read from the array or return a new array/value.
 * They do not change the original array.
 */
const topics = ['prototype', 'scope', 'closure']

console.log('slice:', topics.slice(0, 2))
// expected output: ['prototype', 'scope']

console.log('concat:', topics.concat('event loop'))
// expected output: ['prototype', 'scope', 'closure', 'event loop']

console.log('includes:', topics.includes('scope'))
// expected output: true

console.log('join:', topics.join(' -> '))
// expected output: prototype -> scope -> closure

console.log('original after accessor/copying methods:', topics)
// expected output: ['prototype', 'scope', 'closure']

console.log('--- 8. Extending Array.prototype is monkey patching ---')

/*
 * Monkey patching means changing a built-in object at runtime.
 *
 * This is useful for learning how prototypes work, but avoid it in production
 * unless you have a very strong reason.
 */
Object.defineProperty(Array.prototype, 'firstValuePractice', {
  value: function () {
    return this[0]
  },
  configurable: true,
  writable: true,
})

console.log(['red', 'blue'].firstValuePractice())
// expected output: red

console.log('method exists through prototype:', 'firstValuePractice' in [])
// expected output: true

delete Array.prototype.firstValuePractice

console.log('method removed after demo:', 'firstValuePractice' in [])
// expected output: false

console.log('--- 9. Direct assignment warning ---')

/*
 * Direct assignment creates an enumerable property by default.
 * That can show up in for...in loops and surprise older code.
 */
Array.prototype.demoEnumerableMethod = function () {
  return 'demo'
}

console.log(
  'direct assignment is enumerable:',
  Object.prototype.propertyIsEnumerable.call(
    Array.prototype,
    'demoEnumerableMethod'
  )
)
// expected output: true

const inheritedKeys = []

for (const key in ['item']) {
  inheritedKeys.push(key)
}

console.log('for...in sees inherited enumerable keys:', inheritedKeys)
// expected output: ['0', 'demoEnumerableMethod']

delete Array.prototype.demoEnumerableMethod

console.log('cleanup complete:', 'demoEnumerableMethod' in [])
// expected output: false

