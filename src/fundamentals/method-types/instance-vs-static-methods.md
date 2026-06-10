# Instance Methods vs Static Methods

## Overview

JavaScript methods are often grouped into two common types:

- **Instance methods**: called on a specific value or object.
- **Static methods**: called on the constructor or class itself.

## Mental Model

```text
instance method = this specific thing, do something
static method   = type/class helper, create/check/convert something
```

## Instance Methods

An instance method needs a real value/object to work on.

```javascript
const numbers = [1, 2, 3]

numbers.map((number) => number * 2) // [2, 4, 6]
numbers.includes(2) // true
```

Here `map()` and `includes()` are called on the `numbers` array.

The method lives on the prototype, and each array instance can use it.

MDN usually writes these as:

```text
Array.prototype.map()
String.prototype.toUpperCase()
Map.prototype.get()
```

`prototype` means instances can use the method.

More examples:

```javascript
'hello'.toUpperCase() // "HELLO"

const userRoles = new Map([['mayank', 'admin']])
userRoles.get('mayank') // "admin"
```

## Static Methods

A static method is called on the constructor/class itself.

```javascript
Array.isArray([1, 2, 3]) // true
Array.from('hello') // ["h", "e", "l", "l", "o"]
Object.keys({ name: 'Mayank', role: 'admin' }) // ["name", "role"]
```

You do not call these methods on an instance:

```javascript
const numbers = [1, 2, 3]

// numbers.isArray() // Wrong
// 'hello'.from()    // Wrong
```

Static methods are useful when the operation belongs to the whole type, not one
specific instance.

Think of static methods as helper actions attached to the type:

```text
Array can check or create arrays.
Object can inspect or create objects.
User can create a special User.
```

## Class Example

```javascript
class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    return `Hi, I am ${this.name}`
  }

  static createGuest() {
    return new User('Guest')
  }
}

const user = new User('Mayank')

user.sayHi() // instance method
User.createGuest() // static method
```

## Quick Difference

| Type | Called On | Example | Meaning |
| --- | --- | --- | --- |
| Instance method | A value/object | `numbers.map()` | Work with this specific array |
| Static method | Constructor/class | `Array.from()` | Use Array as a helper/creator |

## How To Recognize Them

If the method starts with the constructor name, it is usually static:

```javascript
Array.isArray(value)
Array.from(value)
Object.keys(obj)
Object.create(proto)
```

If the method is called after a value, it is usually an instance method:

```javascript
array.map(callback)
string.includes(search)
map.get(key)
user.sayHi()
```

## Quick Test

Ask this question:

```text
Do I already have one specific value/object?
```

If yes, you probably need an instance method:

```javascript
numbers.map(callback)
name.toUpperCase()
```

If no, and you are creating/checking/converting something, you probably need a
static method:

```javascript
Array.from(value)
Array.isArray(value)
Object.keys(obj)
```
