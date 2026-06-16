/*
 * for...of
 *
 * This file teaches how to loop over iterable values.
 *
 * Main tools:
 * 1. for...of with arrays
 * 2. for...of with strings
 * 3. for...of with Map and Set
 * 4. Symbol.iterator
 * 5. break cleanup
 *
 * Mental model:
 * "for...of asks an iterable for its next value until the iterable says done."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */

console.log('--- array values ---')

/*
 * Use for...of when you want array values one by one.
 * You do not need to manually manage index numbers.
 */
const learners = ['Aman', 'Chaman', 'Baga']

for (const learner of learners) {
  console.log('learner:', learner)
}
// expected output:
// learner: Aman
// learner: Chaman
// learner: Baga

console.log('--- string characters ---')

/*
 * Strings are iterable, so for...of can read each character.
 */
const word = 'JS'

for (const character of word) {
  console.log('character:', character)
}
// expected output:
// character: J
// character: S

console.log('--- Map entries ---')

/*
 * A Map gives [key, value] pairs.
 * Destructure the pair when you want key and value separately.
 */
const scores = new Map([
  ['Aman', 10],
  ['Chaman', 20],
])

for (const [name, score] of scores) {
  console.log(`${name}: ${score}`)
}
// expected output:
// Aman: 10
// Chaman: 20

console.log('--- Set unique values ---')

/*
 * A Set stores unique values.
 * for...of reads each unique value in insertion order.
 */
const uniqueTopics = new Set(['array', 'array', 'object'])

for (const topic of uniqueTopics) {
  console.log('topic:', topic)
}
// expected output:
// topic: array
// topic: object

console.log('--- plain object is not iterable ---')

/*
 * A plain object does not have Symbol.iterator by default.
 * That is why direct for...of on an object throws a TypeError.
 */
const user = {
  name: 'Aman',
  role: 'admin',
}

console.log('has Symbol.iterator:', Symbol.iterator in user)
// expected output: false

/*
 * Use Object.entries() when you want to loop over object key-value pairs.
 */
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`)
}
// expected output:
// name: Aman
// role: admin

console.log('--- custom iterable ---')

/*
 * An object becomes iterable when it has a Symbol.iterator method.
 * That method returns an iterator with a next() method.
 */
const countdown = {
  from: 3,
  [Symbol.iterator]() {
    let current = this.from

    return {
      next() {
        if (current > 0) {
          return {
            value: current--,
            done: false,
          }
        }

        return {
          value: undefined,
          done: true,
        }
      },
    }
  },
}

for (const number of countdown) {
  console.log('countdown:', number)
}
// expected output:
// countdown: 3
// countdown: 2
// countdown: 1

console.log('--- break triggers iterator cleanup ---')

/*
 * If a for...of loop exits early, JavaScript calls the iterator return()
 * method when it exists. This gives the iterator a cleanup chance.
 */
const cleanupIterable = {
  [Symbol.iterator]() {
    let current = 1

    return {
      next() {
        return {
          value: current++,
          done: current > 5,
        }
      },
      return() {
        console.log('cleanup: iterator closed early')
        return { done: true }
      },
    }
  },
}

for (const number of cleanupIterable) {
  console.log('number:', number)

  if (number === 2) {
    break
  }
}
// expected output:
// number: 1
// number: 2
// cleanup: iterator closed early
