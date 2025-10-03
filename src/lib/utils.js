import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
  const lowerCaseName = pageName.toLowerCase();
  return lowerCaseName.replace(/\s+/g, '-');
}
