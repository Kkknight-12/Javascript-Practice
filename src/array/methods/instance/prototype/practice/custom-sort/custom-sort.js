/*
 * Custom Array.prototype sort practice
 *
 * This file teaches a learning version of numeric sort logic.
 *
 * Main tools:
 * 1. Array.prototype
 * 2. compareFn(current, next)
 * 3. positive / negative / zero compare result
 * 4. mutation vs sorted copy
 * 5. cleanup after the demo
 *
 * Mental model:
 * "sort compares two values. If the compare function says the first value
 * should come after the second, swap them."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */

function requireCallback(callback, methodName) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${methodName} expects a callback function`)
  }
}

console.log('--- What are we building? ---')

/*
 * Built-in sort mutates the original array and returns the same array reference.
 */
const builtInNumbers = [3, 2, 5, 1]
const builtInSorted = builtInNumbers.sort((current, next) => current - next)

console.log('built-in sort result:', builtInSorted)
// expected output: [1, 2, 3, 5]

console.log('built-in sort returned same array:', builtInSorted === builtInNumbers)
// expected output: true

console.log('original after built-in sort:', builtInNumbers)
// expected output: [1, 2, 3, 5]

console.log('--- Add sortFromScratchPractice to Array.prototype ---')

/*
 * This learning version returns a sorted copy so the examples stay safer.
 * It does not exactly replace built-in sort(), because built-in sort mutates.
 */
Object.defineProperty(Array.prototype, 'sortFromScratchPractice', {
  value: function (compareFn) {
    requireCallback(compareFn, 'sortFromScratchPractice')

    const result = [...this]

    for (let outerIndex = 0; outerIndex < result.length; outerIndex++) {
      for (let innerIndex = 0; innerIndex < result.length - 1; innerIndex++) {
        const current = result[innerIndex]
        const next = result[innerIndex + 1]

        if (compareFn(current, next) > 0) {
          result[innerIndex] = next
          result[innerIndex + 1] = current
        }
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})

const numbers = [3, 2, 5, 1]
const sortedNumbers = numbers.sortFromScratchPractice((current, next) => {
  return current - next
})

console.log('custom sort result:', sortedNumbers)
// expected output: [1, 2, 3, 5]

console.log('original after custom sort:', numbers)
// expected output: [3, 2, 5, 1]

console.log('custom sort returned same array:', sortedNumbers === numbers)
// expected output: false

console.log('--- Compare function meaning ---')

console.log('3 - 2:', 3 - 2)
// expected output: 1

console.log('2 - 5:', 2 - 5)
// expected output: -3

console.log('2 - 2:', 2 - 2)
// expected output: 0

console.log('--- Dry run first pass ---')

/*
 * Starting array: [3, 2, 5, 1]
 *
 * compare 3 and 2 -> 3 - 2 is positive -> swap
 * [2, 3, 5, 1]
 *
 * compare 3 and 5 -> 3 - 5 is negative -> keep
 * [2, 3, 5, 1]
 *
 * compare 5 and 1 -> 5 - 1 is positive -> swap
 * [2, 3, 1, 5]
 */
console.log('after full custom sort:', numbers.sortFromScratchPractice((a, b) => a - b))
// expected output: [1, 2, 3, 5]

console.log('--- Common gotcha: default sort is string sort ---')

const defaultSortNumbers = [1, 30, 4, 21, 100000]

console.log('default sort:', [...defaultSortNumbers].sort())
// expected output: [1, 100000, 21, 30, 4]

console.log('numeric sort:', [...defaultSortNumbers].sort((a, b) => a - b))
// expected output: [1, 4, 21, 30, 100000]

console.log('--- Cleanup ---')

delete Array.prototype.sortFromScratchPractice

console.log('sortFromScratchPractice removed:', 'sortFromScratchPractice' in [])
// expected output: false

