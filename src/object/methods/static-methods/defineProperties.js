/*
 * The Object.defineProperties() static method defines
 * new or modifies existing properties directly on
 * an object, returning the object.
 *
 * Object.defineProperties(obj, props)
 */

const object1 = {
  name: 'x',
};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42
console.log(object1);

// --------------------------------------------------------------------------
