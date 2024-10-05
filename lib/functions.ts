// Generate a random number between 100000 and 999999
export function generateSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Format Currency
export function formatCurrency(value: any) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace("$", "")
    .trim(); // Remove currency symbol if needed
}
