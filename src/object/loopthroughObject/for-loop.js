// https://flexiple.com/loop-through-object-javascript/

const obj = {
  a: 'name',
  b: 'occupation',
};

for (let i = 0; i < Object.keys(obj).length; i++) {
  let result = obj[Object.keys(obj)[i]];
  console.log('value -> ', result);
}
