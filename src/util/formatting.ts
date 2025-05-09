export const formatToDollarAmount = (amount: string | number): string => {
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericAmount);
};
