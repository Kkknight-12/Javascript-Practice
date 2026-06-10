/*
 * Object.entries() static method returns an array
 * of a given object's own enumerable string-keyed
 * property key-value pairs.
 *
 * {} => []
 *
 * Object.entries(obj)
 */

const object1 = {
  a: 'somestring',
  b: 42,
};
console.log(Object.entries(object1));
// [ [ 'a', 'somestring' ], [ 'b', 42 ] ]

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"

// getFoo is a non-enumerable property
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
      // non-enumerable property
    },
  }
);
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]
console.log(myObj.getFoo()); // "bar"
