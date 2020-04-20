export const numberArrayFromNumber = (num, startAtZero = false) => 
  Array.from({ length: num }, (v, i) => startAtZero ? i : i + 1);
