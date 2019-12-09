export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getColorFromRandomInt(resultNumber, spanEnd) {
  const percentageOfResult = (resultNumber / spanEnd);
  const inversePercentageOfResult = (spanEnd - resultNumber) / spanEnd;
  // higher the result the more green it  is
  const red = Math.round(256 * inversePercentageOfResult);
  const green = Math.round(256 * percentageOfResult);
  return `rgb(${red}, ${green}, 10)`;
}
