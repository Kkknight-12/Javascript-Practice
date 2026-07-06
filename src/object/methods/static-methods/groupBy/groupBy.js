/*
 * Object.groupBy() groups values from an iterable.
 *
 * Syntax:
 * Object.groupBy(items, callbackFn)
 *
 * The callback runs once for each value.
 * Whatever the callback returns becomes the group key.
 */

const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
  { name: 'fish', type: 'meat', quantity: 22 },
];

/*
 * Basic grouping by a property value.
 */
const byType = Object.groupBy(inventory, ({ type }) => type);

console.log(
  '1. Fruit names:',
  byType.fruit.map(({ name }) => name),
);
// Expected output: [ 'bananas', 'cherries' ]

console.log(
  '2. Meat names:',
  byType.meat.map(({ name }) => name),
);
// Expected output: [ 'goat', 'fish' ]

/*
 * The returned object has a null prototype.
 * It is made to hold groups, not to inherit Object.prototype methods.
 */
console.log(
  '3. Result has null prototype:',
  Object.getPrototypeOf(byType) === null,
);
// Expected output: true

console.log('4. Use Object.hasOwn:', Object.hasOwn(byType, 'fruit'));
// Expected output: true

console.log('5. No hasOwnProperty method:', typeof byType.hasOwnProperty);
// Expected output: undefined

/*
 * The callback receives the element and the index.
 */
const workflow = ['draft', 'review', 'publish', 'share'];

const byPosition = Object.groupBy(workflow, (_step, index) => {
  return index % 2 === 0 ? 'evenIndex' : 'oddIndex';
});

console.log('6. Even index steps:', byPosition.evenIndex);
// Expected output: [ 'draft', 'publish' ]

console.log('7. Odd index steps:', byPosition.oddIndex);
// Expected output: [ 'review', 'share' ]

/*
 * If the callback returns a non-string and non-symbol value,
 * JavaScript coerces it into a property key.
 */
const byStockStatus = Object.groupBy(inventory, ({ quantity }) => {
  return quantity === 0;
});

console.log('8. Boolean keys become strings:', Object.keys(byStockStatus));
// Expected output: [ 'false', 'true' ]

console.log(
  '9. Out of stock:',
  byStockStatus.true.map(({ name }) => name),
);
// Expected output: [ 'bananas' ]

/*
 * Symbol keys can be used as group keys.
 */
const needsReview = Symbol('needsReview');
const ready = Symbol('ready');

const byReviewState = Object.groupBy(inventory, ({ quantity }) => {
  return quantity <= 5 ? needsReview : ready;
});

console.log(
  '10. Symbol group count:',
  Object.getOwnPropertySymbols(byReviewState).length,
);
// Expected output: 2

console.log(
  '11. Needs review names:',
  byReviewState[needsReview].map(({ name }) => name),
);
// Expected output: [ 'asparagus', 'bananas', 'cherries' ]

/*
 * The input can be any iterable, not only an array.
 */
const tags = new Set(['js', 'css', 'html', 'api']);
const byLength = Object.groupBy(tags, (tag) => tag.length);

console.log('12. Length keys:', Object.keys(byLength));
// Expected output: [ '2', '3', '4' ]

console.log('13. Three-letter tags:', byLength[3]);
// Expected output: [ 'css', 'api' ]

/*
 * The grouped arrays contain the original values.
 * Objects are not deep-copied.
 */
const byQuantity = Object.groupBy(inventory, ({ quantity }) => {
  return quantity > 5 ? 'enough' : 'low';
});

console.log('14. Same object reference:', byQuantity.low[0] === inventory[0]);
// Expected output: true

inventory[0].quantity = 10;

console.log('15. Group contains updated object:', byQuantity.low[0].quantity);
// Expected output: 10

/*
 * A plain object is not iterable.
 * Use Object.entries(), Object.values(), or Object.keys() first
 * when you want to group data from an object's properties.
 */
try {
  Object.groupBy({ asha: 92, mina: 76 }, (score) => score >= 80);
} catch (error) {
  console.log('16. Plain object error:', error.name);
}
// Expected output: TypeError

const scores = {
  Asha: 92,
  Mina: 76,
  Nia: 88,
};

const scoreGroups = Object.groupBy(Object.entries(scores), ([_name, score]) => {
  return score >= 85 ? 'high' : 'practice';
});

console.log('17. High score entries:', scoreGroups.high);
// Expected output: [ [ 'Asha', 92 ], [ 'Nia', 88 ] ]

/*
 * Use Map.groupBy() when the group key should be an object.
 * Object.groupBy() must turn object keys into property keys.
 */
const warmGroup = { label: 'warm' };
const coolGroup = { label: 'cool' };

const colors = [
  { name: 'rose', group: warmGroup },
  { name: 'sky', group: coolGroup },
  { name: 'sun', group: warmGroup },
];

const objectGroupedByObject = Object.groupBy(colors, ({ group }) => group);

console.log('18. Object keys become strings:', Object.keys(objectGroupedByObject));
// Expected output: [ '[object Object]' ]

const mapGroupedByObject = Map.groupBy(colors, ({ group }) => group);

console.log(
  '19. Map keeps object key:',
  mapGroupedByObject.get(warmGroup).map(({ name }) => name),
);
// Expected output: [ 'rose', 'sun' ]
