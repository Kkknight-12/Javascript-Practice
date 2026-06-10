/*
 * Object.defineProperty() static method defines
 * a new property directly on an object, or modifies
 * an existing property on an object, and returns
 * the object.
 *
 * Object.defineProperty(obj, prop, descriptor)
 * */

const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42
