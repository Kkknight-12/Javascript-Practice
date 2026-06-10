/*
 * A sealed object has a fixed set of properties:
 * -> new properties cannot be added,
 * -> existing properties cannot be removed,
 * -> their enumerability and configurability cannot be changed,
 *    and its prototype cannot be re-assigned.
 *
 * Values of existing properties can still be changed as long as they are writable
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
  property1: 42,
};

Object.seal(object1);

// can change valeus of existing properties
object1.property1 = 33;
console.log(object1.property1);
// Expected output: 33

// Cannot delete when sealed
delete object1.property1;
console.log(object1.property1);
// Expected output: 33

// Cannot add new properties
object1.property2 = 33;
console.log(object1); // { property1: 33 }

// ------------------------------------------------
// determines if an object is sealed.

console.log(Object.isSealed(object1));
// Expected output: true