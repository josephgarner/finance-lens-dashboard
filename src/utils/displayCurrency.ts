export const displayCurrency = (input: number) => {
  if (input < 0) {
    const value = Number(((input * -1) / 100).toFixed(2));
    return `-${value.toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
    })}`;
  }
  const value = Number((input / 100).toFixed(2));
  return `${value.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  })}`;
};
