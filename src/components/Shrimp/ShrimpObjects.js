const context = require.context('./images', true, /.png$/);

const obj = {};
let shrimpCount = 0;
context.keys().forEach((key) => {
  const shrimpNumber = key
    .split('./')
    .pop() // remove the first 2 characters
    .substring(0, key.length - 6) // remove the file extension
    .replace('shrimp', ''); // remove the shrimp :(
  obj[shrimpNumber] = context(key);
  shrimpCount++;
  obj['shrimpCount'] = shrimpCount;
});

export default {
  ...obj,
  shrimpCount,
};
