/*
 * Question: create a deep copy of an object.
 *
 * Built-in comparison:
 * structuredClone() creates a deep clone for structured-cloneable values.
 */

const structuredSource = {
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  tags: ['object', 'copy'],
  settings: {
    theme: 'dark',
  },
};

const structuredCopy = structuredClone(structuredSource);

console.log(
  '1. structuredClone keeps Date:',
  structuredCopy.createdAt instanceof Date,
);
// Expected output: true

console.log(
  '2. structuredClone copies nested array:',
  structuredCopy.tags !== structuredSource.tags,
);
// Expected output: true

console.log(
  '3. structuredClone copies nested object:',
  structuredCopy.settings !== structuredSource.settings,
);
// Expected output: true

/*
 * structuredClone() can also preserve circular references.
 */
const circularSource = {
  name: 'cycle',
};
circularSource.self = circularSource;

const circularCopy = structuredClone(circularSource);

console.log(
  '4. structuredClone keeps circular link:',
  circularCopy.self === circularCopy,
);
// Expected output: true

/*
 * Functions are not structured-cloneable.
 */
try {
  structuredClone({
    run() {
      return 'work';
    },
  });
} catch (error) {
  console.log('5. Function clone error:', error.name);
  // Expected output: DataCloneError
}
