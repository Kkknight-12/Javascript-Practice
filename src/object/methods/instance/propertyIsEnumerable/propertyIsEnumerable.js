/*
 * Object.prototype.propertyIsEnumerable()
 *
 * Returns true when a property is both:
 * - an own property of the object
 * - enumerable
 */

const lesson = {
  title: 'Objects',
};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(
  '1. title is enumerable:',
  Object.prototype.propertyIsEnumerable.call(lesson, 'title')
);
// Expected output: true

console.log(
  '2. internalId is enumerable:',
  Object.prototype.propertyIsEnumerable.call(lesson, 'internalId')
);
// Expected output: false

console.log(
  '3. missing property is enumerable:',
  Object.prototype.propertyIsEnumerable.call(lesson, 'missing')
);
// Expected output: false

/*
 * Inherited properties do not count, even if they are enumerable.
 */
const parent = {
  category: 'javascript',
};

const child = Object.create(parent);
child.topic = 'objects';

console.log(
  '4. own enumerable property:',
  Object.prototype.propertyIsEnumerable.call(child, 'topic')
);
// Expected output: true

console.log(
  '5. inherited enumerable property:',
  Object.prototype.propertyIsEnumerable.call(child, 'category')
);
// Expected output: false

console.log('6. Object.keys(child):', Object.keys(child));
// Expected output: [ 'topic' ]
