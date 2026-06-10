/*
 * The Object.getPrototypeOf() static method returns
 * the prototype (i.e. the value of the internal [[Prototype]] property)
 * of the specified object.
 *
 * Object.getPrototypeOf(obj)
 *
 * Return value
 * The prototype of the given object, which may be null.
 * */

const prototype1 = {
  foo: 1,
  bar: 2,
};
//              Object.create(proto, propertiesObject)
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// Expected output: true

console.log(Object.getPrototypeOf(object1));
// {foo: 1, bar: 2,}
