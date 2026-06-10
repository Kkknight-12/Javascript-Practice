/*
 * for await...of statement creates a loop iterating over
 * async iterable objects as well as sync iterables
 */

async function* foo() {
  yield 1;
  yield 2;
}

(async function () {
  for await (const num of foo()) {
    console.log(num);
    // Expected output: 1

    // break; // Closes iterator, triggers return
  }
})();

/* 
When a for await...of loop iterates over an iterable, it first gets the iterable's [Symbol.asyncIterator]() method and calls it, which returns an async iterator. If the @asyncIterator method does not exist, it then looks for an [Symbol.iterator]() method, which returns a sync iterator. The sync iterator returned is then wrapped into an async iterator by wrapping every object returned from the next(), return(), and throw() methods into a resolved or rejected promise, with the value property resolved if it's also a promise. The loop then repeatedly calls the final async iterator's next() method and awaits the returned promise, producing the sequence of values to be assigned to variable.
 */

// --------------------------------------------------------------------------------

// Iterating over async iterables

const LIMIT = 300;

const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 295;
    return {
      next() {
        const done = i === LIMIT;
        const value = done ? undefined : i++;
        return Promise.resolve({ value, done });
      },
      return() {
        console.log('return');
        // This will be reached if the consumer called 'break' or 'return' early in the loop.
        return { done: true };
      },
    };
  },
};

(async () => {
  for await (const num of asyncIterable) {
    console.log(num);
    // if (num === 2) {
    //   break;
    // }
  }
})();
// 0
// 1
// 2

const myAsyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield 'hello';
    yield 'async';
    yield 'iteration!';
  },
};

(async () => {
  for await (const x of myAsyncIterable) {
    console.log(x);
  }
})();
// hello
// async
// iteration!


/* 
The main difference between the two code snippets is how they define the async iterable object and what values they yield.

myAsyncIterable uses an async generator function to define the async iterable. An async generator function is a simpler and more concise way to create an async iterable. It automatically returns an async iterator and you can use the yield keyword to produce values. In this case, myAsyncIterable yields the strings 'hello', 'async', and 'iteration!'.

asyncIterable uses a more manual approach to define the async iterable. It defines an object with a next method that returns a promise. The promise resolves to an object with value and done properties. value is the next value in the sequence and done is a boolean indicating whether there are more values to iterate over. In this case, asyncIterable yields the numbers from 295 to 299.

*/

// --------------------------------------------------------------------------------


async function* streamAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

// Fetches data from URL and calculates response size using the async generator.
async function getResponseSize(url) {
  const response = await fetch(url);
  // Will hold the size of the response, in bytes.
  let responseSize = 0;
  // The for-await-of loop. Async iterates over each portion of the response.
  for await (const chunk of streamAsyncIterable(response.body)) {
    // Incrementing the total response length.
    responseSize += chunk.length;
  }

  console.log(`Response Size: ${responseSize} bytes`); // "Response Size: 1071472"
  return responseSize;
}
getResponseSize("https://jsonplaceholder.typicode.com/photos");