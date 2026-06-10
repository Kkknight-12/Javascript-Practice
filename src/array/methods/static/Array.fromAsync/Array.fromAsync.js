// Array.fromAsync()
/*
 * Array.fromAsync() static method creates a new,
 * shallow-copied Array instance from an async iterable,
 * iterable, or array-like object.
 *
 * Syntax
 * Array.fromAsync(arrayLike, mapFn, thisArg)
 */

const asyncIterable = (async function* () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * i));
    yield i;
  }
})();

Array.fromAsync(asyncIterable).then((array) => console.log(array)); // [0, 1, 2, 3, 4]

Array.fromAsync(
  new Map([
    [1, 2],
    [3, 4],
  ])
).then((array) => console.log(array)); // [[1, 2], [3, 4]]

Array.fromAsync({
  length: 3,
  0: Promise.resolve(1),
  1: Promise.resolve(2),
  2: Promise.resolve(3),
}).then((array) => console.log(array)); // [1, 2, 3]
