/*
 * Object.create(proto)
 * Object.create(proto, propertiesObject)
 *
 * Creates a new object whose prototype is proto.
 *
 * The proto argument must be an object or null.
 */

const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Asha';
learner.topic = 'Object.create()';

console.log('1. Prototype link:', Object.getPrototypeOf(learner) === sharedBehavior);
// Expected output: true

console.log('2. Inherited method:', learner.describe());
// Expected output: Asha is learning Object.create()

console.log('3. Own keys:', Object.keys(learner));
// Expected output: [ 'name', 'topic' ]

console.log('4. describe is own property:', Object.hasOwn(learner, 'describe'));
// Expected output: false

/*
 * Object.create() does not copy properties from the prototype object.
 * The prototype's properties are inherited through the prototype chain.
 */
console.log('5. describe exists through chain:', 'describe' in learner);
// Expected output: true

/*
 * Own properties can shadow inherited properties.
 */
const defaults = {
  theme: 'light',
  notifications: true,
};

const settings = Object.create(defaults);
settings.theme = 'dark';

console.log('6. Own theme shadows inherited theme:', settings.theme);
// Expected output: dark

console.log('7. Inherited notifications:', settings.notifications);
// Expected output: true

console.log('8. settings own keys:', Object.keys(settings));
// Expected output: [ 'theme' ]

/*
 * Object.create(null) creates an object with no prototype.
 * This is useful for dictionary-like objects.
 */
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.level = 'beginner';

console.log('9. Null prototype:', Object.getPrototypeOf(dictionary));
// Expected output: null

console.log('10. Dictionary keys:', Object.keys(dictionary));
// Expected output: [ 'topic', 'level' ]

console.log('11. No inherited hasOwnProperty method:', typeof dictionary.hasOwnProperty);
// Expected output: undefined

console.log('12. Static hasOwn still works:', Object.hasOwn(dictionary, 'topic'));
// Expected output: true

/*
 * The second argument defines own properties on the new object.
 * It uses the same descriptor shape as Object.defineProperties().
 */
const profile = Object.create(Object.prototype, {
  name: {
    value: 'Mina',
    enumerable: true,
    writable: true,
    configurable: true,
  },
  internalId: {
    value: 42,
  },
  role: {
    enumerable: true,
    get() {
      return 'learner';
    },
  },
});

console.log('13. Properties from descriptor object:', profile.name);
// Expected output: Mina

console.log('14. Accessor property from descriptor object:', profile.role);
// Expected output: learner

console.log('15. Enumerable keys from created profile:', Object.keys(profile));
// Expected output: [ 'name', 'role' ]

const internalIdDescriptor = Object.getOwnPropertyDescriptor(profile, 'internalId');

console.log('16. internalId descriptor defaults:', {
  writable: internalIdDescriptor.writable,
  enumerable: internalIdDescriptor.enumerable,
  configurable: internalIdDescriptor.configurable,
});
// Expected output: { writable: false, enumerable: false, configurable: false }

/*
 * The propertiesObject argument is a descriptor map.
 * Only its own enumerable keys are used.
 */
const descriptors = {};

descriptors.visible = {
  value: 'shown',
  enumerable: true,
};

Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});

const descriptorMapResult = Object.create(Object.prototype, descriptors);

console.log('17. Descriptor map visible property:', descriptorMapResult.visible);
// Expected output: shown

console.log('18. Descriptor map hidden property:', descriptorMapResult.hidden);
// Expected output: undefined

/*
 * A normal object literal has the same prototype as Object.create(Object.prototype).
 */
const literalObject = {};
const createdPlainObject = Object.create(Object.prototype);

console.log(
  '19. Literal prototype:',
  Object.getPrototypeOf(literalObject) === Object.prototype
);
// Expected output: true

console.log(
  '20. Created plain object prototype:',
  Object.getPrototypeOf(createdPlainObject) === Object.prototype
);
// Expected output: true

/*
 * Object.create(Constructor.prototype) gives the new object the prototype link,
 * but it does not run the constructor function.
 */
function Course(title) {
  this.title = title;
}

Course.prototype.label = function label() {
  return `Course: ${this.title}`;
};

const realCourse = new Course('Objects');
const prototypeOnlyCourse = Object.create(Course.prototype);

console.log('21. Real course title:', realCourse.title);
// Expected output: Objects

console.log('22. Prototype-only course title:', prototypeOnlyCourse.title);
// Expected output: undefined

console.log('23. Prototype-only instance check:', prototypeOnlyCourse instanceof Course);
// Expected output: true

prototypeOnlyCourse.title = 'Manual title';

console.log('24. Prototype-only method after manual data:', prototypeOnlyCourse.label());
// Expected output: Course: Manual title

/*
 * proto must be an object or null.
 */
try {
  Object.create('not an object');
} catch (error) {
  console.log('25. Invalid prototype error:', error.name);
  // Expected output: TypeError
}
