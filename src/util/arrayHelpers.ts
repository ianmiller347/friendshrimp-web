export const numberArrayFromNumber = (
  num: number,
  startAtZero = false
): number[] => Array.from({ length: num }, (v, i) => (startAtZero ? i : i + 1));
