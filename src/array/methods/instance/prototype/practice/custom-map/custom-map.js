/*
 * Custom Array.prototype map practice
 *
 * This file teaches how a learning version of map can be added to
 * Array.prototype.
 *
 * Main tools:
 * 1. Array.prototype
 * 2. Object.defineProperty()
 * 3. callback(value, index, array)
 * 4. this inside a prototype method
 * 5. cleanup after the demo
 *
 * Mental model:
 * "map transforms each existing item and returns a new array with the
 * transformed values."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

function requireCallback(callback, methodName) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${methodName} expects a callback function`)
  }
}

console.log('--- What are we building? ---')

/*
 * Built-in map:
 * - calls the callback for each existing array item
 * - passes value, index, and array
 * - returns a new array
 * - does not mutate the original array
 */
const builtInNumbers = [1, 2, 3]
const builtInMapped = builtInNumbers.map((number) => number * 2)

console.log('built-in map result:', builtInMapped)
// expected output: [2, 4, 6]

console.log('original after built-in map:', builtInNumbers)
// expected output: [1, 2, 3]

console.log('--- Add myMapPractice to Array.prototype ---')

/*
 * Object.defineProperty keeps the practice method non-enumerable, which is
 * closer to built-in Array.prototype methods than direct assignment.
 */
Object.defineProperty(Array.prototype, 'myMapPractice', {
  value: function (callback) {
    requireCallback(callback, 'myMapPractice')

    const result = new Array(this.length)

    for (let index = 0; index < this.length; index++) {
      /*
       * map skips empty slots. This keeps the practice version close to the
       * built-in behavior for sparse arrays.
       */
      if (index in this) {
        result[index] = callback(this[index], index, this)
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})

const numbers = [1, 2, 3]

console.log('custom map result:', numbers.myMapPractice((number) => number * 2))
// expected output: [2, 4, 6]

console.log('original after custom map:', numbers)
// expected output: [1, 2, 3]

console.log('--- Callback receives value, index, and array ---')

const callbackDetails = numbers.myMapPractice((value, index, array) => {
  return `${index}:${value}/${array.length}`
})

console.log('callback details:', callbackDetails)
// expected output: ['0:1/3', '1:2/3', '2:3/3']

console.log('--- Dry run ---')

/*
 * For [1, 2, 3] and number => number * 2:
 *
 * index 0 -> callback(1, 0, numbers) -> 2
 * index 1 -> callback(2, 1, numbers) -> 4
 * index 2 -> callback(3, 2, numbers) -> 6
 * final result -> [2, 4, 6]
 */
const dryRunResult = numbers.myMapPractice((number) => number * 2)

console.log('dry run final result:', dryRunResult)
// expected output: [2, 4, 6]

console.log('--- Empty slot behavior ---')

const sparse = [1, , 3]
const sparseMapped = sparse.myMapPractice((number) => number * 10)

console.log('sparse map result:', sparseMapped)
// expected output: [10, <1 empty item>, 30]

console.log('index 1 exists in result:', Object.hasOwn(sparseMapped, 1))
// expected output: false

console.log('--- Common mistake: using map for side effects only ---')

const sideEffectSource = [1, 2, 3]
const sideEffectResult = sideEffectSource.myMapPractice((number) => {
  console.log('visited:', number)
})

console.log('side effect result:', sideEffectResult)
// expected output: [undefined, undefined, undefined]

console.log('--- Cleanup ---')

delete Array.prototype.myMapPractice

console.log('myMapPractice removed:', 'myMapPractice' in [])
// expected output: false

