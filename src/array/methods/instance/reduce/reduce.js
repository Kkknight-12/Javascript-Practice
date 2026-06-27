/*
 * Array.prototype.reduce()
 *
 * This file teaches reduce() as an Array instance method.
 *
 * Main tools:
 * 1. reduce()
 * 2. accumulator
 * 3. current value
 * 4. initial value
 * 5. callback return value
 * 6. sparse array behavior
 * 7. generic array-like behavior
 *
 * Mental model:
 * "reduce() carries one accumulator through the array. Each callback return
 * value becomes the accumulator for the next step."
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reduce
 */

console.log('--- Basic reduce() sum ---')

/*
 * reduce() combines array values into one final result.
 * The accumulator carries the running result.
 */
const numbers = [1, 2, 3, 4]

const total = numbers.reduce((accumulator, number) => {
  return accumulator + number
}, 0)

console.log('total:', total)
// expected output: 10

console.log('original numbers:', numbers)
// expected output: [ 1, 2, 3, 4 ]

console.log('--- Accumulator dry run ---')

/*
 * Each callback return value becomes the next accumulator.
 */
const dryRunSteps = []

const dryRunTotal = numbers.reduce((accumulator, number, index) => {
  const nextAccumulator = accumulator + number

  dryRunSteps.push({
    index,
    accumulator,
    number,
    nextAccumulator,
  })

  return nextAccumulator
}, 0)

console.log('dry run steps:', dryRunSteps)
// expected output:
// [
//   { index: 0, accumulator: 0, number: 1, nextAccumulator: 1 },
//   { index: 1, accumulator: 1, number: 2, nextAccumulator: 3 },
//   { index: 2, accumulator: 3, number: 3, nextAccumulator: 6 },
//   { index: 3, accumulator: 6, number: 4, nextAccumulator: 10 }
// ]

console.log('dry run total:', dryRunTotal)
// expected output: 10

console.log('--- With and without initial value ---')

/*
 * With an initial value, reduce() starts reading at the first existing item.
 */
console.log(
  'with initial value:',
  [10, 20, 30].reduce((accumulator, number) => accumulator + number, 0)
)
// expected output: 60

/*
 * Without an initial value, the first existing item becomes the accumulator.
 * The callback starts at the next existing item.
 */
const noInitialTrace = []

const noInitialTotal = [10, 20, 30].reduce((accumulator, number, index) => {
  noInitialTrace.push({ index, accumulator, number })
  return accumulator + number
})

console.log('without initial value total:', noInitialTotal)
// expected output: 60

console.log('without initial value trace:', noInitialTrace)
// expected output:
// [
//   { index: 1, accumulator: 10, number: 20 },
//   { index: 2, accumulator: 30, number: 30 }
// ]

console.log('--- Empty arrays ---')

/*
 * Empty arrays need an initial value.
 */
console.log(
  'empty array with initial value:',
  [].reduce((accumulator, number) => accumulator + number, 0)
)
// expected output: 0

try {
  [].reduce((accumulator, number) => accumulator + number)
} catch (error) {
  console.log('empty array without initial value:', error.name)
}
// expected output: TypeError

console.log('--- Forgetting return is a common bug ---')

/*
 * If you use braces in the callback, you must return the next accumulator.
 */
const missingReturnResult = [1, 2, 3].reduce((accumulator, number) => {
  accumulator + number
}, 0)

console.log('missing return result:', missingReturnResult)
// expected output: undefined

const fixedReturnResult = [1, 2, 3].reduce((accumulator, number) => {
  return accumulator + number
}, 0)

console.log('fixed return result:', fixedReturnResult)
// expected output: 6

console.log('--- Reduce into an object: counts ---')

/*
 * The accumulator can be an object.
 * This pattern is useful for frequency counts.
 */
const methods = ['map', 'filter', 'map', 'reduce', 'filter', 'map']

const methodCounts = methods.reduce((counts, methodName) => {
  counts[methodName] = (counts[methodName] || 0) + 1
  return counts
}, {})

console.log('method counts:', methodCounts)
// expected output: { map: 3, filter: 2, reduce: 1 }

console.log('--- Reduce into grouped arrays ---')

/*
 * The old scratch file grouped server channels by type.
 * This version keeps that useful idea but labels the accumulator clearly.
 */
const channels = [
  { id: 1, type: 'TEXT', name: 'general' },
  { id: 2, type: 'TEXT', name: 'random' },
  { id: 3, type: 'AUDIO', name: 'music' },
  { id: 4, type: 'VIDEO', name: 'conference' },
]

const channelsByType = channels.reduce(
  (groups, channel) => {
    if (channel.type === 'TEXT') {
      groups.textChannels.push(channel)
    }

    if (channel.type === 'AUDIO') {
      groups.audioChannels.push(channel)
    }

    if (channel.type === 'VIDEO') {
      groups.videoChannels.push(channel)
    }

    return groups
  },
  {
    textChannels: [],
    audioChannels: [],
    videoChannels: [],
  }
)

console.log('channels by type:', channelsByType)
// expected output:
// {
//   textChannels: [
//     { id: 1, type: 'TEXT', name: 'general' },
//     { id: 2, type: 'TEXT', name: 'random' }
//   ],
//   audioChannels: [ { id: 3, type: 'AUDIO', name: 'music' } ],
//   videoChannels: [ { id: 4, type: 'VIDEO', name: 'conference' } ]
// }

console.log('--- Reduce into a flat array ---')

/*
 * reduce() can build arrays too, but prefer flat() or flatMap() when they
 * express the idea more directly.
 */
const nestedNumbers = [[1, 2], [3], [4, 5]]

const flattenedNumbers = nestedNumbers.reduce((result, group) => {
  return result.concat(group)
}, [])

console.log('flattened numbers:', flattenedNumbers)
// expected output: [ 1, 2, 3, 4, 5 ]

console.log('flat() equivalent:', nestedNumbers.flat())
// expected output: [ 1, 2, 3, 4, 5 ]

console.log('--- Callback arguments ---')

/*
 * The reducer callback receives accumulator, currentValue, currentIndex, and
 * the original array.
 */
const callbackDetails = ['a', 'b'].reduce((details, value, index, array) => {
  details.push(`${index}:${value}/${array.length}`)
  return details
}, [])

console.log('callback details:', callbackDetails)
// expected output: [ '0:a/2', '1:b/2' ]

console.log('--- Sparse array behavior ---')

/*
 * reduce() skips empty slots.
 */
const sparseValues = [1, , 3]
const sparseVisits = []

const sparseTotal = sparseValues.reduce((accumulator, value, index) => {
  sparseVisits.push([index, value])
  return accumulator + value
}, 0)

console.log('sparse total:', sparseTotal)
// expected output: 4

console.log('sparse visits:', sparseVisits)
// expected output: [ [ 0, 1 ], [ 2, 3 ] ]

console.log('index 1 exists:', Object.hasOwn(sparseValues, 1))
// expected output: false

console.log('--- Generic array-like behavior ---')

/*
 * reduce() is generic.
 * It can be borrowed for array-like objects.
 */
const arrayLikeScores = {
  0: 72,
  1: 91,
  2: 64,
  length: 3,
}

const arrayLikeTotal = Array.prototype.reduce.call(
  arrayLikeScores,
  (accumulator, score) => accumulator + score,
  0
)

console.log('array-like total:', arrayLikeTotal)
// expected output: 227

console.log('--- When reduce() is not the clearest tool ---')

/*
 * reduce() is powerful, but simpler methods are often clearer.
 */
const activeUsers = [
  { name: 'Asha', active: true },
  { name: 'Ira', active: false },
  { name: 'Neel', active: true },
]

const activeNamesWithReduce = activeUsers.reduce((names, user) => {
  if (user.active) {
    names.push(user.name)
  }

  return names
}, [])

console.log('active names with reduce:', activeNamesWithReduce)
// expected output: [ 'Asha', 'Neel' ]

const activeNamesWithFilterMap = activeUsers
  .filter((user) => user.active)
  .map((user) => user.name)

console.log('active names with filter/map:', activeNamesWithFilterMap)
// expected output: [ 'Asha', 'Neel' ]
