/* 
In JavaScript, objects have a hidden [[Prototype]] property that links to another object. This other object is called the object's prototype. When you try to access a property on an object, JavaScript first looks for the property on the object itself. If it doesn't find the property there, it looks for the property on the object's prototype. This process is repeated with the prototype's prototype, and so on, until the property is found or the prototype chain ends.

The Object.setPrototypeOf() method allows you to change an object's prototype. However, this operation is slow in current JavaScript engines. This is because JavaScript engines optimize property access by making assumptions about the shape of objects based on their prototypes. When you change an object's prototype, these assumptions are invalidated, and the engine has to do more work to access properties.

Furthermore, changing an object's prototype can have far-reaching effects. Any code that interacts with an object whose prototype has been changed can potentially be slowed down, not just the code that calls Object.setPrototypeOf().

The warning suggests that if you're concerned about performance, you should avoid changing an object's prototype with Object.setPrototypeOf(). Instead, you should use Object.create(), which creates a new object with a specified prototype. This operation is faster because it doesn't invalidate the engine's assumptions about object shapes.

However, the warning also notes that because changing an object's prototype is a feature of the JavaScript language, it's the responsibility of JavaScript engine developers to make this operation as fast as possible. So, in the future, Object.setPrototypeOf() might not be as slow as it is now.
 */

/*
 * Object.setPrototypeOf() static method sets the
 * prototype (i.e., the internal [[Prototype]] property)
 * of a specified object to another object or null.
 *
 * Object.setPrototypeOf(obj, prototype)
 */

const obj = {};
const parent = { foo: 'bar' };

console.log(obj.foo);
// Expected output: undefined

// The specified object.
const result = Object.setPrototypeOf(obj, parent);
// console.log('result ', result); // {}

// obj now inherits from parent
// obj
//  ↓
// prototype -> parent -> Object.prototype -> null
console.log(obj.foo);
// Expected output: "bar"

//--------------------------------------------

// Example

function Human(name, level) {
  this.name = name;
  this.level = level;
}

function SuperHero(name, level) {
  Human.call(this, name, level);
}

// setting up the prototype chain
Object.setPrototypeOf(SuperHero.prototype, Human.prototype);
// Set the `[[Prototype]]` of `SuperHero.prototype`
// to `Human.prototype`
// To set the prototypal inheritance chain

Human.prototype.speak = function () {
  return `${this.name} says hello.`;
};

SuperHero.prototype.fly = function () {
  return `${this.name} is flying.`;
};

const superMan = new SuperHero('Clark Kent', 1);

console.log(superMan.fly());
console.log(superMan.speak());

console.log(SuperHero.prototype);
// { fly: [Function (anonymous)] }
console.log(Object.getPrototypeOf(SuperHero.prototype));
// { speak: [Function (anonymous)] }
console.log(Human.prototype);
// // { speak: [Function (anonymous)] }

console.log(Object.getPrototypeOf(SuperHero.prototype) === Human.prototype); // true
