/*
 * Array.prototype.flatMap()
 *
 * This file teaches flatMap() as an Array instance method.
 *
 * Main tools:
 * 1. flatMap()
 * 2. map() followed by flat(1)
 * 3. zero, one, or many output items per input item
 * 4. callback(value, index, array)
 * 5. sparse array behavior
 * 6. thisArg
 * 7. generic array-like behavior
 *
 * Mental model:
 * "flatMap() maps each existing item, then flattens the mapped result by one
 * level."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 */

console.log('--- Basic flatMap() ---')

/*
 * flatMap() applies a callback to each existing element and flattens the
 * returned arrays by one level.
 */
const numbers = [1, 2, 3, 4]

const doubled = numbers.flatMap((number) => [number * 2])

console.log('doubled:', doubled)
// expected output: [2, 4, 6, 8]

console.log('original numbers:', numbers)
// expected output: [1, 2, 3, 4]

console.log('--- map() compared with flatMap() ---')

/*
 * map() keeps one result slot per input item.
 * If the callback returns arrays, map() returns an array of arrays.
 */
const mapped = numbers.map((number) => [number * 2])

console.log('map result:', mapped)
// expected output: [[2], [4], [6], [8]]

/*
 * flatMap() is like map() followed by flat(1).
 */
const mappedThenFlattened = numbers.map((number) => [number * 2]).flat()

console.log('map then flat result:', mappedThenFlattened)
// expected output: [2, 4, 6, 8]

console.log('flatMap same result:', doubled)
// expected output: [2, 4, 6, 8]

console.log('--- flatMap() flattens only one level ---')

/*
 * flatMap() always flattens the callback result by one level.
 * It does not deeply flatten nested arrays.
 */
const nestedResult = numbers.flatMap((number) => [[number * 2]])

console.log('nested result:', nestedResult)
// expected output: [[2], [4], [6], [8]]

console.log('--- One input can become zero, one, or many outputs ---')

/*
 * Return [] to remove an item.
 * Return [value] to keep or transform one item.
 * Return [value1, value2] to expand one item into many items.
 */
const mixedNumbers = [3, 4, -1, 0, 5]

const normalizedNumbers = mixedNumbers.flatMap((number) => {
  if (number < 0) {
    return []
  }

  if (number % 2 === 0) {
    return [number]
  }

  return [number - 1, 1]
})

console.log('normalized numbers:', normalizedNumbers)
// expected output: [2, 1, 4, 0, 4, 1]

console.log('--- Returning a non-array value ---')

/*
 * If the callback returns a non-array value, flatMap() adds that value directly.
 */
const directValues = numbers.flatMap((number) => number * 10)

console.log('direct values:', directValues)
// expected output: [10, 20, 30, 40]

console.log('--- Splitting sentences into words ---')

/*
 * A common flatMap() use case is turning each item into a small list and then
 * combining those lists.
 */
const sentences = ['learn array methods', 'practice daily']

const words = sentences.flatMap((sentence) => sentence.split(' '))

console.log('words:', words)
// expected output: ['learn', 'array', 'methods', 'practice', 'daily']

console.log('--- Callback receives value, index, and array ---')

/*
 * The third callback argument is the original array that flatMap() is reading.
 * It is not the result array being built.
 */
const stations = ['New Haven', 'West Haven', 'Milford (closed)', 'Stratford']

const routePairs = stations
  .filter((station) => !station.endsWith('(closed)'))
  .flatMap((station, index, array) => {
    if (index === array.length - 1) {
      return []
    }

    return [`${station} -> ${array[index + 1]}`]
  })

console.log('route pairs:', routePairs)
// expected output: ['New Haven -> West Haven', 'West Haven -> Stratford']

console.log('--- thisArg with flatMap() ---')

/*
 * flatMap() can receive thisArg as its second argument.
 * Use a normal function when you want thisArg to become this.
 */
const products = [
  { name: 'Apples', tags: ['fruit', 'fresh'] },
  { name: 'Notebook', tags: ['stationery'] },
  { name: 'Bananas', tags: ['fruit', 'yellow'] },
]

const tagRule = {
  prefix: 'tag:',
}

const productTags = products.flatMap(function (product) {
  return product.tags.map((tag) => `${this.prefix}${tag}`)
}, tagRule)

console.log('product tags:', productTags)
// expected output: ['tag:fruit', 'tag:fresh', 'tag:stationery', 'tag:fruit', 'tag:yellow']

console.log('--- Sparse array behavior ---')

/*
 * flatMap() does not call the callback for empty slots in the source array.
 */
const sparseSource = [1, , 3]
const sparseVisitedIndexes = []

const sparseResult = sparseSource.flatMap((number, index) => {
  sparseVisitedIndexes.push(index)
  return [number, number * 2]
})

console.log('sparse visited indexes:', sparseVisitedIndexes)
// expected output: [0, 2]

console.log('sparse result:', sparseResult)
// expected output: [1, 2, 3, 6]

/*
 * Empty slots inside arrays returned by the callback are removed by the flat(1)
 * part of flatMap().
 */
const returnedHoles = [1, 2, 3].flatMap((number) => [, number * 10])

console.log('returned holes result:', returnedHoles)
// expected output: [10, 20, 30]

console.log('--- Returned array-like objects are not flattened ---')

/*
 * The callback return value must be a real array if you want it flattened.
 */
const arrayLikeReturnValues = [1, 2].flatMap((number) => ({
  0: number,
  length: 1,
}))

console.log('array-like return values:', arrayLikeReturnValues)
// expected output: [{ 0: 1, length: 1 }, { 0: 2, length: 1 }]

console.log('--- Generic array-like behavior ---')

/*
 * flatMap() itself is generic.
 * It can be called on an array-like object.
 */
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
  3: 4,
}

const genericFlatMapResult = Array.prototype.flatMap.call(
  arrayLike,
  (number) => [number, number * 2]
)

console.log('generic flatMap result:', genericFlatMapResult)
// expected output: [1, 2, 2, 4, 3, 6]

console.log('--- Async callback gotcha ---')

/*
 * flatMap() does not await async callbacks.
 * An async callback returns Promise objects, and those promises are not arrays.
 */
const asyncCallbackResult = [1, 2].flatMap(async (number) => [number * 2])

console.log('async callback result:', asyncCallbackResult)
// expected output: [Promise { [ 2 ] }, Promise { [ 4 ] }]
