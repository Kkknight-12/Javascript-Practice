/*
 * Array.prototype.every()
 *
 * This file teaches every() as an Array instance method.
 *
 * Main tools:
 * 1. every()
 * 2. callback truthy/falsy result
 * 3. early stop on the first failure
 * 4. empty array behavior
 * 5. sparse array behavior
 * 6. thisArg
 * 7. generic array-like behavior
 *
 * Mental model:
 * "every() asks: can I find a failing element? If yes, return false. If no
 * failing element is found, return true."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 */

console.log('--- Basic all-pass check ---')

/*
 * every() tests each element with a callback.
 * It returns true only when every checked element passes the test.
 */
const scores = [82, 91, 76, 88]

const allStudentsPassed = scores.every((score) => score >= 40)

console.log('all students passed:', allStudentsPassed)
// expected output: true

const allScoresAreExcellent = scores.every((score) => score >= 90)

console.log('all scores are at least 90:', allScoresAreExcellent)
// expected output: false

console.log('--- every() returns a boolean ---')

/*
 * The callback can return any truthy or falsy value.
 * The final every() result is still only true or false.
 */
const callbackResultDemo = [1, 2, 3].every((number) => {
  return number > 0 ? 'pass' : ''
})

console.log('callback result demo:', callbackResultDemo)
// expected output: true

console.log('--- every() stops after the first failure ---')

/*
 * every() stops as soon as the callback returns falsy.
 * It does not keep checking after the answer is already false.
 */
const visitedNumbers = []
const allEven = [2, 4, 5, 6, 8].every((number) => {
  visitedNumbers.push(number)
  return number % 2 === 0
})

console.log('all numbers are even:', allEven)
// expected output: false

console.log('visited before failure:', visitedNumbers)
// expected output: [2, 4, 5]

console.log('--- Empty arrays return true ---')

/*
 * every() returns true for an empty array because it never finds a failing
 * element. The callback is not called at all.
 */
let emptyCallbackCount = 0
const emptyArrayResult = [].every(() => {
  emptyCallbackCount += 1
  return false
})

console.log('empty array result:', emptyArrayResult)
// expected output: true

console.log('empty callback count:', emptyCallbackCount)
// expected output: 0

console.log('--- Sparse arrays skip empty slots ---')

/*
 * Empty slots are not visited.
 * This can surprise learners because an empty slot is not the same thing as a
 * real undefined value.
 */
const sparseValues = [1, , 3]
const sparseVisits = []

const sparseResult = sparseValues.every((value, index) => {
  sparseVisits.push([index, value])
  return value !== undefined
})

console.log('sparse every result:', sparseResult)
// expected output: true

console.log('sparse visits:', sparseVisits)
// expected output: [[0, 1], [2, 3]]

console.log('index 1 exists:', Object.hasOwn(sparseValues, 1))
// expected output: false

console.log('--- Real undefined values are visited ---')

/*
 * If undefined is actually stored at an index, every() visits it.
 */
const realUndefinedValues = [1, undefined, 3]
const realUndefinedVisits = []

const realUndefinedResult = realUndefinedValues.every((value, index) => {
  realUndefinedVisits.push([index, value])
  return value !== undefined
})

console.log('real undefined every result:', realUndefinedResult)
// expected output: false

console.log('real undefined visits:', realUndefinedVisits)
// expected output: [[0, 1], [1, undefined]]

console.log('--- Callback receives value, index, and array ---')

/*
 * The third callback argument is useful when the current element needs to be
 * compared with another element in the same array.
 */
const increasingNumbers = [2, 4, 8, 16]

const isStrictlyIncreasing = increasingNumbers.every((value, index, array) => {
  if (index === 0) {
    return true
  }

  return value > array[index - 1]
})

console.log('strictly increasing:', isStrictlyIncreasing)
// expected output: true

console.log('--- thisArg with every() ---')

/*
 * Use a normal function when you want every() to bind thisArg.
 * Arrow functions do not have their own this.
 */
const ageRule = {
  minimumAge: 18,
}

const ages = [22, 35, 19]

const allAdults = ages.every(function (age) {
  return age >= this.minimumAge
}, ageRule)

console.log('all adults:', allAdults)
// expected output: true

console.log('--- every() for subset checks ---')

/*
 * A common pattern:
 * "Are all required items present in the available items?"
 */
const availablePermissions = ['read', 'write', 'delete']
const requiredPermissions = ['read', 'write']

const hasRequiredPermissions = requiredPermissions.every((permission) => {
  return availablePermissions.includes(permission)
})

console.log('has required permissions:', hasRequiredPermissions)
// expected output: true

console.log('--- every() vs some() ---')

/*
 * every() asks whether all items pass.
 * some() asks whether at least one item passes.
 */
const inventoryCounts = [3, 0, 5]

console.log(
  'every item is in stock:',
  inventoryCounts.every((count) => count > 0)
)
// expected output: false

console.log(
  'some item is in stock:',
  inventoryCounts.some((count) => count > 0)
)
// expected output: true

console.log('--- every() does not mutate the array ---')

/*
 * every() itself does not change the original array.
 * The callback should usually be kept side-effect-free.
 */
const originalNumbers = [1, 2, 3]
const allPositive = originalNumbers.every((number) => number > 0)

console.log('all positive:', allPositive)
// expected output: true

console.log('original numbers:', originalNumbers)
// expected output: [1, 2, 3]

console.log('--- every() is generic ---')

/*
 * every() can be called on array-like objects.
 * It only needs a length property and integer-keyed values.
 */
const formValues = {
  0: 'Mayank',
  1: 'JavaScript',
  length: 2,
}

const allFormValuesFilled = Array.prototype.every.call(formValues, (value) => {
  return typeof value === 'string' && value.length > 0
})

console.log('all form values filled:', allFormValuesFilled)
// expected output: true

console.log('--- Async callback gotcha ---')

/*
 * every() does not wait for promises.
 * An async callback returns a Promise object, and Promise objects are truthy.
 */
const asyncEveryResult = [1, 2, 3].every(async (number) => {
  return number > 10
})

console.log('async every result:', asyncEveryResult)
// expected output: true
