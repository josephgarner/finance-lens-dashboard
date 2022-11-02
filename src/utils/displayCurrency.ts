export const displayCurrency = (input: number) => {
  if (input < 0) {
    return `-$${((input * -1) / 100).toFixed(2)}`;
  }
  return `$${(input / 100).toFixed(2)}`;
};
