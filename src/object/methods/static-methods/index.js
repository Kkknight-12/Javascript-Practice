/* 
__create = Object.create: This method creates a new object, using an existing object as the prototype of the newly created object. For example:
 */

var person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

var me = Object.create(person);

me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// output: "My name is Matthew. Am I human? true"

// --------------------------------------------------------------------------------------------

/* 
__defProp = Object.defineProperty: This method defines a new property directly on an object, or modifies an existing property on an object, and returns the object. For example:
*/

var obj = {};
Object.defineProperty(obj, 'property1', {
  value: 42,
  writable: false,
});

console.log(obj.property1); // output: 42
obj.property1 = 77; // throws an error in strict mode
console.log(obj.property1); // output: 42

// --------------------------------------------------------------------------------------------

/*
 * __getOwnPropDesc = Object.getOwnPropertyDescriptor:
 * This method returns a property descriptor for a named
 * property on an object. For example:
 */

var obj = {
  get x() {
    return 17;
  },
  name: 'sample object',
  randomFunction() {
    return 'random function';
  },
};
console.log(Object.getOwnPropertyDescriptor(obj, 'x').get()); // 17
console.log(Object.getOwnPropertyDescriptor(obj, 'name').value); // sample object
console.log(Object.getOwnPropertyDescriptor(obj, 'randomFunction'));

// output: { get: [Function: get x],
//           set: undefined,
//           enumerable: true,
//           configurable: true }
console.log('desc --> ', obj.x);

/* 
In JavaScript, get is not a reserved keyword but a special syntax for defining getter methods in an object literal or class definition. When you define a method with get in front of it, like get x() { return 17; }, it's not a regular method but a getter method.

A getter method is a special kind of method that gets called when you try to access the property it's associated with. In this case, x is the property. So when you do obj.x, it doesn't just return the value of x but it actually calls the get x() method and returns whatever that method returns.

That's why you can do obj.x and get 17 without explicitly calling x as a function. It's because x is not a regular method but a getter method, and getter methods get called automatically when you try to access their associated property.
 */
// --------------------------------------------------------------------------------------------

/* 
__getOwnPropNames = Object.getOwnPropertyNames: This method returns an array of all properties (including non-enumerable properties except for those which use Symbol) found directly in a given object. For example:
 */

var arr = ['a', 'b', 'c'];
console.log(Object.getOwnPropertyNames(arr).sort());
// output: ["0", "1", "2", "length"]

// --------------------------------------------------------------------------------------------

/* 
__getProtoOf = Object.getPrototypeOf: This method returns the prototype (i.e. the value of the internal [[Prototype]] property) of the specified object. For example:
 */
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // output: true

// --------------------------------------------------------------------------------------------

/* 
__hasOwnProp = Object.prototype.hasOwnProperty: This method returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it). For example:
 */
var obj = { a: 1 };
console.log(obj.hasOwnProperty('a')); // output: true
console.log(obj.hasOwnProperty('b')); // output: false
