import { toast } from "react-toastify";

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
    .trim();
}

// Copy Text Func
export const copyText = async (text: any) => {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied! 😁", { toastId: "copy" });
  } catch (err) {}
};

// GenerateRef
export const generateRef = (left: any, user_id: any) => {
  const ref = `${left}-${user_id}-${Date.now()}`;
  return ref;
};
