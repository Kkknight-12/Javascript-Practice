/*
 * Custom Array.prototype reduce practice
 *
 * This file teaches how a learning version of reduce can be added to
 * Array.prototype.
 *
 * Main tools:
 * 1. Array.prototype
 * 2. accumulator
 * 3. current value
 * 4. initial value
 * 5. cleanup after the demo
 *
 * Mental model:
 * "reduce carries one accumulator through the array. Each callback return value
 * becomes the accumulator for the next item."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 */

function requireCallback(callback, methodName) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${methodName} expects a callback function`)
  }
}

console.log('--- What are we building? ---')

/*
 * Built-in reduce:
 * - combines array values into one final value
 * - passes accumulator, currentValue, currentIndex, and array
 * - can use an explicit initial value
 * - throws on an empty array when no initial value is provided
 */
const builtInNumbers = [1, 2, 3]
const builtInTotal = builtInNumbers.reduce((accumulator, number) => {
  return accumulator + number
}, 0)

console.log('built-in reduce result:', builtInTotal)
// expected output: 6

console.log('--- Add reduceFromScratchPractice to Array.prototype ---')

Object.defineProperty(Array.prototype, 'reduceFromScratchPractice', {
  value: function (callback, initialValue) {
    requireCallback(callback, 'reduceFromScratchPractice')

    let index = 0
    let accumulator = initialValue

    if (arguments.length < 2) {
      while (index < this.length && !(index in this)) {
        index++
      }

      if (index >= this.length) {
        throw new TypeError('Reduce of empty array with no initial value')
      }

      accumulator = this[index]
      index++
    }

    for (; index < this.length; index++) {
      if (index in this) {
        accumulator = callback(accumulator, this[index], index, this)
      }
    }

    return accumulator
  },
  configurable: true,
  writable: true,
})

const numbers = [1, 2, 3]

console.log(
  'custom reduce with initial value:',
  numbers.reduceFromScratchPractice((accumulator, number) => {
    return accumulator + number
  }, 0)
)
// expected output: 6

console.log(
  'custom reduce without initial value:',
  numbers.reduceFromScratchPractice((accumulator, number) => {
    return accumulator + number
  })
)
// expected output: 6

console.log('--- Callback receives accumulator, value, index, and array ---')

const trace = numbers.reduceFromScratchPractice((steps, value, index, array) => {
  steps.push(`${index}:${value}/${array.length}`)
  return steps
}, [])

console.log('callback details:', trace)
// expected output: ['0:1/3', '1:2/3', '2:3/3']

console.log('--- Dry run ---')

/*
 * For [1, 2, 3] and initial value 0:
 *
 * start accumulator = 0
 * item 1 -> callback(0, 1) -> 1
 * item 2 -> callback(1, 2) -> 3
 * item 3 -> callback(3, 3) -> 6
 * final result -> 6
 */
const dryRunTotal = numbers.reduceFromScratchPractice((accumulator, number) => {
  return accumulator + number
}, 0)

console.log('dry run final result:', dryRunTotal)
// expected output: 6

console.log('--- Reduce into an object ---')

const methodCounts = ['map', 'filter', 'map'].reduceFromScratchPractice(
  (counts, methodName) => {
    counts[methodName] = (counts[methodName] || 0) + 1
    return counts
  },
  {}
)

console.log('method counts:', methodCounts)
// expected output: { map: 2, filter: 1 }

console.log('--- Empty array without initial value throws ---')

try {
  [].reduceFromScratchPractice((accumulator, number) => accumulator + number)
} catch (error) {
  console.log('empty reduce error:', error.name)
}
// expected output: TypeError

console.log('--- Empty slot behavior ---')

const sparse = [1, , 3]

console.log(
  'sparse reduce result:',
  sparse.reduceFromScratchPractice((accumulator, number) => accumulator + number, 0)
)
// expected output: 4

console.log('--- Cleanup ---')

delete Array.prototype.reduceFromScratchPractice

console.log('reduceFromScratchPractice removed:', 'reduceFromScratchPractice' in [])
// expected output: false

