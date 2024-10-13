import { toast } from "react-toastify";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

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

// Get Current Time
export const getCurrentTime = () => {
  // Get current time in UTC
  const utcNow = new Date();
  // Convert UTC to Nigeria Time (West Africa Time, UTC+1)
  const nigeriaTime = toZonedTime(utcNow, "Africa/Lagos");
  return nigeriaTime;
};

// Get current time in Nigeria Time (UTC+1)
export const getNigeriaTime = () => {
  const utcNow = new Date();
  const nigeriaTime = toZonedTime(utcNow, "Africa/Lagos");
  return nigeriaTime;
};

// Get UTC time for storing in DB
export const getUtcTime = () => {
  const nigeriaTime = getNigeriaTime();
  const utcTime = fromZonedTime(nigeriaTime, "Africa/Lagos");
  return utcTime;
};

// Generate OTP
export function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Get current time (Nigeria Time)
export const GetCurrentTime = () => {
  const date = new Date();
  const nigeriaTime = new Date(date.getTime() + 1 * 60 * 60 * 1000);
  return nigeriaTime;
};
