/*
 * Object.getOwnPropertyNames() static method returns an
 * array of all properties (including non-enumerable properties
 * except for those which use Symbol) found directly in a given object.
 *
 * Object.getOwnPropertyNames(obj)
 */

const object1 = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(object1));
// Expected output: Array ["a", "b", "c"]

const arr = ['a', 'b', 'c'];
console.log(Object.getOwnPropertyNames(arr).sort());
// ["0", "1", "2", "length"]

// non-enumerable property
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
      enumerable: false, // won't be shown while looping
    },
  }
);
myObj.foo = 1;

console.log(Object.getOwnPropertyNames(myObj).sort()); // ["foo", "getFoo"]

