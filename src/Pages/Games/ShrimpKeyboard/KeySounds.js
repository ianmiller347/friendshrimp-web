const context = require.context('./shrimp-keys', true, /.mp3$/);

const obj = {};
context.keys().forEach((key) => {
  const shrimpKey = key.split('./').pop() // remove the first 2 characters??
    .substring(0, key.indexOf('-') - 2); // remove everything but the note at the beginning
  obj[shrimpKey] = context(key);
});

export default obj;
