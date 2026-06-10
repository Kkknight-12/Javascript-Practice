An array-like object is an object 
- that has a length property and 
- whose property keys are indices.

``` javascript
 const arrayLike ={ length: 5 }
 ```

This is an array-like object. An array-like
 object is an object which has a property length and whose
 property keys can be coerced to numbers. Here, it's an
 object with a single property length set to 5. This means
 the new array will have a length of 5.

```javascript
 const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 1, // will be ignored since length is 3
};
```