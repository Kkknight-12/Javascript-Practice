/*
 * The Object.freeze() static method freezes an object.
 * Freezing an object prevents extensions and makes
 * existing properties non-writable and non-configurable.
 *
 * A frozen object can no longer be changed: new properties
 * cannot be added, existing properties cannot be removed,
 * their enumerability, configurability, writability, or
 * value cannot be changed, and the object's prototype
 * cannot be re-assigned. freeze() returns the same object
 * that was passed in.
 *
 * Object.freeze(obj)
 *
 *                 preventExtensions   |  seal  |  freeze
 * add properties |        ❌          |   ❌   |   ❌
 * delete props   |        ✅          |   ❌   |   ❌
 * change values  |        ✅          |   ✅   |   ❌
 */

const obj1 = {
  prop: 42,
};

Object.freeze(obj1);

obj1.prop = 33;
// Throws an error in strict mode

console.log(obj1.prop);
// Expected output: 42

// ----------------------------------------------------------

const obj = {
  prop() {},
  foo: 'bar',
};

// Before freezing: new properties may be added,
// and existing properties may be changed or removed
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// Freeze.
const o = Object.freeze(obj);

// The return value is just the same object we passed in.
o === obj; // true

// The object has become frozen.
Object.isFrozen(obj); // === true

// Now any changes will fail
obj.foo = 'quux'; // silently does nothing
// silently doesn't add the property
obj.quaxxor = 'the friendly duck';

// Attempted changes through Object.defineProperty;
// both statements below throw a TypeError.
// TypeError: object is not extensible
// Object.defineProperty(obj, 'ohai', { value: 17 });
// Object.defineProperty(obj, 'foo', { value: 'eit' });

// It's also impossible to change the prototype
// both statements below will throw a TypeError.
// TypeError: #<Object> is not extensible
// Object.setPrototypeOf(obj, { x: 20 });
// obj.__proto__ = { x: 20 };

// ----------------------------------------------------------

// freeze is shallow
// which means obj2.internal is still mutable
// unless it's also frozen

const obj2 = {
  internal: {},
};

Object.freeze(obj2);
obj2.internal.a = 'aValue';

console.log(obj2);
// { internal: { a: 'aValue' } }

// ----------------------------------------------------------

function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === 'object') || typeof value === 'function') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

const obj22 = {
  internal: {
    a: null,
  },
};

deepFreeze(obj22);

// ----------------------------------------------------------

// isFrozen -> determines if an object is frozen

console.log(Object.isFrozen(obj2)); // Expected output: true
