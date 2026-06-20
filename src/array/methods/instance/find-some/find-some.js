/*
 * Array.prototype.find() with Array.prototype.some()
 *
 * This file compares two Array instance methods that both search with a
 * callback:
 *
 * - find() returns the first matching element
 * - some() returns a boolean that tells whether a match exists
 *
 * Main tools:
 * 1. find()
 * 2. some()
 * 3. truthy/falsy callback result
 * 4. early stop
 * 5. sparse array difference
 * 6. thisArg
 * 7. generic array-like behavior
 *
 * Mental model:
 * "Use find() when you need the matching value. Use some() when you only need a
 * yes/no answer."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 */

console.log('--- find() returns the first matching element ---')

/*
 * find() calls the callback until the callback returns truthy.
 * Then find() returns the matching element itself.
 */
const numbers = [5, 12, 8, 130, 44]
const firstLargeNumber = numbers.find((number) => number > 10)

console.log('first number greater than 10:', firstLargeNumber)
// expected output: 12

const missingLargeNumber = numbers.find((number) => number > 200)

console.log('missing large number:', missingLargeNumber)
// expected output: undefined

console.log('--- some() returns a boolean ---')

/*
 * some() calls the callback until the callback returns truthy.
 * Then some() returns true.
 * If nothing passes, some() returns false.
 */
const hasLargeNumber = numbers.some((number) => number > 10)
const hasHugeNumber = numbers.some((number) => number > 200)

console.log('has number greater than 10:', hasLargeNumber)
// expected output: true

console.log('has number greater than 200:', hasHugeNumber)
// expected output: false

console.log('--- Same callback, different return value ---')

/*
 * The callback can be exactly the same.
 * The method decides what final value comes back.
 */
const isEven = (number) => number % 2 === 0

console.log('find first even:', [1, 3, 4, 6].find(isEven))
// expected output: 4

console.log('some even exists:', [1, 3, 4, 6].some(isEven))
// expected output: true

console.log('--- Callback result is not the final result ---')

/*
 * The callback result only decides match/no match.
 * find() returns the element.
 * some() returns a boolean.
 */
const callbackResultNumbers = [5, 12]

console.log(
  'find with string callback result:',
  callbackResultNumbers.find((number) => (number > 10 ? 'yes' : false))
)
// expected output: 12

console.log(
  'some with string callback result:',
  callbackResultNumbers.some((number) => (number > 10 ? 'yes' : false))
)
// expected output: true

console.log('--- Both methods stop early ---')

const findVisited = []
const foundEven = [1, 3, 4, 6, 8].find((number) => {
  findVisited.push(number)
  return number % 2 === 0
})

console.log('found even:', foundEven)
// expected output: 4

console.log('find visited:', findVisited)
// expected output: [1, 3, 4]

const someVisited = []
const hasEven = [1, 3, 4, 6, 8].some((number) => {
  someVisited.push(number)
  return number % 2 === 0
})

console.log('has even:', hasEven)
// expected output: true

console.log('some visited:', someVisited)
// expected output: [1, 3, 4]

console.log('--- find() for object lookup ---')

const users = [
  { id: 1, name: 'Asha', active: false },
  { id: 2, name: 'Mayank', active: true },
  { id: 3, name: 'Nina', active: true },
]

const foundUser = users.find((user) => user.id === 2)

console.log('found user:', foundUser)
// expected output: { id: 2, name: 'Mayank', active: true }

console.log('same object reference:', foundUser === users[1])
// expected output: true

console.log('--- some() for existence checks ---')

const hasActiveUser = users.some((user) => user.active)
const hasAdminUser = users.some((user) => user.role === 'admin')

console.log('has active user:', hasActiveUser)
// expected output: true

console.log('has admin user:', hasAdminUser)
// expected output: false

console.log('--- Important: found value can be falsy ---')

/*
 * If a valid found value can be 0, '', or false, do not use a simple truthy
 * check on the find() result.
 */
const cells = [0, 1, 2]
const foundZero = cells.find((cell) => cell === 0)
const hasZero = cells.some((cell) => cell === 0)

console.log('found zero:', foundZero)
// expected output: 0

console.log('wrong truthy check:', foundZero ? 'found' : 'not found')
// expected output: not found

console.log('some zero exists:', hasZero)
// expected output: true

console.log('better undefined check:', foundZero !== undefined ? 'found' : 'not found')
// expected output: found

console.log('--- Empty arrays ---')

/*
 * find() returns undefined for an empty array.
 * some() returns false for an empty array.
 * In both cases, the callback never runs.
 */
let findEmptyCallbackCount = 0
let someEmptyCallbackCount = 0

const emptyFindResult = [].find(() => {
  findEmptyCallbackCount += 1
  return true
})

const emptySomeResult = [].some(() => {
  someEmptyCallbackCount += 1
  return true
})

console.log('empty find result:', emptyFindResult)
// expected output: undefined

console.log('empty find callback count:', findEmptyCallbackCount)
// expected output: 0

console.log('empty some result:', emptySomeResult)
// expected output: false

console.log('empty some callback count:', someEmptyCallbackCount)
// expected output: 0

console.log('--- Sparse array difference ---')

/*
 * find() visits empty slots and treats them as undefined.
 * some() skips empty slots.
 */
const sparseValues = [1, , 3]
const findSparseVisits = []

sparseValues.find((value, index) => {
  findSparseVisits.push([index, value])
  return false
})

console.log('find sparse visits:', findSparseVisits)
// expected output: [[0, 1], [1, undefined], [2, 3]]

const someSparseVisits = []

sparseValues.some((value, index) => {
  someSparseVisits.push([index, value])
  return false
})

console.log('some sparse visits:', someSparseVisits)
// expected output: [[0, 1], [2, 3]]

console.log('index 1 exists:', Object.hasOwn(sparseValues, 1))
// expected output: false

console.log('--- Callback receives value, index, and array ---')

const readings = [3, 8, 2, 12, 9]

const firstPeak = readings.find((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})

console.log('first peak:', firstPeak)
// expected output: 8

const hasUnsafeDrop = readings.some((value, index, array) => {
  if (index === 0) {
    return false
  }

  return array[index - 1] - value > 4
})

console.log('has unsafe drop:', hasUnsafeDrop)
// expected output: true

console.log('--- thisArg with find() and some() ---')

/*
 * Use a normal function when you want thisArg to become this.
 * Arrow functions do not have their own this.
 */
const stockRule = {
  minimumQuantity: 1,
}

const inventory = [
  { name: 'apples', quantity: 0 },
  { name: 'bananas', quantity: 3 },
]

const firstAvailableItem = inventory.find(function (item) {
  return item.quantity >= this.minimumQuantity
}, stockRule)

const hasAvailableItem = inventory.some(function (item) {
  return item.quantity >= this.minimumQuantity
}, stockRule)

console.log('first available item:', firstAvailableItem)
// expected output: { name: 'bananas', quantity: 3 }

console.log('has available item:', hasAvailableItem)
// expected output: true

console.log('--- Generic array-like behavior ---')

/*
 * Both methods can be called on array-like objects.
 */
const arrayLike = {
  0: 'small',
  1: 'medium',
  2: 'large',
  length: 3,
}

const foundArrayLike = Array.prototype.find.call(arrayLike, (value) => value.length > 5)
const someArrayLike = Array.prototype.some.call(arrayLike, (value) => value.length > 5)

console.log('find array-like:', foundArrayLike)
// expected output: medium

console.log('some array-like:', someArrayLike)
// expected output: true
