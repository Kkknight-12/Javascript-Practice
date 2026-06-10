/*
 * Object.hasOwn() static method returns true if the
 * specified object has the indicated property as its own property.
 *
 * If the property is inherited, or does not exist, the method returns false.
 *
 * Object.hasOwn(obj, prop)
 */

const object1 = {
  prop: 'exists',
};

console.log(Object.hasOwn(object1, 'prop'));
// Expected output: true

// --------------------------------------------------------------------------

// Using hasOwn to test for a property's existence

const example = {};
console.log(Object.hasOwn(example, 'prop')); // false - 'prop' has not been defined

example.prop = 'exists';
console.log(Object.hasOwn(example, 'prop')); // true - 'prop' has been defined

example.prop = null;
console.log(Object.hasOwn(example, 'prop')); // true - own property exists with value of null

example.prop = undefined;
console.log(Object.hasOwn(example, 'prop')); // true - own property exists with value of undefined

console.log('-----------------');
// --------------------------------------------------------------------------

// Direct vs. inherited properties

const example2 = {};
example2.prop = 'exists';

// `hasOwn` will only return true for direct properties:
console.log(Object.hasOwn(example2, 'prop')); // true

console.log(Object.hasOwn(example2, 'toString')); // false

console.log(Object.hasOwn(example2, 'hasOwnProperty')); // false

// The `in` operator will return true for direct or inherited properties:
console.log('prop' in example2); // true
console.log('toString' in example2); // true
console.log('hasOwnProperty' in example2); // true

// --------------------------------------------------------------------------

// hasOwn vs hasOwnProperty

const foo = {
  hasOwnProperty() {
    return false;
  },
  bar: 'The dragons be out of office',
};

if (Object.hasOwn(foo, 'bar')) {
  console.log('foo ', foo); // true - re-implementation of hasOwnProperty() does not affect Object
}

if (foo.hasOwnProperty('bar')) {
  console.log('foo ', foo); // false
}

/* 
* The advantage of Object.hasOwn() over Object.prototype.hasOwnProperty() 
* is that it works even if the object has redefined hasOwnProperty, 
* like in your foo object.
* 
* In your code, foo has its own hasOwnProperty method that always 
* returns false. But when you use Object.hasOwn(foo, 'bar'), 
* it correctly checks if foo has the property 'bar', ignoring 
* the hasOwnProperty method on foo. 
* This wouldn't be the case if you used foo.hasOwnProperty('bar'), 
* because foo has redefined hasOwnProperty.
* 
* So, Object.hasOwn() is a safer way to check if an object 
* has a certain property as its own property, because it's 
* immune to redefinitions of hasOwnProperty.
*/
