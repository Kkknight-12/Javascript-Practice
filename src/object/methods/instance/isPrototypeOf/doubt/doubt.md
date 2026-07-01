# Doubts: Object.prototype.isPrototypeOf()

## Doubt 1: Is `Object.create(SecretBox.prototype)` The Same As `new SecretBox()`?

Question:

```js
class SecretBox {
  #value = 'secret';

  static hasSecretBrand(value) {
    return #value in value;
  }
}

const fakeBox = Object.create(SecretBox.prototype);
```

Is this the same as this?

```js
const realBox = new SecretBox();
```

Also, why do we pass `fakeBox` as an argument here?

```js
SecretBox.hasSecretBrand(fakeBox);
```

## Short Answer

They are not the same.

This creates a real instance:

```js
const realBox = new SecretBox();
```

This creates an object that only has the same prototype link as an instance:

```js
const fakeBox = Object.create(SecretBox.prototype);
```

Both objects can have `SecretBox.prototype` in their prototype chain.

But only `new SecretBox()` runs the class initialization that creates the
private field.

## What `new SecretBox()` Does

When you write:

```js
const realBox = new SecretBox();
```

JavaScript does three important things:

```text
1. Create a new object.
2. Link that new object to SecretBox.prototype.
3. Run the class initialization.
```

The prototype chain becomes:

```text
realBox -> SecretBox.prototype -> Object.prototype -> null
```

Because the class initialization runs, the private field is created on
`realBox`:

```js
#value = 'secret'
```

So `realBox` passes both checks:

```js
console.log(SecretBox.prototype.isPrototypeOf(realBox)); // true
console.log(SecretBox.hasSecretBrand(realBox)); // true
```

The first check asks:

```text
Does realBox have SecretBox.prototype in its prototype chain?
```

The second check asks:

```text
Does realBox really have SecretBox's private field?
```

For a real instance, both answers are `true`.

## What `Object.create(SecretBox.prototype)` Does

When you write:

```js
const fakeBox = Object.create(SecretBox.prototype);
```

JavaScript creates a new object and sets the exact object inside the
parentheses as the new object's prototype.

So the prototype chain becomes:

```text
fakeBox -> SecretBox.prototype -> Object.prototype -> null
```

That part looks like a real instance.

This check returns `true`:

```js
console.log(SecretBox.prototype.isPrototypeOf(fakeBox)); // true
```

Why?

Because `SecretBox.prototype` really is in `fakeBox`'s prototype chain.

But `Object.create()` did not call `new SecretBox()`. It did not run the class
initialization. It only connected the prototype chain.

That means `fakeBox` does not get the private field:

```js
#value = 'secret'
```

So this returns `false`:

```js
console.log(SecretBox.hasSecretBrand(fakeBox)); // false
```

## The Main Difference

Both can have the same prototype-chain shape:

```text
realBox -> SecretBox.prototype -> Object.prototype -> null
fakeBox -> SecretBox.prototype -> Object.prototype -> null
```

But they were not created in the same way.

`new SecretBox()`:

```text
creates the object
links it to SecretBox.prototype
runs the class initialization
adds the private field
```

`Object.create(SecretBox.prototype)`:

```text
creates the object
links it to SecretBox.prototype
does not run the class initialization
does not add the private field
```

So this is the key lesson:

```text
Prototype-chain membership does not prove that the object was really initialized
by the class.
```

## Why Not `Object.create(SecretBox)`?

This is the common confusion:

```js
const fakeBox = Object.create(SecretBox);
```

`Object.create(value)` does not use `value.prototype` automatically.

It uses the exact value inside the parentheses as the new object's prototype.

So this:

```js
Object.create(SecretBox);
```

creates this chain:

```text
fakeBox -> SecretBox -> Function.prototype -> Object.prototype -> null
```

That is not how normal instances of `SecretBox` are linked.

A normal instance is linked to `SecretBox.prototype`:

```text
realBox -> SecretBox.prototype -> Object.prototype -> null
```

So if we used `Object.create(SecretBox)`, this would be true:

```js
console.log(SecretBox.isPrototypeOf(fakeBox)); // true
```

But this would be false:

```js
console.log(SecretBox.prototype.isPrototypeOf(fakeBox)); // false
```

That would teach a different thing: the object is linked to the class function
object itself, not to the prototype object used by instances.

For this doubt, we want to create an object that looks like an instance from
the prototype-chain side but still is not a real initialized instance.

That is why the example uses:

```js
Object.create(SecretBox.prototype);
```

## Why Do We Pass `fakeBox` Into `SecretBox.hasSecretBrand(fakeBox)`?

Look at the method:

```js
class SecretBox {
  #value = 'secret';

  static hasSecretBrand(value) {
    return #value in value;
  }
}
```

`hasSecretBrand()` is a static method.

Static methods are called on the class itself:

```js
SecretBox.hasSecretBrand(someValue);
```

They are not called on the instance:

```js
realBox.hasSecretBrand(); // TypeError: realBox.hasSecretBrand is not a function
```

So the method needs an argument:

```js
SecretBox.hasSecretBrand(valueToCheck);
```

Inside the method, this line:

```js
return #value in value;
```

asks:

```text
Does the object stored in value really have SecretBox's private field?
```

So when we write:

```js
SecretBox.hasSecretBrand(fakeBox);
```

we are asking:

```text
fakeBox has SecretBox.prototype in its prototype chain,
but does fakeBox really have SecretBox's private field?
```

The answer is:

```js
false
```

Because `fakeBox` was made with `Object.create(SecretBox.prototype)`, not with
`new SecretBox()`.

## Full Comparison

```js
class SecretBox {
  #value = 'secret';

  static hasSecretBrand(value) {
    return #value in value;
  }
}

const realBox = new SecretBox();
const fakeBox = Object.create(SecretBox.prototype);

console.log(SecretBox.prototype.isPrototypeOf(realBox)); // true
console.log(SecretBox.prototype.isPrototypeOf(fakeBox)); // true

console.log(SecretBox.hasSecretBrand(realBox)); // true
console.log(SecretBox.hasSecretBrand(fakeBox)); // false
```

What happened:

- `realBox` has `SecretBox.prototype` in its prototype chain.
- `fakeBox` also has `SecretBox.prototype` in its prototype chain.
- `realBox` was initialized by `new SecretBox()`, so it has the private field.
- `fakeBox` was only linked to `SecretBox.prototype`, so it does not have the
  private field.

## Final Mental Model

Use this distinction:

```text
isPrototypeOf()
checks prototype-chain membership
```

```text
#value in value
checks whether the object really has that private field
```

So this can be true:

```js
SecretBox.prototype.isPrototypeOf(fakeBox); // true
```

while this is false:

```js
SecretBox.hasSecretBrand(fakeBox); // false
```

That is the point of the example.

It shows that matching the prototype chain is not the same thing as being a
real initialized instance of a class with private fields.
