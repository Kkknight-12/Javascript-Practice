/*
 * Object practice review.
 *
 * This file combines the object concepts from the section:
 * - own vs inherited properties,
 * - enumerable vs non-enumerable properties,
 * - string keys vs symbol keys,
 * - descriptors,
 * - prototypes,
 * - object transformations.
 */

console.log('--- Property visibility practice ---');

const sharedAccountFields = {
  plan: 'free',
};

const privateToken = Symbol('privateToken');
const account = Object.create(sharedAccountFields);

account.name = 'Asha';
account.topic = 'objects';
account[privateToken] = 'secret-token';

Object.defineProperty(account, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log('1. Object.keys:', Object.keys(account));
// Expected output: [ 'name', 'topic' ]

console.log('2. Object.values:', Object.values(account));
// Expected output: [ 'Asha', 'objects' ]

console.log('3. Object.entries:', Object.entries(account));
// Expected output: [ [ 'name', 'Asha' ], [ 'topic', 'objects' ] ]

console.log('4. Hidden own property exists:', Object.hasOwn(account, 'internalId'));
// Expected output: true

console.log('5. Symbol own property exists:', Object.hasOwn(account, privateToken));
// Expected output: true

console.log('6. All own keys:', Reflect.ownKeys(account));
// Expected output: [ 'name', 'topic', 'internalId', Symbol(privateToken) ]

console.log('7. Inherited plan is reachable:', 'plan' in account);
// Expected output: true

console.log('8. Inherited plan is own:', Object.hasOwn(account, 'plan'));
// Expected output: false

console.log('--- Descriptor practice ---');

const lesson = {
  title: 'Object methods',
};

Object.defineProperty(lesson, 'internalId', {
  value: 'lesson-001',
  enumerable: false,
  writable: false,
  configurable: false,
});

const internalIdDescriptor = Object.getOwnPropertyDescriptor(
  lesson,
  'internalId',
);

console.log('9. Visible lesson keys:', Object.keys(lesson));
// Expected output: [ 'title' ]

console.log('10. Descriptor value:', internalIdDescriptor.value);
// Expected output: lesson-001

console.log('11. Descriptor enumerable:', internalIdDescriptor.enumerable);
// Expected output: false

console.log('12. Descriptor writable:', internalIdDescriptor.writable);
// Expected output: false

console.log('--- Prototype practice ---');

const sharedLearnerBehavior = {
  describe() {
    return `${this.name} studies ${this.topic}`;
  },
};

const learner = Object.create(sharedLearnerBehavior);
learner.name = 'Mina';
learner.topic = 'Object.create()';

console.log(
  '13. sharedLearnerBehavior is prototype:',
  Object.getPrototypeOf(learner) === sharedLearnerBehavior,
);
// Expected output: true

console.log(
  '14. isPrototypeOf check:',
  sharedLearnerBehavior.isPrototypeOf(learner),
);
// Expected output: true

console.log('15. Inherited method call:', learner.describe());
// Expected output: Mina studies Object.create()

console.log('16. describe is own property:', Object.hasOwn(learner, 'describe'));
// Expected output: false

console.log('--- Transform object data ---');

const rawScores = {
  asha: 92,
  mina: 76,
  nia: 88,
};

// Object.entries() gives [key, value] pairs so we can transform values while
// keeping each original name. Object.fromEntries() turns the transformed pairs
// back into an object.
const scoreLabels = Object.fromEntries(
  Object.entries(rawScores).map(([name, score]) => {
    return [name, score >= 85 ? 'high' : 'practice'];
  }),
);

console.log('17. Score labels:', scoreLabels);
// Expected output: { asha: 'high', mina: 'practice', nia: 'high' }

// filter() keeps only the entries that pass the score condition.
// map() then keeps only the name from each remaining [name, score] pair.
const highScoreNames = Object.entries(rawScores)
  .filter(([_name, score]) => score >= 85)
  .map(([name]) => name);

console.log('18. High score names:', highScoreNames);
// Expected output: [ 'asha', 'nia' ]

// Object.values() is enough here because the key names are not needed.
// reduce() carries the running total from one score to the next.
const totalScore = Object.values(rawScores).reduce((total, score) => {
  return total + score;
}, 0);

console.log('19. Total score:', totalScore);
// Expected output: 256

console.log('--- Grouping practice ---');

const tasks = [
  { title: 'Read object notes', status: 'todo' },
  { title: 'Run practice file', status: 'doing' },
  { title: 'Review mistakes', status: 'todo' },
];

// Object.groupBy() uses the callback return value as the group key.
// Returning status creates groups such as todo and doing.
const tasksByStatus = Object.groupBy(tasks, ({ status }) => status);

console.log('20. Group keys:', Object.keys(tasksByStatus));
// Expected output: [ 'todo', 'doing' ]

console.log(
  '21. Todo task titles:',
  tasksByStatus.todo.map(({ title }) => title),
);
// Expected output: [ 'Read object notes', 'Review mistakes' ]

console.log(
  '22. Group result has null prototype:',
  Object.getPrototypeOf(tasksByStatus) === null,
);
// Expected output: true

console.log(
  '23. Use Object.hasOwn on group result:',
  Object.hasOwn(tasksByStatus, 'todo'),
);
// Expected output: true

console.log('--- Sealed object practice ---');

const preferences = {
  theme: 'light',
};

Object.seal(preferences);

// Sealing blocks adding/removing properties, but writable existing properties
// can still be updated.
preferences.theme = 'dark';
preferences.language = 'en';

console.log('24. Sealed object can update writable property:', preferences.theme);
// Expected output: dark

console.log(
  '25. Sealed object did not add new property:',
  Object.hasOwn(preferences, 'language'),
);
// Expected output: false

console.log('26. Object.isSealed:', Object.isSealed(preferences));
// Expected output: true
