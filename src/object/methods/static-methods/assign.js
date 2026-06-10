/*
 * The Object.assign() static method copies all enumerable
 * own properties from one or more source objects to a target
 * object. It returns the modified target object.
 * */

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

// Properties in the target object are overwritten by
// properties in the sources if they have the same key (key-> b).
// Later sources' properties overwrite earlier ones.
const returnedTarget = Object.assign(target, source);
// Properties in the target object are overwritten by properties in the sources if they have the same key.

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);

console.log(returnedTarget === target);
// Expected output: true

// making changes to the returned object will also change the original object.
// as the returned object is the same as the original object.
target.a = 100;
console.log(returnedTarget);
console.log(target);

// ----------------------------------------------------------------------

/*
 * Warning for Deep Clone
 * For deep cloning, we need to use alternatives like
 * structuredClone(), because Object.assign() copies property values.
 *
 * If the source value is a reference to an object, ( { c: 0  } ),
 * it only copies the reference value.
 *
 */
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

// making changes to the reference
// will also change the original object.
obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

// ----------------------------------------------------------------------

// Merging objects

const o1 = { a: 1, b: 1, c: 1 }; // b 𐄂
const o2 = { b: 2, c: 2 }; // b ✓ c 𐄂
const o3 = { c: 3 }; // c ✓

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

/*
 * The properties are overwritten by other objects that
 * have the same properties later in the parameters order.
 */

// ----------------------------------------------------------------------

// Properties on the
// → prototype chain and
// → non-enumerable
// properties cannot be copied

const obja = Object.create(
  // foo is on obj's prototype chain.
  { foo: 1 }, // 𐄂
  {
    bar: {
      // 𐄂
      value: 2, // bar is a non-enumerable property.
    },
    baz: {
      value: 3,
      // ✓
      enumerable: true, // baz is an own enumerable property.
    },
  }
);

const copy = Object.assign({}, obja);
console.log(copy); // { baz: 3 }
console.log(copy.foo); // undefined
console.log(copy.bar); // undefined

// ----------------------------------------------------------------------

// Exceptions will interrupt the ongoing copying task

const target2 = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false,
}); // target.foo is a read-only property

// TypeError: Cannot assign to read only property 'foo' of object '#<Object>'
// Object.assign(target2, { bar: 2 }, { foo2: 3, foo: 11, foo3: 3 }, { baz: 4 });
