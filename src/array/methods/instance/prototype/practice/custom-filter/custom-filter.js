/*
 * Custom Array.prototype filter practice
 *
 * This file teaches how a learning version of filter can be added to
 * Array.prototype.
 *
 * Main tools:
 * 1. Array.prototype
 * 2. Object.defineProperty()
 * 3. callback(value, index, array)
 * 4. truthy/falsy callback result
 * 5. cleanup after the demo
 *
 * Mental model:
 * "filter tests each existing item. If the callback returns truthy, keep the
 * original item. If it returns falsy, skip the item."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

function requireCallback(callback, methodName) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${methodName} expects a callback function`)
  }
}

console.log('--- What are we building? ---')

/*
 * Built-in filter:
 * - calls the callback for each existing array item
 * - keeps the original item when the callback returns truthy
 * - returns a new array
 * - does not mutate the original array
 */
const builtInNumbers = [2, 3, 4, 5, 6]
const builtInFiltered = builtInNumbers.filter((number) => number > 3)

console.log('built-in filter result:', builtInFiltered)
// expected output: [4, 5, 6]

console.log('original after built-in filter:', builtInNumbers)
// expected output: [2, 3, 4, 5, 6]

console.log('--- Add myFilterPractice to Array.prototype ---')

Object.defineProperty(Array.prototype, 'myFilterPractice', {
  value: function (callback) {
    requireCallback(callback, 'myFilterPractice')

    const result = []

    for (let index = 0; index < this.length; index++) {
      if (index in this && callback(this[index], index, this)) {
        result.push(this[index])
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})

const numbers = [2, 3, 4, 5, 6]

console.log('custom filter result:', numbers.myFilterPractice((number) => number > 3))
// expected output: [4, 5, 6]

console.log('original after custom filter:', numbers)
// expected output: [2, 3, 4, 5, 6]

console.log('--- Callback receives value, index, and array ---')

const indexFiltered = numbers.myFilterPractice((value, index, array) => {
  return value > 3 && index < array.length - 1
})

console.log('value and index filter:', indexFiltered)
// expected output: [4, 5]

console.log('--- Dry run ---')

/*
 * For [2, 3, 4, 5, 6] and number => number > 3:
 *
 * 2 -> false -> skip
 * 3 -> false -> skip
 * 4 -> true  -> keep 4
 * 5 -> true  -> keep 5
 * 6 -> true  -> keep 6
 * final result -> [4, 5, 6]
 */
const dryRunResult = numbers.myFilterPractice((number) => number > 3)

console.log('dry run final result:', dryRunResult)
// expected output: [4, 5, 6]

console.log('--- Empty slot behavior ---')

const sparse = [1, , 3, 4]
const sparseFiltered = sparse.myFilterPractice((number) => number >= 3)

console.log('sparse filter result:', sparseFiltered)
// expected output: [3, 4]

console.log('--- Common mistake: pushing callback result ---')

function wrongFilterExample(list, callback) {
  const result = []

  for (let index = 0; index < list.length; index++) {
    if (callback(list[index], index, list)) {
      result.push(callback(list[index], index, list))
    }
  }

  return result
}

console.log('wrong filter result:', wrongFilterExample(numbers, (number) => number > 3))
// expected output: [true, true, true]

console.log('correct filter result:', numbers.myFilterPractice((number) => number > 3))
// expected output: [4, 5, 6]

console.log('--- Cleanup ---')

delete Array.prototype.myFilterPractice

console.log('myFilterPractice removed:', 'myFilterPractice' in [])
// expected output: false

