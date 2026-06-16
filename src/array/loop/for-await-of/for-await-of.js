/*
 * for await...of
 *
 * This file teaches how to loop over async values one by one.
 *
 * Main tools:
 * 1. async generator
 * 2. for await...of
 * 3. sync iterable that yields promises
 * 4. break cleanup with finally
 *
 * Mental model:
 * "for...of reads values. for await...of waits for each next value before
 * running the loop body."
 *
 * MDN references:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator
 */

const wait = (value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), 10)
  })

async function main() {
  console.log('--- async generator ---')

  /*
   * An async generator can produce values over time.
   * The async function* syntax creates an async iterable.
   */
  async function* lessonSteps() {
    yield await wait('read problem')
    yield await wait('write code')
    yield await wait('run tests')
  }

  /*
   * for await...of must run where await is allowed:
   * - inside an async function
   * - or at the top level of an ES module
   */
  async function printLessonSteps() {
    for await (const step of lessonSteps()) {
      console.log('step:', step)
    }
  }

  await printLessonSteps()
  // expected output:
  // step: read problem
  // step: write code
  // step: run tests

  console.log('--- sync iterable that yields promises ---')

  /*
   * for await...of can also consume a normal iterable.
   * If that iterable yields promises, for await...of gives you resolved values.
   */
  const promisedScores = [
    Promise.resolve(10),
    Promise.resolve(20),
    Promise.resolve(30),
  ]

  for await (const score of promisedScores) {
    console.log('resolved score:', score)
  }
  // expected output:
  // resolved score: 10
  // resolved score: 20
  // resolved score: 30

  console.log('--- compare with for...of ---')

  /*
   * A normal for...of loop does not await promise values automatically.
   */
  for (const scorePromise of promisedScores) {
    console.log('is Promise:', scorePromise instanceof Promise)
  }
  // expected output:
  // is Promise: true
  // is Promise: true
  // is Promise: true

  console.log('--- break triggers cleanup ---')

  /*
   * If a for await...of loop exits early, the iterator gets a chance to clean
   * up. For an async generator, a finally block is a simple way to show that.
   */
  async function* openTasks() {
    try {
      yield 'task 1'
      yield 'task 2'
      yield 'task 3'
    } finally {
      console.log('cleanup: close async iterator')
    }
  }

  for await (const task of openTasks()) {
    console.log('task:', task)

    if (task === 'task 2') {
      break
    }
  }
  // expected output:
  // task: task 1
  // task: task 2
  // cleanup: close async iterator

  console.log('--- when not to use it ---')

  /*
   * For a plain array of already-available values, a normal for...of loop is
   * simpler and avoids extra async waiting.
   */
  const readyValues = ['array', 'object', 'string']

  for (const value of readyValues) {
    console.log('ready value:', value)
  }
  // expected output:
  // ready value: array
  // ready value: object
  // ready value: string
}

main()
