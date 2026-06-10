/*
 * The for...in statement iterates over all enumerable
 * string properties of an object * (ignoring properties keyed by symbols),
 * including inherited enumerable properties.
 */

// prototype object
const parentObj = {
  a: 'name',
  b: 'occupation',
};

const childObject = Object.create(parentObj, {
  c: {
    value: 'age',
    enumerable: true,
  },
  d: {
    value: 'address',
    enumerable: false, // ❌
  },
  [Symbol.iterator]: {
    value: 'phone',
    enumerable: true, // ❌
  },
  1: {
    value: 'phone',
    enumerable: true,
  },
  2: {
    value: 'email',
    enumerable: true,
  },
});

// for in loop
for (let key in childObject) {
  console.log(childObject[key]); // age, name , occupation
}

/*
 * NOTE:
 * Any property added to the currently visited object during
 * iteration will not be visited, because all own properties of
 * the current object have already been saved beforehand.
 *
 * If multiple objects in the prototype chain have a property
 * with the same name, only the first one will be considered,
 * and it is only visited if it's enumerable. If it is non-enumerable,
 * no other properties with the same name further up the prototype
 * chain will be visited, even if they are enumerable.
 */

// -------------------------------------------------------------------
/*
 * general, it is best not to add, modify, or remove properties
 * from the object during iteration, other than the property
 * currently being visited.
 */

const obj_a = { a: 1, b: 2, c: 3 };

// Deleting a property before it is visited
for (const prop in obj_a) {
  console.log(`obj_a.${prop} = ${obj_a[prop]}`);
  delete obj_a.c;
}
// obj_a.a = 1
// obj_a.b = 2
// c is not visited as it is deleted in the
// first iteration

const obj_b = { a: 1, b: 2, c: 3 };

// Deleting a property after it is visited
for (const prop in obj_b) {
  console.log(`obj_b.${prop} = ${obj_b[prop]}`);
  delete obj_b.a;
}
/*
 * obj_b.a = 1
 * obj_b.b = 2
 * obj_b.c = 3
 */
// here a is logged and then it is deleted

// -------------------------------------------------------------------
/*
 * Iterating over own properties only
 * If you only want to consider properties attached to the object
 * itself, and not its prototypes,
 *
 * you can use one of the following techniques:
 * Object.keys()
 * Object.getOwnPropertyNames()
 */

// -------------------------------------------------------------------

/*
 * __proto__ is a property of an object that points to
 * the prototype of that object.
 *
 * obj is an object with its __proto__ property set to
 * proto, and its own property a set to 2.
 *
 * This means that obj inherits properties from proto
 *
 * Note:
 * In JavaScript, an object cannot have two properties
 * with the same key. If you define an object with two
 * properties having the same key, the last one will
 * overwrite the previous ones.
 *
 */
const proto = { a: 1, b: 99, b: 90 };
const obj = { __proto__: proto, a: 2 };

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
} // obj.a = 2, obj.b = 90

/*
 * Note: __proto__ is not recommended for direct use
 * because it's not supported in all environments and
 * its use has performance implications.
 */

// -------------------------------------------------------------------

// Enumerable properties added to the prototype during iteration:

const proto_ = {};
const obj__ = { __proto__: proto_, a: 1, b: 2 };

for (const prop in obj__) {
  console.log(`obj__.${prop} = ${obj__[prop]}`);
  proto_.c = 3;
  obj__.d = 4;
}
console.log(proto_); // { c: 3 }
console.log(obj__.c); // 3

/*
 * c is not included in the properties that the loop iterates
 * over as loop includes properties that exist on the object
 * at the time the loop starts. { a: 1, b: 2 }
 *
 * But When you delete a property from an object in JavaScript,
 * it is immediately removed from the object. If you delete a
 * property during a for...in loop, and the loop hasn't reached
 * that property yet, the property will not be included in the iteration.
 *
 * This behavior is different from adding properties during the loop.
 * When you add a property to an object during a for...in loop,
 * the property will not be included in the iteration, even if
 * the loop hasn't reached the end of the object's properties
 * yet. This is because the for...in loop only includes
 * properties that exist on the object at the time the loop starts.
 */

/* 
When you create an object and assign it a prototype, the object doesn't get a "snapshot" of the prototype at that moment. Instead, it gets a "live link" to the prototype. This means that if you add properties to the prototype later, those properties will be accessible through the object.
 */

// -------------------------------------------------------------------

// Changing the enumerability of a property during iteration:
const obj_en = { a: 1, b: 2, c: 3 };

for (const prop in obj_en) {
  console.log(`obj_en.${prop} = ${obj_en[prop]}`);
  Object.defineProperty(obj_en, 'c', { enumerable: false });
}
/*
 * obj_en.a = 1
 * obj_en.b = 2
 * obj_en.c = 3
 */
