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

// Capitalize first letter
export const capitalizeFirstLetter = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Format phone number for SMS
export const formatPhoneNumber = (phone_number: any) => {
  // Ensure phone_number exists and is valid
  if (!phone_number || phone_number.length < 10) {
    throw new Error("Invalid phone number");
  }

  // If the phone number starts with "0", replace the leading "0" with "234"
  if (phone_number.startsWith("0")) {
    return `234${phone_number.substring(1)}`;
  }

  // If the phone number already starts with "234", return it as-is
  if (phone_number.startsWith("234")) {
    return phone_number;
  }

  // Otherwise, assume it's in local format without leading 0 and prepend "234"
  return `234${phone_number}`;
};
