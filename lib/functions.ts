// Generate a random number between 100000 and 999999
export function generateSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
