/*
 * Object.create is a static method that creates a
 * new object with the specified prototype object and properties.
 *
 * Object.create(proto)
 * Object.create(proto, propertiesObject)
 */
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person, {
  greet: {
    value: 'hello',
    enumerable: true,
  },
  framework: { value: 'react' },
});
console.log('me ', me); // { greet: 'hello' }

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // Inherited properties can be overwritten

me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"

/*
 * the framework property is defined with enumerable: false
 * in its property descriptor, which means it's not enumerable.
 * Therefore, it's not included when you log the me object to the console.
 */
console.log(me.framework); // react

//
// Object.create() allows fine-tuned control over the object creation process.

// o = {};
// Is equivalent to:
// o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo is a regular data property
  foo: {
    writable: true,
    configurable: true,
    value: 'hello',
  },
  // bar is an accessor property
  bar: {
    configurable: true,
    get() {
      return this._bar;
    },
    set(value) {
      console.log('Setting `o.bar` to', value);
      this._bar = value;
    },
  },
  add: {
    value(a, b) {
      return a + b;
    },
    writable: true,
    configurable: true,
  },
});

console.log(o.foo); // hello
console.log(o.bar); // undefined
o.bar = 1888; // Setting `o.bar` to 10
console.log(o.bar); // 10
console.log(o.add(1, 2)); // 3

// --------------------------------------------------------------------------------------------

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype, {
  // If you don't set Rectangle.prototype.constructor to Rectangle,
  // it will take the prototype.constructor of Shape (parent).
  // To avoid that, we set the prototype.constructor to Rectangle (child).
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
rect.move(1, 1); // Logs 'Shape moved.'

o = {};
// Is equivalent to:
o = Object.create(Object.prototype);
