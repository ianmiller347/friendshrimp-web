export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomColor() {
  const max = 255;
  return `rgb(${getRandomInt(0, max)}, ${getRandomInt(0, max)}, ${getRandomInt(0, max)})`;
}

export function getStatusColorFromRandomInt(resultNumber, spanEnd) {
  const percentageOfResult = (resultNumber / spanEnd);
  const inversePercentageOfResult = (spanEnd - resultNumber) / spanEnd;
  // higher the result the more green it  is
  const red = Math.round(256 * inversePercentageOfResult);
  const green = Math.round(256 * percentageOfResult);
  return `rgb(${red}, ${green}, 10)`;
}

export const getRandomItemFromArray = (itemsArray) => {
  const max = itemsArray.length;
  if (!max) {
    return null;
  }
  return itemsArray[getRandomInt(0, max)];
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getRandomLetter = () => {
  const alphabetLength = alphabet.length;
  return alphabet.charAt(Math.floor(Math.random() * alphabetLength));
};

// get a random combo of 4 letters
export const getRandom4LetterWord = () => {
  // so we need to get 4 letter word
  return `${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}`;
};
