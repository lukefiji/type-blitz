import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merges tailwind-merge and clsx
function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export default cn;
