export const formatToDollarAmount = (integerNumber) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(integerNumber);
};
