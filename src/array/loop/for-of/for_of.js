/*
 * https://www.programiz.com/javascript/for-of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator
 * https://www.programiz.com/javascript/iterators-iterables
 */

/* 
* The for...of statement executes a loop that operates on 
* values in sequential order sourced from an iterable object. 

* Iterable objects include instances of built-ins such as 
* -> Array, String, TypedArray, 
* -> Map, Set, NodeList (and other DOM collections), 
* -> as well as the arguments object, 
* -> generators produced by generator functions, 
* -> and user-defined iterable
* 
* Syntax:
* for (variable of iterable)
*   statement
*
* NOTE:
* -> for...of loop does not work with objects,
* */
// --------------------------------------------------------------------------------
/*
 * When a for...of loop iterates over an iterable,
 *
 * -> first calls the iterable's [Symbol.iterator]() method,
 *    which returns an iterator,
 * -> and then repeatedly calls the
 *    resulting iterator's next() method to produce the sequence
 *    of values to be assigned to variable.
 */

//  simplified JavaScript version of how a for...of loop works
function forOf(iterable) {
  const iterator = iterable[Symbol.iterator]();

  let result = iterator.next();
  // result  { value: 1, done: false }

  while (!result.done) {
    console.log(result.value);
    result = iterator.next();
  }
}

const array = [1, 2, 3];
forOf(array); // logs 1, 2, 3

// --------------------------------------------------------------------------------
// Examples

// Iterating over an array
const array1 = ['a', 'b', 'c'];

for (const element of array1) {
  console.log(element);
}

// Expected output: "a"
// Expected output: "b"

// --------------------------------------------------------------------------------
// Iterating over a string
const iterableString = 'boo';

for (const value of iterableString) {
  console.log(value);
}
// "b"
// "o"
// "o"

// --------------------------------------------------------------------------------
// Iterating over a TypedArray
const iterableTypedArray = new Uint8Array([0x00, 0xff]);
//  Uint8Array(2) [ 0, 255 ]

for (const value of iterableTypedArray) {
  console.log(value);
}
// 0
// 255

// --------------------------------------------------------------------------------
// Iterating over a Map

const iterable = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

for (const entry of iterable) {
  console.log(entry);
}
// ['a', 1]
// ['b', 2]
// ['c', 3]

// --------------------------------------------------------------------------------
// Iterating over a Set
const iterableSet = new Set([1, 1, 2, 2, 3, 3]);

for (const value of iterableSet) {
  console.log(value);
}
// 1
// 2
// 3

// --------------------------------------------------------------------------------
// Iterating over the arguments object
function IterateArguments() {
  for (const value of arguments) {
    console.log(value);
  }
}

IterateArguments(1, 2, 3);
// 1
// 2
// 3

// --------------------------------------------------------------------------------

// Iterating over a user-defined iterable
/*
 * The for...of loop in JavaScript can iterate over any iterable object.
 *
 * An iterable object is an object that implements the iterable protocol,
 * which means it has a method whose key is Symbol.iterator.
 *
 * This method must return an iterator, which is an object with a next method.
 * */

/*
 * userDefinedIterable is an object that implements the iterable protocol.
 * It has a method with the key Symbol.iterator that returns an iterator.
 *
 * The iterator is an object with a next method. Each call to next returns
 * the next value in the sequence (1, 2, 3) and a boolean indicating
 * whether there are more values to iterate over.
 */

/*
 * Loop calls -> Symbol.iterator() calls -> next() method
 */

const userDefinedIterable = {
  [Symbol.iterator]() {
    let i = 1;
    return {
      next() {
        if (i <= 3) {
          return { value: i++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const value of userDefinedIterable) {
  console.log('value: ', value);
}
// 1
// 2
// 3

// --------------------------------------------------------------------------------
/*
 * userDefinediterator is an object that is both an iterable
 * and an iterator.
 *
 * -> It's an iterable because it has a Symbol.iterator
 * method,
 * -> and it's an iterator because it has a next method.
 */

/*
 * Symbol.iterator method returns this, which is the userDefinediterator
 * object itself.
 * This means that the userDefinediterator object is its own iterator.
 */

/*
 * When you use userDefinediterator in a for...of loop,
 * the loop automatically calls userDefinediterator[Symbol.iterator]()
 * to get the iterator.
 * Because Symbol.iterator returns this, the iterator is the
 * userDefinediterator object itself. The loop then repeatedly calls
 * the next method on the iterator (which is also userDefinediterator)
 * to get the values to iterate over.
 *
 * So in this case, the userDefinediterator object is both the
 * iterable (the object being iterated over) and the iterator
 * (the object producing the values).
 *
 * This is a common pattern for iterable objects that only need
 * to be iterated over once.
 * */
let i = 1;

const userDefinediterator = {
  // iterable
  next() {
    if (i <= 3) {
      return { value: i++, done: false };
    }
    return { value: undefined, done: true };
  },
  // iterator
  [Symbol.iterator]() {
    return this;
  },
};

for (const value of userDefinediterator) {
  console.log(value);
}
// 1
// 2
// 3

// --------------------------------------------------------------------------------

// Iterating over an object with an [Symbol.iterator]() generator method:

const iterableGenerator = {
  *[Symbol.iterator]() {
    yield 11;
    yield 12;
    yield 13;
  },
};
const a = iterableGenerator[Symbol.iterator]();
// console.log('a', a.next());
// a { value: 11, done: false }

for (const value of iterableGenerator) {
  console.log('Generator yield: ', value);
}
// 1
// 2
// 3

// --------------------------------------------------------------------------------

// Iterating over a generator

function* source() {
  yield 21;
  yield 22;
  yield 23;
}

const generator = source();
// console.log(generator.next());
// { value: 21, done: false }

for (const value of generator) {
  console.log(value);
}
// 1
// 2
// 3
