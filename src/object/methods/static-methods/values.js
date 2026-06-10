/*
 * Object.values() returns an array whose elements
 * are values of enumerable string-keyed properties
 * found directly upon object
 *
 * Object.values(obj)
 */

const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]

// non-enumerable property
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  }
);
myObj.foo = 'bar';
console.log(Object.values(myObj)); // ['bar']

// Strings have indices as enumerable own properties
console.log(Object.values('foo')); // ['f', 'o', 'o']

// Other primitives except undefined and null have no own properties
console.log(Object.values(100)); // []
