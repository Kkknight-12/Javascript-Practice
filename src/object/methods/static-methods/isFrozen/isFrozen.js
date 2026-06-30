/*
 * Object.isFrozen(object)
 *
 * Returns true when an object is non-extensible and all own properties are
 * non-configurable. Data properties must also be non-writable.
 */

const settings = {
  theme: 'dark',
};

console.log('1. Regular object is frozen:', Object.isFrozen(settings));
// Expected output: false

Object.freeze(settings);

console.log('2. After Object.freeze():', Object.isFrozen(settings));
// Expected output: true

console.log('3. Frozen object is extensible:', Object.isExtensible(settings));
// Expected output: false

try {
  Object.defineProperty(settings, 'theme', {
    value: 'light',
  });
} catch (error) {
  console.log('4. Redefine frozen property:', error.name);
  // Expected output: TypeError
}

/*
 * Object.freeze() is shallow. Nested objects are not automatically frozen.
 */
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.freeze(layout);
layout.sidebar.width = 320;

console.log('5. Parent object frozen:', Object.isFrozen(layout));
// Expected output: true

console.log('6. Nested object frozen:', Object.isFrozen(layout.sidebar));
// Expected output: false

console.log('7. Nested value changed:', layout.sidebar.width);
// Expected output: 320
