import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomNames } from "@/constants/randomNames";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateFunnyName() {
  const randomName =
    randomNames[Math.floor(Math.random() * randomNames.length)];
  return randomName;
}

export const FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
