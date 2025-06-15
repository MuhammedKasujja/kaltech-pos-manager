import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) =>
    ("0" + (byte % 36).toString(36)).slice(-1)
  ).join("");
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
export const formatDateTime = (
  datetime: Date | string,
  options?: Intl.DateTimeFormatOptions
) => {
  if (datetime.toString() === "Invalid Date") return "";
  return new Date(datetime).toLocaleTimeString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    ...options,
  });
};

export const getFirstAndLastDay = (day: number) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  if (currentDay >= day) {
    // if the current day is greater than target day, it means that we just passed it
    return {
      firstDay: new Date(currentYear, currentMonth, day),
      lastDay: new Date(currentYear, currentMonth + 1, day - 1),
    };
  } else {
    // if the current day is less than target day, it means that we haven't passed it yet
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear; // if the current month is January, we need to go back a year
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // if the current month is January, we need to go back to December
    return {
      firstDay: new Date(lastYear, lastMonth, day),
      lastDay: new Date(currentYear, currentMonth, day - 1),
    };
  }
};

export const daysLeft = (
  accountCreationDate: Date,
  maxDays: number
): number => {
  const now = new Date();
  const endPeriodDate = new Date(accountCreationDate);
  endPeriodDate.setDate(accountCreationDate.getDate() + maxDays);

  const diffInMilliseconds = endPeriodDate.getTime() - now.getTime();

  // Convert milliseconds to days and return
  return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
};

const cutoffDate = new Date("2023-10-17T00:00:00.000Z");

export const calculateDaysLeft = (accountCreationDate: Date): number => {
  let maxDays;
  if (accountCreationDate < cutoffDate) {
    maxDays = 30;
    accountCreationDate = new Date("2023-10-01T00:00:00.000Z");
  } else {
    maxDays = 14;
  }
  return daysLeft(accountCreationDate, maxDays);
};

export const timeAgo = (timestamp?: Date): string => {
  if (!timestamp) return "Just now";
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 60000) {
    // less than 1 second
    return "Just now";
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    });
  }
  // return `${ms(diff)} ago`;
  return `${diff} ago`;
};

export const formatExpirationTime = (seconds: number): string => {
  // Define constants for time units
  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const YEAR = 31536000;

  seconds = Math.ceil(seconds / MINUTE) * MINUTE;

  if (seconds < MINUTE) {
    return "Less than a minute";
  }

  // Return exact unit match if possible
  if (seconds % YEAR === 0) {
    const years = seconds / YEAR;
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  if (seconds % DAY === 0) {
    const days = seconds / DAY;
    return `${days} day${days !== 1 ? "s" : ""}`;
  }

  if (seconds % HOUR === 0 && seconds < DAY) {
    const hours = seconds / HOUR;
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  if (seconds % MINUTE === 0 && seconds < HOUR) {
    const minutes = seconds / MINUTE;
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  // Mixed unit fallbacks
  if (seconds < HOUR) {
    const minutes = Math.floor(seconds / MINUTE);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  if (seconds < DAY) {
    const hours = Math.floor(seconds / HOUR);
    const minutes = Math.floor((seconds % HOUR) / MINUTE);
    return (
      `${hours} hour${hours !== 1 ? "s" : ""}` +
      (minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? "s" : ""}` : "")
    );
  }

  if (seconds < YEAR) {
    const days = Math.floor(seconds / DAY);
    const remainingSeconds = seconds % DAY;
    const hours = Math.floor(remainingSeconds / HOUR);
    const minutes = Math.floor((remainingSeconds % HOUR) / MINUTE);

    let result = `${days} day${days !== 1 ? "s" : ""}`;

    if (hours > 0 && minutes > 0) {
      result += `, ${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      result += ` and ${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      result += ` and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }

    return result;
  }

  // Years + remaining time
  const years = Math.floor(seconds / YEAR);
  const remainingSeconds = seconds % YEAR;
  const days = Math.floor(remainingSeconds / DAY);
  const hours = Math.floor((remainingSeconds % DAY) / HOUR);
  const minutes = Math.floor((remainingSeconds % HOUR) / MINUTE);

  let result = `${years} year${years !== 1 ? "s" : ""}`;

  if (days > 0) {
    result += `, ${days} day${days !== 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    result += `, ${hours} hour${hours !== 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    result += ` and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  return result;
};

export function generateAccountKey() {
  return generateRandomString(32).toUpperCase();
}
