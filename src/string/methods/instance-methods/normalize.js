console.log(
  '\u0048\u0065\u0079\u0020\u0074\u0068\u0065\u0072\u0065'.normalize()
); // Output: Hey there

function toUnicode(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    // Get the Unicode value of the character
    let charCode = str.charCodeAt(i);
    // Convert the Unicode value to hexadecimal and pad it with zeros to get 4 digits
    let hexCode = charCode.toString(16).padStart(4, '0');
    // Add the Unicode escape sequence to the result
    result += '\\u' + hexCode;
  }
  return result;
}

let str = 'Hey there';
console.log(toUnicode(str)); // Outputs: \u0048\u0065\u0079\u0020\u0074\u0068\u0065\u0072\u0065
