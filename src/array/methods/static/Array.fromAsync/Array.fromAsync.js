/*
 * Array.fromAsync()
 *
 * Array.fromAsync() is a static method, so we call it on Array itself.
 *
 * It creates a Promise that resolves to a new real array from:
 * 1. async iterable values
 * 2. iterable values
 * 3. array-like values
 *
 * Mental model:
 * "Collect async or promise-like values one by one and resolve with an array."
 *
 * MDN reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
 */

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

async function main() {
  console.log('--- Array.fromAsync with async iterables ---')

  /*
   * An async generator is an async iterable.
   * Array.fromAsync() waits for each yielded value and collects the result.
   */
  async function* asyncNumbers() {
    yield delay(10, 1)
    yield delay(10, 2)
    yield delay(10, 3)
  }

  const numbersFromAsyncIterable = await Array.fromAsync(asyncNumbers())
  console.log('from async generator:', numbersFromAsyncIterable)
  // expected output: [1, 2, 3]

  console.log('--- Array.fromAsync with sync iterables ---')

  /*
   * A Map is a normal iterable.
   * Array.fromAsync() can still collect it, but it always returns a Promise.
   */
  const scores = new Map([
    ['a', 10],
    ['b', 20],
  ])

  const scoresArray = await Array.fromAsync(scores)
  console.log('from Map:', scoresArray)
  // expected output: [['a', 10], ['b', 20]]

  /*
   * A Set can contain promises.
   * For sync iterables, Array.fromAsync() awaits each value before adding it.
   */
  const promisedRoles = new Set([
    Promise.resolve('admin'),
    Promise.resolve('editor'),
  ])

  const roles = await Array.fromAsync(promisedRoles)
  console.log('from Set of promises:', roles)
  // expected output: ['admin', 'editor']

  console.log('--- Array.fromAsync with array-like values ---')

  /*
   * This object is array-like because it has numeric keys and length.
   * Its values are promises, and Array.fromAsync() awaits them.
   */
  const arrayLikePromises = {
    0: Promise.resolve('first'),
    1: Promise.resolve('second'),
    length: 2,
  }

  const fromArrayLikePromises = await Array.fromAsync(arrayLikePromises)
  console.log('from array-like promises:', fromArrayLikePromises)
  // expected output: ['first', 'second']

  console.log('--- Array.fromAsync with mapFn ---')

  /*
   * mapFn can be async.
   * Array.fromAsync() awaits the mapped result before adding it to the array.
   */
  const doubled = await Array.fromAsync([1, 2, 3], async (number) => {
    return delay(5, number * 2)
  })
  console.log('double while collecting:', doubled)
  // expected output: [2, 4, 6]

  /*
   * thisArg sets the value of this inside a normal function mapFn.
   * Arrow functions do not get their own this, so use function here.
   */
  const multiplier = { factor: 3 }
  const tripled = await Array.fromAsync(
    [1, 2, 3],
    async function (number) {
      return delay(5, number * this.factor)
    },
    multiplier,
  )
  console.log('thisArg example:', tripled)
  // expected output: [3, 6, 9]

  console.log('--- Array.fromAsync returns a Promise ---')

  /*
   * Without await, the value is still a Promise.
   */
  const pendingResult = Array.fromAsync([Promise.resolve(1)])
  console.log('without await:', pendingResult instanceof Promise)
  // expected output: true

  const awaitedResult = await pendingResult
  console.log('with await:', awaitedResult)
  // expected output: [1]

  console.log('--- Array.fromAsync vs Promise.all ---')

  /*
   * Array.fromAsync() consumes iterable values sequentially.
   * Promise.all() retrieves all iterable values first and awaits them together.
   *
   * The exact timing is not important here; the labels show the intended model.
   */
  function* delayedValues() {
    yield delay(10, 1)
    yield delay(10, 2)
    yield delay(10, 3)
  }

  const sequential = await Array.fromAsync(delayedValues())
  console.log('Array.fromAsync result:', sequential)
  // expected output: [1, 2, 3]

  const concurrent = await Promise.all(delayedValues())
  console.log('Promise.all result:', concurrent)
  // expected output: [1, 2, 3]
}

main().catch((error) => {
  console.error('Array.fromAsync example failed:', error)
})
