/*
 * Question: create a deep copy of an object.
 *
 * Better but limited idea:
 * JSON.stringify() turns simple data into JSON text.
 * JSON.parse() turns that text back into a new object.
 *
 * This can work for JSON-safe data, but it is not a general deep-copy tool.
 */

const jsonSafeOriginal = {
  user: {
    role: 'admin',
  },
  tags: ['object', 'copy'],
};

const jsonCopy = JSON.parse(JSON.stringify(jsonSafeOriginal));

console.log('1. Top-level object is new:', jsonCopy !== jsonSafeOriginal);
// Expected output: true

console.log('2. Nested object is new:', jsonCopy.user !== jsonSafeOriginal.user);
// Expected output: true

jsonCopy.user.role = 'editor';

console.log('3. Original nested value unchanged:', jsonSafeOriginal.user.role);
// Expected output: admin

/*
 * JSON cloning changes some JavaScript values.
 */
const dateSource = {
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
};

const dateCopy = JSON.parse(JSON.stringify(dateSource));

console.log('4. Date becomes a string:', typeof dateCopy.createdAt);
// Expected output: string

/*
 * JSON.stringify() throws when it sees BigInt.
 */
try {
  JSON.stringify({ id: 10n });
} catch (error) {
  console.log('5. BigInt JSON error:', error.name);
  // Expected output: TypeError
}
