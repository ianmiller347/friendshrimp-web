const context = require.context('./images', true, /.png$/);

const obj = {};
context.keys().forEach((key) => {
  // const shrimpNumber = key.substring(5, key.length - 1);
  const shrimpNumber = key.split('./').pop() // remove the first 2 characters
    .substring(0, key.length - 6) // remove the file extension
    .replace('shrimp', ''); // remove the shrimp :(
  obj[shrimpNumber] = context(key);
});

export default obj;
