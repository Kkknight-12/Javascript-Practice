/*
 * The Object.preventExtensions(), Object.seal(), and Object.freeze()
 * methods are used to restrict the mutability of an object in JavaScript.
 * However, they differ in the level of restriction they impose:
 *
 * Object.preventExtensions(obj)
 * prevents new properties from being added to obj,
 * but it doesn't prevent existing properties from
 * being deleted or changed.
 *
 * Object.seal(obj) does everything Object.preventExtensions(obj) does, and
 * also prevents existing properties from being deleted.
 * However, it doesn't prevent existing properties from being changed.
 *
 * Object.freeze(obj) does everything Object.seal(obj) does,
 * and also prevents existing properties from being changed.
 * It makes obj immutable.
 *
 *                 preventExtensions   |  seal  |  freeze
 * add properties |        ❌          |   ❌   |   ❌
 * delete props   |        ✅          |   ❌   |   ❌
 * change values  |        ✅          |   ✅   |   ❌
 *
 */

const object1 = {
  a: '11',
};

Object.preventExtensions(object1);

// Cannot define property
// try {
//   // Cannot define property property1, object is not extensible
//   Object.defineProperty(object1, 'property1', {
//     value: 42,
//   });
// } catch (e) {
//   console.log(e);
//   // Expected output: TypeError: Cannot define property property1, object is not extensible
// }

console.log(Object.isExtensible(object1)); // Expected output: false

// update existing property
object1.a = '22';
console.log(object1.a); // Expected output: 22

// delete existing property
delete object1.a;
console.log(object1.a); // Expected output: undefined

// ------------------------------------------------

// isExtensible -> determines if an object is extensible

console.log(Object.isExtensible(object1)); // Expected output: false

